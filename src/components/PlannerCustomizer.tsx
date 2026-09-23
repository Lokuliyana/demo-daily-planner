'use client';

import React, { useState } from 'react';
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
  BookOpen,
  Calendar,
  Layers,
  Palette,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Upload,
  CheckCircle2,
  Stethoscope,
  Compass,
  Scale,
  Coffee,
  Leaf,
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

  const handlePlannerTypeSelect = (type: PlannerType) => {
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
    { step: 1, label: 'Category', icon: BookOpen },
    { step: 2, label: 'Duration', icon: Calendar },
    { step: 3, label: 'Binding', icon: Layers },
    { step: 4, label: 'Design', icon: Palette },
    { step: 5, label: 'Trackers', icon: Sparkles },
  ];

  const getThemeIcon = (id: string) => {
    switch (id) {
      case 'theme_future_dr':
        return <Stethoscope className="w-3.5 h-3.5 text-[#A84A2A]" />;
      case 'theme_engineer':
        return <Compass className="w-3.5 h-3.5 text-[#3E5A44]" />;
      case 'theme_lawyer':
        return <Scale className="w-3.5 h-3.5 text-[#B07E32]" />;
      case 'theme_midnight_desk':
        return <Coffee className="w-3.5 h-3.5 text-[#A84A2A]" />;
      case 'theme_botanical_sage':
        return <Leaf className="w-3.5 h-3.5 text-[#3E5A44]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#A84A2A]" />;
    }
  };

  return (
    <section id="planner-studio" className="py-12 sm:py-20 scroll-mt-20 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#141312]/5 text-[#141312] text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#A84A2A]" />
            Studio Atelier
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#141312]">
            Custom Planner Studio
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5854]">
            Select your syllabus duration, cover finish, personalized gold embossing, and specialized trackers.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
            {steps.map((item) => {
              const Icon = item.icon;
              const isActive = activeStep === item.step;
              const isDone = activeStep > item.step;

              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#141312] text-white shadow-xs'
                      : isDone
                      ? 'bg-white text-[#3E5A44] border border-[#3E5A44]/30'
                      : 'bg-white text-[#5C5854] border border-[#141312]/8 hover:border-[#141312]/20'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 text-[#3E5A44]" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                  <span>
                    <span className="hidden sm:inline">0{item.step}. </span>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Step Forms */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-3xl border border-[#141312]/8 shadow-card space-y-6">
            
            {/* STEP 1: CATEGORY */}
            {activeStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141312]">
                    1. Select Planner Category
                  </h3>
                  <p className="text-xs text-[#5C5854] mt-0.5">
                    Choose the page framework tailored to your study stream or life rhythm.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div
                    onClick={() => handlePlannerTypeSelect('al_study')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.plannerType === 'al_study'
                        ? 'border-[#141312] bg-[#FAF9F6]'
                        : 'border-[#141312]/8 hover:border-[#141312]/20'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-[#A84A2A] text-white px-2 py-0.5 rounded-full inline-block mb-2">
                        Bestseller
                      </span>
                      <h4 className="font-semibold text-sm text-[#141312]">A/L Study Planner</h4>
                      <p className="text-xs text-[#5C5854] mt-1 leading-relaxed">
                        For 2026-2028 A/L students with MCQ/SEQ past paper trackers and study hours logs.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#141312]/8 flex justify-between items-center text-xs">
                      <span className="text-[#5C5854]">4–12 Months</span>
                      <span className="font-bold font-mono text-[#A84A2A]">From LKR 1,500/=</span>
                    </div>
                  </div>

                  <div
                    onClick={() => handlePlannerTypeSelect('year_planner')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.plannerType === 'year_planner'
                        ? 'border-[#141312] bg-[#FAF9F6]'
                        : 'border-[#141312]/8 hover:border-[#141312]/20'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-[#3E5A44] text-white px-2 py-0.5 rounded-full inline-block mb-2">
                        Full Year
                      </span>
                      <h4 className="font-semibold text-sm text-[#141312]">2027 Year Planner</h4>
                      <p className="text-xs text-[#5C5854] mt-1 leading-relaxed">
                        12-month life planner with 20+ trackers (Mood, Sleep, Budget, Travel, Reading).
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#141312]/8 flex justify-between items-center text-xs">
                      <span className="text-[#5C5854]">12 Months</span>
                      <span className="font-bold font-mono text-[#A84A2A]">LKR 2,000/=</span>
                    </div>
                  </div>

                  <div
                    onClick={() => handlePlannerTypeSelect('daily_planner')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.plannerType === 'daily_planner'
                        ? 'border-[#141312] bg-[#FAF9F6]'
                        : 'border-[#141312]/8 hover:border-[#141312]/20'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-[#B07E32] text-white px-2 py-0.5 rounded-full inline-block mb-2">
                        Daily Focus
                      </span>
                      <h4 className="font-semibold text-sm text-[#141312]">Daily Planners</h4>
                      <p className="text-xs text-[#5C5854] mt-1 leading-relaxed">
                        Daily prioritized task list with 6am-11pm hourly schedule blocks.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#141312]/8 flex justify-between items-center text-xs">
                      <span className="text-[#5C5854]">100–300 Pages</span>
                      <span className="font-bold font-mono text-[#A84A2A]">From LKR 1,100/=</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-3 rounded-full bg-[#141312] text-white font-semibold text-xs hover:bg-[#A84A2A] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Select Duration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DURATION */}
            {activeStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141312]">
                    2. Select Duration & Capacity
                  </h3>
                  <p className="text-xs text-[#5C5854] mt-0.5">
                    Choose the duration that aligns with your upcoming exams or timeline.
                  </p>
                </div>

                {plannerConfig.plannerType === 'al_study' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {([4, 5, 6, 7, 8, 9, 10, 11, 12] as DurationMonths[]).map((m) => {
                      const isSelected = plannerConfig.durationMonths === m;
                      const price = DURATION_PRICES_LKR[m];
                      return (
                        <div
                          key={m}
                          onClick={() =>
                            setPlannerConfig((prev) => ({ ...prev, durationMonths: m }))
                          }
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'border-[#141312] bg-[#FAF9F6]'
                              : 'border-[#141312]/8 hover:border-[#141312]/20'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-[#141312]">{m} Months</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#141312]" />}
                          </div>
                          <p className="text-[11px] text-[#5C5854] mt-0.5">
                            {m * 31} Daily study sheets
                          </p>
                          <span className="block font-mono font-bold text-xs text-[#A84A2A] mt-2">
                            LKR {price.toLocaleString()}/=
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {plannerConfig.plannerType === 'year_planner' && (
                  <div className="p-4 rounded-2xl bg-[#3E5A44]/8 border border-[#3E5A44]/20 text-xs text-[#141312] space-y-1.5">
                    <div className="font-bold text-[#3E5A44]">
                      Full 12 Months Life Planner (Jan - Dec 2027 / 2028)
                    </div>
                    <p className="text-[#5C5854] leading-relaxed">
                      Includes 12 Monthly shine divider pages (free photo customization), 52 weekly spreads, and 20+ specialized trackers.
                    </p>
                    <span className="font-mono font-bold text-xs text-[#A84A2A] block pt-1">
                      Base Price: LKR 2,000/=
                    </span>
                  </div>
                )}

                {plannerConfig.plannerType === 'daily_planner' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[100, 150, 200, 250, 300].map((pages) => {
                      const isSelected = (plannerConfig.dailyPageCount || 200) === pages;
                      const price = DAILY_PLANNER_PRICES_LKR[pages] || 1500;
                      return (
                        <div
                          key={pages}
                          onClick={() =>
                            setPlannerConfig((prev) => ({ ...prev, dailyPageCount: pages }))
                          }
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'border-[#141312] bg-[#FAF9F6]'
                              : 'border-[#141312]/8 hover:border-[#141312]/20'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-[#141312]">{pages} Pages</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#141312]" />}
                          </div>
                          <p className="text-[11px] text-[#5C5854] mt-0.5">
                            {pages} Task sheets
                          </p>
                          <span className="block font-mono font-bold text-xs text-[#A84A2A] mt-2">
                            LKR {price.toLocaleString()}/=
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-2.5 rounded-full border border-[#141312]/12 text-[#5C5854] font-semibold text-xs flex items-center gap-1.5 hover:bg-black/5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-2.5 rounded-full bg-[#141312] text-white font-semibold text-xs hover:bg-[#A84A2A] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Cover Finish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: COVER FINISH */}
            {activeStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141312]">
                    3. Choose Cover Finish
                  </h3>
                  <p className="text-xs text-[#5C5854] mt-0.5">
                    Both options include scratch-resistant thermal lamination and durable twin-ring binding.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() =>
                      setPlannerConfig((prev) => ({ ...prev, coverType: 'soft_laminated' }))
                    }
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.coverType === 'soft_laminated'
                        ? 'border-[#141312] bg-[#FAF9F6]'
                        : 'border-[#141312]/8 hover:border-[#141312]/20'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#141312]">
                          Soft Cover (Full Laminated)
                        </span>
                        {plannerConfig.coverType === 'soft_laminated' && (
                          <CheckCircle2 className="w-4 h-4 text-[#141312]" />
                        )}
                      </div>
                      <p className="text-xs text-[#5C5854] mt-2 leading-relaxed">
                        Flexible 300gsm heavy art card with scratch-proof thermal lamination. Lightweight for daily travel.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#141312]/8">
                      <span className="text-[11px] font-semibold text-[#3E5A44]">
                        Standard Included
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setPlannerConfig((prev) => ({ ...prev, coverType: 'hardcover_corners' }))
                    }
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.coverType === 'hardcover_corners'
                        ? 'border-[#141312] bg-[#FAF9F6]'
                        : 'border-[#141312]/8 hover:border-[#141312]/20'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#141312]">
                          Hard Cover + Gold Metal Corners
                        </span>
                        {plannerConfig.coverType === 'hardcover_corners' && (
                          <CheckCircle2 className="w-4 h-4 text-[#141312]" />
                        )}
                      </div>
                      <p className="text-xs text-[#5C5854] mt-2 leading-relaxed">
                        2mm rigid industrial board cover with 4 luxury gold metal corner protectors. Highly protective.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#141312]/8 flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#B07E32] uppercase text-[10px]">
                        Luxury Upgrade
                      </span>
                      <span className="font-mono font-bold text-[#A84A2A]">
                        + LKR {HARDCOVER_ADDON_PRICE_LKR}/=
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-2.5 rounded-full border border-[#141312]/12 text-[#5C5854] font-semibold text-xs flex items-center gap-1.5 hover:bg-black/5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2.5 rounded-full bg-[#141312] text-white font-semibold text-xs hover:bg-[#A84A2A] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Personalize</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DESIGN & PERSONALIZATION */}
            {activeStep === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141312]">
                    4. Personalize Cover Artwork & Title
                  </h3>
                  <p className="text-xs text-[#5C5854] mt-0.5">
                    Pick a curated theme preset or apply your own custom photo link.
                  </p>
                </div>

                <div className="flex gap-2 p-1 bg-[#F3F1EC] rounded-2xl">
                  <button
                    onClick={() => setPhotoMode('preset')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      photoMode === 'preset'
                        ? 'bg-white text-[#141312] shadow-xs'
                        : 'text-[#5C5854]'
                    }`}
                  >
                    Theme Presets
                  </button>
                  <button
                    onClick={() => setPhotoMode('upload')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      photoMode === 'upload'
                        ? 'bg-white text-[#141312] shadow-xs'
                        : 'text-[#5C5854]'
                    }`}
                  >
                    Custom Photo
                  </button>
                </div>

                {photoMode === 'preset' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                          className={`group relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#141312] ring-2 ring-[#141312]/15'
                              : 'border-transparent hover:border-[#141312]/15'
                          }`}
                        >
                          <div className="aspect-[4/3] relative">
                            <img
                              src={theme.imageUrl}
                              alt={theme.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 text-white flex items-center gap-1.5">
                              {getThemeIcon(theme.id)}
                              <span className="text-[11px] font-bold block leading-tight truncate">
                                {theme.name}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#141312] text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {photoMode === 'upload' && (
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#141312]/8 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#141312]">
                      <Upload className="w-4 h-4 text-[#A84A2A]" />
                      <span>Custom Photo Link</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Paste image URL (https://...)"
                        value={customPhotoInput}
                        onChange={(e) => setCustomPhotoInput(e.target.value)}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-[#141312]/12 text-xs text-[#141312] focus:outline-none focus:border-[#141312]"
                      />
                      <button
                        onClick={() => {
                          if (customPhotoInput) {
                            setPlannerConfig((prev) => ({
                              ...prev,
                              customPhotoUrl: customPhotoInput,
                            }));
                          }
                        }}
                        className="px-4 py-2 bg-[#141312] text-white text-xs font-semibold rounded-xl hover:bg-[#A84A2A] cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-[11px] text-[#5C5854]">
                      You can also send your 12 monthly high-res photos via WhatsApp after placing the order request.
                    </p>
                  </div>
                )}

                {/* Text Personalization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#141312] mb-1">
                      Embossed Name
                    </label>
                    <input
                      type="text"
                      value={plannerConfig.customName}
                      onChange={(e) =>
                        setPlannerConfig((prev) => ({ ...prev, customName: e.target.value }))
                      }
                      placeholder="e.g. Dr. Sarah / Nethmi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#141312]/12 text-xs text-[#141312] font-medium focus:outline-none focus:border-[#141312]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#141312] mb-1">
                      Cover Title
                    </label>
                    <input
                      type="text"
                      value={plannerConfig.coverTitle}
                      onChange={(e) =>
                        setPlannerConfig((prev) => ({ ...prev, coverTitle: e.target.value }))
                      }
                      placeholder="e.g. MY STUDY PLANNER"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#141312]/12 text-xs text-[#141312] font-medium focus:outline-none focus:border-[#141312]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#141312] mb-1">
                      Special Note for Artisan Team
                    </label>
                    <input
                      type="text"
                      value={plannerConfig.specialNotes || ''}
                      onChange={(e) =>
                        setPlannerConfig((prev) => ({ ...prev, specialNotes: e.target.value }))
                      }
                      placeholder="e.g. Please format shine pages for 2027 Medical Bio exam countdown"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#141312]/12 text-xs text-[#141312] focus:outline-none focus:border-[#141312]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-2.5 rounded-full border border-[#141312]/12 text-[#5C5854] font-semibold text-xs flex items-center gap-1.5 hover:bg-black/5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setActiveStep(5)}
                    className="px-6 py-2.5 rounded-full bg-[#141312] text-white font-semibold text-xs hover:bg-[#A84A2A] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Add-ons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: TRACKERS & REVIEW */}
            {activeStep === 5 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141312]">
                    5. Trackers & Optional Add-ons
                  </h3>
                  <p className="text-xs text-[#5C5854] mt-0.5">
                    Review included pages and pick optional stationery extras.
                  </p>
                </div>

                {/* Included Trackers List */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#141312]/8 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3E5A44]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Included Trackers & Pages</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#141312]">
                    {activeTrackers.map((tracker, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#3E5A44] shrink-0 mt-0.5" />
                        <span className="leading-snug">{tracker}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        addOnStickers: !prev.addOnStickers,
                      }))
                    }
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.addOnStickers
                        ? 'border-[#141312] bg-[#FAF9F6]'
                        : 'border-[#141312]/8 hover:border-[#141312]/20'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-xs text-[#141312]">Sticker Pack</h5>
                        <p className="text-[11px] text-[#5C5854]">3 study sheets</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={plannerConfig.addOnStickers}
                        readOnly
                        className="accent-[#141312]"
                      />
                    </div>
                    <span className="font-mono font-bold text-xs text-[#A84A2A] mt-2">
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
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.addOnStickyTabs
                        ? 'border-[#141312] bg-[#FAF9F6]'
                        : 'border-[#141312]/8 hover:border-[#141312]/20'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-xs text-[#141312]">Index Page Tabs</h5>
                        <p className="text-[11px] text-[#5C5854]">Translucent flags</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={plannerConfig.addOnStickyTabs}
                        readOnly
                        className="accent-[#141312]"
                      />
                    </div>
                    <span className="font-mono font-bold text-xs text-[#A84A2A] mt-2">
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
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      plannerConfig.addOnRibbon
                        ? 'border-[#141312] bg-[#FAF9F6]'
                        : 'border-[#141312]/8 hover:border-[#141312]/20'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-xs text-[#141312]">Satin Ribbon</h5>
                        <p className="text-[11px] text-[#5C5854]">Silk bookmark</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={plannerConfig.addOnRibbon}
                        readOnly
                        className="accent-[#141312]"
                      />
                    </div>
                    <span className="font-mono font-bold text-xs text-[#A84A2A] mt-2">
                      + LKR {ADDONS_PRICING_LKR.ribbon}/=
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-5 py-2.5 rounded-full border border-[#141312]/12 text-[#5C5854] font-semibold text-xs flex items-center gap-1.5 hover:bg-black/5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => {
                      addCurrentCustomPlannerToCart();
                      setIsCartOpen(true);
                    }}
                    className="px-6 py-3 rounded-full bg-[#141312] text-white font-bold text-xs sm:text-sm hover:bg-[#A84A2A] shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order Bag • LKR {plannerConfig.calculatedPriceLKR.toLocaleString()}/=</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Visualizer */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-[#141312]/8 shadow-card space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#8E8983] uppercase tracking-wider text-[10px]">
                  Live Desk Mockup
                </span>
                <span className="text-[#3E5A44] font-semibold bg-[#3E5A44]/10 px-2.5 py-0.5 rounded-full text-[10px]">
                  {plannerConfig.coverType === 'hardcover_corners'
                    ? 'Hardcover + Gold'
                    : 'Softcover Laminated'}
                </span>
              </div>

              {/* Book Shell */}
              <div className="relative aspect-[3/4] max-w-[260px] sm:max-w-[290px] mx-auto rounded-2xl overflow-hidden shadow-book bg-[#141312] text-white p-5 flex flex-col justify-between border border-black/30 transition-all duration-300">
                
                {plannerConfig.coverType === 'hardcover_corners' && (
                  <>
                    <div className="corner-gold-tl" />
                    <div className="corner-gold-tr" />
                    <div className="corner-gold-bl" />
                    <div className="corner-gold-br" />
                  </>
                )}

                {/* Spiral Rings */}
                <div className="absolute left-1.5 top-0 bottom-0 flex flex-col justify-around py-3.5 z-30">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-1.5 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-600 rounded-full shadow-xs -ml-2 border border-zinc-700/50"
                    />
                  ))}
                </div>

                <img
                  src={plannerConfig.customPhotoUrl || currentTheme.imageUrl}
                  alt={currentTheme.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity"
                />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-between items-start pl-3">
                  <span className="text-[8px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    {plannerConfig.plannerType === 'al_study'
                      ? `${plannerConfig.durationMonths} MONTHS A/L`
                      : plannerConfig.plannerType === 'year_planner'
                      ? '2027 FULL YEAR'
                      : `${plannerConfig.dailyPageCount || 200} DAILY PAGES`}
                  </span>
                  <span className="text-[8px] font-semibold bg-[#D4AF37] text-black px-1.5 py-0.5 rounded shadow-xs">
                    120gsm Paper
                  </span>
                </div>

                {/* Center Title */}
                <div className="relative z-10 text-center pl-3 space-y-1 my-auto">
                  <h4 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white drop-shadow">
                    {plannerConfig.coverTitle || 'MY PLANNER'}
                  </h4>
                  <p className="text-[9px] text-amber-200/90 tracking-widest font-mono">
                    {plannerConfig.coverSubtitle || 'LITTLE LINES'}
                  </p>
                </div>

                {/* Bottom Custom Name */}
                <div className="relative z-10 flex justify-between items-end pl-3 border-t border-white/20 pt-2.5 text-[9px]">
                  <div>
                    <span className="text-white/60 block text-[7px]">Embossed Name:</span>
                    <span className="font-semibold text-white truncate max-w-[110px] block">
                      {plannerConfig.customName || 'Your Name'}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-amber-300">
                    LKR {plannerConfig.calculatedPriceLKR.toLocaleString()}/=
                  </span>
                </div>
              </div>

              {/* Dynamic Price Summary */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#141312]/8 space-y-1 text-xs">
                <div className="flex justify-between items-center font-bold text-[#141312]">
                  <span>Total Estimate:</span>
                  <span className="font-mono text-sm text-[#A84A2A]">
                    LKR {plannerConfig.calculatedPriceLKR.toLocaleString()}/=
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  addCurrentCustomPlannerToCart();
                  setIsCartOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-[#141312] text-white font-bold text-xs hover:bg-[#A84A2A] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Planner to Bag</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
