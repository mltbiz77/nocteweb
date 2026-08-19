import type { AppData } from '@/data/apps';

/** Vertex positions (percent of container) — an asymmetric scatter, per app count. */
const LAYOUTS: Record<number, { x: number; y: number }[]> = {
  2: [
    { x: 20, y: 55 },
    { x: 80, y: 25 },
  ],
  3: [
    { x: 8, y: 62 },
    { x: 50, y: 18 },
    { x: 92, y: 46 },
  ],
  4: [
    // Outer points stay >= 10% / <= 90% so a 56px icon can't clip the edge
    // of the 86vw container on a 390px screen.
    { x: 11, y: 62 },
    { x: 38, y: 16 },
    { x: 64, y: 50 },
    { x: 89, y: 20 },
  ],
};

/**
 * The apps scattered across the sky as unconnected stars: icons only, no
 * segments between them, no labels. Each lands with a soft accent bloom and
 * lifts on hover.
 */
export function Constellation({ apps }: { apps: AppData[] }) {
  const pts =
    LAYOUTS[apps.length] ??
    apps.map((_, i) => ({ x: 6 + (88 / Math.max(apps.length - 1, 1)) * i, y: i % 2 ? 20 : 55 }));

  return (
    <div className="relative h-28 w-[min(480px,86vw)]">
      {apps.map((app, i) => (
        <a
          key={app.slug}
          href={`/${app.slug}/`}
          aria-label={`${app.name} — ${app.short}`}
          className="group absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
        >
          <span className="node-inner block" style={{ animationDelay: `${0.9 + i * 0.15}s` }}>
            <img
              src={app.icon}
              alt=""
              aria-hidden="true"
              className="h-14 w-14 max-w-none rounded-[23%] border border-white/10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.5)',
              }}
              draggable={false}
            />
            {/* accent glow: blooms once on landing, returns on hover/focus */}
            <span
              className="node-bloom pointer-events-none absolute -inset-2 -z-10 rounded-[30%] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ background: app.glow, animationDelay: `${1.05 + i * 0.15}s` }}
              aria-hidden="true"
            />
          </span>
        </a>
      ))}
    </div>
  );
}
