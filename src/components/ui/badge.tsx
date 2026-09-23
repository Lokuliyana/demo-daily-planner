import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-muted)] text-[var(--primary)] border border-[var(--primary-border)]",
        stamp:
          "bg-transparent text-[var(--primary)] border border-[var(--primary)] font-bold tracking-widest px-2 py-0.5",
        secondary:
          "bg-[var(--surface-subtle)] text-[var(--foreground-muted)] border border-[var(--border)]",
        outline:
          "border border-[var(--border-strong)] text-[var(--foreground)] bg-transparent",
        archival:
          "bg-[var(--secondary)] text-[var(--foreground-muted)] border border-[var(--border)] italic font-serif normal-case tracking-normal",
        success:
          "bg-[var(--success-subtle)] text-[var(--success)] border border-emerald-600/30",
        warning:
          "bg-[var(--warning-subtle)] text-[var(--warning)] border border-amber-600/30",
        danger:
          "bg-[var(--danger-subtle)] text-[var(--danger)] border border-red-600/30",
      },
      size: {
        xs: "px-1.5 py-0.2 text-[10px] rounded-xs",
        sm: "px-2 py-0.5 text-[11px] rounded-xs",
        md: "px-2.5 py-1 text-xs rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
