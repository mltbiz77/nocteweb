import { motion } from 'framer-motion'
import { fadeInUp } from '../lib/motion'

const EMAIL = 'mailto:hello@nocteventures.com'

export function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-bg" aria-hidden>
        <div className="hero-bg-grid" />
        <div className="hero-bg-glow" />
      </div>
      <div className="hero-inner">
        <motion.p
          className="hero-tagline"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Building at night. Shipping at dawn.
        </motion.p>
        <motion.p
          className="hero-sub"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35 }}
        >
          Nocte Ventures builds, backs and advises software teams across consumer and enterprise.
        </motion.p>
        <motion.div
          className="hero-ctas"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <a href={EMAIL} className="hero-cta-primary focus-ring">
            Work with us
          </a>
          <a href="#build" className="hero-cta-ghost focus-ring">
            See what we're building
          </a>
        </motion.div>
      </div>
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden
      >
        <span className="hero-scroll-dot" />
      </motion.div>
    </section>
  )
}
