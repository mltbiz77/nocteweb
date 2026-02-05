import { motion, useReducedMotion } from 'motion/react'
import { LayoutShapes } from './LayoutShapes'

const EMAIL = 'mailto:hello@nocteventures.com'
const ease = [0.25, 0.46, 0.45, 0.94] as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero">
      <LayoutShapes />
      <div className="hero-inner">
        <motion.p
          className="hero-label"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1, ease }}
        >
          Technology &amp; software ventures
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.2, ease }}
        >
          Nocte Ventures
        </motion.h1>
        <motion.p
          className="hero-desc"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.35, ease }}
        >
          We build, invest in and advise on technology and software—for consumers and businesses.
        </motion.p>
        <motion.a
          href={EMAIL}
          className="btn btn-primary focus-ring"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.5, ease }}
          whileHover={reduceMotion ? undefined : { scale: 1.03, boxShadow: '0 12px 40px rgba(240, 138, 36, 0.2)' }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          Get in touch
        </motion.a>
      </div>
    </section>
  )
}
