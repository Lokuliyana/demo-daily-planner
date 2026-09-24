'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B8B] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:translate-y-0.5 active:shadow-none',
  {
    variants: {
      variant: {
        default:
          'bg-[#FF6B8B] text-white hover:bg-[#FA5274] shadow-[0_4px_0_#E04D6D,0_8px_16px_rgba(255,107,139,0.25)]',
        pink:
          'bg-[#FF6B8B] text-white hover:bg-[#FA5274] shadow-[0_4px_0_#E04D6D,0_8px_16px_rgba(255,107,139,0.25)]',
        yellow:
          'bg-[#FFD166] text-[#4A3810] hover:bg-[#FFC43A] shadow-[0_4px_0_#D9A020,0_8px_16px_rgba(255,209,102,0.3)]',
        mint:
          'bg-[#86E3CE] text-[#1D5E50] hover:bg-[#6FD8C1] shadow-[0_4px_0_#52BFA8,0_8px_16px_rgba(134,227,206,0.3)]',
        lavender:
          'bg-[#D8B4FE] text-[#4C2882] hover:bg-[#C89BFD] shadow-[0_4px_0_#AA76E6,0_8px_16px_rgba(216,180,254,0.3)]',
        outline:
          'border-2 border-[#FF6B8B]/30 bg-white text-[#382A2C] hover:bg-[#FFF5F7] hover:border-[#FF6B8B] shadow-[0_3px_0_#FFE4EC]',
        secondary:
          'bg-[#FFF0F5] text-[#FF6B8B] hover:bg-[#FFE4EC] shadow-[0_3px_0_#FFD4DF]',
        ghost:
          'hover:bg-[#FFF0F5] text-[#382A2C]',
        link: 'text-[#FF6B8B] underline-offset-4 hover:underline font-semibold',
      },
      size: {
        default: 'h-10 px-5 py-2 text-xs sm:text-sm',
        sm: 'h-8 px-3.5 text-xs',
        lg: 'h-12 px-7 text-sm sm:text-base font-extrabold',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
Button.displayName = 'Button';
