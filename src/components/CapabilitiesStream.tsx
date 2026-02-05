import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const nodes = [
  { id: 'build', title: 'Build', desc: 'We build software products.', x: '12%', y: '25%' },
  { id: 'invest', title: 'Invest', desc: 'We invest in technology ventures.', x: '50%', y: '55%' },
  { id: 'advise', title: 'Advise', desc: 'We advise founders and teams.', x: '88%', y: '25%' },
] as const

const pathD = 'M 60 35 Q 250 80, 400 95 T 740 35'

export function CapabilitiesStream() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ rootMargin: '-80px 0px' })
  const [pathDrawn, setPathDrawn] = useState(false)
  const [nodesVisible, setNodesVisible] = useState([false, false, false])
  const [hoverId, setHoverId] = useState<string | null>(null)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!isVisible) return
    const t1 = setTimeout(() => setPathDrawn(true), 150)
    const t2 = setTimeout(() => setNodesVisible([true, false, false]), 600)
    const t3 = setTimeout(() => setNodesVisible([true, true, false]), 950)
    const t4 = setTimeout(() => setNodesVisible([true, true, true]), 1300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [isVisible])

  return (
    <section className="capabilities-stream" id="capabilities" ref={ref}>
      <div className="capabilities-inner">
        <div className="cap-path-wrap">
          <svg
            className="cap-path-svg"
            viewBox="0 0 800 130"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A84FF" />
                <stop offset="50%" stopColor="#34C759" />
                <stop offset="100%" stopColor="#FF9F0A" />
              </linearGradient>
            </defs>
            <path
              d={pathD}
              className={`cap-path-stroke ${pathDrawn ? 'drawn' : ''}`}
              stroke="url(#capGradient)"
            />
            {pathDrawn && !reduceMotion && (
              <circle r="6" className={`cap-dot ${hoverId ? 'paused' : ''}`} fill="var(--accent-1)">
                <animateMotion dur="4s" repeatCount="indefinite" path={pathD} />
              </circle>
            )}
          </svg>
          <div className="cap-nodes">
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className={`cap-node ${nodesVisible[i] ? 'is-visible' : ''}`}
                style={{
                  left: node.x,
                  top: node.y,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoverId(node.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                <h3 className="cap-node-title">{node.title}</h3>
                <p className="cap-node-desc">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
