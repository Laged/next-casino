'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for canvas backgrounds (client-only)
const Aurora = dynamic(
  () => import('@/components/ui/reactbits/aurora').then((mod) => mod.Aurora),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
    ),
  }
);

const Particles = dynamic(
  () => import('@/components/ui/reactbits/particles').then((mod) => mod.Particles),
  { ssr: false, loading: () => null }
);

interface HeroBackgroundProps {
  showAurora?: boolean;
  showParticles?: boolean;
  auroraColors?: string[];
  particleCount?: number;
  particleColor?: string;
}

/**
 * Client-only hero background with Aurora and Particles
 * Separated from Server Component for proper SSR handling
 */
export function HeroBackground({
  showAurora = true,
  showParticles = true,
  auroraColors = ['#fbbf24', '#f97316', '#7c3aed', '#3b82f6'],
  particleCount = 30,
  particleColor = '#fbbf24',
}: HeroBackgroundProps) {
  return (
    <>
      {/* Aurora background (decorative, no SEO impact) */}
      {showAurora && (
        <div className="absolute inset-0 opacity-50">
          <Aurora colors={auroraColors} speed={0.3} blur={120} />
        </div>
      )}

      {/* Particles overlay */}
      {showParticles && (
        <Particles count={particleCount} color={particleColor} speed={0.2} />
      )}
    </>
  );
}

export default HeroBackground;
