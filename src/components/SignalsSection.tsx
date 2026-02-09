import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SectionShell } from './SectionShell'
import { staggerContainer, cardReveal } from '../lib/motion'

const SIGNALS = [
  {
    id: 'small-teams',
    title: 'Why small teams still win in software',
    body: 'Focus beats scale when the problem is clear. We see it in the products we build and the teams we back—fewer people, fewer meetings, faster decisions.',
  },
  {
    id: 'cancellation',
    title: 'Designing for cancellation, not lock-in',
    body: 'The best subscription products make it easy to leave. That builds trust and often brings people back when the timing is right.',
  },
  {
    id: 'b2b-motion',
    title: 'Product-led motion in B2B',
    body: 'Self-serve and usage-based pricing are spreading beyond SaaS. We help teams figure out when to lean in and when to add a human layer.',
  },
  {
    id: 'first-hires',
    title: 'First hires that scale',
    body: 'The first few hires set the culture and the bar. We focus on product and distribution roles that compound over time.',
  },
]

export function SignalsSection() {
  const ref = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <SectionShell id="signals" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Signals
      </motion.h2>
      <motion.div
        className="signals-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {SIGNALS.map((sig) => (
          <motion.article
            key={sig.id}
            className="signals-card"
            variants={cardReveal}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <button
              type="button"
              className="signals-card-head"
              onClick={() => setOpenId(openId === sig.id ? null : sig.id)}
              aria-expanded={openId === sig.id}
            >
              <h3 className="signals-card-title">{sig.title}</h3>
              <span className="signals-card-icon" aria-hidden>
                {openId === sig.id ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {openId === sig.id && (
                <motion.div
                  className="signals-card-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{sig.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  )
}
