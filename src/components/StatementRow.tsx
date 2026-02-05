import { useReveal } from '../hooks/useReveal'

const LINES = [
  'We focus on software products, not everything.',
  'From first build to scaling and exits.',
]

export function StatementRow() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-40px 0px' })

  return (
    <section className="statement-row" ref={ref}>
      <div className="statement-row-inner">
        {LINES.map((text, i) => (
          <p
            key={i}
            className={`statement-line ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 0.1}s` : '0s' }}
          >
            <span className="statement-dot" aria-hidden />
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}
