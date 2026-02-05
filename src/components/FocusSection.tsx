import { useReveal } from '../hooks/useReveal'

const HEADING = 'We build, advise and invest—in one place.'
const LINES = [
  'We focus on software and technology: products, teams, and early-stage ventures.',
  'Building products, advising on product and growth, and investing in focused teams.',
  'We work alongside founders and teams from first build to scale.',
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
