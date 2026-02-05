import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const nodes = [
  { id: 'build', title: 'Build', desc: 'We build software products.', x: '50%', y: '8%', color: 'var(--accent-cyan)' },
  { id: 'invest', title: 'Invest', desc: 'We invest in technology ventures.', x: '18%', y: '58%', color: 'var(--accent-violet)' },
  { id: 'advise', title: 'Advise', desc: 'We advise founders and teams.', x: '82%', y: '58%', color: 'var(--accent-orange)' },
] as const

const r1 = 120
const r2 = 180
const r3 = 240

export function OrbitCapabilities() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ rootMargin: '-80px 0px' })
  const [drawn, setDrawn] = useState(false)
  const [nodesVisible, setNodesVisible] = useState([false, false, false])

  useEffect(() => {
    if (!isVisible) return
    const t1 = setTimeout(() => setDrawn(true), 200)
    const t2 = setTimeout(() => setNodesVisible([true, false, false]), 600)
    const t3 = setTimeout(() => setNodesVisible([true, true, false]), 900)
    const t4 = setTimeout(() => setNodesVisible([true, true, true]), 1200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [isVisible])

  const cx = 200
  const cy = 200

  return (
    <section className="orbit-capabilities" id="capabilities" ref={ref}>
      <div className="orbit-inner">
        <div className="orbit-svg-wrap">
          <svg viewBox="0 0 400 400" className="orbit-svg-wrap" aria-hidden>
            <g className="orbit-rotate-slow">
              <circle
                className={`orbit-circle cyan ${drawn ? 'drawn' : ''}`}
                cx={cx}
                cy={cy}
                r={r1}
              />
            </g>
            <g className="orbit-rotate-mid">
              <circle
                className={`orbit-circle violet ${drawn ? 'drawn' : ''}`}
                cx={cx}
                cy={cy}
                r={r2}
              />
            </g>
            <g className="orbit-rotate-fast">
              <circle
                className={`orbit-circle orange ${drawn ? 'drawn' : ''}`}
                cx={cx}
                cy={cy}
                r={r3}
              />
            </g>
          </svg>

          <div className="orbit-nodes" style={{ position: 'absolute', inset: 0 }}>
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className={`orbit-node ${nodesVisible[i] ? 'is-visible' : ''}`}
                style={{
                  left: node.x,
                  top: node.y,
                  transform: 'translate(-50%, -50%)',
                  color: node.color,
                  pointerEvents: 'auto',
                }}
              >
                <h3 className="orbit-node-title">{node.title}</h3>
                <p className="orbit-node-desc">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
