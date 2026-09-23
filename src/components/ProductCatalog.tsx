'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS_CATALOG } from '@/lib/data';
import {
  Sparkles,
  ShoppingBag,
  Eye,
  Star,
  Search,
  BookOpen,
  Calendar,
  FileText,
  Bookmark,
  Layers,
  CheckSquare,
} from 'lucide-react';

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

  const categories: { id: FilterCategory; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All Items', icon: Sparkles },
    { id: 'study_planners', label: 'Study Planners', icon: BookOpen },
    { id: 'planners', label: 'Year & Daily', icon: Calendar },
    { id: 'sticky_notes', label: 'Sticky Notes', icon: Bookmark },
    { id: 'to_do', label: 'To-Do Pads', icon: CheckSquare },
    { id: 'calendars', label: 'Desk Calendars', icon: Calendar },
    { id: 'stickers', label: 'Wall Stickers', icon: Layers },
  ];

  return (
    <section id="stationery-catalog" className="py-10 sm:py-20 bg-[#FAF8F3]/80 border-t border-[#201D1A]/10 scroll-mt-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94442A] block">
              Artisan Stationery & Study Desks
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#201D1A]">
              Stationery Catalog
            </h2>
            <p className="text-xs sm:text-sm text-[#5E564F]">
              Tactile browsing for 120gsm desk pads, translucent sticky notes, and study accessories.
            </p>
          </div>

          {/* Clean Search bar (Zero emojis, single Lucide icon) */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#5E564F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search notebooks, pens, 120gsm pads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#201D1A]/15 text-xs text-[#201D1A] placeholder-[#5E564F]/70 focus:outline-none focus:border-[#94442A] shadow-xs"
            />
          </div>
        </div>

        {/* Category Pill Filters (Clean Lucide Icons, zero emojis) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#94442A] text-white shadow-xs'
                    : 'bg-white text-[#5E564F] border border-[#201D1A]/10 hover:border-[#201D1A]/25 hover:text-[#201D1A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-[#201D1A]/10 overflow-hidden shadow-xs hover:shadow-md hover:border-[#201D1A]/20 transition-all flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-square bg-[#FAF6F0] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-bold tracking-wide uppercase bg-[#94442A] text-white px-2 py-0.5 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-[#201D1A] shadow-xs transition-all cursor-pointer"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-bold text-[#201D1A]">{product.rating}</span>
                    <span className="text-[#5E564F]">({product.reviewsCount})</span>
                  </div>

                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#201D1A] group-hover:text-[#94442A] transition-colors leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-[11px] text-[#5E564F] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-2 border-t border-[#201D1A]/10 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#94442A]">
                      LKR {product.priceLKR.toLocaleString()}/=
                    </span>
                    {product.originalPriceLKR && (
                      <span className="block font-mono text-[9px] text-[#5E564F] line-through">
                        LKR {product.originalPriceLKR.toLocaleString()}/=
                      </span>
                    )}
                  </div>

                  {product.isCustomizable && product.plannerTypeRef ? (
                    <button
                      onClick={() => openCustomizerWithPlanner(product.plannerTypeRef!)}
                      className="px-3 py-1.5 rounded-xl bg-[#94442A]/10 hover:bg-[#94442A] text-[#94442A] hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Customize</span>
                    </button>
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
                      className="p-2 rounded-xl bg-[#201D1A] hover:bg-[#94442A] text-white transition-all cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
