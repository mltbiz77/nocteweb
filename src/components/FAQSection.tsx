import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cardReveal, staggerContainer } from '../motion/variants'

const ITEMS = [
  {
    q: 'Who we work with',
    a: 'Product-minded founders and small software teams.',
  },
  {
    q: 'What we actually do',
    a: 'Design, build and advise on apps and tools.',
  },
  {
    q: 'How to start',
    a: 'Tell us what youre working on and why now.',
  },
  {
    q: 'Do you invest?',
    a: 'Occasionally, for early-stage products we believe in.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="section">
      <h2 className="section-title">How we work.</h2>
      <motion.div
        className="faq-list"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px 0px' }}
      >
        {ITEMS.map((item) => (
          <motion.article
            key={item.q}
            className="faq-item"
            variants={cardReveal}
          >
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpen(open === item.q ? null : item.q)}
              aria-expanded={open === item.q}
            >
              <span>{item.q}</span>
              <span aria-hidden>{open === item.q ? '−' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {open === item.q && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
