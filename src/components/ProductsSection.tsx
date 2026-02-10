import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, cardReveal } from '../motion/variants'

const PRODUCTS = [
  {
    name: 'Track My Subs',
    tag: 'B2C app',
    desc: 'Subscription tracking for consumers.',
  },
  {
    name: 'Shiftline',
    tag: 'B2B SaaS',
    desc: 'Lightweight workflow for ops teams.',
  },
  {
    name: 'Northwatch',
    tag: 'Internal tool',
    desc: 'Signals and dashboards for our own work.',
  },
]

export function ProductsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section className="section" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        The proof is in the products.
      </motion.h2>
      <motion.p
        className="section-sub"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        A few things weve touched.
      </motion.p>
      <motion.div
        className="products-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {PRODUCTS.map((p) => (
          <motion.article
            key={p.name}
            className="product-card"
            variants={cardReveal}
            whileHover={{ y: -6, boxShadow: '0 14px 30px rgba(15,23,42,0.08)' }}
          >
            <div className="product-tag">{p.tag}</div>
            <h3 className="product-name">{p.name}</h3>
            <p className="product-desc">{p.desc}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
