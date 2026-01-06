'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: 'words' | 'characters';
  startOnView?: boolean;
}

/**
 * Animated text that blurs in word by word or character by character
 * Uses Framer Motion for smooth animations
 * SSR-safe: text is always rendered, animation is enhancement
 */
export function BlurText({
  text,
  className,
  delay = 50,
  animateBy = 'words',
  startOnView = true,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = useReducedMotion();

  // Split text into words or characters
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  // If reduced motion, render plain text
  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const shouldAnimate = startOnView ? isInView : true;

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {elements.map((element, index) => (
        <motion.span
          key={`${element}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={
            shouldAnimate
              ? { opacity: 1, filter: 'blur(0px)' }
              : { opacity: 0, filter: 'blur(10px)' }
          }
          transition={{
            duration: 0.4,
            delay: index * (delay / 1000),
            ease: 'easeOut',
          }}
        >
          {element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
      {/* Fallback for search engines / no-JS */}
      <noscript>{text}</noscript>
    </span>
  );
}

export default BlurText;
