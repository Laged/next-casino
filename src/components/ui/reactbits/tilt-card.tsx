import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  shine?: boolean;
  as?: 'div' | 'article' | 'section';
}

/**
 * CSS-only 3D tilt card effect
 * Zero JavaScript overhead - pure CSS transform
 */
export function TiltCard({
  children,
  className,
  shine = false,
  as: Component = 'div',
}: TiltCardProps) {
  return (
    <Component
      className={cn(
        'tilt-card relative',
        shine && 'tilt-card-shine',
        className
      )}
    >
      {children}
    </Component>
  );
}

export default TiltCard;
