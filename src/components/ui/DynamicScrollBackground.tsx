import React, { useEffect, useRef } from 'react';

export const DynamicScrollBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Generate floating architectural background points
    const points: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
    }> = [];

    const numPoints = 28;
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.4 + 0.1,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      scrollY += (targetScrollY - scrollY) * 0.1;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains('dark');
      const pointColor = isDark ? '255, 255, 255' : '16, 24, 40';
      const crosshairColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

      // Draw subtle parallax grid crosshairs that shift with scroll
      const gridSize = 160;
      const offsetX = (mouseX * 0.02) % gridSize;
      const offsetY = ((scrollY * 0.2) + (mouseY * 0.02)) % gridSize;

      for (let x = offsetX - gridSize; x < w + gridSize; x += gridSize) {
        for (let y = offsetY - gridSize; y < h + gridSize; y += gridSize) {
          ctx.strokeStyle = crosshairColor;
          ctx.lineWidth = 1;
          
          // Draw mini '+' crosshair
          ctx.beginPath();
          ctx.moveTo(x - 5, y);
          ctx.lineTo(x + 5, y);
          ctx.moveTo(x, y - 5);
          ctx.lineTo(x, y + 5);
          ctx.stroke();
        }
      }

      // Render floating micro points that react to scroll
      points.forEach((p) => {
        const py = (p.y - (scrollY * p.speed)) % h;
        const actualY = py < 0 ? py + h : py;

        ctx.beginPath();
        ctx.arc(p.x, actualY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pointColor}, ${p.alpha * 0.5})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
};
