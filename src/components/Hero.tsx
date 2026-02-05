import { useEffect, useState } from 'react'
import { HeroOrbitBackground } from './HeroOrbitBackground'

const EMAIL = 'mailto:hello@nocteventures.com'

const CYCLES = ['build', 'invest', 'advise'] as const
const PREFIX = 'We '
const SUFFIX = ' in software.'

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [headlineVisible, setHeadlineVisible] = useState(false)

  useEffect(() => {
    setHeadlineVisible(true)
  }, [])

  useEffect(() => {
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-neon">
      <HeroOrbitBackground />
      <div className="hero-gradient-bottom" aria-hidden />

      <div className="hero-neon-content">
        <span className="hero-label">Technology & software ventures</span>

        <h1 className="hero-headline">
          {headlineVisible && (
            <>
              {PREFIX}
              <span className="word-cycler" key={wordIndex}>
                {CYCLES[wordIndex]}
              </span>
              {SUFFIX}
            </>
          )}
        </h1>

        <p className="hero-subline">
          We build products, invest in ventures, and advise founders and teams—consumer and business.
        </p>

        <a href={EMAIL} className="hero-cta focus-ring">
          Get in touch
        </a>
      </div>
    </section>
  )
}
