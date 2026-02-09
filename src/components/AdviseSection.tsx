import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionShell } from './SectionShell'
import { staggerContainer, staggerItemFast } from '../lib/motion'

const ITEMS = [
  'Product & UX audits',
  'Zero-to-one strategy sprints',
  'Fractional CPO / PM support',
]

const QUOTE = 'We plug in fast, ask hard questions, and leave teams with a sharper roadmap.'

export function AdviseSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <SectionShell id="advise" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Advise
      </motion.h2>
      <div className="advise-layout">
        <motion.ul
          className="advise-list"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {ITEMS.map((item) => (
            <motion.li key={item} className="advise-item" variants={staggerItemFast}>
              <span className="advise-item-bullet" aria-hidden />
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <motion.blockquote
          className="advise-quote"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {QUOTE}
        </motion.blockquote>
      </div>
    </SectionShell>
  )
}
