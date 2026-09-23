import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  mono?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, hint, error, mono = false, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs uppercase tracking-wider text-[var(--foreground-muted)]">
              {label}
            </label>
            {hint && (
              <span className="font-mono text-[10px] text-[var(--foreground-subtle)]">
                {hint}
              </span>
            )}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-xs border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm shadow-xs transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-[var(--foreground-subtle)]",
            "focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            mono && "font-mono text-xs",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="font-mono text-[11px] text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string }
>(({ className, label, hint, ...props }, ref) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs uppercase tracking-wider text-[var(--foreground-muted)]">
            {label}
          </label>
          {hint && (
            <span className="font-mono text-[10px] text-[var(--foreground-subtle)]">
              {hint}
            </span>
          )}
        </div>
      )}
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xs border border-[var(--border)] bg-[var(--surface)] p-3 text-sm shadow-xs transition-colors",
          "placeholder:text-[var(--foreground-subtle)]",
          "focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)]",
          "disabled:cursor-not-allowed disabled:opacity-50 font-serif leading-relaxed",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";
