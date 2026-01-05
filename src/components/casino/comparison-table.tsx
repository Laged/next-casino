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
        <Check className="w-5 h-5 text-emerald-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      );
    }
    return <span className="text-sm text-white font-medium">{value}</span>;
  };

  return (
    <section className={cn('space-y-6', className)}>
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>}
          {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {featureCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
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
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-slate-900/90 border border-slate-700 rounded-full shadow-lg hover:bg-slate-800 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-slate-900/90 border border-slate-700 rounded-full shadow-lg hover:bg-slate-800 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 pb-4"
        >
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              {/* Casino Headers */}
              <tr>
                <th className="sticky left-0 z-20 bg-slate-950 p-4 w-48 min-w-48" />
                {casinos.map((casino) => (
                  <th
                    key={casino.id}
                    className="p-4 bg-slate-900 border-b border-slate-800 min-w-48"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative w-16 h-16 rounded-xl bg-white shadow-md overflow-hidden">
                        <Image
                          src={casino.logo}
                          alt={`${casino.name} logo`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-white">{casino.name}</h3>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm text-amber-400 font-semibold">
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
                <td className="sticky left-0 z-20 bg-slate-950 p-4 border-b border-slate-800">
                  <span className="font-medium text-white">Welcome Bonus</span>
                </td>
                {casinos.map((casino) => (
                  <td
                    key={casino.id}
                    className="p-4 bg-slate-900/50 border-b border-slate-800 text-center"
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
                  <td className="sticky left-0 z-20 bg-slate-950 p-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-300">{feature.label}</span>
                      {feature.tooltip && (
                        <button
                          className="text-slate-500 hover:text-slate-400"
                          title={feature.tooltip}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                  {casinos.map((casino) => (
                    <td key={casino.id} className="p-4 border-b border-slate-800 text-center">
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
                  <td key={casino.id} className="p-4 bg-slate-900/50">
                    <div className="flex flex-col items-center gap-2">
                      <Link
                        href={casino.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="w-full"
                      >
                        <Button fullWidth rightIcon={<ExternalLink className="w-4 h-4" />}>
                          Visit Casino
                        </Button>
                      </Link>
                      <Link
                        href={`/review/${casino.slug}`}
                        className="text-xs text-slate-400 hover:text-amber-400"
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
      <p className="text-xs text-slate-500 text-center">
        T&Cs apply to all bonuses. 18+ | Gamble responsibly. Feature comparison updated monthly.
      </p>
    </section>
  );
}

export default ComparisonTable;
