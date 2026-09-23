'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { BookOpen, Sparkles, MessageCircle, Heart, ShieldCheck, Mail } from 'lucide-react';

export function Footer() {
  const { openCustomizerWithPlanner } = useStore();

  return (
    <footer className="bg-[#201D1A] text-[#EDE8DF] pt-12 sm:pt-16 pb-10 border-t border-black/20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#94442A] text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                Little Lines
              </span>
            </div>
            
            <p className="text-xs text-[#EDE8DF]/70 max-w-sm leading-relaxed">
              Mindfully handcrafted stationery, study organizers, and customizable 3–12 month planners. 
              Designed to help students, creators, and professionals turn big goals into daily habits.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#506850] text-white flex items-center justify-center transition-colors"
                title="WhatsApp Little Lines"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#94442A] text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="mailto:hello@littlelines.store"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B07E32] text-white flex items-center justify-center transition-colors"
                title="Email Support"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Planners Col */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-white text-xs sm:text-sm">
              Custom Planners
            </h4>
            <ul className="space-y-1.5 text-xs text-[#EDE8DF]/70">
              <li>
                <button
                  onClick={() => openCustomizerWithPlanner('al_study')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  A/L Study Planners (4–12 Months)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCustomizerWithPlanner('year_planner')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  2027 Full Year Life Planners
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCustomizerWithPlanner('daily_planner')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Daily Planners (100–300p)
                </button>
              </li>
            </ul>
          </div>

          {/* Stationery Col */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-white text-xs sm:text-sm">
              Stationery Essentials
            </h4>
            <ul className="space-y-1.5 text-xs text-[#EDE8DF]/70">
              <li>
                <a href="#stationery-catalog" className="hover:text-white transition-colors">
                  Pastel Sticky Notes & Tabs
                </a>
              </li>
              <li>
                <a href="#stationery-catalog" className="hover:text-white transition-colors">
                  To-Do Lists & Notepads
                </a>
              </li>
              <li>
                <a href="#stationery-catalog" className="hover:text-white transition-colors">
                  Stand-Up Mini Calendars
                </a>
              </li>
              <li>
                <a href="#stationery-catalog" className="hover:text-white transition-colors">
                  Vinyl Wall Stickers
                </a>
              </li>
            </ul>
          </div>

          {/* Craft Promise Col */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-white text-xs sm:text-sm">
              Craft Promise
            </h4>
            <div className="space-y-1.5 text-xs text-[#EDE8DF]/70">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#506850] shrink-0 mt-0.5" />
                <span>120gsm ink-proof smooth paper</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B07E32] shrink-0 mt-0.5" />
                <span>Free custom cover & photo printing</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#94442A] shrink-0 mt-0.5" />
                <span>Hand-bound in Sri Lanka</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#EDE8DF]/50 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Little Lines Stationery. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Islandwide Courier Delivery</span>
            <span>•</span>
            <span>WhatsApp Quick Dispatch</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
