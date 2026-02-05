import { useState } from 'react'
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion'

const EMAIL = 'mailto:hello@nocteventures.com'

const ORBIT_ITEMS = [
  { key: 'build', label: 'Build', angle: 0, className: 'build' },
  { key: 'back', label: 'Back', angle: 120, className: 'back' },
  { key: 'advise', label: 'Advise', angle: 240, className: 'advise' },
] as const

type PillarKey = 'build' | 'back' | 'advise' | null

export function Hero() {
  const [hoveredPillar, setHoveredPillar] = useState<PillarKey>(null)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="hero-label">Technology & app ventures</span>
        <h1 className="hero-headline">
          <span
            className="hero-headline-word build"
            onMouseEnter={() => setHoveredPillar('build')}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            Build.
          </span>{' '}
          <span
            className="hero-headline-word back"
            onMouseEnter={() => setHoveredPillar('back')}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            Back.
          </span>{' '}
          <span
            className="hero-headline-word advise"
            onMouseEnter={() => setHoveredPillar('advise')}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            Advise.
          </span>
        </h1>
        <p className="hero-subline">
          We build products, back founders and advise teams across technology and app ventures for consumers and businesses.
        </p>
        <a href={EMAIL} className="hero-cta focus-ring">
          Get in touch
        </a>
      </div>

      <HeroOrbit
        hoveredPillar={hoveredPillar}
        reduceMotion={reduceMotion}
      />
    </section>
  )
}

function HeroOrbit({
  hoveredPillar,
  reduceMotion,
}: {
  hoveredPillar: PillarKey
  reduceMotion: boolean
}) {
  const rotation = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return
    rotation.set(rotation.get() + (delta / 1000) * 15) // ~15 deg per second
  })

  return (
    <div className="hero-orbit-wrap" aria-hidden>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          rotate: rotation,
        }}
      >
        <svg
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'visible',
          }}
        >
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.5"
            opacity="0.6"
          />
          {ORBIT_ITEMS.map((item) => (
            <OrbitDot
              key={item.key}
              angle={item.angle}
              label={item.label}
              className={item.className}
              isHighlighted={hoveredPillar === item.key}
              rotation={rotation}
              reduceMotion={reduceMotion}
            />
          ))}
        </svg>
      </motion.div>
      <span className="hero-orbit-center">Nocte</span>
    </div>
  )
}

const ACCENT_FILL = { build: '#0A84FF', back: '#22C55E', advise: '#F97316' } as const

function OrbitDot({
  angle,
  label,
  className,
  isHighlighted,
  rotation,
  reduceMotion,
}: {
  angle: number
  label: string
  className: string
  isHighlighted: boolean
  rotation: ReturnType<typeof useMotionValue<number>>
  reduceMotion: boolean
}) {
  const radius = 92
  const cx = 100 + radius * Math.cos((angle * Math.PI) / 180)
  const cy = 100 + radius * Math.sin((angle * Math.PI) / 180)

  const scale = useTransform(rotation, (r) => {
    if (reduceMotion) return 1
    const currentAngle = (r + angle) % 360
    const rad = (currentAngle * Math.PI) / 180
    const y = Math.cos(rad)
    const front = Math.max(0, y)
    return 1 + 0.35 * front
  })

  const fill = ACCENT_FILL[className as keyof typeof ACCENT_FILL] ?? '#111'

  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <motion.circle
        className={`hero-orbit-dot ${className} ${isHighlighted ? 'highlight' : ''}`}
        cx={0}
        cy={0}
        r={6}
        fill={fill}
        style={{ scale }}
      />
      <text
        className="hero-orbit-label"
        x={0}
        y={-14}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  )
}
