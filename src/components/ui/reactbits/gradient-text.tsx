import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle';
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

/**
 * CSS-only gradient text animation
 * Zero JavaScript overhead - pure CSS animation
 */
export function GradientText({
  children,
  className,
  variant = 'default',
  as: Component = 'span',
}: GradientTextProps) {
  return (
    <Component
      className={cn(variant === 'default' ? 'gradient-text' : 'gradient-text-subtle', className)}
    >
      {children}
    </Component>
  );
}

export default GradientText;
