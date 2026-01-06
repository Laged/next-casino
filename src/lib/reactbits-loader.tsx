/**
 * ReactBits Component Loader
 * Tiered loading strategy for optimal performance
 */

import dynamic from 'next/dynamic';

// =============================================================================
// Tier 1: Critical (loaded immediately, SSR)
// Zero-cost CSS components that enhance without JS
// =============================================================================

export { GradientText } from '@/components/ui/reactbits/gradient-text';
export { TiltCard } from '@/components/ui/reactbits/tilt-card';
export { NoiseOverlay } from '@/components/ui/reactbits/noise-overlay';

// =============================================================================
// Tier 2: Above Fold (preloaded with SSR, small JS)
// Framer Motion components for headlines and key interactions
// =============================================================================

export const BlurText = dynamic(
  () => import('@/components/ui/reactbits/blur-text').then((mod) => mod.BlurText),
  { ssr: true }
);

export const CountUp = dynamic(
  () => import('@/components/ui/reactbits/count-up').then((mod) => mod.CountUp),
  { ssr: true }
);

export const MagneticButton = dynamic(
  () => import('@/components/ui/reactbits/magnetic-button').then((mod) => mod.MagneticButton),
  { ssr: true }
);

// =============================================================================
// Tier 3: Below Fold (lazy loaded, SSR for content)
// Scroll-triggered animations
// =============================================================================

export const ScrollFloat = dynamic(
  () => import('@/components/ui/reactbits/scroll-float').then((mod) => mod.ScrollFloat),
  { ssr: true }
);

export const SplitText = dynamic(
  () => import('@/components/ui/reactbits/split-text').then((mod) => mod.SplitText),
  { ssr: true }
);

// =============================================================================
// Tier 4: Decorative (client only, no SSR)
// Canvas backgrounds that don't affect SEO
// =============================================================================

export const Aurora = dynamic(
  () => import('@/components/ui/reactbits/aurora').then((mod) => mod.Aurora),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
    ),
  }
);

export const Particles = dynamic(
  () => import('@/components/ui/reactbits/particles').then((mod) => mod.Particles),
  {
    ssr: false,
    loading: () => null,
  }
);
