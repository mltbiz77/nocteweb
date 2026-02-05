import { useEffect, useRef, useState } from 'react'
import { useLineProgress } from '../hooks/useLineProgress'
import { useTypeOnce } from '../hooks/useTypeOnce'

const EMAIL = 'mailto:hello@nocteventures.com'
const LINE_DURATION_MS = 1000

const PILLARS = [
  { key: 'build', label: 'Build', phrase: 'We build software products.', className: 'build' },
  { key: 'advise', label: 'Advise', phrase: 'We advise on product and growth.', className: 'advise' },
  { key: 'invest', label: 'Invest', phrase: 'We invest in software ventures.', className: 'invest' },
] as const

const THRESHOLDS = [0.28, 0.55, 0.82] as const

function PillarStop({
  label,
  phrase,
  className,
  startTyping,
}: {
  label: string
  phrase: string
  className: string
  startTyping: boolean
}) {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const { text, showCursor } = useTypeOnce(phrase, reduceMotion, startTyping)

  return (
    <div className={`hero-line-stop ${className}`}>
      <div className="hero-line-stop-desc">
        <span>{text}</span>
        {showCursor && <span className="hero-line-stop-cursor" aria-hidden />}
      </div>
      <div className="hero-line-stop-dot" aria-hidden />
      <span className="hero-line-stop-label">{label}</span>
    </div>
  )
}

export function HeroLine() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [hoverSegment, setHoverSegment] = useState<string | null>(null)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lineProgress = useLineProgress(LINE_DURATION_MS, reduceMotion)
  const start1 = lineProgress >= THRESHOLDS[0]
  const start2 = lineProgress >= THRESHOLDS[1]
  const start3 = lineProgress >= THRESHOLDS[2]
  const lineComplete = lineProgress >= 1

  useEffect(() => {
    if (reduceMotion) return
    const el = trackRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setParallax({ x: x * 6, y: y * 6 })
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => el.removeEventListener('mousemove', onMove)
  }, [reduceMotion])

  const px = reduceMotion ? 0 : parallax.x
  const py = reduceMotion ? 0 : parallax.y

  return (
    <section className="hero-line">
      <div
        className="hero-line-inner"
        style={{ transform: `translate(${px}px, ${py}px)` }}
      >
        <span className="hero-line-label">Technology & software ventures</span>
        <h1 className="hero-line-title">
          Build. Advise. Invest in software.
        </h1>
        <p className="hero-line-subline">
          Nocte Ventures builds, advises and invests in technology and software for consumers and businesses.
        </p>
        <a href={EMAIL} className="hero-line-cta focus-ring">
          Get in touch
        </a>

        <div
          ref={trackRef}
          className="hero-line-track"
          data-segment={hoverSegment ?? ''}
        >
          <div className="hero-line-rail-row">
            <div className="hero-line-rail" style={{ transform: `scaleX(${lineProgress})` }}>
              <span className="hero-line-rail-segment build" aria-hidden />
              <span className="hero-line-rail-segment advise" aria-hidden />
              <span className="hero-line-rail-segment invest" aria-hidden />
            </div>
            <span
              className={`hero-line-travel-dot ${lineComplete ? 'visible' : ''}`}
              aria-hidden
              style={lineComplete ? undefined : { left: `${lineProgress * 100}%` }}
            />
          </div>
          <div className="hero-line-stops">
            {PILLARS.map((p, i) => (
              <div
                key={p.key}
                className="hero-line-stop-wrap"
                onMouseEnter={() => setHoverSegment(p.key)}
                onMouseLeave={() => setHoverSegment(null)}
              >
                <PillarStop
                  label={p.label}
                  phrase={p.phrase}
                  className={p.className}
                  startTyping={[start1, start2, start3][i]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
