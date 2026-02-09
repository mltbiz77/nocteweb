import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, cardReveal } from '../motion/variants'

const CARDS = [
  { title: 'Small teams, sharp edges', body: 'Focus beats scale when the problem is clear. We see it in every product we build and back.' },
  { title: 'Design for cancellation', body: 'The best subscription products make it easy to leave. That builds trust and often brings people back.' },
  { title: 'First hires that scale', body: 'The first few hires set the bar. We focus on product and distribution roles that compound.' },
]

export function SignalsSection() {
  const ref = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section id="signals" className="section" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        Signals.
      </motion.h2>
      <motion.div
        className="signals-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {CARDS.map((card) => (
          <motion.article
            key={card.title}
            className="signals-card"
            variants={cardReveal}
            whileHover={{ rotate: 1, transition: { duration: 0.2 } }}
          >
            <button
              type="button"
              className="signals-card-head"
              onClick={() => setOpenId(openId === card.title ? null : card.title)}
              aria-expanded={openId === card.title}
            >
              <span className="signals-card-title">{card.title}</span>
              <span className="signals-card-icon" aria-hidden>{openId === card.title ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {openId === card.title && (
                <motion.div
                  className="signals-card-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{card.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
