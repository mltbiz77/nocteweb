import { useEffect, useRef, useState } from 'react'

export function HeroRibbons() {
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMouse({ x: x * 15, y: y * 15 })
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  const dx = reduceMotion ? 0 : mouse.x
  const dy = reduceMotion ? 0 : mouse.y

  return (
    <div ref={ref} className="hero-ribbons-wrap" aria-hidden>
      <svg className="hero-ribbons-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="ribbonGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F973AB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F973AB" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="ribbonGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <g style={{ transform: `translate(${dx}px, ${dy}px)` }}>
          <path
            className="hero-ribbon-path ribbon-1"
            d="M -100 200 Q 200 150, 500 250 T 1300 200"
            fill="none"
            stroke="url(#ribbonGrad1)"
            strokeWidth="90"
            strokeLinecap="round"
          />
          <path
            className="hero-ribbon-path ribbon-2"
            d="M -80 450 Q 300 380, 600 480 T 1280 420"
            fill="none"
            stroke="url(#ribbonGrad2)"
            strokeWidth="85"
            strokeLinecap="round"
          />
          <path
            className="hero-ribbon-path ribbon-3"
            d="M -120 600 Q 250 520, 550 620 T 1320 560"
            fill="none"
            stroke="url(#ribbonGrad3)"
            strokeWidth="80"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}
