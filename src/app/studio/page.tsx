'use client';

import React, { Suspense } from 'react';
import { PlannerCustomizer } from '@/components/PlannerCustomizer';
import { LottieAnimation } from '@/components/ui/lottie-animation';

function StudioLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <div className="w-28 h-28 flex items-center justify-center">
        <LottieAnimation src="/animation/Sandy Loading.json" speed={0.7} width={112} height={112} />
      </div>
      <p className="font-heading font-extrabold text-sm text-[#FF6B8B]">
        Setting up your cute studio table... 🌸✨
      </p>
    </div>
  );
}

export default function StudioPage() {
  return (
    <main className="min-h-screen py-4 bg-[#FFFDF9]">
      <Suspense fallback={<StudioLoading />}>
        <PlannerCustomizer />
      </Suspense>
    </main>
  );
}
