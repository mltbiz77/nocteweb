import { useReveal } from '../hooks/useReveal'

const items = [
  'From zero to shipped product.',
  'Capital for focused software.',
  'Hands-on product and growth advice.',
] as const

export function Highlights() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-50px 0px' })

  return (
    <section className="highlights" ref={ref}>
      <div className="highlights-inner">
        {items.map((title, i) => (
          <div
            key={title}
            className={`highlight-item ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 0.1}s` : '0s' }}
          >
            <h3 className="highlight-title">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
