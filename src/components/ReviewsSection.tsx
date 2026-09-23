'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Star,
  Sparkles,
  ThumbsUp,
  MessageSquarePlus,
  X,
  CheckCircle2,
  Heart,
  MessageSquare,
} from 'lucide-react';

export function ReviewsSection() {
  const { reviews, addReview, likeReview } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');

  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [productTitle, setProductTitle] = useState('A/L Study Planner');
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
      plannerTag: plannerTag || 'Customized Planner Edition',
      comment,
      imageUrl: photoUrl || undefined,
      verifiedPurchase: true,
    });

    setAuthorName('');
    setComment('');
    setPlannerTag('');
    setPhotoUrl('');
    setIsModalOpen(false);
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedRatingFilter === 'all') return true;
    return r.rating === selectedRatingFilter;
  });

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section id="customer-reviews" className="py-10 sm:py-20 scroll-mt-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#506850]/10 text-[#506850] text-[11px] font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              Verified Student & Creator Feedback
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#201D1A]">
              Customer Reviews
            </h2>
            <p className="text-xs sm:text-sm text-[#5E564F]">
              See how Little Lines planners and stationery help students stay organized and inspired.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Rating Stat Pill */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-[#201D1A]/10 shadow-xs">
              <span className="font-serif text-2xl font-bold text-[#201D1A]">
                {averageRating}
              </span>
              <div>
                <div className="flex text-amber-500 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-[#5E564F]">
                  {reviews.length} reviews
                </span>
              </div>
            </div>

            {/* Leave Review Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#94442A] text-white font-bold text-xs hover:bg-[#78351F] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Share Feedback</span>
            </button>
          </div>
        </div>

        {/* Rating Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedRatingFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              selectedRatingFilter === 'all'
                ? 'bg-[#201D1A] text-white'
                : 'bg-white text-[#5E564F] border border-[#201D1A]/10'
            }`}
          >
            All ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedRatingFilter(star)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
                selectedRatingFilter === star
                  ? 'bg-[#201D1A] text-white'
                  : 'bg-white text-[#5E564F] border border-[#201D1A]/10'
              }`}
            >
              <span>{star} Stars</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#201D1A]/10 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-[#201D1A]">
                        {review.author}
                      </span>
                      {review.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-[#506850] bg-[#506850]/10 px-1.5 py-0.5 rounded-full font-medium">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#5E564F]">{review.date}</span>
                  </div>

                  <div className="flex text-amber-500 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating ? 'fill-current' : 'text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {review.plannerTag && (
                  <div className="inline-block px-2 py-0.5 rounded-md bg-[#FAF6F0] border border-[#201D1A]/10 text-[10px] font-semibold text-[#94442A]">
                    {review.plannerTag}
                  </div>
                )}

                <p className="text-xs text-[#5E564F] leading-relaxed">
                  "{review.comment}"
                </p>

                {review.imageUrl && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#201D1A]/10 shadow-inner">
                    <img
                      src={review.imageUrl}
                      alt="Customer creation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#201D1A]/10 flex justify-between items-center text-[11px] text-[#5E564F]">
                <span className="truncate max-w-[160px]">{review.productTitle}</span>
                <button
                  onClick={() => likeReview(review.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF6F0] hover:bg-[#94442A]/10 hover:text-[#94442A] transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({review.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Leave Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#201D1A]/10 p-5 sm:p-7 overflow-y-auto max-h-[90vh]">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#201D1A]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#201D1A] mb-1">
              Leave a Review
            </h3>
            <p className="text-xs text-[#5E564F] mb-4">
              Share your experience with Little Lines stationery and custom planners.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Thilini Wickramasinghe"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                  Rating
                </label>
                <div className="flex gap-1.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-0.5 cursor-pointer"
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
                <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                  Product Type
                </label>
                <select
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                >
                  <option value="A/L Study Planner (2027 & 2028 A/L)">A/L Study Planner</option>
                  <option value="2027 Life & Goal Year Planner">2027 Year Life Planner</option>
                  <option value="My Daily Planners">Daily Planner (Custom Pages)</option>
                  <option value="Pastel Aesthetic Sticky Notes">Sticky Notes & Tabs</option>
                  <option value="Mini Desk Calendar 2027">Desk Calendar</option>
                  <option value="Aesthetic Wall Stickers Pack">Wall Stickers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                  Planner Details (Optional Tag)
                </label>
                <input
                  type="text"
                  value={plannerTag}
                  onChange={(e) => setPlannerTag(e.target.value)}
                  placeholder="e.g. Bio Stream • Future Dr Cover • 6 Months Hardcover"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the paper quality, cover design, past paper tracker..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#94442A] text-white font-bold text-xs sm:text-sm hover:bg-[#78351F] shadow-xs transition-all cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
