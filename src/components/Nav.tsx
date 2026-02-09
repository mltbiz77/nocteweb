import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const EMAIL = 'mailto:hello@nocteventures.com'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="nav"
      initial={false}
      animate={{
        height: scrolled ? 'var(--nav-height-small)' : 'var(--nav-height)',
        backgroundColor: scrolled ? 'rgba(5, 10, 18, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottomColor: scrolled ? 'var(--border)' : 'transparent',
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="nav-inner">
        <a href="#" className="nav-logo focus-ring">Nocte</a>
        <div className="nav-links">
          <a href="#build" className="nav-link focus-ring">Build</a>
          <a href="#back" className="nav-link focus-ring">Back</a>
          <a href="#advise" className="nav-link focus-ring">Advise</a>
          <a href={EMAIL} className="nav-cta focus-ring" aria-label="Contact">
            Contact
          </a>
        </div>
        <button
          type="button"
          className="nav-burger focus-ring"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          <a href="#build" onClick={() => setOpen(false)}>Build</a>
          <a href="#back" onClick={() => setOpen(false)}>Back</a>
          <a href="#advise" onClick={() => setOpen(false)}>Advise</a>
          <a href={EMAIL} onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </motion.nav>
  )
}
