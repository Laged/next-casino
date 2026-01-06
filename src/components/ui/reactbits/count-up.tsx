'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  startOnView?: boolean;
}

/**
 * Animated number counter that counts up when visible
 * Uses Intersection Observer for performance
 * SSR-safe: shows final value, animates on client
 */
export function CountUp({
  from = 0,
  to,
  duration = 1,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  startOnView = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Skip animation if reduced motion or already animated
    if (reducedMotion || hasAnimated) {
      setDisplayValue(to);
      return;
    }

    // Start animation when in view (or immediately if not using startOnView)
    if ((startOnView && isInView) || !startOnView) {
      const controls = animate(from, to, {
        duration,
        ease: 'easeOut',
        onUpdate: (value) => {
          setDisplayValue(value);
        },
        onComplete: () => {
          setHasAnimated(true);
        },
      });

      return () => controls.stop();
    }
  }, [isInView, from, to, duration, reducedMotion, startOnView, hasAnimated]);

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <motion.span
      ref={ref}
      className={cn('tabular-nums', className)}
      initial={{ opacity: reducedMotion ? 1 : 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      {formattedValue}
      {suffix}
      {/* SEO: Hidden final value for search engines */}
      <span className="sr-only">
        {prefix}
        {to.toFixed(decimals)}
        {suffix}
      </span>
    </motion.span>
  );
}

export default CountUp;
