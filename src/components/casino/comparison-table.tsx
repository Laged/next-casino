'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronLeft, ChevronRight, ExternalLink, Info, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import type { CasinoData } from './casino-card';

interface ComparisonFeature {
  id: string;
  label: string;
  category: string;
  tooltip?: string;
}

interface CasinoComparisonData extends CasinoData {
  comparisonData: {
    [featureId: string]: boolean | string | number;
  };
}

interface ComparisonTableProps {
  casinos: CasinoComparisonData[];
  features: ComparisonFeature[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const featureCategories = [
  { id: 'general', label: 'General' },
  { id: 'bonuses', label: 'Bonuses' },
  { id: 'payments', label: 'Payments' },
  { id: 'games', label: 'Games' },
  { id: 'support', label: 'Support' },
];

export function ComparisonTable({
  casinos,
  features,
  title,
  subtitle,
  className,
}: ComparisonTableProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('general');

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredFeatures = features.filter((f) => f.category === activeCategory);

  const renderValue = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-emerald-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      );
    }
    return <span className="font-medium text-sm text-white">{value}</span>;
  };

  return (
    <section className={cn('space-y-6', className)}>
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && <h2 className="font-bold text-2xl text-white md:text-3xl">{title}</h2>}
          {subtitle && <p className="max-w-2xl text-slate-400">{subtitle}</p>}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {featureCategories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              'rounded-lg px-4 py-2 font-medium text-sm transition-colors',
              activeCategory === category.id
                ? 'bg-amber-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="relative">
        {/* Scroll Buttons */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="-translate-y-1/2 absolute top-1/2 left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 shadow-lg transition-colors hover:bg-slate-800"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="-translate-y-1/2 absolute top-1/2 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 shadow-lg transition-colors hover:bg-slate-800"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 overflow-x-auto pb-4"
        >
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              {/* Casino Headers */}
              <tr>
                <th className="sticky left-0 z-20 w-48 min-w-48 bg-slate-950 p-4" />
                {casinos.map((casino) => (
                  <th
                    key={casino.id}
                    className="min-w-48 border-slate-800 border-b bg-slate-900 p-4"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white shadow-md">
                        <Image
                          src={casino.logo}
                          alt={`${casino.name} logo`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-white">{casino.name}</h3>
                        <div className="mt-1 flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-amber-400 text-sm">
                            {casino.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      {casino.isExclusive && (
                        <Badge variant="exclusive" size="sm">
                          Exclusive
                        </Badge>
                      )}
                    </div>
                  </th>
                ))}
              </tr>

              {/* Welcome Bonus Row */}
              <tr>
                <td className="sticky left-0 z-20 border-slate-800 border-b bg-slate-950 p-4">
                  <span className="font-medium text-white">Welcome Bonus</span>
                </td>
                {casinos.map((casino) => (
                  <td
                    key={casino.id}
                    className="border-slate-800 border-b bg-slate-900/50 p-4 text-center"
                  >
                    <div className="font-bold text-amber-400">{casino.welcomeBonus.title}</div>
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredFeatures.map((feature, index) => (
                <tr
                  key={feature.id}
                  className={cn(index % 2 === 0 ? 'bg-slate-900/30' : 'bg-transparent')}
                >
                  <td className="sticky left-0 z-20 border-slate-800 border-b bg-slate-950 p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-300">{feature.label}</span>
                      {feature.tooltip && (
                        <button
                          type="button"
                          className="text-slate-500 hover:text-slate-400"
                          title={feature.tooltip}
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                  {casinos.map((casino) => (
                    <td key={casino.id} className="border-slate-800 border-b p-4 text-center">
                      <div className="flex items-center justify-center">
                        {renderValue(casino.comparisonData[feature.id])}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

            <tfoot>
              {/* CTA Row */}
              <tr>
                <td className="sticky left-0 z-20 bg-slate-950 p-4" />
                {casinos.map((casino) => (
                  <td key={casino.id} className="bg-slate-900/50 p-4">
                    <div className="flex flex-col items-center gap-2">
                      <Link
                        href={casino.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="w-full"
                      >
                        <Button fullWidth rightIcon={<ExternalLink className="h-4 w-4" />}>
                          Visit Casino
                        </Button>
                      </Link>
                      <Link
                        href={`/review/${casino.slug}`}
                        className="text-slate-400 text-xs hover:text-amber-400"
                      >
                        Read Full Review
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-slate-500 text-xs">
        T&Cs apply to all bonuses. 18+ | Gamble responsibly. Feature comparison updated monthly.
      </p>
    </section>
  );
}

export default ComparisonTable;
