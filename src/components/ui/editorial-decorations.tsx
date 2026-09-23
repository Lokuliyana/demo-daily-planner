import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial Asterism / Section Break
 * Classic printer's flourish (* * * or §)
 */
export function EditorialDivider({
  symbol = "❦",
  className,
}: {
  symbol?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative my-8 flex items-center justify-center", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--border)]" />
      </div>
      <div className="relative bg-[var(--background)] px-4 text-xs font-serif text-[var(--foreground-muted)] select-none">
        {symbol}
      </div>
    </div>
  );
}

/**
 * Double Hairline Rule (Newspaper Masthead / Ledger styling)
 */
export function DoubleRule({ className }: { className?: string }) {
  return (
    <div className={cn("w-full my-3", className)}>
      <div className="w-full border-t-2 border-[var(--border-strong)]" />
      <div className="w-full border-t border-[var(--border)] mt-[2px]" />
    </div>
  );
}

/**
 * Press Seal / Stamp Badge
 */
export function PressSeal({
  text = "EST. 1894",
  subtitle = "VERIFIED DISPATCH",
  className,
}: {
  text?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center border-2 border-dashed border-[var(--primary)] text-[var(--primary)] p-2.5 rounded-full w-24 h-24 text-center select-none stamp-slant bg-[var(--primary-muted)]/40",
        className
      )}
    >
      <span className="font-mono text-[9px] font-bold uppercase tracking-widest leading-none">
        {subtitle}
      </span>
      <span className="font-serif font-bold text-xs my-0.5 tracking-tight">
        {text}
      </span>
      <span className="font-mono text-[8px] uppercase tracking-wider opacity-80">
        ARCHIVAL
      </span>
    </div>
  );
}
