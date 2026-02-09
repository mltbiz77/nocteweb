import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionShell } from './SectionShell'
import { staggerContainer, cardReveal } from '../lib/motion'

const FOUNDERS = [
  {
    id: 'zero-to-one',
    title: 'Zero-to-one product founders',
    bullets: ['Hands-on product strategy', 'Intros to first hires', 'GTM sparring'],
  },
  {
    id: 'solo',
    title: 'Technical solo builders',
    bullets: ['Product and distribution focus', 'Pragmatic tech choices', 'Go-to-market clarity'],
  },
  {
    id: 'lean-b2b',
    title: 'Lean B2B teams',
    bullets: ['Early revenue and positioning', 'Product-led motion', 'Founder-led sales'],
  },
]

export function BackSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <SectionShell id="back" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Back
      </motion.h2>
      <motion.p
        className="section-lead"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        We occasionally back early-stage teams as an angel and venture-studio style partner—few bets, deep involvement.
      </motion.p>
      <motion.div
        className="back-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {FOUNDERS.map((card) => (
          <motion.article
            key={card.id}
            className="back-card"
            variants={cardReveal}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h3 className="back-card-title">{card.title}</h3>
            <ul className="back-card-list">
              {card.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  )
}
