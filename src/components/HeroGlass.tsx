import { useTypeOnce } from '../hooks/useTypeOnce'

const EMAIL = 'mailto:hello@nocteventures.com'

const CHIPS = [
  {
    key: 'build',
    label: 'Build',
    line: 'Design and ship software products.',
    className: 'build',
    delayMs: 0,
  },
  {
    key: 'advise',
    label: 'Advise',
    line: 'Product, growth and GTM support.',
    className: 'advise',
    delayMs: 280,
  },
  {
    key: 'invest',
    label: 'Invest',
    line: 'Capital for focused software ventures.',
    className: 'invest',
    delayMs: 560,
  },
] as const

function Chip({
  label,
  line,
  className,
  delayMs,
}: {
  label: string
  line: string
  className: string
  delayMs: number
}) {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const { text, showCursor } = useTypeOnce(line, reduceMotion, delayMs)

  return (
    <div className={`hero-glass-chip ${className}`}>
      <span className="hero-glass-chip-label">{label}</span>
      <div className="hero-glass-chip-line">
        <span>{text}</span>
        {showCursor && <span className="hero-glass-chip-cursor" aria-hidden />}
      </div>
    </div>
  )
}

export function HeroGlass() {
  return (
    <section className="hero-glass">
      <div className="hero-glass-blobs" aria-hidden>
        <div className="hero-glass-blob" />
        <div className="hero-glass-blob" />
        <div className="hero-glass-blob" />
      </div>
      <div className="hero-glass-inner">
        <span className="hero-glass-label">Technology & software ventures</span>
        <h1 className="hero-glass-title">
          Nocte Ventures – Build. Advise. Invest.
        </h1>
        <p className="hero-glass-subline">
          We build products, advise teams, and invest in technology and software ventures for consumers and businesses.
        </p>
        <a href={EMAIL} className="hero-glass-cta focus-ring">
          Get in touch
        </a>
        <div className="hero-glass-panel">
          <div className="hero-glass-chips">
            {CHIPS.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                line={chip.line}
                className={chip.className}
                delayMs={chip.delayMs}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
