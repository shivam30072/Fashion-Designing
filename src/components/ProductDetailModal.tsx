import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  Ruler, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Plus, 
  Minus, 
  ShoppingBag, 
  Check,
  RotateCcw,
  Scissors
} from 'lucide-react';
import { Product, ProductColor, Review } from '../types';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';
import { ReviewModal } from './ReviewModal';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number, customNote?: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (productId: string) => void;
  reviews: Review[];
  onAddReview: (review: Review) => void;
  userName?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isBookmarked,
  onToggleBookmark,
  reviews,
  onAddReview,
  userName,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'measurements' | 'craftsmanship'>('details');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [customMeasurements, setCustomMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: '',
  });

  const isCustomAtelier = selectedSize.toLowerCase().includes('custom');

  const handleAdd = () => {
    const customNote = isCustomAtelier 
      ? `Bust: ${customMeasurements.bust || 'Auto'}, Waist: ${customMeasurements.waist || 'Auto'}, Hips: ${customMeasurements.hips || 'Auto'}, Height: ${customMeasurements.height || 'Auto'}`
      : undefined;

    onAddToCart(product, selectedSize, selectedColor, quantity, customNote);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const productReviews = reviews.filter(r => r.productId === product.id);
  const avgRating = productReviews.length 
    ? (productReviews.reduce((acc, curr) => acc + curr.rating, 0) / productReviews.length).toFixed(1)
    : product.rating.toFixed(1);

  return (
    <>
      <div 
        id="product-detail-backdrop" 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div 
          id="product-detail-dialog"
          className="relative w-full max-w-5xl bg-[#faf9f6] text-[#1a1918] shadow-2xl min-h-screen sm:min-h-0 sm:max-h-[92vh] flex flex-col sm:border border-[#e0dbcf] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#faf9f6]/95 backdrop-blur border-b border-[#ece7dc]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7d786d]">
              <span>SIYA Archive</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#1a1918] font-medium">{product.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="detail-bookmark-btn"
                onClick={() => onToggleBookmark(product.id)}
                className={`p-2 rounded-full transition-all ${
                  isBookmarked ? 'text-rose-600 bg-rose-50' : 'text-[#7d786d] hover:text-[#1a1918] hover:bg-[#efebe2]'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-rose-600' : ''}`} />
              </button>

              <button
                id="detail-close-btn"
                onClick={onClose}
                className="p-2 text-[#7d786d] hover:text-[#1a1918] hover:bg-[#efebe2] transition-colors rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              {/* Left Column: Visual Gallery */}
              <div className="lg:col-span-6 min-w-0 lg:sticky lg:top-4">
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                  {/* Thumbnails */}
                  <div className="flex sm:flex-col gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px] pb-1 sm:pb-0 scrollbar-none flex-shrink-0">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative flex-shrink-0 w-14 h-18 sm:w-16 sm:h-20 overflow-hidden border-2 transition-all ${
                          selectedImageIndex === idx ? 'border-[#1a1918] opacity-100 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <ImageWithPlaceholder 
                          src={img} 
                          alt={`${product.name} thumbnail ${idx + 1}`} 
                          aspectRatio="aspect-[3/4]" 
                        />
                      </button>
                    ))}
                  </div>

                  {/* Primary High-Res Photo Display */}
                  <div className="flex-1 min-w-0 relative group bg-[#f4f2ec] overflow-hidden border border-[#eae6dc]">
                    <ImageWithPlaceholder
                      src={product.images[selectedImageIndex] || product.images[0]}
                      alt={product.name}
                      aspectRatio="aspect-[3/4]"
                      className="w-full shadow-inner"
                    />
                    
                    {/* Previous / Next Image Nav Controls */}
                    {product.images.length > 1 && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
                          }}
                          className="pointer-events-auto p-1.5 bg-white/90 backdrop-blur text-[#1a1918] hover:bg-[#1a1918] hover:text-white transition-colors shadow"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
                          }}
                          className="pointer-events-auto p-1.5 bg-white/90 backdrop-blur text-[#1a1918] hover:bg-[#1a1918] hover:text-white transition-colors shadow"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-[#1a1918] text-[#faf9f6] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium z-10">
                        Atelier New
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="absolute top-3 right-3 bg-[#c6a76c] text-[#1a1918] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold z-10">
                        Collector Favorite
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Product Narrative & Interactive Controls */}
              <div className="lg:col-span-6 min-w-0 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#9c9688] font-medium">
                    SIYA &bull; {product.category}
                  </span>
                  <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#1a1918] mt-1 mb-2 leading-tight">
                    {product.name}
                  </h1>

                  {/* Ratings summary banner */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center text-[#1a1918]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= Math.round(Number(avgRating)) 
                              ? 'fill-[#1a1918] text-[#1a1918]' 
                              : 'text-[#d8d4cb]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[#1a1918]">{avgRating} / 5</span>
                    <span className="text-xs text-[#7d786d]">
                      ({productReviews.length + product.reviewCount} Reviews)
                    </span>
                    <button
                      id="open-rating-modal-inline"
                      onClick={() => setIsReviewModalOpen(true)}
                      className="text-xs text-[#1a1918] underline underline-offset-4 hover:text-[#c6a76c] transition-colors ml-auto font-medium"
                    >
                      Rate & Review
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-2xl font-light text-[#1a1918]">
                      ${product.price.toLocaleString()} USD
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-[#9e998e] line-through">
                        ${product.originalPrice.toLocaleString()} USD
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-[0.15em] bg-[#ece8dd] text-[#635f56] px-2 py-0.5 ml-2 font-medium">
                      Complimentary Global Shipping
                    </span>
                  </div>

                  <p className="text-sm text-[#57534a] leading-relaxed mb-6 font-sans">
                    {product.description}
                  </p>

                  {/* Color Selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="uppercase tracking-[0.15em] text-[#635f56] font-medium">
                        Atelier Palette
                      </span>
                      <span className="text-[#1a1918] font-medium">{selectedColor.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            selectedColor.name === c.name 
                              ? 'ring-2 ring-[#1a1918] ring-offset-2' 
                              : 'hover:scale-105 opacity-90'
                          }`}
                          title={c.name}
                        >
                          <span 
                            className="w-full h-full rounded-full border border-black/10"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="uppercase tracking-[0.15em] text-[#635f56] font-medium">
                        Size Selection
                      </span>
                      <button 
                        onClick={() => setActiveTab('measurements')}
                        className="text-[11px] text-[#7d786d] underline hover:text-[#1a1918] flex items-center gap-1"
                      >
                        <Ruler className="w-3 h-3" /> Size Guide
                      </button>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          id={`size-btn-${s.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setSelectedSize(s)}
                          className={`py-2.5 text-xs uppercase tracking-wider font-medium border transition-all text-center ${
                            selectedSize === s
                              ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f6]'
                              : 'border-[#d8d4cb] bg-white text-[#4a4740] hover:border-[#1a1918]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    {/* Custom Made-to-measure input fields if 'Custom' selected */}
                    {isCustomAtelier && (
                      <div className="mt-4 p-3.5 bg-[#f4f1ea] border border-[#dcd7cb] space-y-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-[#1a1918]">
                          <Scissors className="w-4 h-4 text-[#c6a76c]" />
                          <span>Atelier Made-to-Measure Specifications</span>
                        </div>
                        <p className="text-[11px] text-[#6d685d]">
                          Provide your exact measurements (inches or cm). Our master pattern-maker will calibrate your garment.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="block text-[10px] uppercase text-[#6d685d] mb-1">Bust / Chest</label>
                            <input
                              type="text"
                              placeholder="e.g. 34 in / 86 cm"
                              value={customMeasurements.bust}
                              onChange={(e) => setCustomMeasurements({...customMeasurements, bust: e.target.value})}
                              className="w-full px-2.5 py-1.5 bg-white border border-[#d8d4cb] text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase text-[#6d685d] mb-1">Natural Waist</label>
                            <input
                              type="text"
                              placeholder="e.g. 26 in / 66 cm"
                              value={customMeasurements.waist}
                              onChange={(e) => setCustomMeasurements({...customMeasurements, waist: e.target.value})}
                              className="w-full px-2.5 py-1.5 bg-white border border-[#d8d4cb] text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase text-[#6d685d] mb-1">Full Hips</label>
                            <input
                              type="text"
                              placeholder="e.g. 36 in / 91 cm"
                              value={customMeasurements.hips}
                              onChange={(e) => setCustomMeasurements({...customMeasurements, hips: e.target.value})}
                              className="w-full px-2.5 py-1.5 bg-white border border-[#d8d4cb] text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase text-[#6d685d] mb-1">Height & Hem Drop</label>
                            <input
                              type="text"
                              placeholder="e.g. 5ft 8in / 173 cm"
                              value={customMeasurements.height}
                              onChange={(e) => setCustomMeasurements({...customMeasurements, height: e.target.value})}
                              className="w-full px-2.5 py-1.5 bg-white border border-[#d8d4cb] text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="flex items-stretch gap-3 mb-8">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#d8d4cb] bg-white px-3 py-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 text-[#7d786d] hover:text-[#1a1918]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 text-[#7d786d] hover:text-[#1a1918]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to Bag Button */}
                    <button
                      id="detail-add-to-cart-btn"
                      onClick={handleAdd}
                      className={`flex-1 py-3.5 text-xs uppercase tracking-[0.25em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        addedAnimation
                          ? 'bg-emerald-800 text-white'
                          : 'bg-[#1a1918] text-[#faf9f6] hover:bg-black'
                      }`}
                    >
                      {addedAnimation ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Shopping Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Atelier Bag &bull; ${(product.price * quantity).toLocaleString()}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Tabs / Accordion */}
                <div className="border-t border-[#e2ded5] pt-4">
                  <div className="flex border-b border-[#e2ded5] mb-4 text-xs font-medium">
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`pb-2 mr-6 uppercase tracking-[0.15em] border-b-2 transition-colors ${
                        activeTab === 'details' ? 'border-[#1a1918] text-[#1a1918]' : 'border-transparent text-[#9c9688]'
                      }`}
                    >
                      Craftsmanship
                    </button>
                    <button
                      onClick={() => setActiveTab('measurements')}
                      className={`pb-2 mr-6 uppercase tracking-[0.15em] border-b-2 transition-colors ${
                        activeTab === 'measurements' ? 'border-[#1a1918] text-[#1a1918]' : 'border-transparent text-[#9c9688]'
                      }`}
                    >
                      Size & Drape
                    </button>
                    <button
                      onClick={() => setActiveTab('craftsmanship')}
                      className={`pb-2 uppercase tracking-[0.15em] border-b-2 transition-colors ${
                        activeTab === 'craftsmanship' ? 'border-[#1a1918] text-[#1a1918]' : 'border-transparent text-[#9c9688]'
                      }`}
                    >
                      Care & Origin
                    </button>
                  </div>

                  <div className="text-xs text-[#5c584f] space-y-2">
                    {activeTab === 'details' && (
                      <ul className="space-y-1.5 list-disc list-inside">
                        {product.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'measurements' && (
                      <div className="space-y-2">
                        <p>Our tailoring silhouette is crafted to accentuate natural posture with comfortable ease. True to European sizing.</p>
                        <div className="p-2 bg-[#f2efe9] text-[11px] font-mono">
                          Model is 5&apos;11&quot; (180cm), bust 33&quot;, waist 24&quot; wearing size Small.
                        </div>
                      </div>
                    )}
                    {activeTab === 'craftsmanship' && (
                      <div className="space-y-2">
                        <p><strong className="text-[#1a1918]">Materials:</strong> {product.materials}</p>
                        <p><strong className="text-[#1a1918]">Care Instructions:</strong> {product.care}</p>
                        <p className="text-[#878276] italic">Handcrafted with ethical zero-waste fabric reclamation in Northern Italy.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="mt-16 pt-10 border-t border-[#e2ded5]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#9c9688] font-medium block">
                    Verified Atelier Critiques
                  </span>
                  <h3 className="font-editorial text-2xl font-light text-[#1a1918]">
                    Client Reviews & Experiences
                  </h3>
                </div>

                <button
                  id="leave-review-main-btn"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-5 py-2.5 border border-[#1a1918] text-[#1a1918] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#1a1918] hover:text-white transition-all self-start sm:self-auto cursor-pointer"
                >
                  Write a Review
                </button>
              </div>

              {productReviews.length === 0 ? (
                <div className="text-center py-10 bg-[#f4f1ea] p-6 border border-[#e5e1d7]">
                  <p className="text-sm text-[#6b675d] mb-3">Be the first to review this atelier creation.</p>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="text-xs uppercase tracking-wider underline text-[#1a1918] font-medium"
                  >
                    Share your experience
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {productReviews.map((rev) => (
                    <div 
                      key={rev.id}
                      className="p-5 bg-white border border-[#e5e1d7] shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center text-[#1a1918]">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= rev.rating ? 'fill-[#1a1918] text-[#1a1918]' : 'text-[#d8d4cb]'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-[#8e897e]">{rev.date}</span>
                        </div>

                        <h4 className="font-medium text-sm text-[#1a1918] mb-1">
                          {rev.title}
                        </h4>
                        <p className="text-xs text-[#524f46] leading-relaxed mb-4">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#f0ede6] text-[11px]">
                        <div className="flex items-center gap-1.5 text-[#1a1918] font-medium">
                          <span>{rev.author}</span>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-0.5 text-emerald-700 text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded">
                              <Check className="w-2.5 h-2.5" /> Verified Client
                            </span>
                          )}
                        </div>
                        <span className="text-[#7d786d] italic">Fit: {rev.fitFeedback}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal Trigger */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={product}
        onAddReview={onAddReview}
        userName={userName}
      />
    </>
  );
};
