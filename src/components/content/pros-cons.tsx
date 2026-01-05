import * as React from "react";
import { Check, X, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ProsCons {
  pros: string[];
  cons: string[];
}

interface ProsConsProps extends ProsCons {
  title?: string;
  variant?: "default" | "cards" | "compact";
  className?: string;
}

export function ProsCons({
  pros,
  cons,
  title,
  variant = "default",
  className,
}: ProsConsProps) {
  if (variant === "cards") {
    return (
      <section className={cn("space-y-6", className)}>
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pros Card */}
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20">
                  <ThumbsUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Pros</h3>
                  <p className="text-sm text-emerald-400">{pros.length} advantages</p>
                </div>
              </div>
            </div>
            <ul className="p-6 space-y-3">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </span>
                  <span className="text-slate-300">{pro}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Cons Card */}
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20">
                  <ThumbsDown className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Cons</h3>
                  <p className="text-sm text-red-400">{cons.length} disadvantages</p>
                </div>
              </div>
            </div>
            <ul className="p-6 space-y-3">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-500" />
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

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-col sm:flex-row gap-4", className)}>
        <div className="flex-1 space-y-2">
          {pros.slice(0, 3).map((pro, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="line-clamp-1">{pro}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2">
          {cons.slice(0, 3).map((con, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <X className="w-4 h-4 text-red-500 shrink-0" />
              <span className="line-clamp-1">{con}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default two-column layout
  return (
    <section className={cn("space-y-6", className)}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pros Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-emerald-500/30">
            <ThumbsUp className="w-6 h-6 text-emerald-500" />
            <h3 className="text-lg font-bold text-emerald-400">Pros</h3>
          </div>
          <ul className="space-y-3">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                </span>
                <span className="text-slate-300">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-red-500/30">
            <ThumbsDown className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-bold text-red-400">Cons</h3>
          </div>
          <ul className="space-y-3">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-500" />
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
