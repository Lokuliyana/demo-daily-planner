'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { X, Sparkles, ShoppingBag, Check, Star, ShieldCheck, Feather, CheckCircle2 } from 'lucide-react';

export function ProductQuickView() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    openCustomizerWithPlanner,
  } = useStore();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Elevated Paper Tray Card Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#24211E]/12 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-[#24211E] shadow-sm transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual & Macro Ink Test Column */}
        <div className="md:w-1/2 relative bg-[#FAF6F0] min-h-[260px] md:min-h-full flex flex-col justify-between p-4">
          <div className="relative rounded-2xl overflow-hidden aspect-square">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.title}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-3 left-3 text-[10px] font-bold washi-terracotta px-2.5 py-0.5 rounded shadow-sm">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Fountain-Pen Ink Test Micro-Card */}
          <div className="mt-3 p-3 rounded-2xl bg-white border border-[#24211E]/10 shadow-sm space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#3F5545]">
              <CheckCircle2 className="w-4 h-4 text-[#6E8574]" />
              <span>120gsm Zero Bleed Guarantee</span>
            </div>
            <p className="text-[11px] text-[#635B53] leading-snug">
              Tested with Pilot G2, Stabilo Boss, and fountain pen inks with 0% ghosting or show-through.
            </p>
          </div>
        </div>

        {/* Details Column */}
        <div className="md:w-1/2 p-6 sm:p-7 overflow-y-auto flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500 text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'text-zinc-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-[#635B53]">
                {quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#24211E] leading-snug">
              {quickViewProduct.title}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-[#C26D4A]">
                LKR {quickViewProduct.priceLKR.toLocaleString()}/=
              </span>
              {quickViewProduct.originalPriceLKR && (
                <span className="font-mono text-sm text-[#8E847A] line-through">
                  LKR {quickViewProduct.originalPriceLKR.toLocaleString()}/=
                </span>
              )}
            </div>

            <p className="text-xs text-[#635B53] leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Specifications Box */}
            <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/8 space-y-1.5 text-xs">
              <span className="font-bold text-[#24211E] block mb-1">Paper & Craft Specs:</span>
              {quickViewProduct.specs.size && (
                <div className="flex justify-between text-[#635B53]">
                  <span>Size:</span>
                  <span className="font-medium text-[#24211E]">{quickViewProduct.specs.size}</span>
                </div>
              )}
              {quickViewProduct.specs.paper && (
                <div className="flex justify-between text-[#635B53]">
                  <span>Paper Weight:</span>
                  <span className="font-medium text-[#24211E]">{quickViewProduct.specs.paper}</span>
                </div>
              )}
              {quickViewProduct.specs.pages && (
                <div className="flex justify-between text-[#635B53]">
                  <span>Sheets/Pages:</span>
                  <span className="font-medium text-[#24211E]">{quickViewProduct.specs.pages}</span>
                </div>
              )}
              {quickViewProduct.specs.binding && (
                <div className="flex justify-between text-[#635B53]">
                  <span>Binding:</span>
                  <span className="font-medium text-[#24211E]">{quickViewProduct.specs.binding}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {quickViewProduct.isCustomizable && quickViewProduct.plannerTypeRef ? (
              <Link
                href="/studio"
                onClick={() => {
                  openCustomizerWithPlanner(quickViewProduct.plannerTypeRef!);
                  setQuickViewProduct(null);
                }}
                className="w-full py-3.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-sm shadow-[0_4px_14px_rgba(194,109,74,0.35)] hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Customize in Studio</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  addToCart({
                    productId: quickViewProduct.id,
                    title: quickViewProduct.title,
                    priceLKR: quickViewProduct.priceLKR,
                    quantity: 1,
                    image: quickViewProduct.image,
                  });
                  setQuickViewProduct(null);
                }}
                className="w-full py-3.5 rounded-full bg-[#24211E] hover:bg-[#C26D4A] text-white font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order Bag</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

