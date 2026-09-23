'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  Sliders,
  Check,
  Star,
  Feather,
  BookOpen,
} from 'lucide-react';
import { DURATION_PRICES_LKR } from '@/lib/data';

export function Hero() {
  const { openCustomizerWithPlanner } = useStore();
  const [quickDuration, setQuickDuration] = useState<6 | 12>(6);
  const [quickCover, setQuickCover] = useState<'soft' | 'hard'>('hard');

  const scrollToStudio = () => {
    const el = document.getElementById('planner-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToShop = () => {
    const el = document.getElementById('stationery-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const calculatedPreviewPrice =
    (quickDuration === 6 ? DURATION_PRICES_LKR[6] : DURATION_PRICES_LKR[12]) +
    (quickCover === 'hard' ? 400 : 0);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 sm:pb-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Micro Pill Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#141312]/8 text-[11px] font-medium text-[#5C5854] shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#A84A2A]" />
              <span>A/L 2026/27 & 2028 Edition</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#141312]/8 text-[11px] font-medium text-[#5C5854] shadow-xs">
              <div className="flex text-amber-500">
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span>4.9 / 5.0 (840+ Students)</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#141312] leading-[1.08]">
            Plan your dreams <br />
            <span className="italic font-normal text-[#A84A2A]">with quiet clarity.</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-[#5C5854] max-w-xl leading-relaxed">
            Handcrafted 120gsm ink-proof study planners tailored to your ambition. Emboss your name in gold, 
            track past paper scores, and personalize your cover and monthly shine pages with your favorite photos.
          </p>

          {/* Minimalist Estimator Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#141312]/8 shadow-card space-y-3 max-w-md">
            <div className="flex items-center justify-between text-xs font-semibold text-[#141312]">
              <span className="flex items-center gap-1.5 text-[#A84A2A]">
                <Sliders className="w-3.5 h-3.5" />
                Quick Planner Estimator
              </span>
              <span className="font-mono text-sm font-bold text-[#A84A2A]">
                LKR {calculatedPreviewPrice.toLocaleString()}/=
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex bg-[#F3F1EC] p-1 rounded-xl">
                <button
                  onClick={() => setQuickDuration(6)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                    quickDuration === 6 ? 'bg-white text-[#141312] shadow-xs font-semibold' : 'text-[#5C5854]'
                  }`}
                >
                  6 Months
                </button>
                <button
                  onClick={() => setQuickDuration(12)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                    quickDuration === 12 ? 'bg-white text-[#141312] shadow-xs font-semibold' : 'text-[#5C5854]'
                  }`}
                >
                  12 Months
                </button>
              </div>

              <div className="flex bg-[#F3F1EC] p-1 rounded-xl">
                <button
                  onClick={() => setQuickCover('soft')}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                    quickCover === 'soft' ? 'bg-white text-[#141312] shadow-xs font-semibold' : 'text-[#5C5854]'
                  }`}
                >
                  Softcover
                </button>
                <button
                  onClick={() => setQuickCover('hard')}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                    quickCover === 'hard' ? 'bg-white text-[#141312] shadow-xs font-semibold' : 'text-[#5C5854]'
                  }`}
                >
                  Hardcover
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => {
                openCustomizerWithPlanner('al_study');
                scrollToStudio();
              }}
              className="px-7 py-3.5 rounded-full bg-[#141312] text-white font-semibold text-xs sm:text-sm hover:bg-[#A84A2A] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4" />
              <span>Build Your Custom Planner</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToShop}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF9F6] border border-[#141312]/12 text-[#141312] font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center"
            >
              Explore Stationery
            </button>
          </div>

        </div>

        {/* Right Column: Tactile Book Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center gap-5">
          
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] bg-white p-5 rounded-3xl shadow-card border border-[#141312]/8">
            
            {/* Gold Corners if Hardcover */}
            {quickCover === 'hard' && (
              <>
                <div className="corner-gold-tl" />
                <div className="corner-gold-tr" />
                <div className="corner-gold-bl" />
                <div className="corner-gold-br" />
              </>
            )}

            {/* Book Body */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-book bg-[#141312] text-white p-5 flex flex-col justify-between border border-black/30">
              
              {/* Twin Spiral Binding Wire */}
              <div className="absolute left-1.5 top-0 bottom-0 flex flex-col justify-around py-3.5 z-30">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-1.5 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-600 rounded-full shadow-xs -ml-2 border border-zinc-700/50"
                  />
                ))}
              </div>

              {/* Cover Photography */}
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
                alt="Study Planner Cover"
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />

              {/* Top Meta */}
              <div className="relative z-10 flex justify-between items-start pl-3.5">
                <span className="text-[9px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                  {quickDuration} MONTHS A/L
                </span>
                <span className="text-[9px] font-semibold bg-[#D4AF37] text-black px-1.5 py-0.5 rounded shadow-xs">
                  {quickCover === 'hard' ? 'Hardcover' : 'Softcover'}
                </span>
              </div>

              {/* Center Title */}
              <div className="relative z-10 text-center pl-3.5 space-y-1 my-auto">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow">
                  FUTURE DOCTOR
                </h3>
                <p className="text-[10px] text-amber-200/90 tracking-widest font-mono">
                  2027 & 2028 A/L DREAM
                </p>
              </div>

              {/* Bottom Embossed */}
              <div className="relative z-10 flex justify-between items-end pl-3.5 border-t border-white/20 pt-2.5 text-[10px]">
                <div>
                  <span className="text-white/60 block text-[8px]">Embossed Name:</span>
                  <span className="font-semibold text-white">Dr. Sarah</span>
                </div>
                <span className="font-mono font-bold text-amber-300">
                  LKR {calculatedPreviewPrice.toLocaleString()}/=
                </span>
              </div>

            </div>
          </div>

          {/* Micro Feature Highlights */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-[280px] sm:max-w-[320px]">
            <div className="bg-white border border-[#141312]/8 p-3 rounded-2xl shadow-xs flex items-center gap-2.5">
              <Feather className="w-4 h-4 text-[#A84A2A] shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-[#141312] text-[11px] block truncate">12 Shine Pages</span>
                <span className="text-[10px] text-[#5C5854] block truncate">Free Photo Prints</span>
              </div>
            </div>

            <div className="bg-white border border-[#141312]/8 p-3 rounded-2xl shadow-xs flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#3E5A44] shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-[#141312] text-[11px] block truncate">120gsm Paper</span>
                <span className="text-[10px] text-[#5E564F] block truncate">Zero Ink Bleed</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
