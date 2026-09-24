'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Heart,
  Home,
} from 'lucide-react';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import {
  ColoredFlower,
  ColoredSparkle,
  ColoredHeart,
  ColoredCalendar,
  ColoredRibbon,
  ColoredPalette,
  ColoredBook,
  ColoredTruck,
  ColoredWhatsApp,
} from '@/components/ui/colored-icons';

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, openCustomizerWithPlanner } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', Icon: ColoredFlower, lucide: Home },
    { href: '/studio', label: 'Custom Studio', Icon: ColoredPalette, lucide: Sparkles, highlight: true },
    { href: '/studio?planner=al_study', label: 'A/L Planners', Icon: ColoredBook, lucide: BookOpen },
    { href: '/studio?planner=year_planner', label: '2027 Planners', Icon: ColoredCalendar, lucide: Calendar },
    { href: '/catalog', label: 'Marketplace', Icon: ColoredRibbon, lucide: Layers },
    { href: '/reviews', label: 'Reviews', Icon: ColoredHeart, lucide: Heart },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFDF9]/95 backdrop-blur-xl border-b-2 border-[#FF6B8B]/15 transition-all">
      {/* Cute Sweet Announcement Bar */}
      <div className="bg-gradient-to-r from-[#FF6B8B] via-[#FA5274] to-[#FFAAA6] text-white text-xs py-1.5 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2 shadow-xs">
        <ColoredFlower size={14} />
        <span>Free custom photo cover & 12 monthly shine divider pages on every planner</span>
        <ColoredSparkle size={13} />
        <span className="hidden md:inline opacity-60">•</span>
        <span className="hidden md:inline-flex items-center gap-1 text-pink-100">
          <ColoredTruck size={14} />
          <span>Islandwide Delivery</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Cute Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF6B8B] to-[#FFAAA6] text-white flex items-center justify-center shadow-[0_3px_0_#E04D6D] group-hover:scale-105 transition-transform overflow-hidden p-1 shrink-0">
            <LottieAnimation src="/animation/Looping Flower.json" width={28} height={28} />
          </div>
          <div>
            <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-[#382A2C] flex items-center gap-1 leading-none">
              <span>Little Lines</span>
              <ColoredSparkle size={16} />
            </span>
            <span className="text-[10px] font-bold tracking-wider text-[#FF6B8B] uppercase block mt-0.5">
              Cute Stationery Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-extrabold">
          {navLinks.map((item) => {
            const isActive = pathname === item.href.split('?')[0] && (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.split('?')[0]));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  item.highlight
                    ? 'bg-[#FFE5EC] text-[#FF6B8B] hover:bg-[#FFD1DC] border border-[#FF6B8B]/30 shadow-xs'
                    : isActive
                    ? 'text-[#FF6B8B] bg-[#FFF0F5]'
                    : 'text-[#6E5C5E] hover:text-[#FF6B8B] hover:bg-[#FFF5F7]'
                }`}
              >
                <item.Icon size={14} className="shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions (WhatsApp + Cart + Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/94771234567?text=Hi%20Little%20Lines!%20I'd%20like%20to%20inquire%20about%20customizing%20a%20planner."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#E6F9F5] text-[#1D7A66] border border-[#86E3CE]/50 hover:bg-[#86E3CE] hover:text-white transition-all shadow-xs"
          >
            <ColoredWhatsApp size={15} />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-full bg-white border-2 border-[#FF6B8B]/20 text-[#382A2C] shadow-[0_3px_0_#FFE4EC] hover:border-[#FF6B8B] transition-all cursor-pointer"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#FF6B8B]" />
            <span className="hidden sm:inline text-xs font-extrabold">Bag</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#FF6B8B] text-white text-[10px] font-extrabold flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#382A2C] hover:bg-[#FFF0F5] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF6B8B]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Modern Cute Fullscreen Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(4rem+1.75rem)] bottom-0 bg-[#FFFDF9]/98 backdrop-blur-2xl border-t-2 border-[#FF6B8B]/20 p-5 flex flex-col justify-between z-50 overflow-y-auto">
          <div className="space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6B8B] flex items-center gap-1.5">
              <ColoredFlower size={13} />
              <span>Quick Menu</span>
            </span>
            <div className="space-y-2 pt-1">
              <Link
                href="/studio"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-2xl bg-[#FFE5EC] text-[#FF6B8B] font-extrabold text-sm flex items-center justify-between transition-all shadow-xs"
              >
                <span className="flex items-center gap-2.5">
                  <ColoredPalette size={16} />
                  <span>Custom Planner Studio</span>
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-2xl bg-white border-2 border-[#FF6B8B]/15 text-[#382A2C] font-bold text-sm flex items-center gap-3 transition-all"
              >
                <ColoredFlower size={16} />
                <span>Home Page</span>
              </Link>

              <Link
                href="/studio?planner=al_study"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCustomizerWithPlanner('al_study');
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-white border-2 border-[#FF6B8B]/15 text-[#382A2C] font-bold text-sm flex items-center gap-3 transition-all"
              >
                <ColoredBook size={16} />
                <span>A/L Study Planners (4–12 Mos)</span>
              </Link>

              <Link
                href="/studio?planner=year_planner"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCustomizerWithPlanner('year_planner');
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-white border-2 border-[#FF6B8B]/15 text-[#382A2C] font-bold text-sm flex items-center gap-3 transition-all"
              >
                <ColoredCalendar size={16} />
                <span>2027 Full Year Planners</span>
              </Link>

              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-2xl bg-white border-2 border-[#FF6B8B]/15 text-[#382A2C] font-bold text-sm flex items-center gap-3 transition-all"
              >
                <ColoredRibbon size={16} />
                <span>Cute Stationery Boutique (24+)</span>
              </Link>

              <Link
                href="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-2xl bg-white border-2 border-[#FF6B8B]/15 text-[#382A2C] font-bold text-sm flex items-center gap-3 transition-all"
              >
                <ColoredHeart size={16} />
                <span>Bestie Reviews (840+)</span>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-[#FF6B8B]/15 space-y-2">
            <a
              href="https://wa.me/94771234567?text=Hi%20Little%20Lines!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full text-white font-extrabold bg-[#25D366] flex items-center justify-center gap-2 text-xs shadow-[0_3px_0_#189C4A]"
            >
              <ColoredWhatsApp size={16} />
              <span>Message on WhatsApp</span>
            </a>
            <p className="text-[10px] text-center font-bold text-[#FF6B8B] flex items-center justify-center gap-1.5">
              <span>Handcrafted in Sri Lanka</span>
              <ColoredFlower size={12} />
              <span>120gsm Zero-Bleed Paper</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
