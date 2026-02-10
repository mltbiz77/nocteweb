import { useEffect, useState } from 'react'

export function CircleWavesBackground() {
  const [origin, setOrigin] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) * 100
      const y = (e.clientY / innerHeight) * 100
      setOrigin({ x, y })
    }
    window.addEventListener('pointermove', handle, { passive: true })
    return () => window.removeEventListener('pointermove', handle)
  }, [])

  return (
    <div
      className="waves"
      style={{
        // CSS variables consumed by .wave in global.css
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ...( { ['--wave-x' as string]: `${origin.x}%`, ['--wave-y' as string]: `${origin.y}%` } as React.CSSProperties ),
      }}
      aria-hidden
    >
      <span className="wave wave-1" />
      <span className="wave wave-2" />
      <span className="wave wave-3" />
    </div>
  )
}
