import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import * as React from 'react';

interface ProsCons {
  pros: string[];
  cons: string[];
}

interface ProsConsProps extends ProsCons {
  title?: string;
  variant?: 'default' | 'cards' | 'compact';
  className?: string;
}

export function ProsCons({ pros, cons, title, variant = 'default', className }: ProsConsProps) {
  if (variant === 'cards') {
    return (
      <section className={cn('space-y-6', className)}>
        {title && <h2 className="font-bold text-2xl text-white md:text-3xl">{title}</h2>}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Pros Card */}
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="border-emerald-500/20 border-b bg-emerald-500/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                  <ThumbsUp className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Pros</h3>
                  <p className="text-emerald-400 text-sm">{pros.length} advantages</p>
                </div>
              </div>
            </div>
            <ul className="space-y-3 p-6">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </span>
                  <span className="text-slate-300">{pro}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Cons Card */}
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="border-red-500/20 border-b bg-red-500/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                  <ThumbsDown className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Cons</h3>
                  <p className="text-red-400 text-sm">{cons.length} disadvantages</p>
                </div>
              </div>
            </div>
            <ul className="space-y-3 p-6">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                    <X className="h-3 w-3 text-red-500" />
                  </span>
                  <span className="text-slate-300">{con}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-col gap-4 sm:flex-row', className)}>
        <div className="flex-1 space-y-2">
          {pros.slice(0, 3).map((pro, index) => (
            <div key={index} className="flex items-center gap-2 text-slate-300 text-sm">
              <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              <span className="line-clamp-1">{pro}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2">
          {cons.slice(0, 3).map((con, index) => (
            <div key={index} className="flex items-center gap-2 text-slate-300 text-sm">
              <X className="h-4 w-4 shrink-0 text-red-500" />
              <span className="line-clamp-1">{con}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default two-column layout
  return (
    <section className={cn('space-y-6', className)}>
      {title && <h2 className="font-bold text-2xl text-white md:text-3xl">{title}</h2>}

      <div className="grid gap-8 md:grid-cols-2">
        {/* Pros Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-emerald-500/30 border-b pb-3">
            <ThumbsUp className="h-6 w-6 text-emerald-500" />
            <h3 className="font-bold text-emerald-400 text-lg">Pros</h3>
          </div>
          <ul className="space-y-3">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check className="h-4 w-4 text-emerald-500" />
                </span>
                <span className="text-slate-300">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-red-500/30 border-b pb-3">
            <ThumbsDown className="h-6 w-6 text-red-500" />
            <h3 className="font-bold text-lg text-red-400">Cons</h3>
          </div>
          <ul className="space-y-3">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                  <X className="h-4 w-4 text-red-500" />
                </span>
                <span className="text-slate-300">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProsCons;
