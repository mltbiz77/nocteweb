import { useReveal } from '../hooks/useReveal'

const items = [
  { title: 'Hands-on product partners.', subline: 'From zero to shipped.' },
  { title: 'Operational capital, not just checks.', subline: 'Aligned for the long term.' },
  { title: 'Advice embedded in your team.', subline: 'Product, growth, and strategy.' },
] as const

export function Highlights() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-50px 0px' })

  return (
    <section className="highlights" ref={ref}>
      <div className="highlights-inner">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`highlight-item ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 0.12}s` : '0s' }}
          >
            <h3 className="highlight-title">{item.title}</h3>
            <p className="highlight-subline">{item.subline}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
