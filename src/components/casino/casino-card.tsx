"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink, Info, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BonusBadge, BonusBadgeList, type BonusType } from "./bonus-badge";

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
  variant?: "default" | "compact" | "featured";
  showRank?: boolean;
  className?: string;
}

function RatingStars({ rating, size = "default" }: { rating: number; size?: "sm" | "default" }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn(starSize, "fill-amber-400 text-amber-400")} />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className={cn(starSize, "text-slate-600")} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={cn(starSize, "fill-amber-400 text-amber-400")} />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn(starSize, "text-slate-600")} />
      ))}
    </div>
  );
}

export function CasinoCard({
  casino,
  rank,
  variant = "default",
  showRank = false,
  className,
}: CasinoCardProps) {
  if (variant === "compact") {
    return (
      <Card
        variant="elevated"
        interactive
        padding="sm"
        className={cn("group", className)}
      >
        <div className="flex items-center gap-4">
          {showRank && rank && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold text-sm shrink-0">
              {rank}
            </div>
          )}
          <div className="relative w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0">
            <Image
              src={casino.logo}
              alt={`${casino.name} logo`}
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{casino.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <RatingStars rating={casino.rating} size="sm" />
              <span className="text-xs text-slate-400">{casino.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-semibold text-amber-400">{casino.welcomeBonus.value}</p>
            <Link
              href={casino.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400"
            >
              Claim <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card
        variant="premium"
        padding="none"
        className={cn(
          "group overflow-hidden",
          casino.isFeatured && "ring-2 ring-amber-500/50",
          className
        )}
      >
        {/* Featured Banner */}
        {casino.isFeatured && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm font-semibold">
            Editor&apos;s Choice
          </div>
        )}

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Logo & Rating */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              {showRank && rank && (
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold text-xl">
                  #{rank}
                </div>
              )}
              <div className="relative w-24 h-24 rounded-xl bg-white shadow-lg overflow-hidden">
                <Image
                  src={casino.logo}
                  alt={`${casino.name} logo`}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold text-white">{casino.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <RatingStars rating={casino.rating} />
                  <span className="text-sm font-semibold text-amber-400">{casino.rating.toFixed(1)}</span>
                  {casino.reviewCount && (
                    <span className="text-xs text-slate-400">({casino.reviewCount} reviews)</span>
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
                <p className="text-2xl font-bold text-white">{casino.welcomeBonus.title}</p>
                <p className="text-slate-400 mt-1">{casino.welcomeBonus.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                {casino.features.slice(0, 3).map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-stretch lg:items-end justify-between gap-4 lg:min-w-[180px]">
              <div className="flex flex-col gap-2">
                <Link href={casino.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored">
                  <Button size="lg" fullWidth rightIcon={<ExternalLink className="w-4 h-4" />}>
                    Claim Bonus
                  </Button>
                </Link>
                <Link href={`/review/${casino.slug}`}>
                  <Button variant="ghost" size="sm" fullWidth leftIcon={<Info className="w-4 h-4" />}>
                    Read Review
                  </Button>
                </Link>
              </div>
              {casino.termsUrl && (
                <Link
                  href={casino.termsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-400 text-center"
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
      className={cn("group overflow-hidden", className)}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {showRank && rank && (
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold shrink-0">
              {rank}
            </div>
          )}

          <div className="relative w-16 h-16 rounded-xl bg-white shadow-md overflow-hidden shrink-0">
            <Image
              src={casino.logo}
              alt={`${casino.name} logo`}
              fill
              className="object-contain p-1"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-white text-lg">{casino.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <RatingStars rating={casino.rating} size="sm" />
                  <span className="text-sm text-amber-400 font-semibold">{casino.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                {casino.isNew && <BonusBadge type="new" size="sm" showIcon={false} />}
                {casino.isExclusive && <BonusBadge type="exclusive" size="sm" showIcon={false} />}
              </div>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-white">{casino.welcomeBonus.title}</p>
              <p className="text-sm text-slate-400 line-clamp-2">{casino.welcomeBonus.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {casino.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded-md"
                >
                  <Check className="w-3 h-3 text-emerald-500" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800">
          <Link href={casino.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="flex-1">
            <Button fullWidth rightIcon={<ExternalLink className="w-4 h-4" />}>
              Claim Bonus
            </Button>
          </Link>
          <Link href={`/review/${casino.slug}`}>
            <Button variant="outline" leftIcon={<Info className="w-4 h-4" />}>
              Review
            </Button>
          </Link>
        </div>

        {casino.termsUrl && (
          <p className="text-xs text-slate-500 text-center mt-3">
            T&Cs Apply. 18+ | Gamble Responsibly
          </p>
        )}
      </div>
    </Card>
  );
}

export default CasinoCard;
