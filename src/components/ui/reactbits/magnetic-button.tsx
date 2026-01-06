'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef, useCallback } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

/**
 * Button/link that magnetically follows the cursor
 * Subtle micro-interaction for CTAs
 */
export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = 'button',
  href,
  onClick,
  target,
  rel,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (reducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  }, [reducedMotion, strength, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const sharedProps = {
    className: cn('inline-block', className),
    style: reducedMotion ? undefined : { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: reducedMotion ? undefined : { scale: 1.02 },
    whileTap: reducedMotion ? undefined : { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
  };

  if (as === 'a' && href) {
    return (
      <motion.a
        ref={(el) => { containerRef.current = el; }}
        href={href}
        target={target}
        rel={rel}
        {...sharedProps}
      >
        {children}
      </motion.a>
    );
  }

  if (as === 'button') {
    return (
      <motion.button
        ref={(el) => { containerRef.current = el; }}
        onClick={onClick}
        {...sharedProps}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={(el) => { containerRef.current = el; }}
      {...sharedProps}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
