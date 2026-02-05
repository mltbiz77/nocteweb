import { useEffect, useState } from 'react'

const TYPING_MS = 45
const PAUSE_MS = 2200
const DELETE_MS = 28

export function useTypingLine(
  phrases: readonly string[],
  reduceMotion: boolean,
  startDelayMs: number = 0
) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'typing' | 'pause' | 'deleting'>('idle')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setLength(phrases[0]?.length ?? 0)
      setPhase('pause')
      return
    }
    const start = setTimeout(() => setStarted(true), startDelayMs)
    return () => clearTimeout(start)
  }, [reduceMotion, startDelayMs, phrases])

  useEffect(() => {
    if (!started || reduceMotion || phrases.length === 0) return

    const phrase = phrases[phraseIndex] ?? ''

    if (phase === 'idle') {
      setPhase('typing')
      setLength(0)
      return
    }

    if (phase === 'typing') {
      if (length >= phrase.length) {
        setPhase('pause')
        return
      }
      const t = setTimeout(() => setLength((n) => n + 1), TYPING_MS)
      return () => clearTimeout(t)
    }

    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('deleting'), PAUSE_MS)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (length <= 0) {
        setPhraseIndex((i) => (i + 1) % phrases.length)
        setPhase('typing')
        return
      }
      const t = setTimeout(() => setLength((n) => n - 1), DELETE_MS)
      return () => clearTimeout(t)
    }
  }, [started, phraseIndex, length, phase, phrases, reduceMotion])

  const text = reduceMotion ? (phrases[0] ?? '') : (phrases[phraseIndex] ?? '').slice(0, length)
  const showCursor = !reduceMotion && started

  return { text, showCursor }
}
