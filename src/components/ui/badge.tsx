import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-colors select-none shadow-xs',
  {
    variants: {
      variant: {
        default: 'bg-[#FF6B8B] text-white',
        pink: 'bg-[#FFE5EC] text-[#FF6B8B] border border-[#FF6B8B]/25',
        mint: 'bg-[#E6F9F5] text-[#1D7A66] border border-[#86E3CE]/40',
        yellow: 'bg-[#FFF8E6] text-[#A67100] border border-[#FFD166]/40',
        lavender: 'bg-[#F5EEFE] text-[#6B32B3] border border-[#D8B4FE]/40',
        terracotta: 'bg-[#FFE8ED] text-[#E04D6D] border border-[#E04D6D]/30',
        sage: 'bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]/40',
        secondary: 'bg-[#FFF5F7] text-[#6E5C5E] border border-[#FF6B8B]/15',
        outline: 'border-2 border-[#FF6B8B]/30 text-[#FF6B8B] bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
