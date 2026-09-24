'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Sparkles, MessageCircle, Heart, ShieldCheck, Mail } from 'lucide-react';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import {
  ColoredFlower,
  ColoredSparkle,
  ColoredHeart,
  ColoredRibbon,
  ColoredTruck,
  ColoredWhatsApp,
  ColoredCamera,
  ColoredLeaf,
} from '@/components/ui/colored-icons';

export function Footer() {
  const { openCustomizerWithPlanner } = useStore();

  return (
    <footer className="bg-[#382A2C] text-[#FFF5F7] pt-12 sm:pt-16 pb-10 border-t-2 border-[#FF6B8B]/20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#FF6B8B] text-white flex items-center justify-center font-heading text-lg font-extrabold shadow-sm">
                <ColoredFlower size={20} />
              </div>
              <span className="font-heading text-2xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
                <span>Little Lines</span>
                <ColoredSparkle size={20} />
              </span>
            </Link>
            
            <p className="text-xs text-[#FFF5F7]/80 max-w-sm leading-relaxed font-semibold">
              Handcrafted with love in Sri Lanka! Cute stationery, study organizers, and customizable 4–12 month A/L planners on 120gsm zero-bleed paper.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors shadow-xs"
                title="WhatsApp Little Lines"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@littlelines.store"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B8B] text-white flex items-center justify-center transition-colors shadow-xs"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
              <div className="w-12 h-12 ml-2 flex items-center justify-center opacity-95 shrink-0">
                <LottieAnimation src="/animation/Looping Flower.json" speed={0.6} width={48} height={48} />
              </div>
            </div>
          </div>

          {/* Planners Col */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-extrabold text-[#FFAAA6] text-sm sm:text-base flex items-center gap-1.5">
              <ColoredFlower size={15} />
              <span>Cute Planners</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#FFF5F7]/80">
              <li>
                <Link
                  href="/studio?planner=al_study"
                  onClick={() => openCustomizerWithPlanner('al_study')}
                  className="hover:text-white transition-colors block"
                >
                  A/L Study Planners (4–12 Mos)
                </Link>
              </li>
              <li>
                <Link
                  href="/studio?planner=year_planner"
                  onClick={() => openCustomizerWithPlanner('year_planner')}
                  className="hover:text-white transition-colors block"
                >
                  2027 Full Year Planners
                </Link>
              </li>
              <li>
                <Link
                  href="/studio?planner=daily_planner"
                  onClick={() => openCustomizerWithPlanner('daily_planner')}
                  className="hover:text-white transition-colors block"
                >
                  Daily Planners (100–300p)
                </Link>
              </li>
            </ul>
          </div>

          {/* Stationery Col */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-extrabold text-[#FFAAA6] text-sm sm:text-base flex items-center gap-1.5">
              <ColoredRibbon size={15} />
              <span>Sweet Boutique</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#FFF5F7]/80">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors block">
                  Pastel Sticky Notes & Tabs
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors block">
                  To-Do Lists & Notepads
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors block">
                  Mini Stand-Up Calendars
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors block">
                  Pastel Wall Stickers
                </Link>
              </li>
            </ul>
          </div>

          {/* Craft Promise Col */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-extrabold text-[#FFAAA6] text-sm sm:text-base flex items-center gap-1.5">
              <ColoredSparkle size={15} />
              <span>Craft Promise</span>
            </h4>
            <div className="space-y-2 text-xs font-semibold text-[#FFF5F7]/80">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#86E3CE] shrink-0 mt-0.5" />
                <span>120gsm zero bleed paper</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ColoredCamera size={14} className="shrink-0 mt-0.5" />
                <span>Free photo cover printing</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ColoredHeart size={14} className="shrink-0 mt-0.5" />
                <span>Handmade with Love in Sri Lanka</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF5F7]/60 text-center sm:text-left font-semibold">
          <p className="flex items-center justify-center sm:justify-start gap-1.5">
            <span>© {new Date().getFullYear()} Little Lines Studio</span>
            <ColoredFlower size={13} />
            <span>All rights reserved with love.</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ColoredTruck size={14} />
              <span>Islandwide Courier Delivery</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ColoredWhatsApp size={14} />
              <span>Instant WhatsApp Dispatch</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
