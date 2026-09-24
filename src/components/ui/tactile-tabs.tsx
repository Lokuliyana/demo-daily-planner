'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TactileTabItem<T extends string | number> {
  id: T;
  label: string;
  icon?: React.ElementType;
  badge?: string;
  count?: number;
}

interface TactileTabsProps<T extends string | number> {
  tabs: TactileTabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  layoutId?: string;
}

export function TactileTabs<T extends string | number>({
  tabs,
  activeId,
  onChange,
  className,
  size = 'md',
  layoutId = 'tactileActiveTab',
}: TactileTabsProps<T>) {
  const sizeClasses = {
    sm: 'py-1 px-3 text-[11px]',
    md: 'py-2 px-4 text-xs',
    lg: 'py-2.5 px-5 text-sm',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 p-1 bg-[#F3F1EC] rounded-full border border-[#141312]/6 shadow-inner-xs',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        const Icon = tab.icon;

        return (
          <button
            key={String(tab.id)}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer select-none whitespace-nowrap',
              sizeClasses[size],
              isActive
                ? 'text-[#141312]'
                : 'text-[#5C5854] hover:text-[#141312]'
            )}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] -z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            {Icon && <Icon className="w-3.5 h-3.5 text-[#A84A2A] shrink-0" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold',
                  isActive
                    ? 'bg-[#141312]/8 text-[#141312]'
                    : 'bg-black/5 text-[#5C5854]'
                )}
              >
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span className="text-[9px] font-bold bg-[#A84A2A] text-white px-1.5 py-0.2 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
