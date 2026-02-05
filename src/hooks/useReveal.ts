import { useEffect, useRef, useState } from 'react'

const defaultOptions: IntersectionObserverInit = {
  rootMargin: '-40px 0px',
  threshold: 0,
}

export function useReveal<T extends HTMLElement = HTMLElement>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { ...defaultOptions, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [options.rootMargin, options.threshold])

  return { ref, isVisible }
}
