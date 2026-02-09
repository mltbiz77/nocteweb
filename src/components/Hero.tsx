import { motion } from 'framer-motion'
import { fadeInUp } from '../motion/variants'

const EMAIL = 'mailto:hello@nocteventures.com'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden>
        <div className="hero-bg-grid" />
        <div className="hero-bg-spot" />
      </div>
      <div className="hero-inner">
        <motion.h1
          className="hero-heading"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          Software after dark.
        </motion.h1>
        <motion.p
          className="hero-sub"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          We build, back and advise software teams.
        </motion.p>
        <motion.div
          className="hero-btns"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
        >
          <a href="#build" className="hero-btn-primary focus-ring">
            Work with us
          </a>
          <a href={EMAIL} className="hero-btn-ghost focus-ring" aria-label="Contact">
            Contact
          </a>
        </motion.div>
      </div>
    </section>
  )
}
