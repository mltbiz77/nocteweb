const CONTACT_MAILTO = 'mailto:hello@nocteventures.com'

export function CTASection() {
  return (
    <section className="section cta-band" id="work">
      <div className="cta-inner">
        <div>
          <h2>Have something worth building?</h2>
          <p>Tell us what youre working on.</p>
        </div>
        <a href={CONTACT_MAILTO} className="cta-button focus-ring" aria-label="Contact">
          Contact
        </a>
      </div>
    </section>
  )
}
