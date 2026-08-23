import { useState, useEffect } from 'react';
import anime from 'animejs';

export function useScrollAnimations() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isScrollingDown = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isScrollingDown = currentScrollY >= lastScrollY;
      lastScrollY = currentScrollY;

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

    // Map to prevent conflicting anime instances on same element
    const activeAnimations = new WeakMap<Element, anime.AnimeInstance>();

    // IntersectionObserver with punchy dynamic enter/exit anime.js animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          // Stop existing animation on this element if running
          const running = activeAnimations.get(el);
          if (running) {
            anime.remove(el);
          }

          if (entry.isIntersecting) {
            // ENTER VIEWPORT: Dramatic 3D Spring Lift + Pop-In Scale + Elastic Overshoot
            el.classList.add('is-visible');
            const anim = anime({
              targets: el,
              opacity: [0, 1],
              translateY: [60, 0],
              scale: [0.86, 1],
              rotateX: [7, 0],
              filter: ['blur(6px)', 'blur(0px)'],
              duration: 800,
              easing: 'easeOutBack',
              complete: () => {
                activeAnimations.delete(el);
                // Ensure clean inline reset for crisp rendering
                el.style.filter = '';
              }
            });
            activeAnimations.set(el, anim);
          } else {
            // EXIT VIEWPORT: Dramatic Drop/Ascend + Shrink + Blur Dissolve
            const bounding = entry.boundingClientRect;
            const exitingTop = bounding.top < 0;
            const exitDirection = exitingTop || isScrollingDown ? -50 : 50;

            const anim = anime({
              targets: el,
              opacity: [1, 0],
              translateY: [0, exitDirection],
              scale: [1, 0.86],
              rotateX: [0, exitingTop ? -6 : 6],
              filter: ['blur(0px)', 'blur(8px)'],
              duration: 480,
              easing: 'easeInCubic',
              complete: () => {
                activeAnimations.delete(el);
              }
            });
            activeAnimations.set(el, anim);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -30px 0px' 
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '[data-anime-card="true"], .reveal-on-scroll, .reveal-stagger > *, .spotlight-card'
      );
      elements.forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements();

    // Observe dynamically rendered or tab-filtered elements
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return { scrollProgress, mousePos };
}
