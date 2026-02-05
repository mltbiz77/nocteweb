import { useReveal } from '../hooks/useReveal'

const blocks = [
  { title: 'Product-first', text: 'We focus on solving real problems with software.' },
  { title: 'Lean & data-driven', text: 'We iterate quickly and let evidence guide decisions.' },
  { title: 'Long-term partner', text: 'We work with founders and teams over years, not quarters.' },
] as const

export function Approach() {
  const { ref, isVisible } = useReveal({ rootMargin: '-40px 0px' })

  return (
    <section className="approach" ref={ref}>
      <div className="section-inner">
        <h2 className={`section-title reveal${isVisible ? ' is-visible' : ''}`} style={{ transition: 'opacity 0.45s ease, transform 0.45s ease' }}>
          How we work
        </h2>
        <div className="approach-grid">
          {blocks.map((block, i) => (
            <div
              key={block.title}
              className={`approach-block reveal${isVisible ? ' is-visible' : ''}`}
              style={{
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                transitionDelay: isVisible ? `${0.1 + i * 0.08}s` : '0s',
              }}
            >
              <h3 className="approach-block-title">{block.title}</h3>
              <p className="approach-block-text">{block.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
