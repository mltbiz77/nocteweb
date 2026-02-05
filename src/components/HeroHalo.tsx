import { useEffect, useRef, useState } from 'react'
import { useTypingLine } from '../hooks/useTypingLine'

const BUILD_PHRASES = [
  'Designing and shipping software products.',
  'From idea to launch and scale.',
  'We build focused software.',
] as const

const ADVISE_PHRASES = [
  'Product, growth and go-to-market guidance.',
  'Hands-on advisory for founders.',
  'Strategy and execution support.',
] as const

const INVEST_PHRASES = [
  'Backing focused technology teams.',
  'Early-stage and product-driven.',
  'Capital for software ventures.',
] as const

const NODES = [
  { key: 'build', title: 'Build', phrases: BUILD_PHRASES, angle: 0, className: 'build' },
  { key: 'advise', title: 'Advise', phrases: ADVISE_PHRASES, angle: 120, className: 'advise' },
  { key: 'invest', title: 'Invest', phrases: INVEST_PHRASES, angle: 240, className: 'invest' },
] as const

function TypingLine({
  phrases,
  reduceMotion,
  delayMs,
}: {
  phrases: readonly string[]
  reduceMotion: boolean
  delayMs: number
}) {
  const { text, showCursor } = useTypingLine(phrases, reduceMotion, delayMs)

  return (
    <div className="hero-halo-typing">
      <span>{text}</span>
      {showCursor && <span className="hero-halo-typing-cursor" aria-hidden />}
    </div>
  )
}

export function HeroHalo() {
  const containerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.2)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setParallax({ x: x * 8, y: y * 8 })
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => el.removeEventListener('mousemove', onMove)
  }, [reduceMotion])

  const px = reduceMotion ? 0 : parallax.x
  const py = reduceMotion ? 0 : parallax.y

  return (
    <section
      ref={containerRef}
      className={`hero-halo ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="hero-halo-inner">
        <div
          className="hero-halo-disk"
          style={{ transform: `translate(${px}px, ${py}px)` }}
        />
        <div className="hero-halo-glow" aria-hidden />
        <div className="hero-halo-dots" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="hero-halo-dot-wrap"
              style={{ animationDelay: `${-i * 4}s` }}
            >
              <span className="hero-halo-dot" />
            </div>
          ))}
        </div>
        <p
          className="hero-halo-center"
          style={{ transform: `translate(${px * 0.5}px, ${py * 0.5}px)` }}
        >
          Nocte Ventures
        </p>
        {NODES.map((node, i) => (
          <div
            key={node.key}
            className="hero-halo-node-wrap"
            style={{
              transform: `translate(-50%, -50%) rotate(${node.angle}deg) translateY(-39%)`,
            }}
          >
            <div className={`hero-halo-node ${node.className}`}>
              <h3 className="hero-halo-node-title">{node.title}</h3>
              <TypingLine
                phrases={node.phrases}
                reduceMotion={reduceMotion}
                delayMs={i * 400}
              />
            </div>
          </div>
        ))}
        <span className="hero-halo-label">Technology & software ventures</span>
      </div>
    </section>
  )
}
