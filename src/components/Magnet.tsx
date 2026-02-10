import React, { ReactNode, useState } from 'react';

type MagnetProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnet({ children, strength = 0.25, className = '' }: MagnetProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setOffset({
      x: x * strength,
      y: y * strength,
    });
  };

  const handleLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="transition-transform duration-200 will-change-transform"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

