'use client';

import React, { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = 'LKR ',
  suffix = '/=',
  className = '',
}: AnimatedCounterProps) {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, { stiffness: 90, damping: 20 });
  const displayVal = useTransform(springVal, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  return (
    <span className={`font-mono inline-flex items-baseline ${className}`}>
      {prefix && <span>{prefix}</span>}
      <motion.span>{displayVal}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
