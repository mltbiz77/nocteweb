import { useEffect, useState } from 'react'
import { BackgroundLines } from './BackgroundLines'

const EMAIL = 'mailto:hello@nocteventures.com'
const HEADLINE = 'Build, invest & advise.'

function splitIntoChars(text: string) {
  return text.split('').map((char, i) => (
    <span key={i} className="char" style={{ transitionDelay: `${0.15 + i * 0.03}s` }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const visible = mounted ? ' is-visible' : ''

  return (
    <section className="hero-wrap">
      <BackgroundLines />
      <div className="hero-content">
        <span
          className={`hero-label reveal-hero${visible}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '0.05s' }}
        >
          Software & technology ventures
        </span>
        <h1 className={`hero-title reveal-hero${visible}`}>
          {splitIntoChars(HEADLINE)}
        </h1>
        <p
          className={`hero-desc reveal-hero${visible}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '0.6s' }}
        >
          We build products, invest in ventures, and advise founders and teams—across consumer and business software.
        </p>
        <div
          className={`hero-actions reveal-hero${visible}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '0.75s' }}
        >
          <a href={EMAIL} className="btn btn-primary focus-ring">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
