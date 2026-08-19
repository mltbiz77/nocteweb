import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Twinkle, carried over from the starfield so the net still reads as sky. */
  base: number;
  amp: number;
  speed: number;
  phase: number;
};

/** Density is capped at both ends: the link pass is O(n²), so n must not follow
 *  a 5K display upward. 140 particles ≈ 9.7K pair tests/frame, which is cheap. */
const MIN_PARTICLES = 45;
const MAX_PARTICLES = 140;
const AREA_PER_PARTICLE = 16000;

/** Moonlight, not the source component's purple — the rest of the site is a
 *  blue-black night and a violet web fights every other surface on the page. */
const RGB = '201,212,238';

const MOUSE_RADIUS = 190;
const PUSH = 4.5;

/**
 * Particle-network night sky: slow-drifting stars joined by hairlines that fade
 * with distance, pushed aside by the cursor. Adapted from the "Aether Flow"
 * hero — same effect, rebuilt to this project's constraints: no framer-motion,
 * DPR-correct, transparent (so the sky gradient and horizon still show), capped
 * density, and a rAF loop that pauses offscreen, on hidden tabs, and under
 * prefers-reduced-motion (tracked live, not just at mount).
 */
export function ParticleField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reduceQuery.matches;

    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let linkDist = 150;
    let raf = 0;
    let running = false;
    let inView = true;
    /** Canvas-local pointer position, or null when the cursor is away. */
    const mouse = { x: 0, y: 0, on: false };

    const regen = () => {
      // Read DPR fresh: it changes with browser zoom and display moves.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      linkDist = Math.min(165, Math.max(105, Math.hypot(w, h) / 11));

      const target = Math.round(
        Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, (w * h) / AREA_PER_PARTICLE)),
      );

      // Keep existing particles on resize so the sky doesn't reroll; only
      // top up or trim to the new target.
      particles = particles.slice(0, target);
      while (particles.length < target) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: 0.7 + Math.random() * 1.1,
          base: 0.3 + Math.random() * 0.45,
          amp: 0.08 + Math.random() * 0.16,
          speed: 0.3 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
        });
      }
      // A resize can leave particles outside the new box.
      for (const p of particles) {
        if (p.x > w) p.x = Math.random() * w;
        if (p.y > h) p.y = Math.random() * h;
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off the edges rather than wrapping, so the net stays taut.
        if (p.x <= 0 || p.x >= w) {
          p.vx = -p.vx;
          p.x = p.x <= 0 ? 0 : w;
        }
        if (p.y <= 0 || p.y >= h) {
          p.vy = -p.vy;
          p.y = p.y <= 0 ? 0 : h;
        }

        if (mouse.on) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_RADIUS && d > 0.01) {
            const force = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
            p.x += (dx / d) * force * PUSH;
            p.y += (dy / d) * force * PUSH;
          }
        }
      }
    };

    const draw = (t: number) => {
      // Transparent, not a black fill: the hero gradient and horizon live under this.
      ctx.clearRect(0, 0, w, h);

      // Links first, so the stars sit on top of their own web.
      ctx.lineWidth = 1;
      for (let a = 0; a < particles.length; a++) {
        const pa = particles[a];
        for (let b = a + 1; b < particles.length; b++) {
          const pb = particles[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;

          const fade = 1 - Math.sqrt(d2) / linkDist;
          let alpha = fade * 0.2;

          // Links near the cursor brighten — the interaction the effect is for.
          if (mouse.on) {
            const mx = (pa.x + pb.x) / 2 - mouse.x;
            const my = (pa.y + pb.y) / 2 - mouse.y;
            const md = Math.hypot(mx, my);
            if (md < MOUSE_RADIUS) alpha += fade * 0.42 * (1 - md / MOUSE_RADIUS);
          }

          ctx.strokeStyle = `rgba(${RGB},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const a = reduced ? p.base : p.base + p.amp * Math.sin((t / 1000) * p.speed + p.phase);
        ctx.globalAlpha = a < 0 ? 0 : a > 1 ? 1 : a;
        ctx.fillStyle = '#E7ECF7';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      step();
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    /** Single gate: run only when visible, on-screen, and motion is allowed. */
    const sync = () => {
      const shouldRun = !reduced && inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        stop();
      }
    };

    regen();
    draw(performance.now()); // always paint at least one frame
    sync();

    const ro = new ResizeObserver(() => {
      regen();
      draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    // Pointer coords are viewport-based; the canvas scrolls, so map through its
    // own box every move rather than caching a rect.
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // no hover story on touch
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.on =
        mouse.x >= -MOUSE_RADIUS &&
        mouse.y >= -MOUSE_RADIUS &&
        mouse.x <= w + MOUSE_RADIUS &&
        mouse.y <= h + MOUSE_RADIUS;
    };
    const clearMouse = () => {
      mouse.on = false;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', clearMouse);
    window.addEventListener('blur', clearMouse);

    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);

    const onReduceChange = () => {
      reduced = reduceQuery.matches;
      if (reduced) clearMouse();
      sync();
      if (reduced) draw(performance.now()); // settle on a clean static frame
    };
    reduceQuery.addEventListener('change', onReduceChange);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', clearMouse);
      window.removeEventListener('blur', clearMouse);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceQuery.removeEventListener('change', onReduceChange);
    };
  }, []);

  return (
    <canvas ref={ref} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
  );
}
