import { useEffect, useRef, useState } from 'react'
import { BackgroundGrid } from './BackgroundGrid'

const EMAIL = 'mailto:hello@nocteventures.com'

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(t)
  }, [])

  const visible = mounted ? ' is-visible' : ''

  return (
    <section className="hero-wrap">
      <BackgroundGrid />
      <div className="hero-card">
        <span
          ref={labelRef}
          className={`hero-label reveal-hero${visible}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '0.1s' }}
        >
          Software & technology ventures
        </span>
        <h1
          ref={titleRef}
          className={`hero-title reveal-hero${visible}`}
          style={{ transition: 'opacity 0.55s ease, transform 0.55s ease', transitionDelay: '0.2s' }}
        >
          Build, invest & advise in software
        </h1>
        <p
          ref={descRef}
          className={`hero-desc reveal-hero${visible}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '0.35s' }}
        >
          Nocte Ventures works with technology and software—for consumers and businesses. We create products, back teams, and advise on strategy and growth.
        </p>
        <div
          ref={actionsRef}
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
