'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, ChevronRight, ExternalLink, Info, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { BonusBadge, BonusBadgeList, type BonusType } from './bonus-badge';

export interface CasinoData {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  reviewCount?: number;
  welcomeBonus: {
    title: string;
    description: string;
    value?: string;
  };
  bonusTypes: Array<{
    type: BonusType;
    label?: string;
  }>;
  features: string[];
  minDeposit?: number;
  payoutSpeed?: string;
  termsUrl?: string;
  affiliateUrl: string;
  isNew?: boolean;
  isExclusive?: boolean;
  isFeatured?: boolean;
}

interface CasinoCardProps {
  casino: CasinoData;
  rank?: number;
  variant?: 'default' | 'compact' | 'featured';
  showRank?: boolean;
  className?: string;
}

function RatingStars({ rating, size = 'default' }: { rating: number; size?: 'sm' | 'default' }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn(starSize, 'fill-amber-400 text-amber-400')} />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className={cn(starSize, 'text-slate-600')} />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className={cn(starSize, 'fill-amber-400 text-amber-400')} />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn(starSize, 'text-slate-600')} />
      ))}
    </div>
  );
}

export function CasinoCard({
  casino,
  rank,
  variant = 'default',
  showRank = false,
  className,
}: CasinoCardProps) {
  if (variant === 'compact') {
    return (
      <Card variant="elevated" interactive padding="sm" className={cn('group', className)}>
        <div className="flex items-center gap-4">
          {showRank && rank && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 font-bold text-sm text-white">
              {rank}
            </div>
          )}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
            <Image
              src={casino.logo}
              alt={`${casino.name} logo`}
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-white">{casino.name}</h3>
            <div className="mt-0.5 flex items-center gap-2">
              <RatingStars rating={casino.rating} size="sm" />
              <span className="text-slate-400 text-xs">{casino.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-semibold text-amber-400 text-sm">{casino.welcomeBonus.value}</p>
            <Link
              href={casino.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1 text-slate-400 text-xs hover:text-amber-400"
            >
              Claim <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card
        variant="premium"
        padding="none"
        className={cn(
          'group overflow-hidden',
          casino.isFeatured && 'ring-2 ring-amber-500/50',
          className
        )}
      >
        {/* Featured Banner */}
        {casino.isFeatured && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-2 text-center font-semibold text-sm text-white">
            Editor&apos;s Choice
          </div>
        )}

        <div className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left: Logo & Rating */}
            <div className="flex flex-col items-center gap-4 lg:items-start">
              {showRank && rank && (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 font-bold text-white text-xl">
                  #{rank}
                </div>
              )}
              <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-white shadow-lg">
                <Image
                  src={casino.logo}
                  alt={`${casino.name} logo`}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="font-bold text-white text-xl">{casino.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <RatingStars rating={casino.rating} />
                  <span className="font-semibold text-amber-400 text-sm">
                    {casino.rating.toFixed(1)}
                  </span>
                  {casino.reviewCount && (
                    <span className="text-slate-400 text-xs">({casino.reviewCount} reviews)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Middle: Bonus Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                {casino.isNew && <BonusBadge type="new" />}
                {casino.isExclusive && <BonusBadge type="exclusive" />}
                <BonusBadgeList bonuses={casino.bonusTypes} maxDisplay={2} />
              </div>

              <div>
                <p className="font-bold text-2xl text-white">{casino.welcomeBonus.title}</p>
                <p className="mt-1 text-slate-400">{casino.welcomeBonus.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-slate-800 border-t pt-4 md:grid-cols-3">
                {casino.features.slice(0, 3).map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-stretch justify-between gap-4 lg:min-w-[180px] lg:items-end">
              <div className="flex flex-col gap-2">
                <Link
                  href={casino.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  <Button size="lg" fullWidth rightIcon={<ExternalLink className="h-4 w-4" />}>
                    Claim Bonus
                  </Button>
                </Link>
                <Link href={`/review/${casino.slug}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    leftIcon={<Info className="h-4 w-4" />}
                  >
                    Read Review
                  </Button>
                </Link>
              </div>
              {casino.termsUrl && (
                <Link
                  href={casino.termsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-slate-500 text-xs hover:text-slate-400"
                >
                  T&Cs Apply. 18+
                </Link>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      variant="elevated"
      interactive
      padding="none"
      className={cn('group overflow-hidden', className)}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {showRank && rank && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 font-bold text-white">
              {rank}
            </div>
          )}

          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white shadow-md">
            <Image
              src={casino.logo}
              alt={`${casino.name} logo`}
              fill
              className="object-contain p-1"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-lg text-white">{casino.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <RatingStars rating={casino.rating} size="sm" />
                  <span className="font-semibold text-amber-400 text-sm">
                    {casino.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                {casino.isNew && <BonusBadge type="new" size="sm" showIcon={false} />}
                {casino.isExclusive && <BonusBadge type="exclusive" size="sm" showIcon={false} />}
              </div>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-white">{casino.welcomeBonus.title}</p>
              <p className="line-clamp-2 text-slate-400 text-sm">
                {casino.welcomeBonus.description}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {casino.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-slate-300 text-xs"
                >
                  <Check className="h-3 w-3 text-emerald-500" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 border-slate-800 border-t pt-4">
          <Link
            href={casino.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1"
          >
            <Button fullWidth rightIcon={<ExternalLink className="h-4 w-4" />}>
              Claim Bonus
            </Button>
          </Link>
          <Link href={`/review/${casino.slug}`}>
            <Button variant="outline" leftIcon={<Info className="h-4 w-4" />}>
              Review
            </Button>
          </Link>
        </div>

        {casino.termsUrl && (
          <p className="mt-3 text-center text-slate-500 text-xs">
            T&Cs Apply. 18+ | Gamble Responsibly
          </p>
        )}
      </div>
    </Card>
  );
}

export default CasinoCard;
