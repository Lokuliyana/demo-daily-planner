'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { ShoppingBag, Sparkles, MessageCircle, BookOpen, Menu, X, ArrowRight } from 'lucide-react';

export function Navbar() {
  const { cartCount, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-2 sm:top-4 z-50 w-full px-3 sm:px-4 pointer-events-none">
      {/* Floating Pill Navigation Dock */}
      <header className={`pointer-events-auto mx-auto max-w-4xl ${mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'} bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_10px_25px_rgba(0,0,0,0.05)] px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all`}>
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#C26D4A] text-white flex items-center justify-center shadow-md shadow-[#C26D4A]/25 group-hover:scale-105 active:scale-95 transition-transform">
              <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-xl font-bold tracking-tight text-[#24211E] block leading-none">
                Little Lines
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#635B53] font-medium hidden sm:block mt-0.5">
                Handcrafted Planners
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#635B53] bg-[#FAF6F0]/80 p-1 rounded-full border border-[#24211E]/6">
            <Link
              href="/studio"
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 active:scale-95 ${
                pathname === '/studio'
                  ? 'bg-[#C26D4A] text-white shadow-sm font-bold'
                  : 'hover:text-[#C26D4A] hover:bg-white text-[#24211E]'
              }`}
            >
              <span>Custom Studio</span>
              <span className="text-[11px]">✨</span>
            </Link>
            <Link
              href="/catalog"
              className={`px-3.5 py-1.5 rounded-full transition-all active:scale-95 ${
                pathname === '/catalog'
                  ? 'bg-[#C26D4A] text-white shadow-sm font-bold'
                  : 'hover:text-[#C26D4A] hover:bg-white text-[#24211E]'
              }`}
            >
              Catalog
            </Link>
            <Link
              href="/reviews"
              className={`px-3.5 py-1.5 rounded-full transition-all active:scale-95 ${
                pathname === '/reviews'
                  ? 'bg-[#C26D4A] text-white shadow-sm font-bold'
                  : 'hover:text-[#C26D4A] hover:bg-white text-[#24211E]'
              }`}
            >
              Reviews
            </Link>
          </nav>

          {/* Actions (Tactile WhatsApp & Cart Triggers) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* WhatsApp Trigger */}
            <a
              href="https://wa.me/94771234567?text=Hi%20Little%20Lines!%20I'd%20like%20to%20inquire%20about%20customizing%20a%20planner."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#6E8574]/15 hover:bg-[#6E8574]/25 text-[#304836] border border-[#6E8574]/30 shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#304836]" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger with Terracotta Accent */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-[#FAF6F0] border border-[#C26D4A]/30 text-[#24211E] shadow-[0_2px_8px_rgba(194,109,74,0.08)] hover:shadow-md hover:border-[#C26D4A] active:scale-95 transition-all cursor-pointer"
              aria-label="View shopping cart"
            >
              <div className="w-5 h-5 rounded-full bg-[#C26D4A]/10 text-[#C26D4A] flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#24211E] hidden sm:inline">Cart</span>
              {cartCount > 0 ? (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#C26D4A] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[11px] text-[#8E847A] font-mono">(0)</span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#24211E] hover:bg-black/5 active:scale-90 transition-transform"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#24211E]/10 space-y-2">
            <Link
              href="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2.5 px-4 rounded-2xl text-[#C26D4A] font-bold bg-[#C26D4A]/10 flex items-center justify-between text-xs active:scale-95 transition-transform"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Custom Studio
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2 px-4 rounded-2xl text-[#24211E] hover:bg-black/5 block text-xs font-semibold active:scale-95 transition-transform"
            >
              Stationery Catalog
            </Link>
            <Link
              href="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2 px-4 rounded-2xl text-[#24211E] hover:bg-black/5 block text-xs font-semibold active:scale-95 transition-transform"
            >
              Student Reviews & Community Wall
            </Link>
            <a
              href="https://wa.me/94771234567?text=Hi%20Little%20Lines!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded-full text-[#304836] font-bold bg-[#6E8574]/15 border border-[#6E8574]/30 flex items-center justify-center gap-2 mt-2 text-xs active:scale-95 transition-transform"
            >
              <MessageCircle className="w-4 h-4" /> Message on WhatsApp
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

