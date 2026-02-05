import { useEffect, useRef, useState } from 'react'

export function HeroOrbs() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setPos({ x: x * 20, y: y * 20 })
    }

    el.addEventListener('mousemove', onMove, { passive: true })
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dx = reduceMotion ? 0 : pos.x
  const dy = reduceMotion ? 0 : pos.y

  return (
    <div ref={ref} className="hero-orb-wrap" aria-hidden>
      <div
        className="hero-orb orb-1"
        style={{ transform: `translate(${dx}px, ${dy}px)` }}
      />
      <div
        className="hero-orb orb-2"
        style={{ transform: `translate(${-dx * 0.8}px, ${-dy * 0.8}px)` }}
      />
      <div
        className="hero-orb orb-3"
        style={{ transform: `translate(${dx * 0.6}px, ${-dy * 0.6}px)` }}
      />
    </div>
  )
}
