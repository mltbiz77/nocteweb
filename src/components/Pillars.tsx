import { useReveal } from '../hooks/useReveal'

const pillars = [
  {
    id: 'build',
    title: 'Build',
    body: 'We create digital products and apps from the ground up—software that solves real problems for people and companies.',
  },
  {
    id: 'invest',
    title: 'Invest',
    body: 'We back and acquire software products and teams, combining capital with hands-on execution to grow ventures.',
  },
  {
    id: 'advise',
    title: 'Advise',
    body: 'We offer strategic advice on product, growth and technology to teams building in consumer and B2B software.',
  },
] as const

export function Pillars() {
  const { ref: sectionRef, isVisible } = useReveal({ rootMargin: '-60px 0px' })

  return (
    <section className="pillars" id="what-we-do" ref={sectionRef}>
      <div className="section-inner">
        <h2 className="section-title">What we do</h2>
        <div className="pillars-grid">
          {pillars.map((item, i) => (
            <article
              key={item.id}
              className={`pillar-card accent-${item.id} reveal${isVisible ? ' is-visible' : ''}`}
              style={{
                transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease',
                transitionDelay: isVisible ? `${i * 0.12}s` : '0s',
              }}
            >
              <h3 className="pillar-card-title">{item.title}</h3>
              <p className="pillar-card-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
