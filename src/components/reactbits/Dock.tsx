import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
  isActive?: boolean;
}

interface DockProps {
  items: DockItem[];
  className?: string;
}

export const Dock: React.FC<DockProps> = ({ items, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl border border-slate-700/60 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-500/10',
        className
      )}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isAdjacent =
          hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

        const scale = isHovered ? 1.25 : isAdjacent ? 1.1 : 1.0;

        return (
          <div key={item.id} className="relative group">
            {/* Tooltip */}
            <div
              className={cn(
                'pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-700 bg-slate-950/95 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-200 shadow-xl opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-top-11',
                item.isActive && 'border-emerald-500/50 text-emerald-300'
              )}
            >
              {item.label}
              {item.badge && (
                <span className="ml-1.5 rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] text-emerald-300 font-bold">
                  {item.badge}
                </span>
              )}
            </div>

            <button
              onClick={item.onClick}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.2s cubic-bezier(0.2, 0.9, 0.3, 1)',
              }}
              className={cn(
                'relative flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-slate-400 transition-colors',
                item.isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(0,255,157,0.25)]'
                  : 'hover:bg-slate-800/80 hover:text-slate-100 hover:border-slate-700'
              )}
              aria-label={item.label}
            >
              {item.icon}

              {item.isActive && (
                <span className="absolute -bottom-1 h-1 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ff9d]" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
