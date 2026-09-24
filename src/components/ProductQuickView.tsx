'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { X, Sparkles, ShoppingBag, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ColoredFlower,
  ColoredSparkle,
  ColoredHeart,
} from '@/components/ui/colored-icons';

export function ProductQuickView() {
  const router = useRouter();
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
      router.push(`/studio?planner=${quickViewProduct.plannerTypeRef}`);
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-[36px] shadow-[0_20px_60px_rgba(255,107,139,0.25)] border-2 border-[#FF6B8B]/25 overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/95 hover:bg-[#FFF5F7] text-[#FF6B8B] shadow-sm transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Product Image Column */}
          <div className="md:w-1/2 relative bg-[#FFF5F7] min-h-[220px] md:min-h-full flex items-center justify-center p-4">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.title}
              className="w-full h-full object-cover rounded-2xl"
            />
            {quickViewProduct.badge && (
              <Badge variant="pink" className="absolute top-6 left-6 text-[10px] shadow-sm font-extrabold gap-1">
                <span>{quickViewProduct.badge}</span>
                <ColoredHeart size={12} />
              </Badge>
            )}
          </div>

          {/* Details Column */}
          <div className="md:w-1/2 p-5 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-400 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'text-zinc-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#6E5C5E] flex items-center gap-1">
                  <span>{quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)</span>
                  <ColoredSparkle size={12} />
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#382A2C]">
                {quickViewProduct.title}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-base sm:text-lg font-extrabold text-[#FF6B8B]">
                  LKR {quickViewProduct.priceLKR.toLocaleString()}/=
                </span>
                {quickViewProduct.originalPriceLKR && (
                  <span className="font-mono text-xs text-[#9E8C8E] line-through">
                    LKR {quickViewProduct.originalPriceLKR.toLocaleString()}/=
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6E5C5E] leading-relaxed font-semibold">
                {quickViewProduct.description}
              </p>

              {/* Specifications Box */}
              <div className="p-3.5 rounded-2xl bg-[#FFF5F7] border border-[#FF6B8B]/20 space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5 font-bold text-[#FF6B8B] mb-1">
                  <ColoredFlower size={13} />
                  <span>Product Details</span>
                </div>
                {quickViewProduct.specs.size && (
                  <div className="flex justify-between text-[#6E5C5E]">
                    <span>Size:</span>
                    <span className="font-bold text-[#382A2C]">{quickViewProduct.specs.size}</span>
                  </div>
                )}
                {quickViewProduct.specs.paper && (
                  <div className="flex justify-between text-[#6E5C5E]">
                    <span>Paper:</span>
                    <span className="font-bold text-[#382A2C]">{quickViewProduct.specs.paper}</span>
                  </div>
                )}
                {quickViewProduct.specs.pages && (
                  <div className="flex justify-between text-[#6E5C5E]">
                    <span>Pages:</span>
                    <span className="font-bold text-[#382A2C]">{quickViewProduct.specs.pages}</span>
                  </div>
                )}
                {quickViewProduct.specs.binding && (
                  <div className="flex justify-between text-[#6E5C5E]">
                    <span>Binding:</span>
                    <span className="font-bold text-[#382A2C]">{quickViewProduct.specs.binding}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Button
                size="lg"
                variant="pink"
                className="w-full gap-2"
                onClick={handleAction}
              >
                {quickViewProduct.isCustomizable ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Customize in Studio</span>
                    <ColoredSparkle size={14} />
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                    <ColoredHeart size={14} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
