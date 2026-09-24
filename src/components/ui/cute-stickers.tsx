'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CUTE_STICKERS = [
  { id: 'stk_star', emoji: '⭐', label: 'Sparkle Star', bg: 'bg-[#FFF8E6]' },
  { id: 'stk_heart', emoji: '💖', label: 'Pink Heart', bg: 'bg-[#FFE5EC]' },
  { id: 'stk_flower', emoji: '🌸', label: 'Cherry Blossom', bg: 'bg-[#FFEBF0]' },
  { id: 'stk_cat', emoji: '🐾', label: 'Kitty Paw', bg: 'bg-[#F5EEFE]' },
  { id: 'stk_straw', emoji: '🍓', label: 'Strawberry', bg: 'bg-[#FFEAEF]' },
  { id: 'stk_ribbon', emoji: '🎀', label: 'Sweet Ribbon', bg: 'bg-[#FFF0F5]' },
  { id: 'stk_sparkle', emoji: '✨', label: 'Magic Glint', bg: 'bg-[#E6F9F5]' },
  { id: 'stk_clover', emoji: '🍀', label: 'Lucky Clover', bg: 'bg-[#E8F5E9]' },
];

export function CuteStickerPill({
  emoji,
  label,
  isSelected = false,
  onClick,
}: {
  emoji: string;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all cursor-pointer ${
        isSelected
          ? 'bg-[#FFE5EC] border-[#FF6B8B] text-[#FF6B8B] shadow-[0_3px_0_#FFAAA6]'
          : 'bg-white border-[#FF6B8B]/20 text-[#6E5C5E] hover:border-[#FF6B8B]/50 shadow-xs'
      }`}
    >
      <span className="text-base">{emoji}</span>
      <span>{label}</span>
    </motion.button>
  );
}
