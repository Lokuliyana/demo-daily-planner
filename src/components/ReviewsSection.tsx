'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Star,
  Sparkles,
  Heart,
  MessageSquarePlus,
  X,
  CheckCircle2,
  Filter,
} from 'lucide-react';

type StreamFilter = 'all' | '5_star' | 'bio' | 'maths' | 'arts_commerce';

export function ReviewsSection() {
  const { reviews, addReview, likeReview } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<StreamFilter>('all');

  // Form State for new review
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [productTitle, setProductTitle] = useState('Custom A/L Study Planner');
  const [plannerTag, setPlannerTag] = useState('');
  const [comment, setComment] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    addReview({
      author: authorName,
      rating,
      productTitle,
      plannerTag: plannerTag || 'Bio Stream • Future Doctor Cover • 8 Months Hardcover',
      comment,
      imageUrl: photoUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
      verifiedPurchase: true,
    });

    // Reset Form & Close
    setAuthorName('');
    setComment('');
    setPlannerTag('');
    setPhotoUrl('');
    setIsModalOpen(false);
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === '5_star') return r.rating === 5;
    if (selectedFilter === 'bio') {
      return (
        (r.plannerTag && r.plannerTag.toLowerCase().includes('bio')) ||
        r.comment.toLowerCase().includes('bio') ||
        r.comment.toLowerCase().includes('doctor')
      );
    }
    if (selectedFilter === 'maths') {
      return (
        (r.plannerTag && r.plannerTag.toLowerCase().includes('maths')) ||
        r.comment.toLowerCase().includes('maths') ||
        r.comment.toLowerCase().includes('engineer')
      );
    }
    if (selectedFilter === 'arts_commerce') {
      return (
        (r.plannerTag && (r.plannerTag.toLowerCase().includes('arts') || r.plannerTag.toLowerCase().includes('commerce') || r.plannerTag.toLowerCase().includes('law'))) ||
        r.comment.toLowerCase().includes('daily')
      );
    }
    return true;
  });

  return (
    <section id="customer-reviews" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Overall Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#24211E]/8 pb-6">
          <div className="space-y-2">
            <span className="washi-sage px-3 py-1 rounded-sm text-xs font-bold inline-block -rotate-2 shadow-sm">
              Student Community & Study Desks
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24211E]">
              <span className="highlighter-underline">Student Reviews & Community Wall</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#635B53] max-w-xl">
              Social proof that feels like peeking into a classmate's study desk, highlighting past A/L batches and 120gsm ink tests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Rating pill */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-[#24211E]/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <span className="font-serif text-2xl font-bold text-[#24211E]">4.9</span>
              <div className="flex text-amber-500 text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-[#8E847A] font-medium">(840+ Teens)</span>
            </div>

            {/* Share Setup Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white text-xs font-bold shadow-[0_4px_14px_rgba(194,109,74,0.3)] hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>✍️ Share Your Setup</span>
            </button>
          </div>
        </div>

        {/* Tactile Header Filter Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'all', label: `All Reviews (${reviews.length + 138})`, icon: '🌟' },
            { id: '5_star', label: '⭐ 5 Stars (130)', icon: '⭐' },
            { id: 'bio', label: 'Bio Stream Planners', icon: '🧬' },
            { id: 'maths', label: 'Maths Stream Planners', icon: '📐' },
            { id: 'arts_commerce', label: 'Commerce & Arts', icon: '📊' },
          ].map((pill) => {
            const isSelected = selectedFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedFilter(pill.id as StreamFilter)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 select-none ${
                  isSelected
                    ? 'bg-[#C26D4A] text-white shadow-[0_4px_14px_rgba(194,109,74,0.3)] -translate-y-0.5'
                    : 'bg-white text-[#635B53] border border-[#24211E]/10 hover:border-[#C26D4A]/50 hover:text-[#24211E] shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-0.5'
                }`}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reviews Community Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="tactile-card p-6 flex flex-col justify-between space-y-4 bg-white hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3.5">
                {/* Desk Photo showing planner on study desk */}
                {review.imageUrl && (
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#24211E]/8">
                    <img
                      src={review.imageUrl}
                      alt="Student study desk setup"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 washi-tape text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm text-[#24211E] -rotate-1">
                      📸 Real Study Desk
                    </span>
                  </div>
                )}

                {/* Author & Rating */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-sm text-[#24211E] block">
                      {review.author}
                    </span>
                    <span className="text-[11px] text-[#8E847A]">{review.date}</span>
                  </div>

                  <div className="flex text-amber-500 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-current' : 'text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Tag Pill */}
                {review.plannerTag && (
                  <div className="washi-terracotta inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold -rotate-0.5">
                    {review.plannerTag}
                  </div>
                )}

                {/* Feedback Quote */}
                <p className="text-xs sm:text-sm text-[#635B53] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Footer with Helpful Reaction ❤️ Button */}
              <div className="pt-3 border-t border-[#24211E]/8 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#8E847A] truncate max-w-[140px]">
                  {review.productTitle}
                </span>

                <button
                  onClick={() => likeReview(review.id)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#C26D4A]/10 text-[#C26D4A] font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-[#C26D4A]" />
                  <span>❤️ {review.likes} Helpful</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Share Setup Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#24211E]/12 p-6 sm:p-8 overflow-y-auto max-h-[90vh] space-y-4">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#24211E] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="washi-terracotta px-3 py-0.5 rounded-full text-xs font-bold inline-block">
                Community Setup Story
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#24211E]">
                Share Your Study Setup & Review
              </h3>
              <p className="text-xs text-[#635B53]">
                Help future A/L batches choose the right planner and see how 120gsm paper handles your favorite pens!
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Kasuni Wickramasinghe"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs text-[#24211E] focus:outline-none focus:border-[#C26D4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Rating
                </label>
                <div className="flex gap-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          s <= rating ? 'fill-current text-amber-500' : 'text-zinc-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Planner / Subject Stream Tag
                </label>
                <input
                  type="text"
                  value={plannerTag}
                  onChange={(e) => setPlannerTag(e.target.value)}
                  placeholder="e.g. Bio Stream • Future Doctor Cover • 8 Months Hardcover"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs text-[#24211E] focus:outline-none focus:border-[#C26D4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Desk Feedback & Experience
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="The 120gsm paper handles my Stabilo highlighters with zero bleed! MCQ tracker kept me sane during model papers..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs text-[#24211E] focus:outline-none focus:border-[#C26D4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Study Desk Photo URL (Optional)
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs text-[#24211E] focus:outline-none focus:border-[#C26D4A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-sm shadow-md shadow-[#C26D4A]/20 active:scale-95 transition-all cursor-pointer"
              >
                Post Review to Community Wall
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
