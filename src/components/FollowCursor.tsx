import { useEffect, useRef } from 'react';

export function FollowCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentRef = useRef({ x: targetRef.current.x, y: targetRef.current.y });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('pointermove', handleMove);

    let frame: number;
    const animate = () => {
      const dot = dotRef.current;
      if (!dot) {
        frame = requestAnimationFrame(animate);
        return;
      }

      const lerp = 0.16;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;

      dot.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      <div
        ref={dotRef}
        className="h-28 w-28 rounded-full bg-accent/10 blur-3xl -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
      />
    </div>
  );
}

