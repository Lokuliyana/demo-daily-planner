'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS_CATALOG } from '@/lib/data';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Star,
  Heart,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import { motion } from 'framer-motion';
import {
  ColoredFlower,
  ColoredSparkle,
  ColoredHeart,
  ColoredStar,
  ColoredFlame,
  ColoredRibbon,
} from '@/components/ui/colored-icons';

export function FeaturedPicks() {
  const { addToCart, openCustomizerWithPlanner } = useStore();

  // Pick 4 spotlight items: 2 customizable flagship planners + 2 adorable stationery items
  const featuredIds = ['al-study-planner-2027', 'daily-desk-planner', 'pastel-sticky-notes-set', 'cute-study-stickers-pack'];
  const featuredProducts = PRODUCTS_CATALOG.filter((p) => featuredIds.includes(p.id));

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Cute Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <Badge variant="pink" className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ColoredSparkle size={13} />
            <span>Curated Besties • Spotlight</span>
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#382A2C]">
            Featured Cute Picks
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5C5E] font-semibold">
            Handcrafted with 120gsm paper, gold metal corners, and sweet pastel charms!
          </p>
        </div>

        {/* Direct Link to Full Marketplace */}
        <Link href="/catalog">
          <Button variant="outline" className="group">
            <span>Explore All Stationery (24+)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Featured 4-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {featuredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-[32px] border-2 border-[#FF6B8B]/20 overflow-hidden shadow-[0_8px_24px_rgba(255,107,139,0.1)] hover:shadow-[0_16px_36px_rgba(255,107,139,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Preview */}
            <div className="relative aspect-square bg-[#FFF5F7] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 flex items-center gap-1">
                  <Badge variant="pink" className="text-[10px] shadow-sm font-extrabold flex items-center gap-1">
                    <ColoredHeart size={10} />
                    <span>{product.badge}</span>
                  </Badge>
                  {product.id === 'al-study-planner-2027' && (
                    <div className="w-8 h-8 pointer-events-none drop-shadow-md shrink-0 flex items-center justify-center">
                      <LottieAnimation src="/animation/Fire.json" speed={0.7} width={34} height={34} />
                    </div>
                  )}
                </div>
              )}

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#FF6B8B] shadow-xs">
                <Heart className="w-4 h-4 fill-[#FF6B8B]/20 text-[#FF6B8B]" />
              </div>
            </div>

            {/* Product Meta */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[#382A2C]">{product.rating}</span>
                  <span className="text-[#9E8C8E] font-medium">({product.reviewsCount})</span>
                </div>

                <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#382A2C] group-hover:text-[#FF6B8B] transition-colors leading-snug">
                  {product.title}
                </h3>

                <p className="text-[11px] text-[#6E5C5E] line-clamp-2 leading-relaxed font-semibold">
                  {product.description}
                </p>
              </div>

              {/* Price & Primary CTA */}
              <div className="pt-2.5 border-t border-[#FF6B8B]/15 flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm sm:text-base font-extrabold text-[#FF6B8B]">
                    LKR {product.priceLKR.toLocaleString()}/=
                  </span>
                  {product.originalPriceLKR && (
                    <span className="block font-mono text-[9px] text-[#9E8C8E] line-through">
                      LKR {product.originalPriceLKR.toLocaleString()}/=
                    </span>
                  )}
                </div>

                {product.isCustomizable && product.plannerTypeRef ? (
                  <Link href={`/studio?planner=${product.plannerTypeRef}`}>
                    <Button
                      size="sm"
                      variant="pink"
                      onClick={() => openCustomizerWithPlanner(product.plannerTypeRef!)}
                      className="shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      addToCart({
                        productId: product.id,
                        title: product.title,
                        priceLKR: product.priceLKR,
                        quantity: 1,
                        image: product.image,
                      })
                    }
                    className="hover:bg-[#FF6B8B] hover:text-white"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cute Interactive Studio Callout Banner */}
      <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-r from-[#FFE5EC] via-[#FFF0F5] to-[#E6F9F5] border-2 border-[#FF6B8B]/25 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_32px_rgba(255,107,139,0.12)]">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <Badge variant="pink" className="text-xs font-bold flex items-center gap-1.5 w-fit mx-auto md:mx-0">
            <ColoredFlower size={13} />
            <span>Handcrafted with Love in Sri Lanka</span>
          </Badge>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#382A2C]">
            Want a 100% Unique Study Planner?
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-[#6E5C5E]">
            Step inside our Custom Studio to choose months, gold corner caps, 12 monthly photo shine dividers, and your cute embossed name!
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="w-20 h-20 pointer-events-none flex items-center justify-center shrink-0">
            <LottieAnimation src="/animation/Looping Flower.json" speed={0.65} width={80} height={80} />
          </div>
          <Link href="/studio">
            <Button size="lg" variant="pink" className="group shadow-md">
              <Sparkles className="w-4 h-4" />
              <span>Enter Custom Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

    </section>
  );
}
