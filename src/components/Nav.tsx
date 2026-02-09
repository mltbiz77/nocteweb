import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Build', href: '#build' },
  { label: 'Back', href: '#back' },
  { label: 'Advise', href: '#advise' },
  { label: 'Signals', href: '#signals' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="nav"
      initial={false}
      animate={{
        height: scrolled ? 'var(--nav-height-scrolled)' : 'var(--nav-height)',
        backgroundColor: scrolled ? 'rgba(5, 10, 18, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottomColor: scrolled ? 'var(--border)' : 'transparent',
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="nav-inner">
        <a href="#" className="nav-logo focus-ring" aria-label="Nocte Ventures home">
          Nocte
        </a>

        <nav className="nav-links" aria-label="Main">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link focus-ring"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:hello@nocteventures.com"
          className="nav-cta focus-ring"
          aria-label="Say hello"
        >
          Say hello
        </a>

        <button
          type="button"
          className="nav-burger focus-ring"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-burger-bar" />
          <span className="nav-burger-bar" />
          <span className="nav-burger-bar" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-dropdown-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:hello@nocteventures.com"
              className="nav-dropdown-cta"
              onClick={() => setMenuOpen(false)}
            >
              Say hello
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
