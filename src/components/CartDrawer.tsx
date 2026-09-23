'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Sparkles,
} from 'lucide-react';
import { COVER_THEMES } from '@/lib/data';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotalLKR,
  } = useStore();

  const router = useRouter();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, (cartTotalLKR / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotalLKR);
  const deliveryFee = cartTotalLKR >= freeShippingThreshold ? 0 : 350;
  const grandTotal = cartTotalLKR + deliveryFee;

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F7F2] border-l border-[#24211E]/10 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#24211E]/8 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C26D4A]/10 text-[#C26D4A] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#24211E]">
                Your Order Bag ({cart.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#635B53] hover:text-[#24211E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Tracker */}
          <div className="px-6 py-3.5 bg-[#FAF6F0] border-b border-[#24211E]/8 space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-[#24211E]">
              <span className="flex items-center gap-1.5 text-[#3F5545]">
                <Truck className="w-3.5 h-3.5 text-[#6E8574]" />
                {remainingForFreeShipping === 0
                  ? '🎉 You unlocked Free Islandwide Delivery!'
                  : `💡 Add LKR ${remainingForFreeShipping.toLocaleString()} more for Free Islandwide Delivery!`}
              </span>
            </div>
            {/* Delivery Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-2 bg-black/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6E8574] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#8E847A]">
                <span>LKR {cartTotalLKR.toLocaleString()}</span>
                <span>LKR {freeShippingThreshold.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-white border border-[#24211E]/10 flex items-center justify-center mx-auto text-[#8E847A]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#24211E]">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#635B53] max-w-xs mx-auto">
                  Start customizing your A/L study planner or pick aesthetic sticky notes and desk calendars!
                </p>
                <div className="pt-2">
                  <Link
                    href="/studio"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C26D4A] text-white text-xs font-semibold shadow-sm hover:bg-[#A95837]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open Custom Studio</span>
                  </Link>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="tactile-card p-4 space-y-3 bg-white"
                >
                  <div className="flex gap-3.5 items-start">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 rounded-xl object-cover border border-[#24211E]/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-[#24211E] leading-snug truncate">
                        {item.title}
                      </h4>
                      <span className="font-mono font-bold text-xs text-[#C26D4A] block">
                        LKR {item.priceLKR.toLocaleString()}/=
                      </span>

                      {/* Custom Specifications Breakdown */}
                      {item.isCustomPlanner && item.customConfig && (
                        <div className="text-[11px] text-[#635B53] space-y-0.5 pt-1">
                          <div className="text-[10px] font-semibold text-[#6E8574]">
                            • {item.customConfig.coverType === 'hardcover_corners'
                              ? 'Hardcover with Gold Corners'
                              : 'Softcover Laminated'}
                          </div>
                          {item.customConfig.selectedThemeId && (
                            <div>
                              • Theme: {COVER_THEMES.find((t) => t.id === item.customConfig?.selectedThemeId)?.name.split('/')[0] || 'Aspiration'}
                            </div>
                          )}
                          <div>
                            • Embossed: "{item.customConfig.customName}"
                          </div>
                          {item.customConfig.addOnStickyTabs && <div>• Add-on: PET Tabs (+Rs. 200)</div>}
                          {item.customConfig.addOnStickers && <div>• Add-on: Sticker Pack (+Rs. 250)</div>}
                          {item.customConfig.addOnRibbon && <div>• Add-on: Bookmark Ribbon (+Rs. 150)</div>}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Counter & Subtotal */}
                  <div className="flex justify-between items-center pt-2.5 border-t border-[#24211E]/8 text-xs">
                    <div className="flex items-center gap-2 bg-[#FAF6F0] px-2.5 py-1 rounded-full border border-[#24211E]/10">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-[#C26D4A] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-[#C26D4A] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-bold text-[#24211E]">
                      LKR {(item.priceLKR * item.quantity).toLocaleString()}/=
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#24211E]/8 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#635B53]">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-[#24211E]">
                    LKR {cartTotalLKR.toLocaleString()}/=
                  </span>
                </div>
                <div className="flex justify-between text-[#635B53]">
                  <span>Islandwide Courier:</span>
                  <span className="font-mono text-[#3F5545]">
                    {deliveryFee === 0 ? 'FREE' : 'LKR 350/='}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#24211E] pt-2 border-t border-[#24211E]/8">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-lg text-[#C26D4A]">
                    LKR {grandTotal.toLocaleString()}/=
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-sm shadow-[0_4px_14px_rgba(194,109,74,0.35)] hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Seamless Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

