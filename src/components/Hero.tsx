'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  Star,
  BookOpen,
} from 'lucide-react';
import { DURATION_PRICES_LKR } from '@/lib/data';
import { AmbientFocusPlayer } from '@/components/ui/ambient-focus-player';
import { PaperInkTest } from '@/components/ui/paper-ink-test';
import { Book3DTilt } from '@/components/ui/3d-book-tilt';
import { Button } from '@/components/ui/button';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  ColoredFlower,
  ColoredSparkle,
  ColoredHeart,
  ColoredStar,
  ColoredRibbon,
  ColoredBook,
} from '@/components/ui/colored-icons';

export function Hero() {
  const { openCustomizerWithPlanner } = useStore();
  const [quickDuration, setQuickDuration] = useState<6 | 12>(6);
  const [quickCover, setQuickCover] = useState<'soft' | 'hard'>('hard');

  const calculatedPreviewPrice =
    (quickDuration === 6 ? DURATION_PRICES_LKR[6] : DURATION_PRICES_LKR[12]) +
    (quickCover === 'hard' ? 400 : 0);

  return (
    <section className="px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16 max-w-7xl mx-auto space-y-8">
      
      {/* 1. Cute Pastel Scenic Hero Canvas */}
      <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-gradient-to-br from-[#FFF5F7] via-[#FFF9F2] to-[#F5EEFE] border-2 border-[#FF6B8B]/20 shadow-[0_16px_40px_rgba(255,107,139,0.12)] p-6 sm:p-10 lg:p-12">
        
        {/* Cute Floating Background Elements & Lottie Butterflies */}
        <div className="absolute -top-2 -right-2 sm:top-2 sm:right-4 w-32 h-32 sm:w-44 sm:h-44 opacity-95 pointer-events-none z-0">
          <LottieAnimation src="/animation/Butterfly Lottie Animation.json" speed={0.65} width="100%" height="100%" />
        </div>
        <div className="absolute -bottom-2 -left-2 sm:bottom-2 sm:left-4 w-24 h-24 sm:w-32 sm:h-32 opacity-85 pointer-events-none z-0">
          <LottieAnimation src="/animation/Looping Flower.json" speed={0.6} width="100%" height="100%" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Sweet Playful Typography & Tactile Controls */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Cute Pill Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="pink" className="text-xs px-3.5 py-1.5 shadow-xs flex items-center gap-1.5">
                <ColoredBook size={14} />
                <span>A/L 2026/27 & 2028 Edition</span>
              </Badge>

              <Badge variant="yellow" className="text-xs px-3.5 py-1.5 shadow-xs flex items-center gap-1.5">
                <ColoredStar size={14} />
                <span>4.9 / 5.0 (840+ Happy Besties)</span>
              </Badge>
            </div>

            {/* Bubbly Cute Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#382A2C] leading-[1.15]">
              Your dream study buddy, <br />
              <span className="text-[#FF6B8B] inline-flex items-center gap-2.5">
                <span>crafted with love</span>
                <ColoredHeart size={36} className="inline-block" />
                <ColoredSparkle size={32} className="inline-block" />
              </span>
            </h1>

            {/* Sweet Playful Subtext */}
            <p className="text-sm sm:text-base text-[#6E5C5E] max-w-lg leading-relaxed font-semibold">
              Super cute 120gsm ink-proof study planners! Emboss your cute name in gold, track past paper scores, and personalize your cover with your favorite photos.
            </p>

            {/* Cute Estimator Pill Card */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-[#FF6B8B]/20 shadow-[0_6px_20px_rgba(255,107,139,0.1)] space-y-3 max-w-md">
              <div className="flex items-center justify-between text-xs font-bold text-[#382A2C]">
                <span className="flex items-center gap-1.5 text-[#FF6B8B]">
                  <ColoredRibbon size={16} />
                  <span>Quick Planner Estimator</span>
                </span>
                <span className="font-mono text-base font-extrabold text-[#FF6B8B]">
                  LKR {calculatedPreviewPrice.toLocaleString()}/=
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex bg-[#FFF0F5] p-1 rounded-2xl border border-[#FF6B8B]/15">
                  <button
                    onClick={() => setQuickDuration(6)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      quickDuration === 6
                        ? 'bg-[#FF6B8B] text-white shadow-[0_2px_6px_rgba(255,107,139,0.3)]'
                        : 'text-[#6E5C5E] hover:text-[#FF6B8B]'
                    }`}
                  >
                    <span>6 Months</span>
                  </button>
                  <button
                    onClick={() => setQuickDuration(12)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      quickDuration === 12
                        ? 'bg-[#FF6B8B] text-white shadow-[0_2px_6px_rgba(255,107,139,0.3)]'
                        : 'text-[#6E5C5E] hover:text-[#FF6B8B]'
                    }`}
                  >
                    <span>12 Months</span>
                  </button>
                </div>

                <div className="flex bg-[#FFF0F5] p-1 rounded-2xl border border-[#FF6B8B]/15">
                  <button
                    onClick={() => setQuickCover('soft')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      quickCover === 'soft'
                        ? 'bg-[#FF6B8B] text-white shadow-[0_2px_6px_rgba(255,107,139,0.3)]'
                        : 'text-[#6E5C5E] hover:text-[#FF6B8B]'
                    }`}
                  >
                    <span>Softcover</span>
                  </button>
                  <button
                    onClick={() => setQuickCover('hard')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      quickCover === 'hard'
                        ? 'bg-[#FF6B8B] text-white shadow-[0_2px_6px_rgba(255,107,139,0.3)]'
                        : 'text-[#6E5C5E] hover:text-[#FF6B8B]'
                    }`}
                  >
                    <span>Hardcover</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link href="/studio">
                <Button
                  size="lg"
                  variant="pink"
                  onClick={() => {
                    openCustomizerWithPlanner('al_study');
                  }}
                  className="group w-full sm:w-auto shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create My Cute Planner</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>

              <Link href="/catalog">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <ColoredRibbon size={15} />
                  <span>Explore Marketplace</span>
                </Button>
              </Link>
            </div>

          </div>

          {/* Right Column: 3D Cute Desk Planner Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center gap-4">
            
            <div className="relative w-full max-w-[280px] sm:max-w-[310px] bg-white p-5 rounded-[36px] shadow-[0_16px_36px_rgba(255,107,139,0.18)] border-2 border-[#FF6B8B]/20">
              
              {/* Cute Floating Sticker Badge */}
              <motion.div
                className="absolute -top-3 -right-3 z-30 bg-[#FFD166] text-[#4A3810] border-2 border-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md rotate-6 flex items-center gap-1"
                animate={{ rotate: [6, 12, 6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ColoredSparkle size={13} />
                <span>100% Kawaii!</span>
              </motion.div>

              {/* Gold Corners if Hardcover */}
              {quickCover === 'hard' && (
                <>
                  <div className="corner-gold-tl" />
                  <div className="corner-gold-tr" />
                  <div className="corner-gold-bl" />
                  <div className="corner-gold-br" />
                </>
              )}

              {/* 3D Book Gyroscope */}
              <Book3DTilt>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-book bg-gradient-to-br from-[#382A2C] to-[#201517] text-white p-5 flex flex-col justify-between border-2 border-[#FF6B8B]/30 select-none">
                  
                  {/* Twin Spiral Binding Wire */}
                  <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-3 z-30 pointer-events-none">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-1.5 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-300 rounded-full shadow-xs -ml-2 border border-pink-400/50"
                      />
                    ))}
                  </div>

                  {/* Cute Cover Photography */}
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80"
                    alt="Cute Study Planner Cover"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
                  />

                  {/* Top Cute Meta */}
                  <div className="relative z-10 flex justify-between items-start pl-3">
                    <span className="text-[9px] uppercase font-extrabold tracking-wider bg-[#FF6B8B] text-white px-2 py-0.5 rounded-full shadow-xs">
                      {quickDuration} MONTHS
                    </span>
                    <span className="text-[9px] font-bold bg-[#FFD166] text-[#4A3810] px-2 py-0.5 rounded-full shadow-xs">
                      {quickCover === 'hard' ? 'Hardcover + Gold' : 'Softcover'}
                    </span>
                  </div>

                  {/* Center Title */}
                  <div className="relative z-10 text-center pl-3 space-y-1 my-auto">
                    <h3 className="font-heading text-xl sm:text-2xl font-extrabold tracking-wide text-white drop-shadow">
                      FUTURE DOCTOR 🌸
                    </h3>
                    <p className="text-[10px] text-pink-200 tracking-widest font-mono font-bold">
                      2027 & 2028 A/L DREAM
                    </p>
                  </div>

                  {/* Bottom Embossed */}
                  <div className="relative z-10 flex justify-between items-end pl-3 border-t border-pink-200/30 pt-2.5 text-[10px]">
                    <div>
                      <span className="text-pink-200/80 block text-[8px] font-bold">Embossed Name:</span>
                      <span className="font-extrabold text-white">Dr. Sarah ✨</span>
                    </div>
                    <span className="font-mono font-extrabold text-[#FFD166] text-xs">
                      LKR {calculatedPreviewPrice.toLocaleString()}/=
                    </span>
                  </div>

                </div>
              </Book3DTilt>
            </div>

            {/* Cute Micro Highlights */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[280px] sm:max-w-[310px]">
              <div className="bg-white/90 backdrop-blur-sm border-2 border-[#FF6B8B]/15 p-2.5 rounded-2xl shadow-xs flex items-center gap-2">
                <span className="text-base">📸</span>
                <div className="min-w-0">
                  <span className="font-extrabold text-[#382A2C] text-[11px] block truncate">12 Shine Pages</span>
                  <span className="text-[9px] font-bold text-[#FF6B8B] block truncate">Free Photo Prints ✨</span>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border-2 border-[#FF6B8B]/15 p-2.5 rounded-2xl shadow-xs flex items-center gap-2">
                <span className="text-base">📝</span>
                <div className="min-w-0">
                  <span className="font-extrabold text-[#382A2C] text-[11px] block truncate">120gsm Paper</span>
                  <span className="text-[9px] font-bold text-[#1D7A66] block truncate">Zero Ink Bleed 🌸</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 2. Cute Interactive Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Cozy Lo-Fi Music Player */}
        <AmbientFocusPlayer />

        {/* 120gsm Ink Doodler Test */}
        <PaperInkTest />
      </div>

    </section>
  );
}
