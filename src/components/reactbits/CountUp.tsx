import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  delay = 0,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
}) => {
  const [value, setValue] = useState<number>(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            const startTime = performance.now() + delay * 1000;
            const totalDuration = duration * 1000;

            const updateCount = (currentTime: number) => {
              if (currentTime < startTime) {
                requestAnimationFrame(updateCount);
                return;
              }

              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / totalDuration, 1);

              // Ease out cubic
              const easeOutProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = from + (to - from) * easeOutProgress;

              setValue(currentVal);

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                setValue(to);
              }
            };

            requestAnimationFrame(updateCount);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [to, from, delay, duration]);

  const formattedNumber = value.toFixed(decimals);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
