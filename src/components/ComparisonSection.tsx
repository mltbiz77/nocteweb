import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { slideInLeft, staggerContainer, cardReveal } from '../motion/variants'

const ROWS = [
  { label: 'Time to MVP', typical: 'Slow', nocte: 'Fast' },
  { label: 'Scope clarity', typical: 'Fuzzy', nocte: 'Sharp' },
  { label: 'UX quality', typical: 'Uneven', nocte: 'Consistent' },
  { label: 'Tech debt', typical: 'Heavy', nocte: 'Managed' },
]

export function ComparisonSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section className="section" ref={ref}>
      <motion.h2
        className="section-title"
        variants={slideInLeft}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        Build better, ship faster.
      </motion.h2>
      <motion.p
        className="section-sub"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.35 }}
      >
        Experienced builders and advisors change how projects land.
      </motion.p>
      <motion.div
        className="comparison-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="comparison-head" variants={cardReveal}>
          <span />
          <span>Typical project</span>
          <span>With Nocte</span>
        </motion.div>
        {ROWS.map((row) => (
          <motion.div key={row.label} className="comparison-row" variants={cardReveal}>
            <span className="comparison-label">{row.label}</span>
            <span className="comparison-pill dim">{row.typical}</span>
            <span className="comparison-pill strong">{row.nocte}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
