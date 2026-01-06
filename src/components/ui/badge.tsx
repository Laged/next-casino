import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-amber-500/30 bg-amber-500/20 text-amber-400',
        secondary: 'border border-slate-600 bg-slate-700 text-slate-300',
        success: 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-400',
        warning: 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400',
        danger: 'border border-red-500/30 bg-red-500/20 text-red-400',
        info: 'border border-blue-500/30 bg-blue-500/20 text-blue-400',
        premium: 'border-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        exclusive: 'border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white',
        new: 'border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
        hot: 'border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white',
        vip: 'border-0 bg-gradient-to-r from-yellow-600 to-amber-600 text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, pulse = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), pulse && 'animate-pulse', className)}
        {...props}
      >
        {icon}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
