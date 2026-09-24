'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import {
  Star,
  Heart,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import { motion } from 'framer-motion';
import {
  ColoredFlower,
  ColoredHeart,
  ColoredStar,
  ColoredWhatsApp,
  ColoredSparkle,
} from '@/components/ui/colored-icons';

export function HomeReviewsTeaser() {
  const { reviews } = useStore();
  const spotlightReviews = reviews.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <Badge variant="yellow" className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ColoredHeart size={13} />
              <span>Community Love & Wall</span>
            </Badge>
            <div className="w-10 h-10 shrink-0 flex items-center justify-center">
              <LottieAnimation src="/animation/Lotus.json" speed={0.65} width={40} height={40} />
            </div>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#382A2C]">
            Loved by 840+ Sri Lankan Students
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5C5E] font-semibold">
            See why students, doctors, and exam takers adore their Little Lines planners!
          </p>
        </div>

        <Link href="/reviews">
          <Button variant="outline" className="group">
            <span>Read All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* 3-Grid Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {spotlightReviews.map((rev) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-[32px] border-2 border-[#FF6B8B]/20 shadow-[0_8px_24px_rgba(255,107,139,0.08)] flex flex-col justify-between space-y-4 hover:shadow-[0_16px_32px_rgba(255,107,139,0.15)] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-[#9E8C8E]">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#382A2C] font-semibold leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-[#FF6B8B]/15 flex items-center justify-between">
              <div>
                <span className="font-heading font-extrabold text-xs text-[#382A2C] block">
                  {rev.author}
                </span>
                <span className="text-[10px] font-bold text-[#FF6B8B] flex items-center gap-1">
                  <ColoredFlower size={11} />
                  <span>{rev.plannerTag || rev.productTitle}</span>
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-[#FF6B8B] bg-[#FFF5F7] px-2.5 py-1 rounded-full border border-[#FF6B8B]/20">
                <Heart className="w-3.5 h-3.5 fill-[#FF6B8B]" />
                <span>{rev.likes}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sweet Bottom Encouragement */}
      <div className="text-center pt-2 flex items-center justify-center gap-2 text-xs font-bold text-[#6E5C5E]">
        <ColoredWhatsApp size={16} />
        <span>Have questions or custom bulk inquiries for tuition classes? Chat directly on WhatsApp!</span>
      </div>

    </section>
  );
}
