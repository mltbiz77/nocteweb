import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInFromLeft, staggerContainer } from '../motion/variants'

const PILLS = [
  { title: 'Solo builders', sub: 'Product-first, ship fast.' },
  { title: 'Small product teams', sub: 'Few people, clear scope.' },
  { title: 'Lean B2B crews', sub: 'Early revenue, sharp positioning.' },
]

export function BackSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section id="back" className="section" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        Back.
      </motion.h2>
      <motion.div
        className="back-row"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {PILLS.map((pill) => (
          <motion.div
            key={pill.title}
            className="back-pill"
            variants={fadeInFromLeft}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 24px rgba(34, 211, 238, 0.15)',
              borderColor: 'rgba(34, 211, 238, 0.35)',
              transition: { duration: 0.2 },
            }}
          >
            <span className="back-pill-title">{pill.title}</span>
            <span className="back-pill-sub">{pill.sub}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
