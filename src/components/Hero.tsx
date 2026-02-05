import { useEffect, useState } from 'react'

const EMAIL = 'mailto:hello@nocteventures.com'
const PREFIX = 'We '
const PHRASES = [
  'build focused software.',
  'invest in focused software.',
  'advise on focused software.',
]
const STATIC_HEADLINE = 'We build, invest and advise in software.'
const TYPING_MS = 55
const PAUSE_MS = 1800

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visibleLength, setVisibleLength] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'typing' | 'pause' | 'deleting'>('idle')
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    if (!mounted) return

    const phrase = PHRASES[phraseIndex]

    if (phase === 'idle') {
      setPhase('typing')
      setVisibleLength(0)
      return
    }

    if (phase === 'typing') {
      if (visibleLength >= phrase.length) {
        setPhase('pause')
        return
      }
      const t = setTimeout(() => setVisibleLength((n) => n + 1), TYPING_MS)
      return () => clearTimeout(t)
    }

    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('deleting'), PAUSE_MS)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (visibleLength <= 0) {
        setPhraseIndex((i) => (i + 1) % PHRASES.length)
        setPhase('typing')
        return
      }
      const t = setTimeout(() => setVisibleLength((n) => n - 1), TYPING_MS * 0.6)
      return () => clearTimeout(t)
    }
  }, [mounted, phraseIndex, visibleLength, phase, reduceMotion])

  if (reduceMotion) {
    return (
      <section className="hero hero-typing">
        <div className="hero-bg" aria-hidden />
        <div className={`hero-inner ${mounted ? 'is-visible' : ''}`}>
          <span className="hero-label">Technology & software ventures</span>
          <h1 className="hero-headline hero-headline-static">
            {STATIC_HEADLINE}
          </h1>
          <p className="hero-subline">
            Build, invest, and advise—from first build to scale and exit.
          </p>
          <a href={EMAIL} className="hero-cta focus-ring">
            Get in touch
          </a>
        </div>
      </section>
    )
  }

  const phrase = PHRASES[phraseIndex]
  const visiblePart = phrase.slice(0, visibleLength)

  return (
    <section className="hero hero-typing">
      <div className="hero-bg" aria-hidden />
      <div className={`hero-inner ${mounted ? 'is-visible' : ''}`}>
        <span className="hero-label">Technology & software ventures</span>
        <h1 className="hero-headline hero-headline-typed" aria-live="polite">
          <span className="hero-typed-prefix">{PREFIX}</span>
          <span className="hero-typed-middle">{visiblePart}</span>
          <span className="hero-typed-cursor" aria-hidden />
        </h1>
        <p className="hero-subline">
          Build, invest, and advise—from first build to scale and exit.
        </p>
        <a href={EMAIL} className="hero-cta focus-ring">
          Get in touch
        </a>
      </div>
    </section>
  )
}
