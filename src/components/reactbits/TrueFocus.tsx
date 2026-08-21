import React, { useEffect, useRef, useState } from 'react';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'AOSP Developer & Systems Engineer',
  manualMode = false,
  blurAmount = 4,
  borderColor = '#00ff9d',
  glowColor = 'rgba(0, 255, 157, 0.4)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
  className = '',
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    const currentWord = wordRefs.current[currentIndex];
    const container = containerRef.current;
    if (!currentWord || !container) return;

    const wordRect = currentWord.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setFocusRect({
      x: wordRect.left - containerRect.left,
      y: wordRect.top - containerRect.top,
      width: wordRect.width,
      height: wordRect.height,
    });
  }, [currentIndex]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            className={`relative z-10 cursor-pointer transition-all duration-300 ${
              isActive ? 'text-white font-semibold' : 'text-slate-400'
            }`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.65,
            }}
          >
            {word}
          </span>
        );
      })}

      <div
        className="pointer-events-none absolute rounded-md transition-all ease-out"
        style={{
          transform: `translate3d(${focusRect.x - 4}px, ${focusRect.y - 2}px, 0)`,
          width: `${focusRect.width + 8}px`,
          height: `${focusRect.height + 4}px`,
          transitionDuration: `${animationDuration}s`,
          border: `1.5px solid ${borderColor}`,
          boxShadow: `0 0 16px ${glowColor}, inset 0 0 12px ${glowColor}`,
          opacity: focusRect.width > 0 ? 1 : 0,
        }}
      >
        <span
          className="absolute -top-1 -left-1 h-2 w-2 rounded-full"
          style={{ backgroundColor: borderColor }}
        />
        <span
          className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full"
          style={{ backgroundColor: borderColor }}
        />
      </div>
    </div>
  );
};
