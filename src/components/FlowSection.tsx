import { useReveal } from '../hooks/useReveal'

const lines = [
  'We partner early—when product and distribution are still taking shape.',
  'We focus on software: consumer and business, from launch to scale.',
  'We combine capital with hands-on product and growth advice.',
] as const

export function FlowSection() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-50px 0px' })

  return (
    <section className="flow-section" ref={ref}>
      <div className="flow-inner">
        {lines.map((text, i) => (
          <div
            key={i}
            className={`flow-item ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 0.12}s` : '0s' }}
          >
            <span className="flow-line" aria-hidden />
            <p className="flow-text">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
