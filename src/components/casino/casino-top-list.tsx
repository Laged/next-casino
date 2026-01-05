import * as React from "react";
import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { CasinoCard, type CasinoData } from "./casino-card";
import { Badge } from "@/components/ui/badge";

interface CasinoTopListProps {
  casinos: CasinoData[];
  title?: string;
  subtitle?: string;
  showRankBadges?: boolean;
  variant?: "default" | "compact" | "featured";
  maxItems?: number;
  className?: string;
}

const rankBadges = [
  {
    icon: <Trophy className="w-4 h-4" />,
    label: "Best Overall",
    className: "from-amber-400 to-yellow-500",
  },
  {
    icon: <Medal className="w-4 h-4" />,
    label: "Runner Up",
    className: "from-slate-300 to-slate-400",
  },
  {
    icon: <Award className="w-4 h-4" />,
    label: "Top Pick",
    className: "from-amber-600 to-orange-600",
  },
];

export function CasinoTopList({
  casinos,
  title,
  subtitle,
  showRankBadges = true,
  variant = "default",
  maxItems,
  className,
}: CasinoTopListProps) {
  const displayCasinos = maxItems ? casinos.slice(0, maxItems) : casinos;

  return (
    <section className={cn("space-y-6", className)}>
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          )}
          {subtitle && (
            <p className="text-slate-400 max-w-2xl">{subtitle}</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {displayCasinos.map((casino, index) => (
          <div key={casino.id} className="relative">
            {/* Rank Badge for Top 3 */}
            {showRankBadges && index < 3 && variant !== "compact" && (
              <div className="absolute -top-2 left-4 z-10">
                <Badge
                  variant="premium"
                  size="lg"
                  className={cn(
                    "bg-gradient-to-r shadow-lg",
                    rankBadges[index].className
                  )}
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
              variant={index === 0 && variant === "default" ? "featured" : variant}
              className={index < 3 && showRankBadges && variant !== "compact" ? "mt-4" : ""}
            />
          </div>
        ))}
      </div>

      {maxItems && casinos.length > maxItems && (
        <div className="text-center pt-4">
          <p className="text-sm text-slate-400">
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

export function CasinoQuickList({
  casinos,
  title,
  className,
}: CasinoQuickListProps) {
  return (
    <div className={cn("bg-slate-900 rounded-xl border border-slate-800 p-4", className)}>
      {title && (
        <h3 className="font-bold text-white mb-4">{title}</h3>
      )}
      <ol className="space-y-3">
        {casinos.slice(0, 5).map((casino, index) => (
          <li key={casino.id}>
            <CasinoCard
              casino={casino}
              rank={index + 1}
              showRank
              variant="compact"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default CasinoTopList;
