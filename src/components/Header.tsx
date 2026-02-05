import { motion } from 'motion/react'

const EMAIL = 'mailto:hello@nocteventures.com'

export function Header() {
  return (
    <motion.header
      className="header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
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
    </motion.header>
  )
}
