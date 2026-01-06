import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface NoiseOverlayProps {
  children: ReactNode;
  className?: string;
  intensity?: 'default' | 'strong';
}

/**
 * CSS-only noise texture overlay
 * Adds depth and texture without any JavaScript
 */
export function NoiseOverlay({ children, className, intensity = 'default' }: NoiseOverlayProps) {
  return (
    <div
      className={cn('noise-overlay', intensity === 'strong' && 'noise-overlay-strong', className)}
    >
      {children}
    </div>
  );
}

export default NoiseOverlay;
