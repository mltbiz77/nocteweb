import { useMemo } from 'react'

const LABELS = [
  { id: 'build', text: 'BUILD' },
  { id: 'invest', text: 'INVEST' },
  { id: 'advise', text: 'ADVISE' },
  { id: 'software', text: 'SOFTWARE ONLY' },
] as const

type OrbitStripProps = {
  activeVerbIndex: number | null
  reduceMotion?: boolean
}

export function OrbitStrip({ activeVerbIndex, reduceMotion }: OrbitStripProps) {
  const viewBox = '0 0 380 140'
  const cx = 190
  const cy = 70
  const rx = 160
  const ry = 50

  const orbitPath = useMemo(
    () => `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`,
    [cx, cy, rx, ry]
  )

  const orbitPath2 = useMemo(
    () => `M ${cx - (rx * 0.7)} ${cy} A ${rx * 0.7} ${ry * 0.7} 0 0 1 ${cx + (rx * 0.7)} ${cy} A ${rx * 0.7} ${ry * 0.7} 0 0 1 ${cx - (rx * 0.7)} ${cy}`,
    [cx, cy, rx, ry]
  )

  return (
    <section className="orbit-strip" aria-hidden>
      <div className="orbit-strip-inner">
        <svg
          className="orbit-svg"
          viewBox={viewBox}
          fill="none"
          aria-hidden
        >
          <path
            className="orbit-path orbit-path-1"
            d={orbitPath}
            stroke="var(--accent-1)"
          />
          <path
            className="orbit-path orbit-path-2"
            d={orbitPath2}
            stroke="var(--accent-2)"
          />
          {!reduceMotion && (
            <circle className="orbit-dot" r="5" fill="var(--accent-1)">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={orbitPath}
              />
            </circle>
          )}
        </svg>
        <div className="orbit-labels">
          {LABELS.map((item, i) => (
            <span
              key={item.id}
              className={`orbit-label ${activeVerbIndex === i ? 'is-active' : ''}`}
              data-active={item.id}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
