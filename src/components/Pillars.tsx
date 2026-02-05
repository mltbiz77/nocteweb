import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

const pillars = [
  {
    title: 'Build',
    body: 'We create digital products and apps from the ground up—software that solves real problems for people and companies.',
  },
  {
    title: 'Invest',
    body: 'We back and acquire software products and teams, combining capital with hands-on execution to grow ventures.',
  },
  {
    title: 'Advise',
    body: 'We offer strategic advice on product, growth and technology to teams building in consumer and B2B software.',
  },
] as const

function PillarCard({
  title,
  body,
  index,
}: {
  title: string
  body: string
  index: number
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      className="pillar-card"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
    >
      <h3 className="pillar-card-title">{title}</h3>
      <p className="pillar-card-body">{body}</p>
    </motion.article>
  )
}

export function Pillars() {
  return (
    <section className="pillars" id="what-we-do">
      <div className="section-inner">
        <h2 className="section-title">What we do</h2>
        <div className="pillars-grid">
          {pillars.map((item, i) => (
            <PillarCard key={item.title} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
