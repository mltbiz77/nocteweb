import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speedMs = 26) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setLength(text.length)
      return
    }

    let frame: number
    let current = 0

    const step = () => {
      current += 1
      if (current <= text.length) {
        setLength(current)
        frame = window.setTimeout(step, speedMs)
      }
    }

    frame = window.setTimeout(step, 200)
    return () => window.clearTimeout(frame)
  }, [text, speedMs])

  return text.slice(0, length)
}
