const EMAIL = 'mailto:hello@nocteventures.com'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Nocte</span>
          <span className="footer-company">Nocte Ventures Ltd</span>
        </div>
        <p className="footer-legal">
          Registered in England and Wales. Company No. 16579177.
          <br />
          Registered office address available on request.
        </p>
        <div className="footer-links">
          <a href={EMAIL} className="footer-email focus-ring">
            hello@nocteventures.com
          </a>
          <a href="#privacy" className="footer-link focus-ring">
            Privacy
          </a>
          <a href="#terms" className="footer-link focus-ring">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
