'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import {
  PlannerType,
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
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Upload,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Book3DTilt } from '@/components/ui/3d-book-tilt';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CUTE_STICKERS, CuteStickerPill } from '@/components/ui/cute-stickers';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import {
  ColoredFlower,
  ColoredSparkle,
  ColoredHeart,
  ColoredStar,
  ColoredCalendar,
  ColoredRibbon,
  ColoredPalette,
  ColoredCrown,
  ColoredFlame,
} from '@/components/ui/colored-icons';

export function PlannerCustomizer() {
  const searchParams = useSearchParams();
  const {
    plannerConfig,
    setPlannerConfig,
    activeStep,
    setActiveStep,
    addCurrentCustomPlannerToCart,
    setIsCartOpen,
  } = useStore();

  const [maxStepReached, setMaxStepReached] = useState(1);
  const [customPhotoInput, setCustomPhotoInput] = useState('');
  const [photoMode, setPhotoMode] = useState<'preset' | 'upload'>('preset');
  const [selectedSticker, setSelectedSticker] = useState<string>('🌸');

  // Track max step reached to allow backward navigation while enforcing sequential forward progress
  const goToStep = (step: number) => {
    if (step <= maxStepReached) {
      setActiveStep(step);
    }
  };

  const advanceToNextStep = (nextStep: number) => {
    setMaxStepReached((prev) => Math.max(prev, nextStep));
    setActiveStep(nextStep);
  };

  // Listen to query param '?planner=...' on mount
  useEffect(() => {
    const plannerParam = searchParams.get('planner') as PlannerType | null;
    if (plannerParam && ['al_study', 'year_planner', 'daily_planner'].includes(plannerParam)) {
      handlePlannerTypeSelect(plannerParam);
    }
  }, [searchParams]);

  const handlePlannerTypeSelect = (type: PlannerType) => {
    setPlannerConfig((prev) => ({
      ...prev,
      plannerType: type,
      coverTitle:
        type === 'al_study'
          ? 'MY STUDY PLANNER 🌸'
          : type === 'year_planner'
          ? 'MY 2027 YEAR PLANNER ✨'
          : 'MY DAILY PLANNER 💖',
      coverSubtitle:
        type === 'al_study'
          ? '2027 & 2028 A/L DREAM JOURNEY'
          : type === 'year_planner'
          ? 'EVERY PAGE IS A STEP CLOSER'
          : 'INTENTIONAL DAILY FOCUS',
      selectedThemeId:
        type === 'al_study'
          ? 'theme_future_dr'
          : type === 'year_planner'
          ? 'theme_cozy_cat'
          : 'theme_midnight_desk',
      durationMonths: type === 'year_planner' ? 12 : prev.durationMonths || 6,
      dailyPageCount: type === 'daily_planner' ? prev.dailyPageCount || 200 : prev.dailyPageCount,
    }));
  };

  const currentTheme =
    COVER_THEMES.find((t) => t.id === plannerConfig.selectedThemeId) || COVER_THEMES[0];

  const activeTrackers =
    plannerConfig.plannerType === 'al_study'
      ? AL_STUDY_TRACKERS
      : plannerConfig.plannerType === 'year_planner'
      ? YEAR_PLANNER_TRACKERS
      : DAILY_PLANNER_TRACKERS;

  const steps = [
    { step: 1, label: 'Type', Icon: ColoredFlower },
    { step: 2, label: 'Duration', Icon: ColoredCalendar },
    { step: 3, label: 'Finish', Icon: ColoredRibbon },
    { step: 4, label: 'Design', Icon: ColoredPalette },
    { step: 5, label: 'Goodies', Icon: ColoredSparkle },
  ];

  return (
    <section id="planner-studio" className="py-2 sm:py-4 px-3 sm:px-6 lg:px-8 bg-[#FFFDF9] max-w-7xl mx-auto space-y-3 sm:space-y-4">
      
      {/* Compact Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#FF6B8B]/15 pb-2.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge variant="pink" className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ColoredSparkle size={12} />
              <span>Sequential Atelier</span>
            </Badge>
            <span className="text-[11px] font-bold text-[#FF6B8B]">
              Step {activeStep} of 5
            </span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-[#382A2C] leading-tight">
              Custom Planner Studio
            </h1>
            <div className="w-10 h-10 shrink-0 pointer-events-none">
              <LottieAnimation src="/animation/Butterfly Lottie Animation.json" speed={0.65} width={40} height={40} />
            </div>
          </div>
        </div>

        {/* Step Indicator Pills (Strictly locked to reached steps) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {steps.map((item) => {
            const isActive = activeStep === item.step;
            const isUnlocked = item.step <= maxStepReached;
            const isDone = item.step < activeStep;

            return (
              <button
                key={item.step}
                onClick={() => goToStep(item.step)}
                disabled={!isUnlocked}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all select-none ${
                  isActive
                    ? 'text-white'
                    : isDone
                    ? 'text-[#1D7A66] bg-[#E6F9F5] border border-[#86E3CE]/60 cursor-pointer'
                    : isUnlocked
                    ? 'text-[#6E5C5E] bg-white border border-[#FF6B8B]/20 hover:border-[#FF6B8B] cursor-pointer'
                    : 'text-[#B0A0A2] bg-[#F5F0F1] border border-transparent cursor-not-allowed opacity-60'
                }`}
                title={!isUnlocked ? 'Please complete earlier steps first' : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCuteStudioStep"
                    className="absolute inset-0 bg-[#FF6B8B] rounded-full -z-10 shadow-[0_3px_0_#E04D6D]"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <item.Icon size={14} className="shrink-0" />
                <span className="text-[11px]">{item.step}. {item.label}</span>
                {isDone ? (
                  <Check className="w-3 h-3 text-[#1D7A66]" />
                ) : !isUnlocked ? (
                  <Lock className="w-2.5 h-2.5 text-[#B0A0A2]" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Responsive Layout (Fitted to viewport, no tall scrolling) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        
        {/* Left Column: Interactive Wizard Steps */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-[28px] border-2 border-[#FF6B8B]/20 shadow-[0_8px_28px_rgba(255,107,139,0.1)]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CATEGORY */}
            {activeStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#382A2C] flex items-center gap-1.5">
                      <ColoredFlower size={20} />
                      <span>1. Select Planner Category</span>
                    </h3>
                    <p className="text-[11px] text-[#6E5C5E] font-semibold">
                      Choose your planner framework. A/L Study is selected by default:
                    </p>
                  </div>
                  <div className="w-11 h-11 pointer-events-none opacity-90 shrink-0 flex items-center justify-center">
                    <LottieAnimation src="/animation/Looping Flower.json" speed={0.65} width={44} height={44} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div
                    onClick={() => handlePlannerTypeSelect('al_study')}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.plannerType === 'al_study'
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_3px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <Badge variant="pink" className="text-[9px] px-1.5 py-0.5 flex items-center gap-1">
                          <ColoredHeart size={10} />
                          <span>Bestseller</span>
                        </Badge>
                        {plannerConfig.plannerType === 'al_study' && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B8B]" />
                        )}
                      </div>
                      <h4 className="font-extrabold text-xs text-[#382A2C]">A/L Study Planner</h4>
                      <p className="text-[10px] text-[#6E5C5E] mt-0.5 leading-snug font-semibold">
                        MCQ & essay trackers with 12 free monthly shine divider pages.
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#FF6B8B]/15 flex justify-between items-center text-[10px]">
                      <span className="text-[#6E5C5E] font-bold">4–12 Mos</span>
                      <span className="font-mono font-extrabold text-[#FF6B8B]">From LKR 1,500/=</span>
                    </div>
                  </div>

                  <div
                    onClick={() => handlePlannerTypeSelect('year_planner')}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.plannerType === 'year_planner'
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_3px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <Badge variant="mint" className="text-[9px] px-1.5 py-0.5">✨ Full Year</Badge>
                        {plannerConfig.plannerType === 'year_planner' && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B8B]" />
                        )}
                      </div>
                      <h4 className="font-extrabold text-xs text-[#382A2C]">2027 Year Planner</h4>
                      <p className="text-[10px] text-[#6E5C5E] mt-0.5 leading-snug font-semibold">
                        12-month life & dream journey with 20+ habit trackers.
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#FF6B8B]/15 flex justify-between items-center text-[10px]">
                      <span className="text-[#6E5C5E] font-bold">12 Months</span>
                      <span className="font-mono font-extrabold text-[#FF6B8B]">LKR 2,000/=</span>
                    </div>
                  </div>

                  <div
                    onClick={() => handlePlannerTypeSelect('daily_planner')}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.plannerType === 'daily_planner'
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_3px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <Badge variant="yellow" className="text-[9px] px-1.5 py-0.5">⭐ Daily Focus</Badge>
                        {plannerConfig.plannerType === 'daily_planner' && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B8B]" />
                        )}
                      </div>
                      <h4 className="font-extrabold text-xs text-[#382A2C]">Daily Planners</h4>
                      <p className="text-[10px] text-[#6E5C5E] mt-0.5 leading-snug font-semibold">
                        Daily task checklist sheets with 6am–11pm schedule blocks.
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#FF6B8B]/15 flex justify-between items-center text-[10px]">
                      <span className="text-[#6E5C5E] font-bold">100–300p</span>
                      <span className="font-mono font-extrabold text-[#FF6B8B]">From LKR 1,100/=</span>
                    </div>
                  </div>
                </div>

                {/* Sequential Step Next Action */}
                <div className="flex justify-end pt-2 border-t border-[#FF6B8B]/10">
                  <Button variant="pink" size="sm" onClick={() => advanceToNextStep(2)}>
                    <span>Next: Choose Duration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DURATION */}
            {activeStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#382A2C] flex items-center gap-1.5">
                      <ColoredCalendar size={20} />
                      <span>2. Select Duration & Capacity</span>
                    </h3>
                    <p className="text-[11px] text-[#6E5C5E] font-semibold">
                      Pick months or daily page count:
                    </p>
                  </div>
                  <div className="w-11 h-11 pointer-events-none opacity-90 shrink-0 flex items-center justify-center">
                    <LottieAnimation src="/animation/Sandy Loading.json" speed={0.65} width={44} height={44} />
                  </div>
                </div>

                {plannerConfig.plannerType === 'al_study' && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {([4, 5, 6, 7, 8, 9, 10, 11, 12] as DurationMonths[]).map((m) => {
                      const isSelected = plannerConfig.durationMonths === m;
                      const price = DURATION_PRICES_LKR[m];
                      return (
                        <div
                          key={m}
                          onClick={() =>
                            setPlannerConfig((prev) => ({ ...prev, durationMonths: m }))
                          }
                          className={`p-2 rounded-xl border-2 transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_2px_0_#FFAAA6]'
                              : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                          }`}
                        >
                          <span className="font-extrabold text-xs text-[#382A2C] block">{m} Months</span>
                          <span className="font-mono font-extrabold text-[10px] text-[#FF6B8B] block mt-0.5">
                            LKR {price.toLocaleString()}/=
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {plannerConfig.plannerType === 'year_planner' && (
                  <div className="p-3 rounded-2xl bg-[#E6F9F5] border border-[#86E3CE]/60 text-xs text-[#382A2C] space-y-1">
                    <div className="font-extrabold text-[#1D7A66] flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Full 12 Months Life Planner (Jan – Dec 2027)</span>
                    </div>
                    <p className="text-[11px] text-[#6E5C5E] leading-relaxed font-semibold">
                      Includes 12 Monthly shine divider pages (free photo prints), 52 weekly spreads, and 20+ trackers.
                    </p>
                    <span className="font-mono font-extrabold text-xs text-[#FF6B8B] block pt-0.5">
                      Base Price: LKR 2,000/=
                    </span>
                  </div>
                )}

                {plannerConfig.plannerType === 'daily_planner' && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {[100, 150, 200, 250, 300].map((pages) => {
                      const isSelected = (plannerConfig.dailyPageCount || 200) === pages;
                      const price = DAILY_PLANNER_PRICES_LKR[pages] || 1500;
                      return (
                        <div
                          key={pages}
                          onClick={() =>
                            setPlannerConfig((prev) => ({ ...prev, dailyPageCount: pages }))
                          }
                          className={`p-2 rounded-xl border-2 transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_2px_0_#FFAAA6]'
                              : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                          }`}
                        >
                          <span className="font-extrabold text-xs text-[#382A2C] block">{pages} Pages</span>
                          <span className="font-mono font-extrabold text-[10px] text-[#FF6B8B] block mt-0.5">
                            LKR {price.toLocaleString()}/=
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-[#FF6B8B]/10">
                  <Button variant="outline" size="sm" onClick={() => goToStep(1)}>
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </Button>
                  <Button variant="pink" size="sm" onClick={() => advanceToNextStep(3)}>
                    <span>Next: Cover Finish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: COVER FINISH */}
            {activeStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#382A2C] flex items-center gap-1.5">
                      <ColoredRibbon size={20} />
                      <span>3. Choose Cover Finish</span>
                    </h3>
                    <p className="text-[11px] text-[#6E5C5E] font-semibold">
                      Both finishes include scratch-resistant velvet lamination & twin-wire spiral:
                    </p>
                  </div>
                  <div className="w-11 h-11 pointer-events-none opacity-90 shrink-0 flex items-center justify-center">
                    <LottieAnimation src="/animation/Fire.json" speed={0.7} width={44} height={44} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() =>
                      setPlannerConfig((prev) => ({ ...prev, coverType: 'soft_laminated' }))
                    }
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.coverType === 'soft_laminated'
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_3px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-xs sm:text-sm text-[#382A2C] flex items-center gap-1.5">
                          <ColoredFlower size={15} />
                          <span>Softcover (Laminated)</span>
                        </span>
                        {plannerConfig.coverType === 'soft_laminated' && (
                          <CheckCircle2 className="w-4 h-4 text-[#FF6B8B]" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#6E5C5E] mt-1 leading-relaxed font-semibold">
                        Lightweight 300gsm art card with velvet protective lamination.
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#FF6B8B]/15 flex items-center gap-1">
                      <ColoredSparkle size={12} />
                      <span className="text-[10px] font-extrabold text-[#1D7A66]">
                        Standard Included (Free)
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setPlannerConfig((prev) => ({ ...prev, coverType: 'hardcover_corners' }))
                    }
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.coverType === 'hardcover_corners'
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_3px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-xs sm:text-sm text-[#382A2C] flex items-center gap-1.5">
                          <ColoredStar size={15} />
                          <span>Hardcover + 4 Gold Corners</span>
                        </span>
                        {plannerConfig.coverType === 'hardcover_corners' && (
                          <CheckCircle2 className="w-4 h-4 text-[#FF6B8B]" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#6E5C5E] mt-1 leading-relaxed font-semibold">
                        2mm rigid luxury board with 4 shiny gold corner caps.
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#FF6B8B]/15 flex justify-between items-center text-xs">
                      <span className="font-extrabold text-[#E5A827] uppercase text-[9px] flex items-center gap-1">
                        <ColoredCrown size={12} />
                        <span>Luxury Upgrade</span>
                      </span>
                      <span className="font-mono font-extrabold text-[#FF6B8B]">
                        + LKR {HARDCOVER_ADDON_PRICE_LKR}/=
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#FF6B8B]/10">
                  <Button variant="outline" size="sm" onClick={() => goToStep(2)}>
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </Button>
                  <Button variant="pink" size="sm" onClick={() => advanceToNextStep(4)}>
                    <span>Next: Design & Name</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: DESIGN & PERSONALIZATION */}
            {activeStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#382A2C] flex items-center gap-1.5">
                      <ColoredPalette size={20} />
                      <span>4. Personalize Cover & Name</span>
                    </h3>
                    <p className="text-[11px] text-[#6E5C5E] font-semibold">
                      Pick a theme, stamp cute stickers, and emboss your lovely name:
                    </p>
                  </div>
                  <div className="w-11 h-11 pointer-events-none opacity-90 shrink-0 flex items-center justify-center">
                    <LottieAnimation src="/animation/Butterfly Lottie Animation.json" speed={0.65} width={44} height={44} />
                  </div>
                </div>

                {/* Cute Stickers Decorator Bar */}
                <div className="p-2.5 bg-[#FFF5F7] rounded-xl border border-[#FF6B8B]/20 space-y-1.5">
                  <span className="text-[10px] font-extrabold text-[#FF6B8B] flex items-center gap-1">
                    <ColoredSparkle size={12} />
                    <span>Stamp a badge onto your embossed name:</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {CUTE_STICKERS.map((stk) => (
                      <CuteStickerPill
                        key={stk.id}
                        emoji={stk.emoji}
                        label={stk.label}
                        isSelected={selectedSticker === stk.emoji}
                        onClick={() => {
                          setSelectedSticker(stk.emoji);
                          setPlannerConfig((prev) => ({
                            ...prev,
                            customName: `${prev.customName.replace(/[🌸⭐💖🐾🍓🎀✨🍀]/g, '').trim()} ${stk.emoji}`,
                          }));
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Theme Selector */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {COVER_THEMES.map((theme) => {
                    const isSelected =
                      plannerConfig.selectedThemeId === theme.id && !plannerConfig.customPhotoUrl;
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
                        className={`group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#FF6B8B] ring-2 ring-[#FF6B8B]/40 shadow-xs'
                            : 'border-transparent hover:border-[#FF6B8B]/30'
                        }`}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={theme.imageUrl}
                            alt={theme.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <span className="absolute bottom-1 left-1 right-1 text-[8px] font-bold text-white truncate block text-center">
                            {theme.name.split('/')[0]}
                          </span>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF6B8B] text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Text Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#382A2C] mb-0.5">
                      Embossed Name
                    </label>
                    <input
                      type="text"
                      value={plannerConfig.customName}
                      onChange={(e) =>
                        setPlannerConfig((prev) => ({ ...prev, customName: e.target.value }))
                      }
                      placeholder="e.g. Dr. Sarah"
                      className="w-full px-3 py-1.5 rounded-xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#382A2C] mb-0.5">
                      Cover Title
                    </label>
                    <input
                      type="text"
                      value={plannerConfig.coverTitle}
                      onChange={(e) =>
                        setPlannerConfig((prev) => ({ ...prev, coverTitle: e.target.value }))
                      }
                      placeholder="e.g. MY STUDY PLANNER"
                      className="w-full px-3 py-1.5 rounded-xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#FF6B8B]/10">
                  <Button variant="outline" size="sm" onClick={() => goToStep(3)}>
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </Button>
                  <Button variant="pink" size="sm" onClick={() => advanceToNextStep(5)}>
                    <span>Next: Goodies & Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: TRACKERS & ADD-ONS */}
            {activeStep === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#382A2C] flex items-center gap-1.5">
                      <ColoredSparkle size={20} />
                      <span>5. Goodies, Trackers & Final Review</span>
                    </h3>
                    <p className="text-[11px] text-[#6E5C5E] font-semibold">
                      Review your completed planner specifications and add to bag:
                    </p>
                  </div>
                  <div className="w-11 h-11 pointer-events-none opacity-90 shrink-0 flex items-center justify-center">
                    <LottieAnimation src="/animation/Lotus.json" speed={0.65} width={44} height={44} />
                  </div>
                </div>

                {/* Included Trackers List with Lottie Lotus */}
                <div className="p-3 rounded-2xl bg-[#E6F9F5] border border-[#86E3CE]/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1D7A66]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Included Features & Free Photo Divider Pages</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-[#382A2C] font-semibold">
                    {activeTrackers.slice(0, 6).map((tracker, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#1D7A66] shrink-0" />
                        <span className="truncate">{tracker}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cute Add-ons */}
                <div className="grid grid-cols-3 gap-2">
                  <div
                    onClick={() =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        addOnStickers: !prev.addOnStickers,
                      }))
                    }
                    className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.addOnStickers
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_2px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-extrabold text-[11px] text-[#382A2C] flex items-center gap-1">
                        <ColoredHeart size={12} />
                        <span>Stickers</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={plannerConfig.addOnStickers}
                        readOnly
                        className="accent-[#FF6B8B]"
                      />
                    </div>
                    <span className="font-mono font-extrabold text-[10px] text-[#FF6B8B] mt-1">
                      + LKR {ADDONS_PRICING_LKR.stickers}/=
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        addOnStickyTabs: !prev.addOnStickyTabs,
                      }))
                    }
                    className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.addOnStickyTabs
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_2px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-extrabold text-[11px] text-[#382A2C] flex items-center gap-1">
                        <ColoredSparkle size={12} />
                        <span>PET Tabs</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={plannerConfig.addOnStickyTabs}
                        readOnly
                        className="accent-[#FF6B8B]"
                      />
                    </div>
                    <span className="font-mono font-extrabold text-[10px] text-[#FF6B8B] mt-1">
                      + LKR {ADDONS_PRICING_LKR.stickyTabs}/=
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        addOnRibbon: !prev.addOnRibbon,
                      }))
                    }
                    className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.addOnRibbon
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_2px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 hover:border-[#FF6B8B]/40 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-extrabold text-[11px] text-[#382A2C] flex items-center gap-1">
                        <ColoredRibbon size={12} />
                        <span>Ribbon</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={plannerConfig.addOnRibbon}
                        readOnly
                        className="accent-[#FF6B8B]"
                      />
                    </div>
                    <span className="font-mono font-extrabold text-[10px] text-[#FF6B8B] mt-1">
                      + LKR {ADDONS_PRICING_LKR.ribbon}/=
                    </span>
                  </div>
                </div>

                {/* Final Unlocked Add to Bag Button */}
                <div className="flex justify-between items-center gap-2 pt-2 border-t border-[#FF6B8B]/10">
                  <Button variant="outline" size="sm" onClick={() => goToStep(4)}>
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </Button>

                  <Button
                    variant="pink"
                    size="lg"
                    onClick={() => {
                      addCurrentCustomPlannerToCart();
                      setIsCartOpen(true);
                    }}
                    className="shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add Planner to Bag • <AnimatedCounter value={plannerConfig.calculatedPriceLKR} />
                    </span>
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Column: Live Desk Mockup & Sequential Progress */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white p-3.5 sm:p-4 rounded-[28px] border-2 border-[#FF6B8B]/20 shadow-[0_8px_28px_rgba(255,107,139,0.12)] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-[#FF6B8B] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <ColoredSparkle size={13} />
                <span>Live Desk Mockup</span>
              </span>
              <span className="text-[#1D7A66] font-bold bg-[#E6F9F5] px-2.5 py-0.5 rounded-full text-[10px] border border-[#86E3CE]/40 flex items-center gap-1">
                {plannerConfig.coverType === 'hardcover_corners' ? (
                  <>
                    <ColoredStar size={11} />
                    <span>Hardcover + Gold</span>
                  </>
                ) : (
                  <>
                    <ColoredFlower size={11} />
                    <span>Softcover</span>
                  </>
                )}
              </span>
            </div>

            {/* Compact 3D Book Gyroscope */}
            <div className="flex justify-center py-1">
              <Book3DTilt>
                <div className="relative aspect-[3/4] w-[210px] sm:w-[225px] rounded-2xl overflow-hidden shadow-book bg-gradient-to-br from-[#382A2C] to-[#201517] text-white p-4 flex flex-col justify-between border-2 border-[#FF6B8B]/30 select-none">
                  
                  {plannerConfig.coverType === 'hardcover_corners' && (
                    <>
                      <div className="corner-gold-tl" />
                      <div className="corner-gold-tr" />
                      <div className="corner-gold-bl" />
                      <div className="corner-gold-br" />
                    </>
                  )}

                  {/* Spiral Rings */}
                  <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-3 z-30 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-1.5 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-300 rounded-full shadow-xs -ml-2 border border-pink-400/50"
                      />
                    ))}
                  </div>

                  <img
                    src={plannerConfig.customPhotoUrl || currentTheme.imageUrl}
                    alt={currentTheme.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity pointer-events-none"
                  />

                  {/* Top Badge */}
                  <div className="relative z-10 flex justify-between items-start pl-2">
                    <span className="text-[7px] uppercase font-extrabold tracking-wider bg-[#FF6B8B] text-white px-1.5 py-0.5 rounded-full shadow-xs">
                      {plannerConfig.plannerType === 'al_study'
                        ? `${plannerConfig.durationMonths} MOS`
                        : plannerConfig.plannerType === 'year_planner'
                        ? '2027 YEAR'
                        : `${plannerConfig.dailyPageCount || 200} PGS`}
                    </span>
                    <span className="text-[7px] font-bold bg-[#FFD166] text-[#4A3810] px-1 py-0.5 rounded-full shadow-xs">
                      120gsm
                    </span>
                  </div>

                  {/* Center Title */}
                  <div className="relative z-10 text-center pl-2 space-y-0.5 my-auto">
                    <h4 className="font-heading text-sm sm:text-base font-extrabold tracking-wide text-white drop-shadow truncate">
                      {plannerConfig.coverTitle || 'MY PLANNER'}
                    </h4>
                    <p className="text-[8px] text-pink-200 tracking-wider font-mono font-bold">
                      {plannerConfig.coverSubtitle || 'LITTLE LINES'}
                    </p>
                  </div>

                  {/* Bottom Custom Name */}
                  <div className="relative z-10 flex justify-between items-end pl-2 border-t border-pink-200/30 pt-1.5 text-[8px]">
                    <div>
                      <span className="text-pink-200/80 block text-[6px] font-bold">Embossed Name:</span>
                      <span className="font-extrabold text-white truncate max-w-[100px] block">
                        {plannerConfig.customName || 'Your Name'}
                      </span>
                    </div>
                    <AnimatedCounter
                      value={plannerConfig.calculatedPriceLKR}
                      className="font-extrabold text-[#FFD166] text-[11px]"
                    />
                  </div>
                </div>
              </Book3DTilt>
            </div>

            {/* Price Summary & Sequential Action */}
            <div className="p-2.5 rounded-xl bg-[#FFF5F7] border border-[#FF6B8B]/20 flex justify-between items-center text-xs">
              <span className="font-bold text-[#382A2C]">Total Estimate:</span>
              <AnimatedCounter
                value={plannerConfig.calculatedPriceLKR}
                className="text-sm font-extrabold text-[#FF6B8B]"
              />
            </div>

            {/* If on step 5, show Add to Bag. If on steps 1-4, show Next Step prompt */}
            {activeStep === 5 ? (
              <Button
                variant="pink"
                size="lg"
                className="w-full shadow-md"
                onClick={() => {
                  addCurrentCustomPlannerToCart();
                  setIsCartOpen(true);
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Cute Planner to Bag</span>
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="w-full font-extrabold text-xs"
                onClick={() => advanceToNextStep(activeStep + 1)}
              >
                <span>Step {activeStep} of 5 • Next Step</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
