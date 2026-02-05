import { useReveal } from '../hooks/useReveal'

const items = [
  { title: 'Launch', subline: 'Helping products reach their first users.' },
  { title: 'Scale', subline: 'Investing in focused software with traction.' },
  { title: 'Advise', subline: 'Embedding product and growth expertise.' },
] as const

export function FocusAreas() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-60px 0px' })

  return (
    <section className="focus-areas" ref={ref}>
      <div className="focus-inner">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`focus-item ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 0.12}s` : '0s' }}
          >
            <span className="focus-line" aria-hidden />
            <h3 className="focus-title">{item.title}</h3>
            <p className="focus-subline">{item.subline}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
