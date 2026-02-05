const EMAIL = 'mailto:hello@nocteventures.com'

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" className="logo focus-ring" aria-label="Nocte Ventures home">
          Nocte Ventures
        </a>
        <a
          href={EMAIL}
          className="header-cta focus-ring"
          aria-label="Get in touch by email"
        >
          Get in touch
        </a>
      </div>
    </header>
  )
}
