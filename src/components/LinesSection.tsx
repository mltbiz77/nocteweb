import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const nodes = [
  { id: 'build', title: 'Build', desc: 'We build software products from the ground up.', x: '12%', y: '28%' },
  { id: 'invest', title: 'Invest', desc: 'We invest in technology ventures.', x: '50%', y: '52%' },
  { id: 'advise', title: 'Advise', desc: 'We advise founders and teams.', x: '88%', y: '28%' },
] as const

export function LinesSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ rootMargin: '-80px 0px' })
  const [lineDrawn, setLineDrawn] = useState(false)
  const [nodesVisible, setNodesVisible] = useState([false, false, false])

  useEffect(() => {
    if (!isVisible) return
    const t1 = setTimeout(() => setLineDrawn(true), 100)
    const t2 = setTimeout(() => setNodesVisible([true, false, false]), 700)
    const t3 = setTimeout(() => setNodesVisible([true, true, false]), 1100)
    const t4 = setTimeout(() => setNodesVisible([true, true, true]), 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [isVisible])

  return (
    <section className="lines-section" id="what-we-do" ref={ref}>
      <div className="lines-section-inner">
        <div className="lines-path-wrap">
          <svg
            className="lines-path-svg"
            viewBox="0 0 800 180"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="50%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            <path
              d="M 80 40 Q 280 80, 400 90 T 720 40"
              className={`lines-path-stroke ${lineDrawn ? 'drawn' : ''}`}
              stroke="url(#lineGrad)"
            />
          </svg>
          <div className="lines-nodes">
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className={`lines-node ${nodesVisible[i] ? 'is-visible' : ''}`}
                style={{
                  left: node.x,
                  top: node.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <h3 className="lines-node-title">{node.title}</h3>
                <p className="lines-node-desc">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
