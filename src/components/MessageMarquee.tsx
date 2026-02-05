import { useRef, useState } from 'react'

const chips = [
  { text: 'We ship focused software products.', color: 'chip-blue' },
  { text: 'We invest in sharp teams.', color: 'chip-green' },
  { text: 'We advise on product and growth.', color: 'chip-orange' },
  { text: 'Build, invest & advise.', color: 'chip-pink' },
] as const

const duplicated = [...chips, ...chips]

export function MessageMarquee() {
  const [paused, setPaused] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="message-marquee-wrap"
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`message-marquee ${paused ? 'paused' : ''}`}>
        {duplicated.map((chip, i) => (
          <span
            key={i}
            className={`message-chip ${chip.color}`}
          >
            {chip.text}
          </span>
        ))}
      </div>
    </div>
  )
}
