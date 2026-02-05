import { useEffect, useRef } from 'react'

export function BackgroundLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationId: number
    let t = 0

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

      if (reduceMotion) {
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.06)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, h * 0.4)
        ctx.lineTo(w, h * 0.35)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, h * 0.65)
        ctx.lineTo(w, h * 0.6)
        ctx.stroke()
        return
      }

      const speed = 0.012
      t += speed

      const lines = [
        { y: 0.35, amp: 25, freq: 0.004, phase: 0, speed: 1 },
        { y: 0.5, amp: 40, freq: 0.003, phase: 1.5, speed: 0.7 },
        { y: 0.65, amp: 20, freq: 0.005, phase: 3, speed: 1.2 },
      ]

      lines.forEach((line, i) => {
        ctx.beginPath()
        const baseY = h * line.y
        const offset = (t * line.speed * 80) % (w + 200) - 100
        for (let x = -50; x <= w + 50; x += 8) {
          const y = baseY + Math.sin((x + offset) * line.freq + line.phase) * line.amp
          if (x === -50) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.04 + i * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

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
      className="background-lines"
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
