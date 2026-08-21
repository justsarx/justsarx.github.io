import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState<string>('');

  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on pointer-capable non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent is an interactive clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('a, button, [role="button"], input, textarea, .interactive-hover');
        if (interactiveEl) {
          setIsHovered(true);
          const customLabel = interactiveEl.getAttribute('data-cursor-label');
          setHoverText(customLabel || '');
        } else {
          setIsHovered(false);
          setHoverText('');
        }
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth spring trailing physics loop
    const animateRing = () => {
      const ease = 0.22;
      ringPos.current.x += (position.x - ringPos.current.x) * ease;
      ringPos.current.y += (position.y - ringPos.current.y) * ease;

      const ringEl = document.getElementById('custom-cursor-ring');
      const dotEl = document.getElementById('custom-cursor-dot');

      if (ringEl) {
        ringEl.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${
          isClicked ? 0.75 : isHovered ? 1.6 : 1
        })`;
      }

      if (dotEl) {
        dotEl.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
          isClicked ? 1.3 : isHovered ? 0.5 : 1
        })`;
      }

      requestRef.current = requestAnimationFrame(animateRing);
    };

    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isHovered, isClicked, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Precision Core Reticle Dot */}
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-emerald-500 will-change-transform transition-opacity duration-150"
      />

      {/* Dynamic Smooth Trailing Ring & Focus Crosshairs */}
      <div
        id="custom-cursor-ring"
        className={`fixed top-0 left-0 rounded-full border will-change-transform transition-all duration-200 flex items-center justify-center ${
          isHovered
            ? 'h-12 w-12 border-emerald-500 bg-emerald-500/10 backdrop-blur-[1px]'
            : 'h-8 w-8 border-black/30 dark:border-white/30 bg-transparent'
        }`}
      >
        {isHovered && hoverText && (
          <span className="text-[8px] font-mono font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
};
