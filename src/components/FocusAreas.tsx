import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

const areas = [
  'Consumer apps & software',
  'SaaS & B2B tools',
  'Product & technology advisory',
] as const

export function FocusAreas() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <section className="focus-areas" ref={ref}>
      <div className="section-inner">
        <motion.h2
          className="section-title"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Focus areas
        </motion.h2>
        <div className="focus-areas-grid">
          {areas.map((label, i) => (
            <motion.div
              key={label}
              className="focus-area-block"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={inView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : 0.15 + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
