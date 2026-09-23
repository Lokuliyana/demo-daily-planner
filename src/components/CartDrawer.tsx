'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  CheckCircle2,
} from 'lucide-react';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotalLKR,
    setIsOrderModalOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, (cartTotalLKR / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotalLKR);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F4F3EF] border-l border-[#201D1A]/10 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#201D1A]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#94442A]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#201D1A]">
                Your Order Bag ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#5E564F] hover:text-[#201D1A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-4 sm:px-5 py-2.5 bg-[#FAF8F3] border-b border-[#201D1A]/10 space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-[#201D1A]">
              <span className="flex items-center gap-1.5 text-[#506850] text-[11px] sm:text-xs">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                {remainingForFreeShipping === 0
                  ? 'Free Delivery Unlocked'
                  : `Add LKR ${remainingForFreeShipping.toLocaleString()}/= for Free Delivery`}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#5E564F]">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#506850] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-2.5">
                <div className="w-12 h-12 rounded-full bg-white border border-[#201D1A]/10 flex items-center justify-center mx-auto text-[#5E564F]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#201D1A]">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#5E564F] max-w-xs mx-auto">
                  Start customizing a study planner or add stationery essentials to begin.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#201D1A]/10 shadow-xs space-y-2.5"
                >
                  <div className="flex gap-2.5 items-start">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-16 sm:w-16 sm:h-20 rounded-lg object-cover border border-[#201D1A]/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="font-semibold text-xs sm:text-sm text-[#201D1A] leading-snug truncate">
                        {item.title}
                      </h4>
                      <span className="font-mono font-bold text-xs text-[#94442A] block">
                        LKR {item.priceLKR.toLocaleString()}/=
                      </span>

                      {/* Custom Specifications Pill Breakdown */}
                      {item.isCustomPlanner && item.customConfig && (
                        <div className="space-y-0.5 pt-0.5">
                          <span className="inline-block text-[9px] font-medium bg-[#94442A]/10 text-[#94442A] px-1.5 py-0.5 rounded">
                            {item.customConfig.coverType === 'hardcover_corners'
                              ? 'Hardcover + Gold Corners'
                              : 'Softcover Laminated'}
                          </span>
                          <span className="block text-[9px] text-[#5E564F] truncate">
                            Embossed: "{item.customConfig.customName}"
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-zinc-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quantity Counter & Subtotal */}
                  <div className="flex justify-between items-center pt-2 border-t border-[#201D1A]/10 text-xs">
                    <div className="flex items-center gap-1.5 bg-[#F4F3EF] px-1.5 py-0.5 rounded-lg border border-[#201D1A]/10">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-0.5 hover:text-[#94442A]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold px-1 text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-0.5 hover:text-[#94442A]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-bold text-xs text-[#201D1A]">
                      LKR {(item.priceLKR * item.quantity).toLocaleString()}/=
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#201D1A]/10 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#5E564F]">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-[#201D1A]">
                    LKR {cartTotalLKR.toLocaleString()}/=
                  </span>
                </div>
                <div className="flex justify-between text-[#5E564F]">
                  <span>Courier Delivery:</span>
                  <span className="font-mono text-[#506850]">
                    {cartTotalLKR >= freeShippingThreshold ? 'FREE' : 'LKR 350/='}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-[#201D1A] pt-1.5 border-t border-[#201D1A]/10">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-sm sm:text-base text-[#94442A]">
                    LKR {(cartTotalLKR + (cartTotalLKR >= freeShippingThreshold ? 0 : 350)).toLocaleString()}/=
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#94442A] text-white font-bold text-xs sm:text-sm hover:bg-[#78351F] shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Proceed to Order Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
