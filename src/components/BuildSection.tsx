import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, cardReveal } from '../motion/variants'

const CARDS = [
  { title: 'Track My Subs', desc: 'Consumer app for managing subscriptions.' },
  { title: 'Internal tools', desc: 'Ops and productivity for teams.' },
  { title: 'New products', desc: 'Early-stage B2C and B2B builds.' },
]

export function BuildSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section id="build" className="section" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        Build.
      </motion.h2>
      <motion.div
        className="build-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {CARDS.map((card) => (
          <motion.article
            key={card.title}
            className="build-card"
            variants={cardReveal}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3 className="build-card-title">{card.title}</h3>
            <p className="build-card-desc">{card.desc}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
