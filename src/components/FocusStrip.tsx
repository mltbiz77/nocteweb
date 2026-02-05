import { useReveal } from '../hooks/useReveal'

const LINES = [
  'Early-stage and product-driven.',
  'Capital, product and advisory in one place.',
  'From first build to scaling revenue.',
]

export function FocusStrip() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-40px 0px' })

  return (
    <section className="focus-strip" ref={ref}>
      <div className="focus-strip-inner">
        {LINES.map((text, i) => (
          <p
            key={i}
            className={`focus-strip-line ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 0.1}s` : '0s' }}
          >
            <span className="focus-strip-dot" aria-hidden />
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}
