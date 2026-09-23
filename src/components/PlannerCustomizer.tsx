'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  PlannerType,
  CoverType,
  DurationMonths,
} from '@/lib/types';
import {
  COVER_THEMES,
  DURATION_PRICES_LKR,
  HARDCOVER_ADDON_PRICE_LKR,
  DAILY_PLANNER_PRICES_LKR,
  AL_STUDY_TRACKERS,
  YEAR_PLANNER_TRACKERS,
  DAILY_PLANNER_TRACKERS,
  ADDONS_PRICING_LKR,
} from '@/lib/data';
import {
  Sparkles,
  Check,
  BookOpen,
  Calendar,
  Layers,
  Palette,
  Type,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Eye,
  X,
  FileText,
  Clock,
  Award,
} from 'lucide-react';

export function PlannerCustomizer() {
  const {
    plannerConfig,
    setPlannerConfig,
    activeStep,
    setActiveStep,
    addCurrentCustomPlannerToCart,
    setIsCartOpen,
  } = useStore();

  const [customPhotoInput, setCustomPhotoInput] = useState('');
  const [photoMode, setPhotoMode] = useState<'preset' | 'upload'>('preset');
  const [showInnerSheetsModal, setShowInnerSheetsModal] = useState(false);
  const [activeSpreadTab, setActiveSpreadTab] = useState<'past_papers' | 'daily_spread' | 'shine_page' | 'vision_board'>('past_papers');

  const handleCategorySelect = (type: PlannerType) => {
    setPlannerConfig((prev) => ({
      ...prev,
      plannerType: type,
      coverTitle:
        type === 'al_study'
          ? 'MY STUDY PLANNER'
          : type === 'year_planner'
          ? 'MY 2027 YEAR PLANNER'
          : 'MY DAILY PLANNER',
      coverSubtitle:
        type === 'al_study'
          ? '2026 / 2027 A/L DREAM JOURNEY'
          : type === 'year_planner'
          ? 'EVERY PAGE IS A STEP CLOSER'
          : 'INTENTIONAL DAILY FOCUS',
      selectedThemeId:
        type === 'al_study'
          ? 'theme_future_dr'
          : type === 'year_planner'
          ? 'theme_cozy_cat'
          : 'theme_midnight_desk',
    }));
  };

  const currentTheme =
    COVER_THEMES.find((t) => t.id === plannerConfig.selectedThemeId) || COVER_THEMES[0];

  const steps = [
    { num: 1, title: 'Category', icon: BookOpen },
    { num: 2, title: 'Duration', icon: Calendar },
    { num: 3, title: 'Cover & Finish', icon: Layers },
    { num: 4, title: 'Personalization', icon: Palette },
    { num: 5, title: 'Included Trackers', icon: FileText },
    { num: 6, title: 'Optional Add-ons', icon: Sparkles },
  ];

  return (
    <section id="planner-studio" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#24211E]/8 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm washi-terracotta text-xs font-bold uppercase tracking-wider -rotate-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C26D4A]" />
              <span>✦ THE ARTISAN DESK STUDIO</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24211E]">
              <span className="highlighter-underline">Handcraft Your Study Planner</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#635B53] max-w-xl leading-relaxed font-normal">
              Synchronized 2-column workbench. Configure your duration, finish, embossed gold name, and trackers with real-time tactile preview.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#24211E]/10 shadow-sm text-xs font-semibold text-[#635B53]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Artisan Workshop Active</span>
          </div>
        </div>

        {/* Tactile Step Progression Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = activeStep === s.num;
            const isCompleted = activeStep > s.num;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 select-none ${
                  isActive
                    ? 'bg-[#C26D4A] text-white shadow-[0_4px_14px_rgba(194,109,74,0.35)] -translate-y-0.5'
                    : isCompleted
                    ? 'bg-[#6E8574]/15 text-[#304836] border border-[#6E8574]/30 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-0.5'
                    : 'bg-white text-[#635B53] border border-[#24211E]/10 hover:border-[#24211E]/20 hover:text-[#24211E] shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-0.5'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-[#304836]" />
                ) : (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-white/25' : 'bg-black/8'}`}>
                    {s.num}
                  </span>
                )}
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Synchronized Tactile Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sticky Tactile Live Mockup */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <div className="tactile-card p-6 sm:p-7 space-y-5 relative">
              
              {/* Top Header of Mockup Tile */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#635B53] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Tactile Live Desk Mockup
                </span>
                <span className="text-[11px] font-bold text-[#304836] bg-[#6E8574]/15 border border-[#6E8574]/30 px-2.5 py-0.5 rounded-full">
                  {plannerConfig.coverType === 'hardcover_corners'
                    ? '✨ Hardcover + Gold Corners'
                    : '📄 Softcover Laminated'}
                </span>
              </div>

              {/* Physical Planner Visual Shell */}
              <div className="relative aspect-[3/4] max-w-[280px] sm:max-w-[310px] mx-auto rounded-2xl overflow-hidden shadow-book bg-[#1A1816] text-white p-5 flex flex-col justify-between border border-black/20 transition-all duration-300">
                
                {/* Gold Metal Corner Accents if Hardcover */}
                {plannerConfig.coverType === 'hardcover_corners' && (
                  <>
                    <div className="corner-gold-tl" />
                    <div className="corner-gold-tr" />
                    <div className="corner-gold-bl" />
                    <div className="corner-gold-br" />
                  </>
                )}

                {/* Spiral Ring Binding Mockup */}
                <div className="absolute left-1.5 top-0 bottom-0 flex flex-col justify-around py-3 z-30">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-1.5 bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-500 rounded-full shadow-sm -ml-2 border border-zinc-600/40"
                    />
                  ))}
                </div>

                {/* Background Artwork Theme */}
                <img
                  src={plannerConfig.customPhotoUrl || currentTheme.imageUrl}
                  alt={currentTheme.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity"
                />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-between items-start pl-4">
                  <span className="text-[9px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
                    {plannerConfig.plannerType === 'al_study'
                      ? `${plannerConfig.durationMonths} MONTHS A/L`
                      : plannerConfig.plannerType === 'year_planner'
                      ? '12 MONTHS LIFE'
                      : `${plannerConfig.dailyPageCount || 200} DAILY PAGES`}
                  </span>
                  <span className="text-[9px] font-semibold bg-[#D4AF37] text-black px-1.5 py-0.5 rounded shadow-sm">
                    120gsm Paper
                  </span>
                </div>

                {/* Center Title & Subtitle */}
                <div className="relative z-10 text-center pl-4 space-y-1 my-auto">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow-md">
                    {plannerConfig.coverTitle || 'MY STUDY PLANNER'}
                  </h3>
                  <p className="text-[10px] text-amber-200/90 tracking-widest font-mono uppercase">
                    {plannerConfig.coverSubtitle || '2026 / 2027 A/L'}
                  </p>
                </div>

                {/* Bottom Embossed Gold Foil Typography */}
                <div className="relative z-10 flex justify-between items-end pl-4 border-t border-white/20 pt-2.5 text-[10px]">
                  <div>
                    <span className="text-white/60 block text-[8px] uppercase tracking-wider">
                      Gold Foil Emboss:
                    </span>
                    <span className="gold-foil-text text-sm font-serif block truncate max-w-[140px]">
                      {plannerConfig.customName || 'Nethmi Sandeepani'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-white/60 block text-[8px]">Dynamic Price:</span>
                    <span className="font-mono font-bold text-amber-300 text-xs">
                      LKR {plannerConfig.calculatedPriceLKR.toLocaleString()}/=
                    </span>
                  </div>
                </div>
              </div>

              {/* Total & Preview Inner Sheets Trigger */}
              <div className="pt-3 border-t border-[#24211E]/8 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-[#635B53] block">Estimated Total:</span>
                  <span className="font-mono text-lg font-bold text-[#C26D4A]">
                    Total: LKR {plannerConfig.calculatedPriceLKR.toLocaleString()}/=
                  </span>
                </div>

                <button
                  onClick={() => setShowInnerSheetsModal(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#FAF6F0] hover:bg-[#24211E]/5 border border-[#24211E]/10 text-xs font-bold text-[#24211E] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C26D4A]" />
                  <span>Preview Inner 120gsm Sheets</span>
                </button>
              </div>

              {/* Quick Add To Cart from Mockup */}
              <button
                onClick={() => {
                  addCurrentCustomPlannerToCart();
                  setIsCartOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-sm shadow-[0_4px_14px_rgba(194,109,74,0.35)] hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>🛍️ Add Custom Planner to Cart</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Physical Stacked Stationery Sheets */}
          <div className="lg:col-span-7 paper-stack p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-[0_14px_35px_rgba(0,0,0,0.06)] bg-white space-y-6 relative">
            
            {/* STEP 1: CATEGORY */}
            {activeStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C26D4A] block">
                    Step 1 of 6
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#24211E] mt-0.5">
                    Select Planner Category
                  </h2>
                  <p className="text-xs text-[#635B53]">
                    Choose the layout foundation crafted for your revision schedule or daily work.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* A/L Study Option */}
                  <div
                    onClick={() => handleCategorySelect('al_study')}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none active:scale-95 ${
                      plannerConfig.plannerType === 'al_study'
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_14px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        plannerConfig.plannerType === 'al_study' ? 'border-[#C26D4A] bg-[#C26D4A]' : 'border-zinc-300'
                      }`}>
                        {plannerConfig.plannerType === 'al_study' && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#24211E] flex items-center gap-1.5">
                          <span>📚</span> A/L Study Planner (4–12 Months)
                        </span>
                        <span className="washi-terracotta px-2 py-0.5 rounded text-[10px] font-bold text-[#C26D4A] -rotate-1">
                          Most Popular
                        </span>
                      </div>
                      <p className="text-xs text-[#635B53] mt-1.5 leading-relaxed">
                        Includes MCQ/SEQ 2015-2025 past paper checklists, daily revision hour logs, model paper score charts, and monthly shine pages.
                      </p>
                    </div>
                  </div>

                  {/* Full Year Option */}
                  <div
                    onClick={() => handleCategorySelect('year_planner')}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none active:scale-95 ${
                      plannerConfig.plannerType === 'year_planner'
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_14px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        plannerConfig.plannerType === 'year_planner' ? 'border-[#C26D4A] bg-[#C26D4A]' : 'border-zinc-300'
                      }`}>
                        {plannerConfig.plannerType === 'year_planner' && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#24211E] flex items-center gap-1.5">
                          <span>🗓️</span> Full Year 2027 Life & Goal Planner (12 Months)
                        </span>
                        <span className="washi-sage px-2 py-0.5 rounded text-[10px] font-bold">
                          Full Year
                        </span>
                      </div>
                      <p className="text-xs text-[#635B53] mt-1.5 leading-relaxed">
                        Full 52 weekly spreads, 12 custom photo monthly dividers, habit & budget logs, reading list, and wellness trackers.
                      </p>
                    </div>
                  </div>

                  {/* Daily Tracker Option */}
                  <div
                    onClick={() => handleCategorySelect('daily_planner')}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none active:scale-95 ${
                      plannerConfig.plannerType === 'daily_planner'
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_14px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        plannerConfig.plannerType === 'daily_planner' ? 'border-[#C26D4A] bg-[#C26D4A]' : 'border-zinc-300'
                      }`}>
                        {plannerConfig.plannerType === 'daily_planner' && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#24211E] flex items-center gap-1.5">
                          <span>📋</span> Daily Tracker & Task Notepad (100–300 Pages)
                        </span>
                        <span className="bg-[#FAF6F0] px-2 py-0.5 rounded text-[10px] font-bold text-[#635B53]">
                          Flexible
                        </span>
                      </div>
                      <p className="text-xs text-[#635B53] mt-1.5 leading-relaxed">
                        Hourly time-blocking matrix (6am–11pm), prioritized task list, hydration and daily reflections.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#24211E]/8">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-2.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <span>Next: Select Duration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DURATION (MONTHS) */}
            {activeStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C26D4A] block">
                    Step 2 of 6
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#24211E] mt-0.5">
                    Choose Duration (Months)
                  </h2>
                  <p className="text-xs text-[#635B53]">
                    Select how many months of study planning or page sheets you require.
                  </p>
                </div>

                {plannerConfig.plannerType === 'al_study' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {([4, 6, 8, 12] as DurationMonths[]).map((m) => {
                      const isSelected = plannerConfig.durationMonths === m;
                      const price = DURATION_PRICES_LKR[m];
                      return (
                        <button
                          key={m}
                          onClick={() => setPlannerConfig((prev) => ({ ...prev, durationMonths: m }))}
                          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer active:scale-95 select-none ${
                            isSelected
                              ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_12px_rgba(194,109,74,0.15)] -translate-y-0.5'
                              : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-[#24211E]">{m} Months</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C26D4A]" />}
                          </div>
                          <span className="text-[11px] text-[#635B53] block mt-1">
                            {m * 31} Daily Pages
                          </span>
                          <span className="font-mono font-bold text-xs text-[#C26D4A] block mt-2">
                            LKR {price.toLocaleString()}/=
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {plannerConfig.plannerType === 'year_planner' && (
                  <div className="p-5 rounded-2xl bg-[#6E8574]/10 border border-[#6E8574]/20 space-y-2">
                    <span className="font-bold text-sm text-[#304836] block">
                      🗓️ Full 12 Months (Jan - Dec 2027)
                    </span>
                    <p className="text-xs text-[#635B53]">
                      Includes 12 Monthly shine divider pages, 52 weekly goal spreads, and full habit trackers.
                    </p>
                    <span className="font-mono font-bold text-sm text-[#C26D4A] block">
                      Base Price: LKR 2,000/=
                    </span>
                  </div>
                )}

                {plannerConfig.plannerType === 'daily_planner' && (
                  <div className="grid grid-cols-3 gap-3">
                    {[100, 200, 300].map((pages) => (
                      <button
                        key={pages}
                        onClick={() => setPlannerConfig((prev) => ({ ...prev, dailyPageCount: pages }))}
                        className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer active:scale-95 select-none ${
                          (plannerConfig.dailyPageCount || 200) === pages
                            ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_12px_rgba(194,109,74,0.15)] -translate-y-0.5'
                            : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                        }`}
                      >
                        <span className="font-bold text-sm text-[#24211E] block">{pages} Pages</span>
                        <span className="font-mono font-bold text-xs text-[#C26D4A] block mt-2">
                          LKR {(DAILY_PLANNER_PRICES_LKR[pages] || 1500).toLocaleString()}/=
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-[#24211E]/8">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-2 rounded-full border border-[#24211E]/15 text-xs font-semibold text-[#635B53] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-2.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <span>Next: Cover & Finish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: COVER & FINISH */}
            {activeStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C26D4A] block">
                    Step 3 of 6
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#24211E] mt-0.5">
                    Cover & Finish
                  </h2>
                  <p className="text-xs text-[#635B53]">
                    Select between lightweight softcover or heavy protective hardcover with luxury brass corner clips.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Softcover Laminated */}
                  <div
                    onClick={() => setPlannerConfig((prev) => ({ ...prev, coverType: 'soft_laminated' }))}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between active:scale-95 select-none ${
                      plannerConfig.coverType === 'soft_laminated'
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_14px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#24211E] flex items-center gap-1.5">
                          <span>📄</span> Softcover Laminated
                        </span>
                        {plannerConfig.coverType === 'soft_laminated' && (
                          <CheckCircle2 className="w-4 h-4 text-[#C26D4A]" />
                        )}
                      </div>
                      <p className="text-xs text-[#635B53] leading-relaxed">
                        Flexible 300gsm art card with matte thermal lamination. Lightweight and slim for easy daily carrying.
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-[#6E8574] mt-4 block">
                      Standard (Included)
                    </span>
                  </div>

                  {/* Hardcover + Gold Corners */}
                  <div
                    onClick={() => setPlannerConfig((prev) => ({ ...prev, coverType: 'hardcover_corners' }))}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between active:scale-95 select-none ${
                      plannerConfig.coverType === 'hardcover_corners'
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_14px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#24211E] flex items-center gap-1.5">
                          <span>✨</span> Hardcover + Gold Corners
                        </span>
                        {plannerConfig.coverType === 'hardcover_corners' && (
                          <CheckCircle2 className="w-4 h-4 text-[#C26D4A]" />
                        )}
                      </div>
                      <p className="text-xs text-[#635B53] leading-relaxed">
                        2mm rigid industrial board cover with 4 gold metallic corner caps. Ultra-durable for intensive exam years.
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                        ✨ Luxury Finish
                      </span>
                      <span className="font-mono font-bold text-xs text-[#C26D4A]">
                        + LKR 400/=
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-[#24211E]/8">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-2 rounded-full border border-[#24211E]/15 text-xs font-semibold text-[#635B53] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <span>Next: Personalization</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PERSONALIZATION (ARTWORK & EMBOSSED NAME) */}
            {activeStep === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C26D4A] block">
                    Step 4 of 6
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#24211E] mt-0.5">
                    Personalization & Artwork
                  </h2>
                  <p className="text-xs text-[#635B53]">
                    Type your name to preview in real-time gold leaf foil. Select your dream study theme or upload your own image.
                  </p>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#24211E]">
                    Embossed Foil Name (Printed on Cover)
                  </label>
                  <input
                    type="text"
                    value={plannerConfig.customName}
                    onChange={(e) => setPlannerConfig((prev) => ({ ...prev, customName: e.target.value }))}
                    placeholder="e.g. Nethmi Sandeepani / Dr. K. Perera"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs sm:text-sm font-medium text-[#24211E] focus:outline-none focus:border-[#C26D4A] transition-colors"
                  />
                </div>

                {/* Artwork Theme Selector & Custom Photo Option */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#24211E]">
                      Cover Artwork Selection
                    </label>
                    <div className="flex bg-[#FAF6F0] p-1 rounded-full border border-[#24211E]/10 text-xs">
                      <button
                        type="button"
                        onClick={() => setPhotoMode('preset')}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          photoMode === 'preset'
                            ? 'bg-[#C26D4A] text-white shadow-sm'
                            : 'text-[#635B53] hover:text-[#24211E]'
                        }`}
                      >
                        Curated Themes
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoMode('upload')}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          photoMode === 'upload'
                            ? 'bg-[#C26D4A] text-white shadow-sm'
                            : 'text-[#635B53] hover:text-[#24211E]'
                        }`}
                      >
                        Custom Photo
                      </button>
                    </div>
                  </div>

                  {photoMode === 'preset' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {COVER_THEMES.map((theme) => {
                        const isSelected = plannerConfig.selectedThemeId === theme.id && !plannerConfig.customPhotoUrl;
                        return (
                          <div
                            key={theme.id}
                            onClick={() =>
                              setPlannerConfig((prev) => ({
                                ...prev,
                                selectedThemeId: theme.id,
                                customPhotoUrl: undefined,
                              }))
                            }
                            className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer aspect-[4/3] active:scale-95 ${
                              isSelected
                                ? 'border-[#C26D4A] ring-2 ring-[#C26D4A]/20 shadow-md -translate-y-0.5'
                                : 'border-transparent hover:border-[#24211E]/20'
                            }`}
                          >
                            <img
                              src={theme.imageUrl}
                              alt={theme.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <span className="absolute bottom-2 left-2 right-2 text-[11px] font-bold text-white leading-tight">
                              {theme.name.split('/')[0]}
                            </span>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#C26D4A] text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 space-y-3">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#24211E] flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-[#C26D4A]" />
                          Custom Dream Photo / Collage
                        </span>
                        <p className="text-[11px] text-[#635B53]">
                          Paste an image link below to preview instantly, or you can send high-res photos via WhatsApp after ordering!
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={customPhotoInput}
                          onChange={(e) => {
                            setCustomPhotoInput(e.target.value);
                            if (e.target.value) {
                              setPlannerConfig((prev) => ({
                                ...prev,
                                customPhotoUrl: e.target.value,
                              }));
                            }
                          }}
                          placeholder="https://example.com/my-medical-dream.jpg"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-[#24211E]/15 text-xs text-[#24211E] focus:outline-none focus:border-[#C26D4A]"
                        />
                        {customPhotoInput && (
                          <button
                            type="button"
                            onClick={() => {
                              setCustomPhotoInput('');
                              setPlannerConfig((prev) => ({
                                ...prev,
                                customPhotoUrl: undefined,
                              }));
                            }}
                            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-700 text-xs font-medium cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#304836] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6E8574]" />
                        <span>Free custom cover printing & 12 monthly shine divider prints included.</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4 border-t border-[#24211E]/8">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-2 rounded-full border border-[#24211E]/15 text-xs font-semibold text-[#635B53] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setActiveStep(5)}
                    className="px-6 py-2.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <span>Next: Included Trackers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: INCLUDED TRACKERS */}
            {activeStep === 5 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C26D4A] block">
                    Step 5 of 6
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#24211E] mt-0.5">
                    Included Trackers & Spreads
                  </h2>
                  <p className="text-xs text-[#635B53]">
                    All pages printed on 120gsm ink-proof fountain-pen friendly cream sheets (100% included for free).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/8 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#304836]">
                    <CheckCircle2 className="w-4 h-4 text-[#6E8574]" />
                    <span>Comprehensive A/L Revision Toolkit</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#24211E]">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#6E8574] shrink-0 mt-0.5" />
                      <span>MCQ & SEQ Past Papers (2015-2025)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#6E8574] shrink-0 mt-0.5" />
                      <span>12 Monthly Custom Photo Shine Pages</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#6E8574] shrink-0 mt-0.5" />
                      <span>Daily Study Hours & Sleep Tracker</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#6E8574] shrink-0 mt-0.5" />
                      <span>Exam Countdown & Target Grades</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#6E8574] shrink-0 mt-0.5" />
                      <span>Tuition & Master Class Timetable</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#6E8574] shrink-0 mt-0.5" />
                      <span>Monthly Spreads + 31 Daily Sheets/mo</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-[#24211E]/8">
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-5 py-2 rounded-full border border-[#24211E]/15 text-xs font-semibold text-[#635B53] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setActiveStep(6)}
                    className="px-6 py-2.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <span>Next: Optional Add-ons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: OPTIONAL ADD-ONS */}
            {activeStep === 6 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C26D4A] block">
                    Step 6 of 6
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#24211E] mt-0.5">
                    Optional Add-ons & Finalize
                  </h2>
                  <p className="text-xs text-[#635B53]">
                    Enhance your planner with matching translucent index tabs, stickers, or satin bookmark ribbon.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* PET Tabs */}
                  <div
                    onClick={() => setPlannerConfig((prev) => ({ ...prev, addOnStickyTabs: !prev.addOnStickyTabs }))}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between active:scale-95 select-none ${
                      plannerConfig.addOnStickyTabs
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_12px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-xs text-[#24211E] flex items-center gap-1">
                          <span>📑</span> PET Tabs
                        </h4>
                        <p className="text-[11px] text-[#635B53] mt-0.5">Pastel flags</p>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        plannerConfig.addOnStickyTabs ? 'bg-[#C26D4A] border-[#C26D4A]' : 'border-zinc-300'
                      }`}>
                        {plannerConfig.addOnStickyTabs && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#C26D4A] mt-2 block">
                      + Rs. 200/=
                    </span>
                  </div>

                  {/* Stickers */}
                  <div
                    onClick={() => setPlannerConfig((prev) => ({ ...prev, addOnStickers: !prev.addOnStickers }))}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between active:scale-95 select-none ${
                      plannerConfig.addOnStickers
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_12px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-xs text-[#24211E] flex items-center gap-1">
                          <span>🎨</span> Stickers Pack
                        </h4>
                        <p className="text-[11px] text-[#635B53] mt-0.5">3 sheets decals</p>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        plannerConfig.addOnStickers ? 'bg-[#C26D4A] border-[#C26D4A]' : 'border-zinc-300'
                      }`}>
                        {plannerConfig.addOnStickers && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#C26D4A] mt-2 block">
                      + Rs. 250/=
                    </span>
                  </div>

                  {/* Ribbon */}
                  <div
                    onClick={() => setPlannerConfig((prev) => ({ ...prev, addOnRibbon: !prev.addOnRibbon }))}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between active:scale-95 select-none ${
                      plannerConfig.addOnRibbon
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_12px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-xs text-[#24211E] flex items-center gap-1">
                          <span>🎗️</span> Satin Ribbon
                        </h4>
                        <p className="text-[11px] text-[#635B53] mt-0.5">Silk divider</p>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        plannerConfig.addOnRibbon ? 'bg-[#C26D4A] border-[#C26D4A]' : 'border-zinc-300'
                      }`}>
                        {plannerConfig.addOnRibbon && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#C26D4A] mt-2 block">
                      + Rs. 150/=
                    </span>
                  </div>
                </div>

                {/* Final Add to Cart */}
                <div className="pt-4 border-t border-[#24211E]/8 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveStep(5)}
                    className="px-5 py-2 rounded-full border border-[#24211E]/15 text-xs font-semibold text-[#635B53] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  <button
                    onClick={() => {
                      addCurrentCustomPlannerToCart();
                      setIsCartOpen(true);
                    }}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-sm shadow-[0_4px_14px_rgba(194,109,74,0.35)] hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Custom Planner to Cart • LKR {plannerConfig.calculatedPriceLKR.toLocaleString()}/=</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Inner 120gsm Sheets Preview Modal */}
      {showInnerSheetsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#24211E]/12 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowInnerSheetsModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#24211E] shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="washi-sage px-3 py-1 rounded-full text-xs font-bold inline-block">
                120gsm Bleed-Proof Satin Paper
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#24211E]">
                Inner Spread & Tracker Preview
              </h3>
              <p className="text-xs text-[#635B53]">
                Zero fountain-pen bleed through, ultra-smooth writing tooth.
              </p>
            </div>

            {/* Inner Spread Tabs */}
            <div className="flex gap-2 border-b border-[#24211E]/10 pb-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'past_papers', label: 'Past Paper Tracker' },
                { id: 'daily_spread', label: 'Daily Study Spread' },
                { id: 'shine_page', label: 'Monthly Shine Page' },
                { id: 'vision_board', label: 'Vision & Timetable' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSpreadTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all active:scale-95 ${
                    activeSpreadTab === tab.id
                      ? 'bg-[#C26D4A] text-white shadow-sm'
                      : 'bg-white text-[#635B53] hover:text-[#24211E] border border-[#24211E]/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Render Simulated Sheet */}
            <div className="tactile-card p-6 sm:p-8 bg-white border border-[#24211E]/10 shadow-paper min-h-[280px]">
              {activeSpreadTab === 'past_papers' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-serif font-bold text-base text-[#24211E]">
                      A/L Past Paper Revision Master (2015 – 2025)
                    </span>
                    <span className="text-xs text-[#6E8574] font-mono">100% Bleed-Resistant</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {['Biology / Combined Maths', 'Chemistry / Physics', 'Agriculture / ICT'].map((sub, i) => (
                      <div key={i} className="p-3 bg-[#FAF6F0] rounded-xl space-y-2">
                        <span className="font-bold text-[#24211E] block">{sub}</span>
                        <div className="space-y-1 text-[11px] text-[#635B53]">
                          <div>☑ 2025 Model Papers [MCQ | SEQ | Essay]</div>
                          <div>☑ 2024 Past Paper [MCQ | SEQ | Essay]</div>
                          <div>☑ 2023 Past Paper [MCQ | SEQ | Essay]</div>
                          <div>☑ 2022 Past Paper [MCQ | SEQ | Essay]</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSpreadTab === 'daily_spread' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-serif font-bold text-base text-[#24211E]">
                      Daily Intentional Study Block (6:00 AM – 11:00 PM)
                    </span>
                    <span className="text-xs text-[#C26D4A] font-mono">Top 3 Priorities Matrix</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5 text-[11px] text-[#635B53]">
                      <div className="font-bold text-[#24211E]">Hourly Blocks:</div>
                      <div>06:00 - 08:00 : Physics Mechanics Revision</div>
                      <div>09:00 - 12:00 : Past Paper Time-Trial (50 MCQs)</div>
                      <div>14:00 - 16:30 : Chemistry Organic Summary Notes</div>
                    </div>
                    <div className="p-3 bg-[#FAF6F0] rounded-xl space-y-1 text-[11px]">
                      <div className="font-bold text-[#24211E]">Daily Habits:</div>
                      <div>💧 Water: [o] [o] [o] [o] [o] [o]</div>
                      <div>😴 Sleep Log: 7.5 Hours</div>
                      <div>✨ Daily Win: Mastered Equilibrium Problems!</div>
                    </div>
                  </div>
                </div>
              )}

              {activeSpreadTab === 'shine_page' && (
                <div className="space-y-4 text-center">
                  <span className="washi-terracotta px-3 py-1 rounded-full text-xs font-bold inline-block">
                    Full Color High-Res Glossy Divider
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#24211E]">
                    "Every sunrise brings you closer to Faculty."
                  </h4>
                  <p className="text-xs text-[#635B53] max-w-md mx-auto">
                    Free custom photo printing. Send your personal photos via WhatsApp after ordering and we bind them into every monthly divider!
                  </p>
                </div>
              )}

              {activeSpreadTab === 'vision_board' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-serif font-bold text-base text-[#24211E]">
                      Vision Board & University Targets
                    </span>
                    <span className="text-xs text-[#635B53] font-mono">Target Z-Score: 2.1450</span>
                  </div>
                  <p className="text-xs text-[#635B53] leading-relaxed">
                    Goal setting spreads, monthly reflection questions, and university faculty aspiration badges to keep you driven on low-motivation days.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowInnerSheetsModal(false)}
                className="px-6 py-2 rounded-full bg-[#24211E] hover:bg-[#C26D4A] text-white text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

