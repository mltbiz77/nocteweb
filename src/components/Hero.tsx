import { useEffect, useState } from 'react'
import { TypingIndicator } from './TypingIndicator'
import { HeroOrbs } from './HeroOrbs'

const EMAIL = 'mailto:hello@nocteventures.com'
const HEADLINE = 'Build, invest & advise in software.'
const SUBLINE = 'We build products, invest in ventures, and advise founders and teams—consumer and business.'

export function Hero() {
  const [phase, setPhase] = useState<'dots' | 'typing' | 'subline'>('dots')
  const [visibleChars, setVisibleChars] = useState(0)
  const [sublineVisible, setSublineVisible] = useState(false)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) {
      setPhase('subline')
      setVisibleChars(HEADLINE.length)
      setSublineVisible(true)
      return
    }

    const t1 = setTimeout(() => setPhase('typing'), 800)
    return () => clearTimeout(t1)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion || phase !== 'typing') return

    if (visibleChars >= HEADLINE.length) {
      const t = setTimeout(() => {
        setPhase('subline')
        setTimeout(() => setSublineVisible(true), 200)
      }, 400)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setVisibleChars((c) => c + 1), 65)
    return () => clearTimeout(t)
  }, [phase, visibleChars, reduceMotion])

  return (
    <section className="hero-wrap">
      <div className="hero-bg">
        <div className="hero-bg-beam" />
        <div className="hero-bg-blob blue" />
        <div className="hero-bg-blob green" />
        <div className="hero-bg-blob orange" />
      </div>
      <HeroOrbs />
      <div className="hero-content">
        <span className="hero-label">Software & technology ventures</span>

        <div className="hero-title">
          {phase === 'dots' && (
            <div className="hero-typing-wrap">
              <TypingIndicator />
            </div>
          )}
          {(phase === 'typing' || phase === 'subline' || reduceMotion) && (
            <>
              {HEADLINE.split('').map((char, i) => (
                <span
                  key={i}
                  className={`char ${i < visibleChars ? 'visible' : ''}`}
                >
                  {i < visibleChars ? char : '\u00A0'}
                </span>
              ))}
            </>
          )}
        </div>

        {phase === 'subline' && (
          <p className={`hero-subline ${sublineVisible ? 'is-visible' : ''}`}>
            {SUBLINE}
          </p>
        )}

        {sublineVisible && (
          <a href={EMAIL} className="hero-cta focus-ring">
            Get in touch
          </a>
        )}
      </div>
    </section>
  )
}
