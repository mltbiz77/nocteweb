import { useReveal } from '../hooks/useReveal'

const HEADING = 'Software, not everything.'
const LINES = [
  'We focus on software and technology: products and teams, from early stage to scale.',
  'Nocte combines building products, advising on product and growth, and investing in focused ventures.',
  'We work with founders and teams who care about product and distribution.',
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
