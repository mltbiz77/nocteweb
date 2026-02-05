const EMAIL = 'mailto:hello@nocteventures.com'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-legal">
          <p className="footer-company"><strong>Nocte Ventures Ltd</strong></p>
          <p>128 City Road, London, United Kingdom, EC1V 2NX</p>
          <p>Company No: 16579177</p>
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
