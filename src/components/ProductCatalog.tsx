'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS_CATALOG } from '@/lib/data';
import { Product } from '@/lib/types';
import {
  Sparkles,
  ShoppingBag,
  Eye,
  Star,
  Search,
  Check,
  Plus,
  Layers,
  BookOpen,
  Calendar,
  FileText,
  StickyNote,
} from 'lucide-react';

type FilterCategory = 'all' | 'study_planners' | 'planners' | 'sticky_notes' | 'to_do' | 'calendars' | 'stickers';

export function ProductCatalog() {
  const { setQuickViewProduct, addToCart, openCustomizerWithPlanner } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS_CATALOG.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.specs.paper && product.specs.paper.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories: { id: FilterCategory; label: string; icon: string; count: number }[] = [
    { id: 'all', label: 'All Essentials', icon: '✨', count: 24 },
    { id: 'study_planners', label: 'Study Planners', icon: '📖', count: 6 },
    { id: 'sticky_notes', label: 'Sticky Notes & Tabs', icon: '📝', count: 5 },
    { id: 'calendars', label: 'Desk Calendars', icon: '🗓️', count: 4 },
    { id: 'stickers', label: 'Wall & Deco Stickers', icon: '🎨', count: 5 },
    { id: 'to_do', label: 'Notepads & Lists', icon: '📋', count: 4 },
  ];

  return (
    <section id="stationery-catalog" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#24211E]/8 pb-6">
          <div className="space-y-2">
            <span className="washi-sage px-3 py-1 rounded-sm text-xs font-bold inline-block -rotate-2 shadow-sm">
              Artisan Stationery & Study Desks
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24211E]">
              <span className="highlighter-underline">Stationery Catalog</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#635B53] max-w-lg">
              Tactile browsing for 120gsm desk pads, translucent sticky notes, and exam accessories crafted with care.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8E847A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="🔍 Search notebooks, pens, 120gsm pads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#24211E]/12 text-xs text-[#24211E] placeholder-[#8E847A] focus:outline-none focus:border-[#C26D4A] shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Tactile Category Filter Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 select-none ${
                  isSelected
                    ? 'bg-[#C26D4A] text-white shadow-[0_4px_14px_rgba(194,109,74,0.3)] -translate-y-0.5'
                    : 'bg-white text-[#635B53] border border-[#24211E]/10 hover:border-[#C26D4A]/50 hover:text-[#24211E] shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-0.5'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {cat.id === 'all' && (
                  <span className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-black/5'}`}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="tactile-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Tile */}
              <div className="relative aspect-square bg-[#FAF6F0] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase washi-terracotta px-2.5 py-0.5 rounded shadow-sm -rotate-1">
                    {product.badge}
                  </span>
                )}

                {/* Paper spec quick pill */}
                <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[#24211E] shadow-sm">
                  {product.specs.paper ? product.specs.paper.split(' ')[0] : '120gsm'} • {product.specs.pages || '80 sheets'}
                </span>

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#24211E] shadow-sm transition-all cursor-pointer opacity-90 group-hover:opacity-100 active:scale-95"
                  title="Quick View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Info & Specs */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-500 text-[11px]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-[#24211E]">{product.rating}</span>
                    <span className="text-[#8E847A]">({product.reviewsCount})</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#24211E] group-hover:text-[#C26D4A] transition-colors leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-xs text-[#635B53] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Action Pill Buttons */}
                <div className="pt-3 border-t border-[#24211E]/8 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-base font-bold text-[#C26D4A]">
                      LKR {product.priceLKR.toLocaleString()}/=
                    </span>
                    {product.originalPriceLKR && (
                      <span className="block font-mono text-[10px] text-[#8E847A] line-through">
                        LKR {product.originalPriceLKR.toLocaleString()}/=
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#24211E]/5 text-xs font-semibold text-[#24211E] active:scale-95 transition-transform cursor-pointer"
                    >
                      Quick View
                    </button>

                    {product.isCustomizable && product.plannerTypeRef ? (
                      <Link
                        href="/studio"
                        onClick={() => openCustomizerWithPlanner(product.plannerTypeRef!)}
                        className="p-2 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white shadow-sm active:scale-95 transition-all cursor-pointer"
                        title="Customize in Studio"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          addToCart({
                            productId: product.id,
                            title: product.title,
                            priceLKR: product.priceLKR,
                            quantity: 1,
                            image: product.image,
                          })
                        }
                        className="p-2 rounded-full bg-[#24211E] hover:bg-[#C26D4A] text-white shadow-sm active:scale-95 transition-all cursor-pointer"
                        title="Add to cart"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

