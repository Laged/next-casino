import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Gift, Zap, Star, Percent, Coins, Trophy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const bonusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap",
  {
    variants: {
      type: {
        welcome: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
        noDeposit: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        freeSpins: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
        cashback: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
        exclusive: "bg-gradient-to-r from-yellow-500 to-amber-500 text-black",
        vip: "bg-gradient-to-r from-slate-700 to-slate-600 text-amber-400 border border-amber-500/50",
        limited: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
        new: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      type: "welcome",
      size: "default",
    },
  }
);

export type BonusType =
  | "welcome"
  | "noDeposit"
  | "freeSpins"
  | "cashback"
  | "exclusive"
  | "vip"
  | "limited"
  | "new";

const bonusIcons: Record<BonusType, React.ReactNode> = {
  welcome: <Gift className="w-3 h-3" />,
  noDeposit: <Coins className="w-3 h-3" />,
  freeSpins: <Zap className="w-3 h-3" />,
  cashback: <Percent className="w-3 h-3" />,
  exclusive: <Star className="w-3 h-3" />,
  vip: <Trophy className="w-3 h-3" />,
  limited: <Clock className="w-3 h-3" />,
  new: <Zap className="w-3 h-3" />,
};

const bonusLabels: Record<BonusType, string> = {
  welcome: "Welcome Bonus",
  noDeposit: "No Deposit",
  freeSpins: "Free Spins",
  cashback: "Cashback",
  exclusive: "Exclusive",
  vip: "VIP",
  limited: "Limited Time",
  new: "New",
};

export interface BonusBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "type">,
    VariantProps<typeof bonusBadgeVariants> {
  type: BonusType;
  showIcon?: boolean;
  customLabel?: string;
  pulse?: boolean;
}

export function BonusBadge({
  className,
  type,
  size,
  showIcon = true,
  customLabel,
  pulse = false,
  ...props
}: BonusBadgeProps) {
  return (
    <span
      className={cn(
        bonusBadgeVariants({ type, size }),
        pulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {showIcon && bonusIcons[type]}
      {customLabel || bonusLabels[type]}
    </span>
  );
}

// Component to display multiple bonus badges
interface BonusBadgeListProps {
  bonuses: Array<{
    type: BonusType;
    label?: string;
  }>;
  size?: VariantProps<typeof bonusBadgeVariants>["size"];
  className?: string;
  maxDisplay?: number;
}

export function BonusBadgeList({
  bonuses,
  size = "default",
  className,
  maxDisplay = 3,
}: BonusBadgeListProps) {
  const displayBonuses = bonuses.slice(0, maxDisplay);
  const remaining = bonuses.length - maxDisplay;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {displayBonuses.map((bonus, index) => (
        <BonusBadge
          key={`${bonus.type}-${index}`}
          type={bonus.type}
          size={size}
          customLabel={bonus.label}
        />
      ))}
      {remaining > 0 && (
        <span className="px-2 py-0.5 text-xs font-medium text-slate-400 bg-slate-800 rounded-full">
          +{remaining} more
        </span>
      )}
    </div>
  );
}

export { bonusBadgeVariants };
