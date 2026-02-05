import { useReveal } from '../hooks/useReveal'

const items = [
  { title: 'Focused software, not everything.', subline: 'We do fewer things, well.' },
  { title: 'Few, deep partnerships.', subline: 'Long-term alignment with founders.' },
  { title: 'Product, distribution, and capital aligned.', subline: 'One team, one outcome.' },
] as const

export function CompaniesOrFocus() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-60px 0px' })

  return (
    <section className="focus-section" ref={ref}>
      <div className="focus-inner">
        <div className="focus-grid">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`focus-item ${isVisible ? 'is-visible' : ''}`}
              style={{
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <h3 className="focus-title">{item.title}</h3>
              <p className="focus-subline">{item.subline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
