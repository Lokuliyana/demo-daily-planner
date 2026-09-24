'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LottieAnimation } from '@/components/ui/lottie-animation';

type PenType = 'fountain' | 'highlighter' | 'gel';

export function PaperInkTest({ className }: { className?: string }) {
  const [selectedPen, setSelectedPen] = useState<PenType>('fountain');

  const penStyles: Record<
    PenType,
    {
      name: string;
      emoji: string;
      color: string;
      bleedScore: string;
      inkSvg: string;
    }
  > = {
    fountain: {
      name: 'Fountain Pen',
      emoji: '✒️',
      color: '#4A3E3D',
      bleedScore: 'Zero Bleed! 🌸',
      inkSvg:
        'M 15 30 Q 60 10 110 32 T 210 25 T 310 35 T 410 22',
    },
    highlighter: {
      name: 'Pastel Highlighter',
      emoji: '🖍️',
      color: '#FFB7B2',
      bleedScore: 'Super Crisp! ✨',
      inkSvg:
        'M 15 30 Q 70 28 140 30 T 280 29 T 410 31',
    },
    gel: {
      name: 'Strawberry Gel Pen',
      emoji: '🍓',
      color: '#FF6B8B',
      bleedScore: 'Instant Dry 💖',
      inkSvg:
        'M 15 30 Q 80 15 160 35 T 300 20 T 410 30',
    },
  };

  const current = penStyles[selectedPen];

  return (
    <div
      className={`relative bg-gradient-to-br from-[#FFFDF9] to-[#FFF5F7] border-2 border-[#FF6B8B]/20 p-4 sm:p-5 rounded-3xl shadow-[0_8px_24px_rgba(255,107,139,0.12)] ${className || ''}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-2xl bg-[#E6F9F5] border border-[#86E3CE]/40 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
            <LottieAnimation src="/animation/Liquid Water Drop.json" speed={0.65} width={38} height={38} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-[#382A2C] leading-tight">
              120gsm Ink Proof Test ✨
            </h4>
            <span className="text-[10px] font-semibold text-[#8E797B] block">
              Fountain Pen & Marker Safe
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold bg-[#E6F9F5] text-[#1D7A66] px-2.5 py-1 rounded-full border border-[#86E3CE]/30">
          {current.bleedScore}
        </span>
      </div>

      {/* Pen Selector Chips */}
      <div className="flex gap-1.5 p-1 bg-[#FFE8ED]/50 border border-[#FF6B8B]/10 rounded-2xl mb-3">
        {(['fountain', 'highlighter', 'gel'] as PenType[]).map((pen) => {
          const isSelected = selectedPen === pen;
          const p = penStyles[pen];
          return (
            <button
              key={pen}
              onClick={() => setSelectedPen(pen)}
              className={`relative flex-1 py-1.5 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                isSelected ? 'text-[#FF6B8B]' : 'text-[#8E797B] hover:text-[#382A2C]'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCutePenPill"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_6px_rgba(255,107,139,0.15)] -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span>{p.emoji}</span>
              <span className="truncate">{p.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Cute Paper Canvas Simulator with Heart Grid */}
      <div className="relative h-16 sm:h-20 bg-white rounded-2xl border border-[#FF6B8B]/15 p-3 overflow-hidden flex flex-col justify-center shadow-inner-xs">
        {/* Soft Polka Dot Texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FF6B8B 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Animated Ink Stroke */}
        <div className="relative z-10 w-full h-full flex items-center">
          <svg className="w-full h-12 overflow-visible" viewBox="0 0 420 50">
            <motion.path
              key={selectedPen}
              d={current.inkSvg}
              fill="none"
              stroke={current.color}
              strokeWidth={selectedPen === 'highlighter' ? 14 : selectedPen === 'fountain' ? 3.5 : 2}
              strokeOpacity={selectedPen === 'highlighter' ? 0.45 : 0.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </svg>
        </div>

        <div className="absolute bottom-1 right-2 flex items-center gap-1 text-[8px] font-bold text-[#FF6B8B]">
          <span>🌸 100% Bleed-Proof</span>
        </div>
      </div>
    </div>
  );
}
