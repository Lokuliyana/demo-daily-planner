'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Star,
  ThumbsUp,
  MessageSquarePlus,
  X,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ColoredFlower,
  ColoredHeart,
  ColoredSparkle,
  ColoredStar,
} from '@/components/ui/colored-icons';

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
    <section id="customer-reviews" className="py-12 sm:py-20 scroll-mt-20 px-3 sm:px-6 lg:px-8 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <Badge variant="pink" className="text-xs uppercase font-bold tracking-wider gap-1.5">
              <ColoredHeart size={13} />
              <span>Student Love Notes</span>
            </Badge>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-[#382A2C] flex items-center gap-2">
              What Besties Are Saying <ColoredFlower size={28} />
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5C5E] font-semibold">
              Sweet reviews from students studying happily with Little Lines planners!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Rating Stat Pill */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFF5F7] border-2 border-[#FF6B8B]/20 shadow-xs">
              <span className="font-heading text-2xl font-extrabold text-[#FF6B8B]">
                {averageRating}
              </span>
              <div>
                <div className="flex text-amber-400 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-[#6E5C5E] flex items-center gap-1">
                  <span>{reviews.length} happy reviews</span>
                  <ColoredSparkle size={11} />
                </span>
              </div>
            </div>

            <Button variant="pink" onClick={() => setIsModalOpen(true)} className="gap-1.5">
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write a Sweet Note</span>
              <ColoredHeart size={14} />
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedRatingFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none shrink-0 ${
              selectedRatingFilter === 'all'
                ? 'bg-[#FF6B8B] text-white shadow-[0_3px_0_#E04D6D]'
                : 'bg-white text-[#6E5C5E] border-2 border-[#FF6B8B]/20 hover:border-[#FF6B8B]/50'
            }`}
          >
            All Cuties ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedRatingFilter(star)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer select-none shrink-0 ${
                selectedRatingFilter === star
                  ? 'bg-[#FF6B8B] text-white shadow-[0_3px_0_#E04D6D]'
                  : 'bg-white text-[#6E5C5E] border-2 border-[#FF6B8B]/20 hover:border-[#FF6B8B]/50'
              }`}
            >
              <span>{star} Stars</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence>
            {filteredReviews.map((review) => (
              <motion.div
                layout
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white p-5 sm:p-6 rounded-[32px] border-2 border-[#FF6B8B]/20 shadow-[0_8px_24px_rgba(255,107,139,0.1)] flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#382A2C] flex items-center gap-1.5">
                          <span>{review.author}</span>
                          <ColoredFlower size={13} />
                        </span>
                        {review.verifiedPurchase && (
                          <Badge variant="mint" className="text-[9px] px-2 py-0.5 font-bold">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Verified Bestie
                          </Badge>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-[#9E8C8E]">{review.date}</span>
                    </div>

                    <div className="flex text-amber-400 text-xs">
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

                  {review.plannerTag && (
                    <Badge variant="pink" className="text-[10px] font-bold">
                      {review.plannerTag}
                    </Badge>
                  )}

                  <p className="text-xs sm:text-sm text-[#6E5C5E] leading-relaxed font-semibold">
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  {review.imageUrl && (
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#FF6B8B]/20 shadow-xs">
                      <img
                        src={review.imageUrl}
                        alt="Customer upload"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#FF6B8B]/15 flex justify-between items-center text-xs text-[#9E8C8E]">
                  <span className="truncate max-w-[180px] text-[11px] font-bold text-[#FF6B8B]">{review.productTitle}</span>
                  <button
                    onClick={() => likeReview(review.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F7] hover:bg-[#FFE5EC] text-[#FF6B8B] transition-colors cursor-pointer text-[11px] font-bold"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Love ({review.likes})</span>
                    <ColoredHeart size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Cute Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-[36px] shadow-[0_20px_60px_rgba(255,107,139,0.2)] border-2 border-[#FF6B8B]/25 p-5 sm:p-7 overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FFF5F7] text-[#FF6B8B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#382A2C] mb-1 flex items-center gap-2">
                <span>Share Your Sweet Thoughts</span>
                <ColoredFlower size={20} />
              </h3>
              <p className="text-xs font-semibold text-[#6E5C5E] mb-4">
                Tell everyone about the cute paper feel, stickers, or exam motivation!
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Thilini Wickramasinghe"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="p-1 cursor-pointer hover:scale-120 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Product
                  </label>
                  <select
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                  >
                    <option value="A/L Study Planner (2027 & 2028 A/L)">A/L Study Planner</option>
                    <option value="2027 Life & Goal Year Planner">2027 Year Life Planner</option>
                    <option value="My Daily Planners">Daily Planner</option>
                    <option value="Pastel Aesthetic Sticky Notes">Pastel Sticky Notes</option>
                    <option value="Mini Desk Calendar 2027">Desk Calendar</option>
                    <option value="Aesthetic Wall Stickers Pack">Wall Stickers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Custom Stream / Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={plannerTag}
                    onChange={(e) => setPlannerTag(e.target.value)}
                    placeholder="e.g. Bio Stream • 6 Months Hardcover"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Your Sweet Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How much do you love the paper quality and cute cover?..."
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>

                <Button type="submit" variant="pink" size="lg" className="w-full gap-2">
                  <span>Post Sweet Note</span>
                  <ColoredHeart size={16} />
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
