import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';
import { Product, Review } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddReview: (review: Review) => void;
  userName?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddReview,
  userName = 'Client',
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState(userName);
  const [fitFeedback, setFitFeedback] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: author || 'Verified Atelier Client',
      rating,
      date: 'Just now',
      title: title || 'Exceptional craftsmanship',
      comment,
      verified: true,
      fitFeedback,
    };

    onAddReview(newReview);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      id="review-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="review-modal-card" 
        className="relative w-full max-w-lg bg-[#faf9f6] border border-[#e5e1d7] shadow-2xl p-6 sm:p-8 text-[#1a1918]"
      >
        <button
          id="close-review-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7d786d] hover:text-[#1a1918] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-medium mb-2">Review Recorded</h3>
            <p className="text-xs text-[#7d786d]">Thank you for contributing to the SIYA Atelier review journal.</p>
          </div>
        ) : (
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#9c9688] font-medium block mb-1">
              Atelier Critique & Rating
            </span>
            <h2 className="font-editorial text-2xl font-light tracking-wide text-[#1a1918] mb-1">
              Review {product.name}
            </h2>
            <p className="text-xs text-[#7d786d] mb-6">
              Share your feedback on drape, fabric composition, and tailored fit.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Interactive Star Rating */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      id={`star-btn-${star}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          (hoverRating || rating) >= star 
                            ? 'fill-[#1a1918] text-[#1a1918]' 
                            : 'text-[#d3cec4] stroke-[1.5]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-medium text-[#1a1918]">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Fit assessment */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                  Sizing & Fit Assessment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Runs Small', 'True to Size', 'Runs Large'] as const).map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      id={`fit-option-${fit.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setFitFeedback(fit)}
                      className={`py-2 text-xs uppercase tracking-wider font-medium border transition-all ${
                        fitFeedback === fit
                          ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f6]'
                          : 'border-[#d8d4cb] bg-white text-[#635f56] hover:border-[#1a1918]'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                  Headline / Summary
                </label>
                <input
                  id="review-title-input"
                  type="text"
                  required
                  placeholder="e.g. Masterful silhouette & silk weight"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#d8d4cb] text-sm focus:outline-none focus:border-[#1a1918]"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                  Written Feedback
                </label>
                <textarea
                  id="review-comment-input"
                  required
                  rows={3}
                  placeholder="Describe the texture, weight, silhouette, and movement..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#d8d4cb] text-sm focus:outline-none focus:border-[#1a1918]"
                />
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                  Reviewer Name
                </label>
                <input
                  id="review-author-input"
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2 bg-white border border-[#d8d4cb] text-sm focus:outline-none focus:border-[#1a1918]"
                />
              </div>

              <button
                id="submit-review-btn"
                type="submit"
                className="w-full mt-3 py-3 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all cursor-pointer"
              >
                Publish Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
