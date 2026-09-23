import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-150 select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-1 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] border border-black/10 shadow-xs active:translate-y-[1px]",
        secondary:
          "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] border border-[var(--border)] active:translate-y-[1px]",
        outline:
          "border border-[var(--foreground)] bg-transparent hover:bg-[var(--surface-subtle)] text-[var(--foreground)] active:translate-y-[1px]",
        ghost:
          "bg-transparent hover:bg-[var(--surface-subtle)] text-[var(--foreground)]",
        stamp:
          "font-mono uppercase tracking-wider text-xs border border-dashed border-[var(--primary)] text-[var(--primary)] bg-[var(--primary-muted)] hover:bg-[var(--primary)] hover:text-white transition-colors",
        paper:
          "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] elevation-1 hover:border-[var(--foreground-muted)] active:translate-y-[1px]",
        danger:
          "bg-[var(--danger)] text-white hover:opacity-90 border border-black/10",
      },
      size: {
        sm: "h-7 rounded-sm px-2.5 text-xs font-medium",
        md: "h-9 rounded-sm px-4 text-sm",
        lg: "h-11 rounded-sm px-6 text-base font-medium",
        icon: "h-8 w-8 rounded-sm p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
