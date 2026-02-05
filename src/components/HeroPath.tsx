import { useEffect, useRef, useState } from 'react'

const PATH_D = 'M 24 58 L 776 54'
const DURATION_MS = 1600
const LOGO_VISIBLE_AT = 0.38
const PILLARS_VISIBLE_AT = 0.72

export function HeroPath() {
  const pathRef = useRef<SVGPathElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [pathLength, setPathLength] = useState(800)
  const [progress, setProgress] = useState(0)
  const [cursor, setCursor] = useState({ x: 24, y: 58 })
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const path = pathRef.current
    if (path) {
      const len = path.getTotalLength()
      setPathLength(len)
      if (reduceMotion) setProgress(1)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const path = pathRef.current
    if (!path || pathLength <= 0) return

    const start = performance.now()
    let raf = 0

    const tick = () => {
      const elapsed = performance.now() - start
      const next = Math.min(1, elapsed / DURATION_MS)
      setProgress(next)

      const at = next * pathLength
      try {
        const pt = path.getPointAtLength(at)
        setCursor({ x: pt.x, y: pt.y })
      } catch {
        setCursor({ x: 24 + next * 752, y: 58 - next * 4 })
      }

      if (next < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [pathLength, reduceMotion])

  useEffect(() => {
    const onScroll = () =>
      setScrolled(sectionRef.current ? window.scrollY > window.innerHeight * 0.15 : false)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dashOffset = pathLength * (1 - progress)
  const logoVisible = reduceMotion || progress >= LOGO_VISIBLE_AT
  const pillarsVisible = reduceMotion || progress >= PILLARS_VISIBLE_AT
  const cursorVisible = !reduceMotion && progress > 0 && progress < 1
  const dotVisible = !reduceMotion && progress < 0.05

  return (
    <section ref={sectionRef} className={`hero-path ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="hero-path-group">
        <div className="hero-path-svg-wrap">
          <svg
            className="hero-path-svg"
            viewBox="0 0 800 120"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              className="hero-path-line"
              d={PATH_D}
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: dashOffset,
              }}
            />
            <circle
              className={`hero-path-dot ${dotVisible ? 'visible' : ''}`}
              cx={24}
              cy={58}
              r={4}
              aria-hidden
            />
            <circle
              className={`hero-path-cursor ${cursorVisible ? 'visible' : ''}`}
              cx={cursor.x}
              cy={cursor.y}
              r={4}
              aria-hidden
            />
          </svg>
        </div>
        <p className={`hero-path-logo ${logoVisible ? 'visible' : ''}`}>
          Nocte Ventures
        </p>
        <div className={`hero-path-pillars-wrap ${pillarsVisible ? 'visible' : ''}`}>
          <div className="hero-path-pillars">
            <span className="hero-path-pillar build">Build</span>
            <span className="hero-path-pillars-sep" aria-hidden>·</span>
            <span className="hero-path-pillar advise">Advise</span>
            <span className="hero-path-pillars-sep" aria-hidden>·</span>
            <span className="hero-path-pillar invest">Invest</span>
          </div>
          <p className="hero-path-pillars-sub">
            Building, advising and investing in software ventures.
          </p>
        </div>
      </div>
    </section>
  )
}
