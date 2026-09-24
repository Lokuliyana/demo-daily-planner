'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import { FeaturedPicks } from '@/components/FeaturedPicks';
import { HomeReviewsTeaser } from '@/components/HomeReviewsTeaser';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* 1. Cute Hero & Lo-Fi Study Room Canvas */}
      <Hero />

      {/* 2. Curated Besties Spotlight & Marketplace Teaser */}
      <FeaturedPicks />

      {/* 3. Community Wall & Bestie Reviews Highlight */}
      <HomeReviewsTeaser />
    </main>
  );
}

