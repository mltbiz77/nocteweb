import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../motion/variants'

const CONTACT_MAILTO = 'mailto:hello@nocteventures.com'

export function Hero() {
  const handleStartProject = useCallback(() => {
    const el = document.getElementById('work')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <div>
          <motion.h1
            id="hero-heading"
            className="hero-heading"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Build software that actually ships.
          </motion.h1>
          <motion.p
            className="hero-sub"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            We design, build and advise on digital products from B2C apps to B2B tools.
          </motion.p>
          <motion.div
            className="hero-actions"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <a href="#build" className="primary focus-ring">
              Work with us
            </a>
            <a
              href={CONTACT_MAILTO}
              className="secondary focus-ring"
              aria-label="Contact"
            >
              Contact
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-panel"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Describe what you want to build…"
            aria-label="Describe what you want to build"
          />
          <button type="button" onClick={handleStartProject}>
            Start a project
          </button>
        </motion.div>
      </div>
    </section>
  )
}
