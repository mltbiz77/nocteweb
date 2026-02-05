import { useEffect, useState } from 'react'
import { HeroRibbons } from './HeroRibbons'

const EMAIL = 'mailto:hello@nocteventures.com'
const HEADLINE = 'Build. Invest. Advise.'
const SUBLINE = 'We build software products, invest in ventures, and advise founders and teams—for consumers and businesses.'

export function Hero() {
  const [visibleChars, setVisibleChars] = useState(0)
  const [sublineVisible, setSublineVisible] = useState(false)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) {
      setVisibleChars(HEADLINE.length)
      setTimeout(() => setSublineVisible(true), 100)
      return
    }
    const interval = setInterval(() => {
      setVisibleChars((c) => {
        if (c >= HEADLINE.length) {
          clearInterval(interval)
          setTimeout(() => setSublineVisible(true), 300)
          return c
        }
        return c + 1
      })
    }, 80)
    return () => clearInterval(interval)
  }, [reduceMotion])

  return (
    <section className="hero-ribbon">
      <HeroRibbons />
      <div className="hero-ribbon-content">
        <span className="hero-label">Technology & software ventures</span>
        <h1 className="hero-headline">
          {HEADLINE.split('').map((char, i) => (
            <span
              key={i}
              className={`char ${i < visibleChars ? 'visible' : ''}`}
              style={reduceMotion ? undefined : { animationDelay: `${i * 0.04}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p className={`hero-subline ${sublineVisible ? 'is-visible' : ''}`}>
          {SUBLINE}
        </p>
        {sublineVisible && (
          <a href={EMAIL} className="hero-cta focus-ring">
            Get in touch
          </a>
        )}
      </div>
    </section>
  )
}
