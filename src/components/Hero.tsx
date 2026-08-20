import { useEffect, useRef } from 'react';
import { Button, Container, Label, MaskHeading, Prose } from './site';
import { APPS, productPath } from '@/data/apps';
import { COMPANY } from '@/data/company';

/**
 * The opening: a saturated blue field with the statement centred in it and the
 * products arranged around the edges as the artwork.
 *
 * The products *are* the hero image. A holding company's front page should be
 * made of what it owns rather than of stock abstraction, and these four icons
 * are the best assets we have.
 *
 * The icons drift with the cursor. Each has its own depth so they separate
 * slightly rather than moving as one sheet — a parallax, not a slide. Written
 * with direct style writes on a rAF, so it never re-renders React, and it is
 * skipped entirely on touch and under reduced motion.
 */

const SPOTS = [
  { left: '7%', top: '20%', depth: 26, size: 'h-20 w-20 xl:h-24 xl:w-24' },
  { left: '82%', top: '15%', depth: 16, size: 'h-16 w-16 xl:h-20 xl:w-20' },
  { left: '13%', top: '73%', depth: 20, size: 'h-16 w-16 xl:h-[76px] xl:w-[76px]' },
  { left: '79%', top: '70%', depth: 32, size: 'h-24 w-24 xl:h-28 xl:w-28' },
];

export function Hero() {
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = field.current;
    if (!node) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover)').matches
    ) {
      return;
    }

    const marks = Array.from(node.querySelectorAll<HTMLElement>('[data-depth]'));
    let frame = 0;
    let x = 0;
    let y = 0;

    const draw = () => {
      frame = 0;
      for (const mark of marks) {
        const depth = Number(mark.dataset.depth ?? 0);
        mark.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      }
    };

    const onMove = (event: MouseEvent) => {
      const box = node.getBoundingClientRect();
      // -0.5 … 0.5 from the centre of the field.
      x = (event.clientX - box.left) / box.width - 0.5;
      y = (event.clientY - box.top) / box.height - 0.5;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={field} className="relative overflow-hidden bg-blue text-blue-ink">
      {/* Artwork: the products, drifting. Hidden below lg, where there is no
          cursor to drive it and no room to place it. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {APPS.map((app, i) => (
          <span
            key={app.slug}
            data-depth={SPOTS[i].depth}
            className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{ left: SPOTS[i].left, top: SPOTS[i].top }}
          >
            <img
              src={app.icon}
              alt=""
              width={512}
              height={512}
              className={`icon-mask plate ${SPOTS[i].size}`}
              draggable={false}
            />
          </span>
        ))}
      </div>

      <Container className="relative pt-28 pb-24 sm:pt-36 sm:pb-32">
        <div className="text-center">
          <div className="fade-rise">
            <Label className="text-blue-dim">Nocte Ventures</Label>
          </div>
          <MaskHeading
            as="h1"
            lines={['we build software', 'worth owning.']}
            size="xxl"
            className="mt-7"
            delay={180}
          />
        </div>

        <div
          className="fade-rise mx-auto mt-12 max-w-[46ch] text-center"
          style={{ animationDelay: '520ms' }}
        >
          <Prose className="text-blue-dim">
            <p>
              We build and run our own digital products, and we design, build, and advise on AI
              and digital solutions for other companies.
            </p>
          </Prose>
        </div>

        <div
          className="fade-rise mt-14 flex flex-wrap items-end justify-center gap-x-12 gap-y-6"
          style={{ animationDelay: '620ms' }}
        >
          <Button href="#work" tone="blue">
            Work with us
          </Button>
          <Button href="/portfolio/" variant="quiet" tone="blue">
            Our products
          </Button>
        </div>

        {/* Products on narrow screens, where the drifting artwork is hidden. */}
        <ul
          className="fade-rise mt-16 flex flex-wrap items-center justify-center gap-4 lg:hidden"
          style={{ animationDelay: '700ms' }}
        >
          {APPS.map((app) => (
            <li key={app.slug}>
              <a href={productPath(app)} aria-label={app.name}>
                <img
                  src={app.icon}
                  alt={app.name}
                  width={512}
                  height={512}
                  className="icon-mask plate h-14 w-14"
                  draggable={false}
                />
              </a>
            </li>
          ))}
        </ul>
      </Container>

      {/* One quiet detail in the margin — the brand line, not a fact sheet. */}
      <Container className="relative pb-8">
        <Label className="block text-center text-blue-dim lg:text-left">
          {COMPANY.tagline.replace(/\.$/, '')}
        </Label>
      </Container>
    </section>
  );
}
