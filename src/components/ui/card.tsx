import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial Card Component
 * Crisp hairline borders, warm paper background, subtle tactile contact shadow.
 * Preserves concentric geometric math while delivering an authentic newsprint/editorial feel.
 */
export function Card({
  className,
  children,
  elevation = "sm",
  variant = "paper",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  elevation?: "none" | "sm" | "md" | "lg";
  variant?: "paper" | "subtle" | "outline" | "ledger" | "hero";
}) {
  const elevationClasses = {
    none: "",
    sm: "elevation-1",
    md: "elevation-2",
    lg: "elevation-3",
  };

  const variantClasses = {
    paper: "bg-[var(--surface)] border-[var(--border)]",
    subtle: "bg-[var(--surface-subtle)] border-[var(--border)]",
    outline: "bg-transparent border-[var(--border-strong)]",
    ledger: "bg-[var(--surface)] border-[var(--border)]",
    hero: "bg-[var(--surface)] border-2 border-[var(--border-strong)]",
  };

  return (
    <div
      className={cn(
        "rounded-sm border text-[var(--foreground)] overflow-hidden transition-all duration-200",
        variantClasses[variant],
        elevationClasses[elevation],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-5 pb-3", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-serif text-xl font-semibold leading-tight tracking-tight text-[var(--foreground)]",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed text-[var(--foreground-muted)]",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 p-5 pt-3 border-t border-[var(--border)] text-xs text-[var(--foreground-muted)]",
        className
      )}
      {...props}
    />
  );
}

/**
 * Concentric Nested Item
 * Conforms to nested radius math while offering paper inset texture.
 */
export function NestedCardItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xs border border-[var(--border)] bg-[var(--surface-subtle)] p-3.5 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Editorial Pull Quote
 */
export function EditorialPullQuote({
  quote,
  attribution,
  className,
}: {
  quote: string;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative my-4 border-l-2 border-[var(--primary)] pl-4 py-2 bg-[var(--surface-subtle)]/60 pr-4 rounded-r-xs",
        className
      )}
    >
      <blockquote className="font-serif italic text-base sm:text-lg leading-snug text-[var(--foreground)]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution && (
        <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-wider text-[var(--foreground-muted)]">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
