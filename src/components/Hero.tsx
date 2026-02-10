import { useTypewriter } from '../hooks/useTypewriter'

const CONTACT_MAILTO = 'mailto:hello@nocteventures.com'

const LINE =
  'Designing and building B2C and B2B apps and software, and guiding companies on their solutions.'

export function Hero() {
  const typed = useTypewriter(LINE)

  return (
    <section className="hero" aria-label="Nocte Ventures">
      <div className="hero-inner">
        <h1 className="hero-title">Nocte Ventures</h1>
        <p className="hero-body">{typed}</p>
        <a
          href={CONTACT_MAILTO}
          className="hero-button focus-ring"
          aria-label="Contact Nocte Ventures"
        >
          Contact
        </a>
      </div>
    </section>
  )
}
