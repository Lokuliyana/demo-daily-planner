'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS_CATALOG } from '@/lib/data';
import {
  Sparkles,
  ShoppingBag,
  Eye,
  Star,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ColoredFlower,
  ColoredBook,
  ColoredCalendar,
  ColoredTag,
  ColoredNote,
  ColoredRibbon,
  ColoredBear,
  ColoredSparkle,
  ColoredHeart,
} from '@/components/ui/colored-icons';

type FilterCategory = 'all' | 'study_planners' | 'planners' | 'to_do' | 'sticky_notes' | 'calendars' | 'stickers';

export function ProductCatalog() {
  const { setQuickViewProduct, addToCart, openCustomizerWithPlanner } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS_CATALOG.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { id: FilterCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Cuties', icon: <ColoredFlower size={15} /> },
    { id: 'study_planners', label: 'Study Planners', icon: <ColoredBook size={15} /> },
    { id: 'planners', label: 'Year & Daily', icon: <ColoredCalendar size={15} /> },
    { id: 'sticky_notes', label: 'Pastel Tabs', icon: <ColoredTag size={15} /> },
    { id: 'to_do', label: 'To-Do Pads', icon: <ColoredNote size={15} /> },
    { id: 'calendars', label: 'Desk Calendars', icon: <ColoredRibbon size={15} /> },
    { id: 'stickers', label: 'Sticker Packs', icon: <ColoredBear size={15} /> },
  ];

  return (
    <section id="stationery-catalog" className="py-12 sm:py-20 bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F7] to-[#FFFDF9] border-t-2 border-[#FF6B8B]/15 scroll-mt-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <Badge variant="pink" className="text-xs font-bold uppercase tracking-wider gap-1.5">
              <ColoredFlower size={14} />
              <span>Stationery Boutique</span>
            </Badge>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-[#382A2C] flex items-center gap-2">
              Cute Stationery Collection <ColoredSparkle size={26} />
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5C5E] font-semibold">
              Pastel 120gsm desk pads, translucent index flags, and aesthetic study treats!
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#FF6B8B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search cute goodies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] placeholder-[#9E8C8E] focus:outline-none focus:border-[#FF6B8B] shadow-xs transition-colors font-semibold"
            />
          </div>
        </div>

        {/* Animated Cute Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                  isSelected
                    ? 'text-white'
                    : 'text-[#6E5C5E] bg-white border-2 border-[#FF6B8B]/20 hover:border-[#FF6B8B]/50'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCuteCatalogPill"
                    className="absolute inset-0 bg-[#FF6B8B] rounded-full -z-10 shadow-[0_3px_0_#E04D6D]"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="group bg-white rounded-[32px] border-2 border-[#FF6B8B]/20 overflow-hidden shadow-[0_8px_24px_rgba(255,107,139,0.1)] hover:shadow-[0_16px_36px_rgba(255,107,139,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-square bg-[#FFF5F7] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {product.badge && (
                    <Badge variant="pink" className="absolute top-3 left-3 text-[10px] shadow-sm font-extrabold gap-1">
                      <span>{product.badge}</span>
                      <ColoredHeart size={12} />
                    </Badge>
                  )}

                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-white/95 hover:bg-white text-[#FF6B8B] shadow-sm transition-all cursor-pointer hover:scale-110"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info */}
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

                  {/* Price & Action */}
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
                          variant="secondary"
                          onClick={() => openCustomizerWithPlanner(product.plannerTypeRef!)}
                          className="hover:bg-[#FF6B8B] hover:text-white gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Customize</span>
                          <ColoredSparkle size={13} />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        size="icon"
                        variant="pink"
                        onClick={() =>
                          addToCart({
                            productId: product.id,
                            title: product.title,
                            priceLKR: product.priceLKR,
                            quantity: 1,
                            image: product.image,
                          })
                        }
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
