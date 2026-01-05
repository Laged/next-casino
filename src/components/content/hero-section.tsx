import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Shield, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

interface HeroSectionProps {
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  title: string;
  titleHighlight?: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
  trustBadges?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  variant?: 'default' | 'centered' | 'split';
  backgroundVariant?: 'gradient' | 'pattern' | 'minimal';
  className?: string;
}

const defaultTrustBadges = [
  { icon: <Star className="w-4 h-4" />, text: 'Expert Reviews' },
  { icon: <Shield className="w-4 h-4" />, text: 'Licensed Only' },
  { icon: <Zap className="w-4 h-4" />, text: 'Updated Daily' },
];

export function HeroSection({
  badge,
  title,
  titleHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
  trustBadges = defaultTrustBadges,
  variant = 'default',
  backgroundVariant = 'gradient',
  className,
}: HeroSectionProps) {
  // Split title if highlight is provided
  const renderTitle = () => {
    if (titleHighlight) {
      const parts = title.split(titleHighlight);
      return (
        <>
          {parts[0]}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            {titleHighlight}
          </span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  const backgroundClasses = {
    gradient: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
    pattern: "bg-slate-950 bg-[url('/patterns/grid.svg')] bg-center",
    minimal: 'bg-slate-950',
  };

  const contentAlignment = {
    default: 'text-left items-start',
    centered: 'text-center items-center',
    split: 'text-left items-start lg:text-left lg:items-start',
  };

  return (
    <section
      className={cn('relative overflow-hidden', backgroundClasses[backgroundVariant], className)}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div
          className={cn(
            'flex flex-col gap-6 max-w-4xl',
            contentAlignment[variant],
            variant === 'centered' && 'mx-auto'
          )}
        >
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium">
              {badge.icon}
              {badge.text}
            </div>
          )}

          {/* Main Heading (H1 for SEO) */}
          <h1
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight',
              variant === 'centered' && 'max-w-3xl'
            )}
          >
            {renderTitle()}
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              'text-lg md:text-xl text-slate-400 max-w-2xl',
              variant === 'centered' && 'mx-auto'
            )}
          >
            {subtitle}
          </p>

          {/* CTA Buttons */}
          {(primaryCta || secondaryCta) && (
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-4 mt-2',
                variant === 'centered' && 'justify-center'
              )}
            >
              {primaryCta && (
                <Link href={primaryCta.href}>
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    {primaryCta.text}
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <Button variant="outline" size="lg">
                    {secondaryCta.text}
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Trust Badges */}
          {trustBadges && trustBadges.length > 0 && (
            <div
              className={cn(
                'flex flex-wrap gap-6 mt-4',
                variant === 'centered' && 'justify-center'
              )}
            >
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-400">
                  <span className="text-amber-500">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div
              className={cn(
                'flex flex-wrap gap-8 md:gap-12 mt-8 pt-8 border-t border-slate-800',
                variant === 'centered' && 'justify-center'
              )}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Simplified hero for inner pages
interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
}

export function PageHero({ title, description, breadcrumbs, className }: PageHeroProps) {
  return (
    <section
      className={cn('bg-gradient-to-b from-slate-900 to-slate-950 py-12 md:py-16', className)}
    >
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-slate-400 mb-4"
          >
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-amber-400 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-300">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{title}</h1>

        {description && <p className="text-lg text-slate-400 mt-4 max-w-3xl">{description}</p>}
      </div>
    </section>
  );
}

export default HeroSection;
