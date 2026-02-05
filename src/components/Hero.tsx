import { useEffect, useState } from 'react'
import { BackgroundWave } from './BackgroundWave'

const EMAIL = 'mailto:hello@nocteventures.com'

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const visible = mounted ? ' is-visible' : ''

  return (
    <section className="hero-wrap">
      <BackgroundWave />
      <div className="hero-sun" aria-hidden />
      <div className="hero-card">
        <span
          className={`hero-label reveal-hero${visible}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '0.1s' }}
        >
          Technology & software ventures
        </span>
        <h1
          className={`hero-title reveal-hero${visible}`}
          style={{ transition: 'opacity 0.55s ease, transform 0.55s ease', transitionDelay: '0.2s' }}
        >
          Build, invest & advise in software
        </h1>
        <p
          className={`hero-desc reveal-hero${visible}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '0.35s' }}
        >
          We build, invest in and advise focused software ventures—for consumers and businesses.
        </p>
        <div
          className={`hero-actions reveal-hero${visible}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '0.5s' }}
        >
          <a href={EMAIL} className="btn btn-primary focus-ring">
            Get in touch
          </a>
          <a href="#what-we-do" className="btn btn-secondary focus-ring">
            What we do
          </a>
        </div>
      </div>
    </section>
  )
}
