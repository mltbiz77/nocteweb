import { SectionShell } from './SectionShell'

const EMAIL = 'mailto:hello@nocteventures.com'

export function ContactSection() {
  return (
    <SectionShell id="contact">
      <div className="contact-inner">
        <p className="contact-lead">
          Building something interesting? Let's talk.
        </p>
        <a href={EMAIL} className="contact-cta focus-ring">
          Email us
        </a>
      </div>
    </SectionShell>
  )
}
