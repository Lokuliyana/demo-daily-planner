import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely with tailwind-merge and clsx.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates mathematical concentric inner radius:
 * Inner Radius = Math.max(0, Outer Radius - Padding)
 * Follows modern-ui-specialist geometric nesting guidelines.
 */
export function calculateInnerRadius(outerRadiusPx: number, paddingPx: number): number {
  return Math.max(0, outerRadiusPx - paddingPx);
}
