import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Award, Medal, Trophy } from 'lucide-react';
import * as React from 'react';
import { CasinoCard, type CasinoData } from './casino-card';

interface CasinoTopListProps {
  casinos: CasinoData[];
  title?: string;
  subtitle?: string;
  showRankBadges?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  maxItems?: number;
  className?: string;
}

const rankBadges = [
  {
    icon: <Trophy className="h-4 w-4" />,
    label: 'Best Overall',
    className: 'from-amber-400 to-yellow-500',
  },
  {
    icon: <Medal className="h-4 w-4" />,
    label: 'Runner Up',
    className: 'from-slate-300 to-slate-400',
  },
  {
    icon: <Award className="h-4 w-4" />,
    label: 'Top Pick',
    className: 'from-amber-600 to-orange-600',
  },
];

export function CasinoTopList({
  casinos,
  title,
  subtitle,
  showRankBadges = true,
  variant = 'default',
  maxItems,
  className,
}: CasinoTopListProps) {
  const displayCasinos = maxItems ? casinos.slice(0, maxItems) : casinos;

  return (
    <section className={cn('space-y-6', className)}>
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && <h2 className="font-bold text-2xl text-white md:text-3xl">{title}</h2>}
          {subtitle && <p className="max-w-2xl text-slate-400">{subtitle}</p>}
        </div>
      )}

      <div className="space-y-4">
        {displayCasinos.map((casino, index) => (
          <div key={casino.id} className="relative">
            {/* Rank Badge for Top 3 */}
            {showRankBadges && index < 3 && variant !== 'compact' && (
              <div className="-top-2 absolute left-4 z-10">
                <Badge
                  variant="premium"
                  size="lg"
                  className={cn('bg-gradient-to-r shadow-lg', rankBadges[index].className)}
                  icon={rankBadges[index].icon}
                >
                  {rankBadges[index].label}
                </Badge>
              </div>
            )}

            <CasinoCard
              casino={casino}
              rank={index + 1}
              showRank
              variant={index === 0 && variant === 'default' ? 'featured' : variant}
              className={index < 3 && showRankBadges && variant !== 'compact' ? 'mt-4' : ''}
            />
          </div>
        ))}
      </div>

      {maxItems && casinos.length > maxItems && (
        <div className="pt-4 text-center">
          <p className="text-slate-400 text-sm">
            Showing {maxItems} of {casinos.length} casinos
          </p>
        </div>
      )}
    </section>
  );
}

// Numbered list variant for sidebar
interface CasinoQuickListProps {
  casinos: CasinoData[];
  title?: string;
  className?: string;
}

export function CasinoQuickList({ casinos, title, className }: CasinoQuickListProps) {
  return (
    <div className={cn('rounded-xl border border-slate-800 bg-slate-900 p-4', className)}>
      {title && <h3 className="mb-4 font-bold text-white">{title}</h3>}
      <ol className="space-y-3">
        {casinos.slice(0, 5).map((casino, index) => (
          <li key={casino.id}>
            <CasinoCard casino={casino} rank={index + 1} showRank variant="compact" />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default CasinoTopList;
