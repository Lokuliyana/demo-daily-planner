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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import {
  ColoredFlower,
  ColoredSparkle,
  ColoredHeart,
  ColoredStar,
  ColoredTruck,
} from '@/components/ui/colored-icons';

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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-screen max-w-md bg-[#FFFDF9] border-l-2 border-[#FF6B8B]/20 shadow-[0_25px_50px_-12px_rgba(255,107,139,0.3)] flex flex-col justify-between"
        >
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-white border-b-2 border-[#FF6B8B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#FFE5EC] border border-[#FF6B8B]/30 text-[#FF6B8B] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#382A2C]">
                  Your Cute Bag
                </h3>
                <span className="text-[11px] font-bold text-[#FF6B8B]">
                  {cart.length} {cart.length === 1 ? 'sweet item' : 'sweet items'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-[#FFF5F7] text-[#FF6B8B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-4 sm:px-5 py-3 bg-[#FFF5F7] border-b border-[#FF6B8B]/15 space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-[#382A2C]">
              <span className="flex items-center gap-1.5 text-[#FF6B8B] text-[11px]">
                <ColoredTruck size={14} />
                {remainingForFreeShipping === 0
                  ? 'Free Islandwide Delivery Unlocked!'
                  : `Add LKR ${remainingForFreeShipping.toLocaleString()}/= for Free Delivery`}
              </span>
              <span className="font-mono text-[11px] text-[#FF6B8B]">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#FFE4EC] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF6B8B] rounded-full"
                style={{ width: `${progressPercent}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-36 h-36 sm:w-40 sm:h-40 mx-auto flex items-center justify-center">
                  <LottieAnimation src="/animation/Empty State.json" speed={0.7} width={150} height={150} />
                </div>
                <h4 className="font-heading text-lg font-extrabold text-[#382A2C]">
                  Your bag is empty!
                </h4>
                <p className="text-xs font-semibold text-[#6E5C5E] max-w-xs mx-auto">
                  Customize your cute study planner or pick some pastel sticky notes to get started!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-[#FF6B8B]/15 shadow-xs space-y-2.5"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-18 rounded-2xl object-cover border border-[#FF6B8B]/20 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-[#382A2C] leading-snug truncate">
                        {item.title}
                      </h4>
                      <span className="font-mono font-extrabold text-xs text-[#FF6B8B] block">
                        LKR {item.priceLKR.toLocaleString()}/=
                      </span>

                      {/* Custom Specifications */}
                      {item.isCustomPlanner && item.customConfig && (
                        <div className="space-y-0.5 pt-0.5">
                          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold bg-[#FFE5EC] text-[#FF6B8B] px-2 py-0.5 rounded-full">
                            {item.customConfig.coverType === 'hardcover_corners' ? (
                              <>
                                <ColoredStar size={10} />
                                <span>Hardcover + Gold</span>
                              </>
                            ) : (
                              <>
                                <ColoredFlower size={10} />
                                <span>Softcover</span>
                              </>
                            )}
                          </span>
                          <span className="block text-[9px] text-[#6E5C5E] font-bold truncate">
                            Embossed: &quot;{item.customConfig.customName}&quot;
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-zinc-300 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Counter & Subtotal */}
                  <div className="flex justify-between items-center pt-2 border-t border-[#FF6B8B]/10 text-xs">
                    <div className="flex items-center gap-1.5 bg-[#FFF5F7] px-2.5 py-1 rounded-full border border-[#FF6B8B]/20">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-0.5 hover:text-[#FF6B8B] font-bold cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-extrabold px-1 text-xs text-[#FF6B8B]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-0.5 hover:text-[#FF6B8B] font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-extrabold text-xs text-[#382A2C]">
                      LKR {(item.priceLKR * item.quantity).toLocaleString()}/=
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t-2 border-[#FF6B8B]/15 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6E5C5E] font-semibold">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-[#382A2C]">
                    LKR {cartTotalLKR.toLocaleString()}/=
                  </span>
                </div>
                <div className="flex justify-between text-[#6E5C5E] font-semibold">
                  <span>Delivery:</span>
                  <span className="font-mono text-[#1D7A66] font-bold">
                    {cartTotalLKR >= freeShippingThreshold ? 'FREE 🌸' : 'LKR 350/='}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm font-extrabold text-[#382A2C] pt-2 border-t border-[#FF6B8B]/15">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-base text-[#FF6B8B]">
                    LKR {(cartTotalLKR + (cartTotalLKR >= freeShippingThreshold ? 0 : 350)).toLocaleString()}/=
                  </span>
                </div>
              </div>

              <Button
                variant="pink"
                size="lg"
                className="w-full"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsOrderModalOpen(true);
                }}
              >
                <span>Proceed to Order 💖</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
