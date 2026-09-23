"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface QuickSelectOption<T extends string | number> {
  label: string;
  value: T;
  description?: string;
  badge?: string;
}

interface QuickSelectProps<T extends string | number> {
  options: QuickSelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  layout?: "grid" | "row";
}

/**
 * Editorial 1-Tap Quick-Select
 * Ergonomics & Aesthetics:
 * - Fitts's law: 1-tap touch target replaces sluggish dropdowns.
 * - Newsprint stamp indicator and crisp hairline borders.
 */
export function QuickSelect<T extends string | number>({
  options,
  value,
  onChange,
  className,
  layout = "grid",
}: QuickSelectProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-3 gap-2.5"
          : "flex flex-wrap gap-2",
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            type="button"
            key={String(opt.value)}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={cn(
              "group relative flex flex-col items-start p-3 text-left rounded-xs border transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--foreground)]",
              isSelected
                ? "border-[var(--primary)] bg-[var(--surface-subtle)] text-[var(--foreground)] shadow-xs ring-1 ring-[var(--primary)]"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            )}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <span
                className={cn(
                  "font-serif text-sm font-medium tracking-tight",
                  isSelected ? "text-[var(--foreground)] font-semibold" : "text-[var(--foreground)]"
                )}
              >
                {opt.label}
              </span>
              {isSelected ? (
                <Check className="h-3.5 w-3.5 text-[var(--primary)] shrink-0" />
              ) : (
                <span className="h-2 w-2 rounded-full border border-[var(--border)] group-hover:border-[var(--foreground-muted)]" />
              )}
            </div>
            {opt.description && (
              <span className="mt-1 font-mono text-[11px] text-[var(--foreground-muted)] line-clamp-1">
                {opt.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
