import { useEffect, useState } from 'react'

const CONTACT_MAILTO = 'mailto:hello@nocteventures.com'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#" className="logo focus-ring" aria-label="Nocte Ventures home">
          Nocte Ventures
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="#build" className="nav-link focus-ring">Build</a>
          <a href="#advise" className="nav-link focus-ring">Advise</a>
          <a href="#work" className="nav-link focus-ring">Work</a>
          <a
            href={CONTACT_MAILTO}
            className="nav-cta focus-ring"
            aria-label="Contact"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
