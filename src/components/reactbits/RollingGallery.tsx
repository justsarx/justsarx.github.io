import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../utils/cn';

interface RollingItem {
  title: string;
  subtitle: string;
  tag: string;
  color: string;
  icon?: string;
}

interface RollingGalleryProps {
  items: RollingItem[];
  autoplay?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export const RollingGallery: React.FC<RollingGalleryProps> = ({
  items,
  autoplay = true,
  pauseOnHover = true,
  className = '',
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoplay) return;

    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isHovered || !pauseOnHover) {
        setRotation((prev) => (prev + (delta * 0.018)) % 360);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoplay, isHovered, pauseOnHover]);

  const radius = 280; // px radius for cylinder projection
  const count = items.length;
  const angleStep = 360 / count;

  return (
    <div
      className={cn('relative h-72 w-full overflow-hidden flex items-center justify-center', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative h-44 w-64 transition-transform ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {items.map((item, index) => {
          const itemAngle = index * angleStep;
          return (
            <div
              key={index}
              className="absolute inset-0 flex flex-col justify-between rounded-xl border border-slate-700/60 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md transition-all select-none hover:border-emerald-400"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
                borderColor: `${item.color}55`,
              }}
            >
              <div>
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${item.color}22`,
                    color: item.color,
                    border: `1px solid ${item.color}55`,
                  }}
                >
                  {item.tag}
                </span>
                <h4 className="mt-2 text-base font-bold text-white tracking-wide">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.subtitle}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                <span>SYS_NODE #{index + 1}</span>
                <span style={{ color: item.color }}>ACTIVE ●</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
