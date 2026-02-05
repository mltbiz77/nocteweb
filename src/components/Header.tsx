import { useEffect, useState } from 'react'

const EMAIL = 'mailto:hello@nocteventures.com'

export function Header() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.4)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${solid ? 'is-solid' : ''}`}>
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
