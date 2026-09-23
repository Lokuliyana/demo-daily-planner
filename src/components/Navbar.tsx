'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  MessageSquare,
} from 'lucide-react';

export function Navbar() {
  const { cartCount, setIsCartOpen, openCustomizerWithPlanner } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-[#141312]/6 transition-all">
      {/* Sleek Announcement Bar */}
      <div className="bg-[#141312] text-[#FAF9F6] text-[11px] py-1.5 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A84A2A] animate-pulse" />
        <span>Free custom photo cover & monthly shine divider pages on all planners</span>
        <span className="hidden md:inline opacity-40">•</span>
        <span className="hidden md:inline text-white/70">Islandwide Sri Lanka Delivery</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 rounded-lg bg-[#141312] text-white flex items-center justify-center font-serif text-base font-bold shadow-xs group-hover:bg-[#A84A2A] transition-colors">
            L
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#141312] block leading-none">
              Little Lines
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8E8983] font-semibold block mt-0.5">
              Stationery Atelier
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide uppercase text-[#5C5854]">
          <button
            onClick={() => scrollToSection('planner-studio')}
            className="hover:text-[#A84A2A] text-[#A84A2A] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Studio Customizer
          </button>
          <button
            onClick={() => openCustomizerWithPlanner('al_study')}
            className="hover:text-[#141312] transition-colors"
          >
            A/L Planners
          </button>
          <button
            onClick={() => openCustomizerWithPlanner('year_planner')}
            className="hover:text-[#141312] transition-colors"
          >
            2027 Planners
          </button>
          <button
            onClick={() => scrollToSection('stationery-catalog')}
            className="hover:text-[#141312] transition-colors"
          >
            Stationery
          </button>
          <button
            onClick={() => scrollToSection('customer-reviews')}
            className="hover:text-[#141312] transition-colors"
          >
            Reviews
          </button>
        </nav>

        {/* Actions (WhatsApp + Cart + Menu) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="https://wa.me/94771234567?text=Hi%20Little%20Lines!%20I'd%20like%20to%20inquire%20about%20customizing%20a%20planner."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#141312]/5 text-[#141312] hover:bg-[#141312] hover:text-white transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full bg-white border border-[#141312]/8 text-[#141312] shadow-xs hover:border-[#141312]/25 transition-all cursor-pointer"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-semibold">Bag</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#A84A2A] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#141312] hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Modern Fullscreen Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[calc(4rem+1.75rem)] bottom-0 bg-[#FAF9F6]/98 backdrop-blur-2xl border-t border-[#141312]/8 p-6 flex flex-col justify-between z-50 animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E8983]">
                Navigation
              </span>
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => scrollToSection('planner-studio')}
                  className="w-full text-left py-3 px-4 rounded-2xl bg-[#A84A2A]/10 text-[#A84A2A] font-semibold text-sm flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4" /> Custom Planner Studio
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCustomizerWithPlanner('al_study');
                  }}
                  className="w-full text-left py-3 px-4 rounded-2xl bg-white border border-[#141312]/6 text-[#141312] font-semibold text-sm flex items-center gap-3 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#8E8983]" />
                  <span>A/L Study Planners (4–12 Months)</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCustomizerWithPlanner('year_planner');
                  }}
                  className="w-full text-left py-3 px-4 rounded-2xl bg-white border border-[#141312]/6 text-[#141312] font-semibold text-sm flex items-center gap-3 transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#8E8983]" />
                  <span>2027 Full Year Planners</span>
                </button>

                <button
                  onClick={() => scrollToSection('stationery-catalog')}
                  className="w-full text-left py-3 px-4 rounded-2xl bg-white border border-[#141312]/6 text-[#141312] font-semibold text-sm flex items-center gap-3 transition-all"
                >
                  <Layers className="w-4 h-4 text-[#8E8983]" />
                  <span>Stationery & Sticky Notes</span>
                </button>

                <button
                  onClick={() => scrollToSection('customer-reviews')}
                  className="w-full text-left py-3 px-4 rounded-2xl bg-white border border-[#141312]/6 text-[#141312] font-semibold text-sm flex items-center gap-3 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#8E8983]" />
                  <span>Student Reviews & Feedback</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#141312]/8 space-y-3">
            <a
              href="https://wa.me/94771234567?text=Hi%20Little%20Lines!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full text-white font-semibold bg-[#141312] flex items-center justify-center gap-2 text-xs shadow-sm hover:bg-[#A84A2A] transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Message on WhatsApp
            </a>
            <p className="text-[10px] text-center text-[#8E8983]">
              Handcrafted in Sri Lanka • 120gsm Fountain Pen Paper
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
