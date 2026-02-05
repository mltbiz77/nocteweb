import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ITEMS = [
  {
    key: 'build',
    title: 'Build',
    text: 'We create and improve digital products—from concept to launch and scale.',
    className: 'build',
  },
  {
    key: 'back',
    title: 'Back',
    text: 'We invest in and acquire products and companies we believe in.',
    className: 'back',
  },
  {
    key: 'advise',
    title: 'Advise',
    text: 'We advise teams and founders on product, growth and execution.',
    className: 'advise',
  },
] as const

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export function Pillars() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section className="pillars" ref={ref}>
      <div className="pillars-inner">
        <motion.h2
          className="pillars-heading"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          What we do.
        </motion.h2>
        <div className="pillars-grid">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.key}
              className={`pillar ${item.className}`}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
            >
              <h3 className="pillar-title">{item.title}</h3>
              <p className="pillar-text">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
