import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

export function FlowLine() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ rootMargin: '-80px 0px' })
  const [charged, setCharged] = useState(false)

  useEffect(() => {
    if (isVisible && !charged) setCharged(true)
  }, [isVisible, charged])

  const pathHorizontal = 'M 20 30 Q 200 10, 400 30 T 780 30'
  const pathVertical = 'M 40 20 Q 40 80, 40 140 T 40 280'

  return (
    <div className="flow-line-wrap" ref={ref}>
      <div className="flow-line-inner">
        <p className="flow-line-label">How it connects</p>
        <svg
          className="flow-line-svg flow-line-horizontal"
          viewBox="0 0 800 60"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id="flowGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFDD44" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          <path d={pathHorizontal} className="flow-line-stroke" stroke="url(#flowGradientH)" />
          <path d={pathHorizontal} className={`flow-line-progress ${charged ? 'charged' : ''}`} stroke="url(#flowGradientH)" />
        </svg>
        <svg
          className="flow-line-svg flow-line-vertical"
          viewBox="0 0 80 300"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id="flowGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFDD44" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          <path d={pathVertical} className="flow-line-stroke" stroke="url(#flowGradientV)" />
          <path d={pathVertical} className={`flow-line-progress ${charged ? 'charged' : ''}`} stroke="url(#flowGradientV)" />
        </svg>
      </div>
    </div>
  )
}
