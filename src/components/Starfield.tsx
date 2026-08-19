import { useEffect, useRef } from 'react';

type Star = {
  /** Normalized 0–1 coordinates so a resize rescales the same sky
   *  instead of rerolling it. */
  nx: number;
  ny: number;
  r: number;
  base: number;
  amp: number;
  speed: number;
  phase: number;
};

type ShootingStar = { x: number; y: number; vx: number; vy: number; born: number };

const makeStars = (): Star[] =>
  Array.from({ length: 170 }, () => ({
    nx: Math.random(),
    ny: Math.pow(Math.random(), 1.6), // denser toward the top of the sky
    r: 0.5 + Math.random() * 0.8,
    base: 0.15 + Math.random() * 0.55,
    amp: 0.1 + Math.random() * 0.18,
    speed: 0.3 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2,
  }));

/**
 * Sparse night-sky canvas: ~170 twinkling stars, denser toward the top, and a
 * single occasional shooting star. ~0.3ms/frame; the rAF loop pauses when the
 * hero is offscreen or the tab is hidden, and prefers-reduced-motion gets one
 * static frame with no loop at all (tracked live, not just at mount).
 */
export function Starfield({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reduceQuery.matches;

    const stars = makeStars();
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let inView = true;
    let shot: ShootingStar | null = null;
    let nextShot = performance.now() + 7000 + Math.random() * 8000;

    const regen = () => {
      // Read DPR fresh: it changes with browser zoom and display moves.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#E7ECF7';
      for (const s of stars) {
        const a = s.base + s.amp * Math.sin((t / 1000) * s.speed + s.phase);
        ctx.globalAlpha = a < 0 ? 0 : a > 1 ? 1 : a;
        ctx.fillRect(s.nx * w, s.ny * h, s.r, s.r);
      }

      if (!reduced) {
        if (!shot && t > nextShot) {
          shot = {
            x: w * (0.2 + Math.random() * 0.6),
            y: h * Math.random() * 0.3,
            vx: -(0.2 + Math.random() * 0.15),
            vy: 0.06 + Math.random() * 0.05,
            born: t,
          };
        }
        if (shot) {
          const life = (t - shot.born) / 600;
          if (life >= 1) {
            shot = null;
            nextShot = t + 10000 + Math.random() * 6000;
          } else {
            const px = shot.x + shot.vx * (t - shot.born);
            const py = shot.y + shot.vy * (t - shot.born);
            const tail = 3.5 * 60 * (1 - life);
            const tx = px - shot.vx * tail;
            const ty = py - shot.vy * tail;
            const g = ctx.createLinearGradient(px, py, tx, ty);
            g.addColorStop(0, `rgba(231,236,247,${0.7 * (1 - life)})`);
            g.addColorStop(1, 'rgba(231,236,247,0)');
            ctx.globalAlpha = 1;
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(tx, ty);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
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

    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);

    const onReduceChange = () => {
      reduced = reduceQuery.matches;
      sync();
      if (reduced) draw(performance.now()); // settle on a clean static frame
    };
    reduceQuery.addEventListener('change', onReduceChange);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reduceQuery.removeEventListener('change', onReduceChange);
    };
  }, []);

  return <canvas ref={ref} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
