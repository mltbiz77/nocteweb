import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '../motion/variants'

const CHIPS = [
  { title: 'Product sprints', copy: 'Short, focused strategy bursts.' },
  { title: 'UX reviews', copy: 'Fast feedback on flows and clarity.' },
  { title: 'Roadmap sparring', copy: 'Priorities and sequencing.' },
]

export function AdviseSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section id="advise" className="section" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        Advise.
      </motion.h2>
      <motion.div
        className="advise-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {CHIPS.map((chip) => (
          <motion.div key={chip.title} className="advise-chip" variants={staggerItem}>
            <span className="advise-chip-title">{chip.title}</span>
            <span className="advise-chip-copy">{chip.copy}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
