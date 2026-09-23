'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import { PlannerCustomizer } from '@/components/PlannerCustomizer';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ReviewsSection } from '@/components/ReviewsSection';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Page 1: Hero & Editorial Showcase with Why Little Lines & Ready-to-Ship Picks */}
      <Hero />

      {/* Page 2: Synchronized 2-Column Custom Studio */}
      <PlannerCustomizer />

      {/* Page 3: Stationery Catalog & Quick-View */}
      <ProductCatalog />

      {/* Page 6: Student Reviews & Community Wall */}
      <ReviewsSection />
    </main>
  );
}

