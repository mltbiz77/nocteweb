const EMAIL = 'mailto:hello@nocteventures.com'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-legal">
          <p><strong>Nocte Ventures Ltd</strong></p>
          <p>Company No: 16579177</p>
        </div>
        <span className="footer-email-wrap">
          <span className="footer-dot" aria-hidden />
          <a
            href={EMAIL}
            className="footer-link focus-ring"
            aria-label="Email hello@nocteventures.com"
          >
            hello@nocteventures.com
          </a>
        </span>
      </div>
    </footer>
  )
}
