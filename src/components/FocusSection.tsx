import { useReveal } from '../hooks/useReveal'

const HEADING = 'Software, not everything.'
const LINES = [
  'Software products only.',
  'Few, deep partnerships.',
  'Capital, product and advice in one place.',
]

export function FocusSection() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-60px 0px' })

  return (
    <section className="focus-section" ref={ref}>
      <div className={`focus-section-inner ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="focus-section-heading">{HEADING}</h2>
        {LINES.map((text, i) => (
          <p key={i} className="focus-section-line">
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}
