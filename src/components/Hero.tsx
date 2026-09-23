'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Feather,
  Heart,
  Star,
  Tag,
  MessageCircle,
  Clock,
  Layers,
  ShoppingBag,
  Sparkle,
} from 'lucide-react';
import { PRODUCTS_CATALOG } from '@/lib/data';

export function Hero() {
  const { openCustomizerWithPlanner, addToCart, setQuickViewProduct } = useStore();

  const readyToShipPicks = PRODUCTS_CATALOG.filter((p) =>
    ['sticky-notes-pastel-palette', 'todo-notepad-daily-focus', 'study-habit-flag-tabs', 'desk-calendar-2027-mini'].includes(p.id)
  );

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 max-w-7xl mx-auto space-y-12">
      
      {/* 1. Hero Atmospheric Canvas (Edge-to-edge warm banner rounded-[32px]) */}
      <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gradient-to-br from-[#EFECE4] via-[#F4F1EA] to-[#E9E4D9] border border-[#24211E]/8 p-6 sm:p-10 lg:p-14 shadow-paper">
        
        {/* Ambient Warm Desk Backdrops & Visual Elements */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 md:opacity-30 pointer-events-none mix-blend-multiply overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&auto=format&fit=crop&q=80"
            alt="Warm desk stationery study setup with notebooks and tea"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Hero Text & Editorial Headings */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Washi Tape / Frosted Pills Row with Organic Tilt */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm washi-sage text-xs font-bold -rotate-2 transform shadow-sm">
                <Tag className="w-3.5 h-3.5 text-[#304836]" />
                <span>🏷️ A/L 2026/27 Syllabus</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-floating-pill text-xs font-bold text-[#24211E] rotate-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>⭐ 4.9 (840+ Sri Lankan Teens)</span>
              </div>
            </div>

            {/* Editorial Headline with Highlighter Underline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#24211E] leading-[1.14]">
              Plan your A/Ls <br className="hidden sm:inline" />
              <span className="highlighter-underline italic font-normal text-[#C26D4A]">with quiet clarity.</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#635B53] max-w-xl leading-relaxed font-normal">
              Handcrafted 120gsm bleed-proof planners, tailored to your pace. 
              Emboss your name in gold leaf, track past paper scores, and turn heavy model papers into daily wins.
            </p>

            {/* Zero Friction Tactile Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/studio"
                className="px-6 py-3.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-sm shadow-[0_4px_14px_rgba(194,109,74,0.35)] hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4" />
                <span>✨ Build Your Custom Planner</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/catalog"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF6F0] border border-[#24211E]/12 text-[#24211E] font-bold text-sm shadow-floating-pill active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore Stationery ↓</span>
              </Link>
            </div>
          </div>

          {/* Right Tactile Showcase with Living Book Mockup */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-2">
            
            {/* Main Interactive Book Hero Tile */}
            <div className="relative w-full max-w-[310px] bg-white p-4 sm:p-5 rounded-[28px] shadow-book border border-[#24211E]/10 rotate-1 hover:rotate-0 transition-all duration-300">
              
              {/* Gold Corner Accents */}
              <div className="corner-gold-tl" />
              <div className="corner-gold-tr" />
              <div className="corner-gold-bl" />
              <div className="corner-gold-br" />

              {/* Book Cover Container */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-inner bg-[#1A1816] text-white p-5 flex flex-col justify-between border border-black/20">
                {/* Spiral Ring Binding */}
                <div className="absolute left-1.5 top-0 bottom-0 flex flex-col justify-around py-3 z-30">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-1.5 bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-500 rounded-full shadow-sm -ml-2 border border-zinc-600/40"
                    />
                  ))}
                </div>

                {/* Cover Theme Art */}
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
                  alt="Doctor Theme A/L Planner"
                  className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity"
                />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-between items-start pl-3">
                  <span className="text-[9px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
                    8 MONTHS A/L STUDY
                  </span>
                  <span className="text-[9px] font-semibold bg-[#D4AF37] text-black px-1.5 py-0.5 rounded shadow-sm">
                    Hardcover
                  </span>
                </div>

                {/* Center Title */}
                <div className="relative z-10 text-center pl-3 space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow">
                    FUTURE DOCTOR
                  </h3>
                  <p className="text-[10px] text-amber-200/90 tracking-widest font-mono">
                    2026 / 2027 A/L DREAM
                  </p>
                </div>

                {/* Bottom Custom Tag */}
                <div className="relative z-10 flex justify-between items-end pl-3 border-t border-white/20 pt-2 text-[10px]">
                  <div>
                    <span className="text-white/60 block text-[8px]">Gold Foil Embossed:</span>
                    <span className="font-semibold text-white gold-foil-text text-xs">
                      Dr. Nethmi Sandeepani
                    </span>
                  </div>
                  <span className="font-mono font-bold text-amber-300">
                    LKR 2,400/=
                  </span>
                </div>
              </div>
            </div>

            {/* Layered Floating Card 1: 120gsm Fountain Pen Friendly */}
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/90 backdrop-blur-md border border-white/70 p-3 rounded-2xl shadow-floating-pill flex items-center gap-2.5 text-xs text-[#24211E] font-semibold -rotate-1 hover:rotate-0 transition-transform">
              <div className="w-7 h-7 rounded-xl bg-[#6E8574]/20 text-[#3F5545] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold">120gsm Zero Bleed</span>
            </div>

            {/* Layered Floating Card 2: 12 Monthly Shine Pages */}
            <div className="absolute -bottom-4 -left-3 sm:-left-5 bg-white/90 backdrop-blur-md border border-white/70 p-3.5 rounded-2xl shadow-floating-pill flex items-center gap-3 text-xs max-w-[210px] rotate-2 hover:rotate-0 transition-transform">
              <div className="w-8 h-8 rounded-xl bg-[#C26D4A]/15 text-[#C26D4A] flex items-center justify-center shrink-0">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#24211E] block leading-tight">
                  12 Shine Divider Pages
                </span>
                <span className="text-[10px] text-[#635B53]">
                  Free Custom Photo Prints
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Step-by-Step Clarity (Why Little Lines?) */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="h-px bg-[#24211E]/10 flex-1" />
          <div className="washi-tape px-3.5 py-1 rounded-sm text-xs font-bold tracking-wider text-[#635B53] -rotate-1">
            ✦ CRAFTED STATIONERY WORKFLOW
          </div>
          <span className="h-px bg-[#24211E]/10 flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="tactile-card p-6 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#C26D4A]/10 text-[#C26D4A] flex items-center justify-center font-bold text-sm shadow-inner">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-[#24211E]">
                1. Pick Your Syllabus
              </h3>
              <p className="text-xs text-[#635B53] leading-relaxed">
                4 to 12 months tailored to your A/L target year (2026/2027/2028). Includes past paper trackers (MCQ & SEQ 2015-2025) and daily study hours.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#6E8574] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Subject targets & timetable
            </span>
          </div>

          {/* Step 2 */}
          <div className="tactile-card p-6 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#6E8574]/15 text-[#3F5545] flex items-center justify-center font-bold text-sm shadow-inner">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-[#24211E]">
                2. Choose Cover Artwork
              </h3>
              <p className="text-xs text-[#635B53] leading-relaxed">
                Emboss your name in luxury gold foil. Pick from doctor, engineering, anime, or botanical themes — or upload your dream collage for the cover & shine pages.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#6E8574] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Free custom cover photo printing
            </span>
          </div>

          {/* Step 3 */}
          <div className="tactile-card p-6 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 text-[#8C6D15] flex items-center justify-center font-bold text-sm shadow-inner">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-[#24211E]">
                3. Direct WhatsApp Dispatch
              </h3>
              <p className="text-xs text-[#635B53] leading-relaxed">
                No complicated checkout gateways. 1-click dispatch to our workshop WhatsApp with Cash on Delivery (COD) or Bank Transfer options.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#6E8574] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Islandwide 2-3 day delivery
            </span>
          </div>
        </div>
      </div>

      {/* 3. Popular Ready-to-Ship Picks */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="washi-terracotta px-3 py-0.5 rounded-sm text-xs font-bold inline-block -rotate-2">
              Ready-to-Ship Essentials
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24211E]">
              <span className="highlighter-underline">Popular Ready-to-Ship Picks</span>
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-bold text-[#C26D4A] hover:underline flex items-center gap-1 active:scale-95 transition-transform"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Blueprint-specific Ready-to-Ship category pill chips with Tactile styling */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          <Link
            href="/catalog"
            className="px-4 py-2 rounded-2xl bg-white border border-[#24211E]/10 hover:border-[#C26D4A] text-xs font-bold text-[#24211E] shadow-[0_2px_8px_rgba(0,0,0,0.04)] whitespace-nowrap active:scale-95 hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>📝 Sticky Notes</span>
          </Link>
          <Link
            href="/catalog"
            className="px-4 py-2 rounded-2xl bg-white border border-[#24211E]/10 hover:border-[#C26D4A] text-xs font-bold text-[#24211E] shadow-[0_2px_8px_rgba(0,0,0,0.04)] whitespace-nowrap active:scale-95 hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>📋 A/L Daily Sheets</span>
          </Link>
          <Link
            href="/catalog"
            className="px-4 py-2 rounded-2xl bg-white border border-[#24211E]/10 hover:border-[#C26D4A] text-xs font-bold text-[#24211E] shadow-[0_2px_8px_rgba(0,0,0,0.04)] whitespace-nowrap active:scale-95 hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>📑 PET Index Tabs</span>
          </Link>
          <Link
            href="/catalog"
            className="px-4 py-2 rounded-2xl bg-white border border-[#24211E]/10 hover:border-[#C26D4A] text-xs font-bold text-[#24211E] shadow-[0_2px_8px_rgba(0,0,0,0.04)] whitespace-nowrap active:scale-95 hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>🗓️ Desk Calendars</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {readyToShipPicks.map((pick) => (
            <div
              key={pick.id}
              className="tactile-card p-4 flex flex-col justify-between group overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6F0]">
                  <img
                    src={pick.image}
                    alt={pick.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {pick.badge && (
                    <span className="absolute top-2 left-2 text-[9px] font-bold bg-[#C26D4A] text-white px-2 py-0.5 rounded-full shadow-sm">
                      {pick.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-[#24211E] group-hover:text-[#C26D4A] transition-colors leading-snug">
                    {pick.title}
                  </h4>
                  <p className="text-[11px] text-[#635B53] line-clamp-1 mt-0.5">
                    {pick.specs.paper || 'Premium Stationery Sheet'}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#24211E]/8 flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#C26D4A]">
                  LKR {pick.priceLKR.toLocaleString()}/=
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setQuickViewProduct(pick)}
                    className="px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#24211E]/5 text-[#24211E] text-xs font-semibold active:scale-95 transition-transform cursor-pointer"
                  >
                    Quick View
                  </button>
                  <button
                    onClick={() =>
                      addToCart({
                        productId: pick.id,
                        title: pick.title,
                        priceLKR: pick.priceLKR,
                        quantity: 1,
                        image: pick.image,
                      })
                    }
                    className="p-2 rounded-full bg-[#24211E] hover:bg-[#C26D4A] text-white shadow-sm active:scale-95 transition-all cursor-pointer"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

