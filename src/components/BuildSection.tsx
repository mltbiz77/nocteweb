import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionShell } from './SectionShell'
import { staggerContainer, cardReveal } from '../lib/motion'

const CARDS = [
  {
    id: 'track-my-subs',
    title: 'Track My Subs',
    description: 'Subscription tracking for consumers—see what you pay and when it renews.',
  },
  {
    id: 'internal-1',
    title: 'Internal tools',
    description: 'Productivity and ops tools we build for ourselves and partners.',
  },
  {
    id: 'internal-2',
    title: 'New products',
    description: 'Early-stage products in the consumer and B2B space.',
  },
]

export function BuildSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <SectionShell id="build" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Build
      </motion.h2>
      <motion.div
        className="build-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {CARDS.map((card) => (
          <motion.article
            key={card.id}
            className="build-card"
            variants={cardReveal}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h3 className="build-card-title">{card.title}</h3>
            <p className="build-card-desc">{card.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  )
}
