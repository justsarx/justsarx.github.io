import React from 'react';
import { cn } from '../../utils/cn';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent transition-all',
        disabled
          ? 'text-slate-400'
          : 'bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 bg-[length:200%_auto] animate-shimmer',
        className
      )}
      style={{ animationDuration: disabled ? undefined : animationDuration }}
    >
      {text}
    </span>
  );
};
