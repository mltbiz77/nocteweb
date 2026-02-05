import { useEffect, useRef } from 'react'

export function BackgroundWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationId: number
    let phase = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const speed = reduceMotion ? 0 : 0.015
      phase += speed

      const gradient = ctx.createLinearGradient(0, 0, w, h)
      gradient.addColorStop(0, 'rgba(255, 221, 68, 0.06)')
      gradient.addColorStop(0.5, 'rgba(255, 221, 68, 0.03)')
      gradient.addColorStop(1, 'rgba(255, 221, 68, 0.08)')

      ctx.beginPath()
      ctx.moveTo(0, h)

      for (let x = 0; x <= w + 50; x += 20) {
        const y = h * 0.6 + Math.sin(x * 0.008 + phase) * 40 + Math.sin(x * 0.003 + phase * 0.7) * 25
        ctx.lineTo(x, y)
      }

      ctx.lineTo(w + 50, h)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, h)
      for (let x = 0; x <= w + 50; x += 18) {
        const y = h * 0.7 + Math.sin(x * 0.006 + phase * 1.2) * 30 + Math.sin(x * 0.002 + phase) * 15
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w + 50, h)
      ctx.closePath()
      ctx.fillStyle = 'rgba(255, 221, 68, 0.04)'
      ctx.fill()

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
      className="background-wave"
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
