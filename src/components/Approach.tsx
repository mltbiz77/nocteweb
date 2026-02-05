import { useReveal } from '../hooks/useReveal'

const blocks = [
  'Product-first: we focus on solving real problems with software.',
  'Lean and data-driven: we iterate quickly and let evidence guide decisions.',
  'Long-term partnerships: we work with founders and teams over years, not quarters.',
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
          {blocks.map((text, i) => (
            <p
              key={i}
              className={`approach-block reveal${isVisible ? ' is-visible' : ''}`}
              style={{
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                transitionDelay: isVisible ? `${0.1 + i * 0.08}s` : '0s',
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
