import { useReveal } from '../hooks/useReveal'

const items = [
  { title: 'Build', desc: 'We build software products from the ground up.' },
  { title: 'Invest', desc: 'We invest in technology ventures and teams.' },
  { title: 'Advise', desc: 'We advise founders on product and growth.' },
] as const

export function RibbonCapabilities() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ rootMargin: '-60px 0px' })

  return (
    <section className="ribbon-capabilities" id="capabilities" ref={ref}>
      <div className="ribbon-cap-inner">
        <div className="ribbon-cap-grid">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`ribbon-node ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: isVisible ? `${i * 0.15}s` : '0s' }}
            >
              <h3 className="ribbon-node-title">{item.title}</h3>
              <p className="ribbon-node-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
