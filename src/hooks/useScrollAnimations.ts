import { useState, useEffect } from 'react';
import anime from 'animejs';

export function useScrollAnimations() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((currentScrollY / totalScroll) * 100);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    // Map to track animation state per element to avoid thrashing
    const animatedElements = new WeakSet<Element>();
    const isVisibleMap = new WeakMap<Element, boolean>();

    // High-performance GPU-only anime.js IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const isIntersecting = entry.isIntersecting;
          const wasVisible = isVisibleMap.get(el);

          if (isIntersecting && !wasVisible) {
            isVisibleMap.set(el, true);
            anime.remove(el);

            // Compute sibling stagger index for natural wave reveals
            const parent = el.parentElement;
            const siblings = parent ? Array.from(parent.children) : [];
            const siblingIndex = siblings.indexOf(el);
            const staggerDelay = siblingIndex >= 0 ? Math.min(siblingIndex * 50, 250) : 0;

            anime({
              targets: el,
              opacity: [0, 1],
              translateY: [36, 0],
              scale: [0.95, 1],
              duration: 650,
              delay: staggerDelay,
              easing: 'easeOutCubic',
              complete: () => {
                animatedElements.add(el);
              },
            });
          } else if (!isIntersecting && wasVisible) {
            isVisibleMap.set(el, false);
            anime.remove(el);

            const bounding = entry.boundingClientRect;
            const isExitingTop = bounding.top < 0;

            anime({
              targets: el,
              opacity: [1, 0.15],
              translateY: [0, isExitingTop ? -20 : 20],
              scale: [1, 0.96],
              duration: 380,
              easing: 'easeInQuad',
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const targetElements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-stagger > *, .spotlight-card'
    );

    targetElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      // Initialize in waiting state if not in initial viewport
      const rect = htmlEl.getBoundingClientRect();
      const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInitiallyVisible) {
        isVisibleMap.set(htmlEl, true);
        anime({
          targets: htmlEl,
          opacity: [0, 1],
          translateY: [24, 0],
          scale: [0.97, 1],
          duration: 500,
          easing: 'easeOutCubic',
        });
      } else {
        htmlEl.style.opacity = '0';
        htmlEl.style.transform = 'translateY(36px) scale(0.95)';
        isVisibleMap.set(htmlEl, false);
      }

      observer.observe(htmlEl);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return { scrollProgress, mousePos };
}
