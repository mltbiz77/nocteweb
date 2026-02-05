const EMAIL = 'mailto:hello@nocteventures.com'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-legal">
          <p><strong>Nocte Ventures Ltd</strong></p>
          <p>Company No: 16579177</p>
          <p className="footer-note">Technology and software ventures from London.</p>
        </div>
        <a
          href={EMAIL}
          className="footer-link focus-ring"
          aria-label="Get in touch by email"
        >
          Get in touch
        </a>
      </div>
    </footer>
  )
}
