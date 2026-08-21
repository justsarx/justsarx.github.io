import React, { useEffect, useRef } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  extraScale?: number;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#10b981',
  sparkSize = 10,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 450,
  extraScale = 1.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<
    Array<{
      x: number;
      y: number;
      angle: number;
      startTime: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleClick = (e: MouseEvent) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (i * 2 * Math.PI) / sparkCount + (Math.random() - 0.5) * 0.5,
          startTime: now,
        });
      }
    };

    window.addEventListener('click', handleClick);

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = time - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const currentRadius = sparkRadius * progress * extraScale;
        const currentSize = sparkSize * (1 - progress);

        const x = spark.x + Math.cos(spark.angle) * currentRadius;
        const y = spark.y + Math.sin(spark.angle) * currentRadius;

        ctx.beginPath();
        ctx.arc(x, y, currentSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = sparkColor;
        ctx.globalAlpha = 1 - progress;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, extraScale]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998] h-full w-full"
    />
  );
};
