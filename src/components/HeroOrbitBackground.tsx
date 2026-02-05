import { useEffect, useRef } from 'react'

export function HeroOrbitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationId: number
    let t = 0

    const colors = ['#38BDF8', '#A855F7', '#F97316']

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      if (reduceMotion) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(cx, cy, 120, 0, Math.PI * 2)
        ctx.stroke()
        return
      }

      t += 0.008

      for (let i = 0; i < 3; i++) {
        const r = 80 + i * 45
        const angle = t + i * 2.1
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = colors[i]
        ctx.shadowColor = colors[i]
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)'
      ctx.lineWidth = 1
      for (let i = 0; i < 3; i++) {
        const r = 100 + i * 55
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      const streakX = (t * 80) % (w + 200) - 100
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(streakX, 0)
      ctx.lineTo(streakX + 60, h + 50)
      ctx.stroke()

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-orbit-bg"
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
