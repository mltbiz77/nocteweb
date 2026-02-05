import { useReveal } from '../hooks/useReveal'

const LINES = [
  'Digital products and apps, from launch to scale.',
  'Selective investments in focused software teams.',
  'Hands-on product and growth advisory.',
]

export function FocusStrip() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-40px 0px' })

  return (
    <section className="focus-strip" ref={ref}>
      <div className="focus-strip-inner">
        <h2 className="focus-strip-heading">What we focus on</h2>
        {LINES.map((text, i) => (
          <p
            key={i}
            className={`focus-strip-line ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 0.1}s` : '0s' }}
          >
            <span className="focus-strip-underline" aria-hidden />
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}
