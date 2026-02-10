import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Engine, World, Bodies, Body } from 'matter-js'

const TEXT =
  'Designing and building B2C and B2B apps and software, and guiding companies on their solutions.'
const CONTACT_MAILTO = 'mailto:hello@nocteventures.com'

type ItemKind = 'char' | 'button'

type PhysicsItem = {
  id: string
  kind: ItemKind
  char?: string
  body: Body
  targetX: number
  targetY: number
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const engineRef = useRef<Engine | null>(null)
  const itemsRef = useRef<PhysicsItem[]>([])
  const [renderItems, setRenderItems] = useState<PhysicsItem[]>([])

  // track mouse for gentle repulsion
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    el.addEventListener('pointermove', handle)
    return () => el.removeEventListener('pointermove', handle)
  }, [])

  // setup physics world when we know container size
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const engine = Engine.create({ enableSleeping: false })
    engine.gravity.y = 1

    const world = engine.world

    // boundaries
    const floor = Bodies.rectangle(width / 2, height + 40, width * 2, 80, {
      isStatic: true,
    })
    const left = Bodies.rectangle(-40, height / 2, 80, height * 2, {
      isStatic: true,
    })
    const right = Bodies.rectangle(width + 40, height / 2, 80, height * 2, {
      isStatic: true,
    })
    World.add(world, [floor, left, right])

    // layout targets
    const chars = TEXT.split('')
    const charWidth = 16
    const spaceWidth = 8
    let totalWidth = 0
    for (const ch of chars) {
      totalWidth += ch === ' ' ? spaceWidth : charWidth
    }
    const startX = width / 2 - totalWidth / 2

    const items: PhysicsItem[] = []
    let cursor = 0

    // letter bodies
    chars.forEach((ch, index) => {
      if (ch === ' ') {
        cursor += spaceWidth
        return
      }
      const targetX = startX + cursor + charWidth / 2
      const targetY = height * 0.45
      const body = Bodies.rectangle(
        targetX + (Math.random() * 80 - 40),
        -50 - Math.random() * 150,
        charWidth,
        26,
        {
          friction: 0.2,
          frictionAir: 0.04,
          restitution: 0.4,
        }
      )
      items.push({
        id: `c-${index}`,
        kind: 'char',
        char: ch,
        body,
        targetX,
        targetY,
      })
      cursor += charWidth
    })

    // button body
    const btnWidth = 200
    const btnHeight = 40
    const btnTargetX = width / 2
    const btnTargetY = height * 0.6
    const btnBody = Bodies.rectangle(
      btnTargetX + (Math.random() * 40 - 20),
      -80,
      btnWidth,
      btnHeight,
      {
        friction: 0.25,
        frictionAir: 0.05,
        restitution: 0.3,
      }
    )
    items.push({
      id: 'button',
      kind: 'button',
      body: btnBody,
      targetX: btnTargetX,
      targetY: btnTargetY,
    })

    World.add(
      world,
      items.map((i) => i.body)
    )

    engineRef.current = engine
    itemsRef.current = items
    setRenderItems(items)

    const stiffness = 0.0018
    const mouseStrength = 0.0004

    let frame: number
    const tick = () => {
      const engineNow = engineRef.current
      if (!engineNow) return

      const currentItems = itemsRef.current
      const mouse = mouseRef.current

      currentItems.forEach((item) => {
        const { body, targetX, targetY } = item

        // spring back to target
        const dx = targetX - body.position.x
        const dy = targetY - body.position.y
        Body.applyForce(body, body.position, {
          x: dx * stiffness,
          y: dy * stiffness,
        })

        // gentle mouse repulsion
        if (mouse) {
          const mx = body.position.x - mouse.x
          const my = body.position.y - mouse.y
          const distSq = mx * mx + my * my
          if (distSq < 200 * 200 && distSq > 50) {
            const inv = 1 / Math.max(distSq, 2000)
            Body.applyForce(body, body.position, {
              x: (mx * mouseStrength) * inv * 200,
              y: (my * mouseStrength) * inv * 200,
            })
          }
        }
      })

      // advance physics
      Engine.update(engineNow, 1000 / 60)

      // sync to React
      setRenderItems([...currentItems])

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      Engine.clear(engine)
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero-physics" ref={containerRef}>
        {renderItems.map((item) => {
          const { body, id, kind } = item
          const { x, y } = body.position
          const style: React.CSSProperties = {
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`,
          }

          if (kind === 'button') {
            return (
              <div key={id} className="hero-btn-shell" style={style}>
                <a
                  href={CONTACT_MAILTO}
                  className="hero-button focus-ring"
                  aria-label="Contact Nocte Ventures"
                >
                  Contact
                </a>
              </div>
            )
          }

          return (
            <div key={id} className="hero-char" style={style}>
              <span>{item.char}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
