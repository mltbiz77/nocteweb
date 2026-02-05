import { useEffect, useState } from 'react'

const TYPING_MS = 42

export function useTypeOnce(
  phrase: string,
  reduceMotion: boolean,
  startTyping: boolean
) {
  const [length, setLength] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setLength(phrase.length)
      return
    }
    if (startTyping && !started) setStarted(true)
  }, [reduceMotion, startTyping, started, phrase.length])

  useEffect(() => {
    if (!started || reduceMotion || length >= phrase.length) return
    const t = setTimeout(() => setLength((n) => n + 1), TYPING_MS)
    return () => clearTimeout(t)
  }, [started, length, phrase.length, reduceMotion])

  const text = phrase.slice(0, length)
  const showCursor = !reduceMotion && started && length < phrase.length

  return { text, showCursor }
}
