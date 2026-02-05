import { motion, useReducedMotion } from 'motion/react'

const shapes = [
  { className: 'shape shape-1 shape-accent-1', delay: 0 },
  { className: 'shape shape-2 shape-accent-2', delay: 0.4 },
  { className: 'shape shape-3 shape-accent-3', delay: 0.8 },
] as const

export function LayoutShapes() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="layout-shapes" aria-hidden>
      {shapes.map(({ className, delay }, i) => (
        <motion.span
          key={i}
          className={className}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.5,
            scale: 1,
            ...(reduceMotion ? {} : { x: [0, 6, -4, 0], y: [0, -8, 4, 0] }),
          }}
          transition={
            reduceMotion
              ? { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }
              : {
                  opacity: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
                  scale: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
                  x: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: delay * 2 },
                  y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: delay * 2 },
                }
          }
        />
      ))}
    </div>
  )
}
