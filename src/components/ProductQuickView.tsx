'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Sparkles, ShoppingBag, Star } from 'lucide-react';

export function ProductQuickView() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    openCustomizerWithPlanner,
  } = useStore();

  if (!quickViewProduct) return null;

  const handleAction = () => {
    if (quickViewProduct.isCustomizable && quickViewProduct.plannerTypeRef) {
      openCustomizerWithPlanner(quickViewProduct.plannerTypeRef);
      setQuickViewProduct(null);
    } else {
      addToCart({
        productId: quickViewProduct.id,
        title: quickViewProduct.title,
        priceLKR: quickViewProduct.priceLKR,
        quantity: 1,
        image: quickViewProduct.image,
      });
      setQuickViewProduct(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#201D1A]/10 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#201D1A] shadow-xs transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 relative bg-[#FAF6F0] min-h-[200px] md:min-h-full">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.title}
            className="w-full h-full object-cover"
          />
          {quickViewProduct.badge && (
            <span className="absolute top-3 left-3 text-[10px] font-bold bg-[#94442A] text-white px-2 py-0.5 rounded-full shadow-xs">
              {quickViewProduct.badge}
            </span>
          )}
        </div>

        {/* Details Column */}
        <div className="md:w-1/2 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-500 text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'text-zinc-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium text-[#5E564F]">
                {quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#201D1A]">
              {quickViewProduct.title}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base sm:text-lg font-bold text-[#94442A]">
                LKR {quickViewProduct.priceLKR.toLocaleString()}/=
              </span>
              {quickViewProduct.originalPriceLKR && (
                <span className="font-mono text-xs text-[#5E564F] line-through">
                  LKR {quickViewProduct.originalPriceLKR.toLocaleString()}/=
                </span>
              )}
            </div>

            <p className="text-xs text-[#5E564F] leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Specifications Box */}
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/10 space-y-1 text-[11px]">
              <span className="font-bold text-[#201D1A] block mb-1">Specifications:</span>
              {quickViewProduct.specs.size && (
                <div className="flex justify-between text-[#5E564F]">
                  <span>Size:</span>
                  <span className="font-medium text-[#201D1A]">{quickViewProduct.specs.size}</span>
                </div>
              )}
              {quickViewProduct.specs.paper && (
                <div className="flex justify-between text-[#5E564F]">
                  <span>Paper:</span>
                  <span className="font-medium text-[#201D1A]">{quickViewProduct.specs.paper}</span>
                </div>
              )}
              {quickViewProduct.specs.pages && (
                <div className="flex justify-between text-[#5E564F]">
                  <span>Pages:</span>
                  <span className="font-medium text-[#201D1A]">{quickViewProduct.specs.pages}</span>
                </div>
              )}
              {quickViewProduct.specs.binding && (
                <div className="flex justify-between text-[#5E564F]">
                  <span>Binding:</span>
                  <span className="font-medium text-[#201D1A]">{quickViewProduct.specs.binding}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleAction}
              className="w-full py-2.5 sm:py-3 rounded-xl bg-[#94442A] text-white font-bold text-xs sm:text-sm hover:bg-[#78351F] shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {quickViewProduct.isCustomizable ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Customize in Studio</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order Request</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
