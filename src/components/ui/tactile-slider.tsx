'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TactileSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  unit?: string;
  className?: string;
  marks?: { value: number; label: string }[];
}

export function TactileSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  unit,
  className,
  marks,
}: TactileSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('space-y-2 select-none', className)}>
      {(label || unit) && (
        <div className="flex justify-between items-center text-xs font-semibold text-[#141312]">
          {label && <span>{label}</span>}
          <span className="font-mono text-[#A84A2A] font-bold">
            {value} {unit}
          </span>
        </div>
      )}

      <div className="relative flex items-center h-8">
        {/* Track */}
        <div className="relative w-full h-2 bg-[#F3F1EC] rounded-full overflow-hidden border border-[#141312]/6">
          <motion.div
            className="h-full bg-[#141312] rounded-full"
            style={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Real Range Input Overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {/* Thumb */}
        <motion.div
          className="absolute h-5 w-5 bg-white border-2 border-[#141312] rounded-full shadow-sm pointer-events-none -ml-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ left: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#A84A2A]" />
        </motion.div>
      </div>

      {marks && marks.length > 0 && (
        <div className="flex justify-between text-[10px] font-mono text-[#8E8983] px-1">
          {marks.map((m) => (
            <span
              key={m.value}
              onClick={() => onChange(m.value)}
              className={cn(
                'cursor-pointer hover:text-[#141312] transition-colors',
                m.value === value && 'font-bold text-[#141312]'
              )}
            >
              {m.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
