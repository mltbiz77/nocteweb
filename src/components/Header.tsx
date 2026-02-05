import { useEffect, useState } from 'react'

const EMAIL = 'mailto:hello@nocteventures.com'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#" className="logo focus-ring" aria-label="Nocte Ventures home">
          Nocte Ventures
        </a>
        <a
          href={EMAIL}
          className="header-cta focus-ring"
          aria-label="Get in touch by email"
        >
          Get in touch
        </a>
      </div>
    </header>
  )
}
