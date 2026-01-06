'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  splitBy?: 'chars' | 'words' | 'lines';
  animation?: 'fade-up' | 'fade-in' | 'blur-in' | 'stagger';
  duration?: number;
  stagger?: number;
  delay?: number;
}

/**
 * GSAP-powered text splitting animation
 * Premium effect for review page headlines
 * Lazy loaded for performance
 */
export function SplitText({
  text,
  className,
  splitBy = 'chars',
  animation = 'fade-up',
  duration = 0.6,
  stagger = 0.03,
  delay = 0,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const elementsRef = useRef<HTMLSpanElement[]>([]);
  const reducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  // Split text into elements
  const splitElements = (() => {
    switch (splitBy) {
      case 'chars':
        return text.split('');
      case 'words':
        return text.split(' ');
      case 'lines':
        return text.split('\n');
      default:
        return text.split('');
    }
  })();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) {
      setIsReady(true);
      return;
    }

    const elements = elementsRef.current.filter(Boolean);
    if (elements.length === 0) return;

    // Set initial state
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      ...(animation === 'fade-up' && { y: 30 }),
      ...(animation === 'blur-in' && { filter: 'blur(10px)' }),
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      ...(animation === 'fade-up' && { y: 0 }),
      ...(animation === 'blur-in' && { filter: 'blur(0px)' }),
      onComplete: () => setIsReady(true),
    };

    gsap.set(elements, fromVars);
    gsap.to(elements, toVars);

    return () => {
      gsap.killTweensOf(elements);
    };
  }, [animation, duration, stagger, delay, reducedMotion]);

  // If reduced motion, render plain text
  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={cn('inline-block', className)}>
      {splitElements.map((element, index) => (
        <span
          key={`${element}-${index}`}
          ref={(el) => {
            if (el) elementsRef.current[index] = el;
          }}
          className="inline-block"
          style={{ opacity: isReady ? undefined : 0 }}
        >
          {element}
          {splitBy === 'words' && index < splitElements.length - 1 && '\u00A0'}
        </span>
      ))}
      {/* SEO fallback */}
      <noscript>{text}</noscript>
    </span>
  );
}

export default SplitText;
