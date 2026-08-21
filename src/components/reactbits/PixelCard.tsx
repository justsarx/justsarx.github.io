import React, { useRef } from 'react';
import { cn } from '../../utils/cn';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'pink' | 'emerald' | 'cyan' | 'purple';
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  className = '',
  variant = 'emerald',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const colors = {
    default: 'from-slate-700/40 via-slate-800/40 to-slate-950/60 border-slate-700',
    pink: 'from-pink-500/10 via-rose-900/10 to-slate-950/70 border-pink-500/30 group-hover:border-pink-400',
    emerald: 'from-emerald-500/10 via-teal-900/10 to-slate-950/70 border-emerald-500/30 group-hover:border-emerald-400',
    cyan: 'from-cyan-500/10 via-sky-900/10 to-slate-950/70 border-cyan-500/30 group-hover:border-cyan-400',
    purple: 'from-purple-500/10 via-indigo-900/10 to-slate-950/70 border-purple-500/30 group-hover:border-purple-400',
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-gradient-to-b p-6 backdrop-blur-xl transition-all duration-300',
        colors[variant],
        className
      )}
      {...props}
    >
      {/* Subtle grid scan effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '12px 12px',
        }}
      />
      
      {/* Corner brackets */}
      <div className="pointer-events-none absolute top-2 left-2 h-2 w-2 border-t border-l border-slate-500 opacity-40 group-hover:opacity-100 group-hover:border-emerald-400 transition-all" />
      <div className="pointer-events-none absolute top-2 right-2 h-2 w-2 border-t border-r border-slate-500 opacity-40 group-hover:opacity-100 group-hover:border-emerald-400 transition-all" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-slate-500 opacity-40 group-hover:opacity-100 group-hover:border-emerald-400 transition-all" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-slate-500 opacity-40 group-hover:opacity-100 group-hover:border-emerald-400 transition-all" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
