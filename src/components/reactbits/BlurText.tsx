import React, { useEffect, useRef, useState } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 40,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms, filter 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms`,
            opacity: inView ? 1 : 0,
            filter: inView ? 'blur(0px)' : 'blur(8px)',
            transform: inView
              ? 'translate3d(0, 0, 0)'
              : `translate3d(0, ${direction === 'top' ? '-18px' : '18px'}, 0)`,
          }}
          className={animateBy === 'words' ? 'mr-2' : ''}
        >
          {element === ' ' ? '\u00A0' : element}
        </span>
      ))}
    </p>
  );
};
