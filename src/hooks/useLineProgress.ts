import { useEffect, useState } from 'react'

export function useLineProgress(durationMs: number, reduceMotion: boolean) {
  const [progress, setProgress] = useState(reduceMotion ? 1 : 0)

  useEffect(() => {
    if (reduceMotion) return
    const start = performance.now()
    let raf = 0

    const tick = () => {
      const elapsed = performance.now() - start
      const next = Math.min(1, elapsed / durationMs)
      setProgress(next)
      if (next < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, reduceMotion])

  return progress
}
