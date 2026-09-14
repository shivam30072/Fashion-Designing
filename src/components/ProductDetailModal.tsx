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
  ArrowLeft,
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
          <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 bg-[#faf9f6]/95 backdrop-blur border-b border-[#ece7dc]">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {/* Dedicated High-Visibility Back Button (Always visible on mobile & all screens) */}
              <button
                id="product-detail-back-btn"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1918] text-[#faf9f6] hover:bg-[#383531] active:scale-95 transition-all rounded text-xs font-semibold uppercase tracking-wider shadow-sm cursor-pointer"
                aria-label="Back to catalog"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7d786d] min-w-0">
                <span className="hidden sm:inline">SIYA Archive</span>
                <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
                <span className="text-[#1a1918] font-medium truncate">{product.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                id="detail-bookmark-btn"
                onClick={() => onToggleBookmark(product.id)}
                className={`p-2 rounded-full transition-all ${
                  isBookmarked ? 'text-rose-600 bg-rose-50' : 'text-[#7d786d] hover:text-[#1a1918] hover:bg-[#efebe2]'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark to Wishlist'}
                aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-rose-600' : ''}`} />
              </button>

              <button
                id="detail-close-btn"
                onClick={onClose}
                className="p-2 text-[#7d786d] hover:text-[#1a1918] hover:bg-[#efebe2] transition-colors rounded-full cursor-pointer"
                aria-label="Close product view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              {/* Left Column: Visual Gallery & Atelier Color Palette */}
              <div className="w-full lg:col-span-6 min-w-0 lg:sticky lg:top-4">
                {/* Mobile Product Header (Above image on mobile) */}
                <div className="block lg:hidden mb-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#9c9688] font-medium">
                    SIYA &bull; {product.category}
                  </span>
                  <div className="flex items-baseline justify-between gap-2 mt-0.5">
                    <h1 className="font-editorial text-2xl sm:text-3xl font-light text-[#1a1918] leading-tight">
                      {product.name}
                    </h1>
                    <span className="text-xl font-light text-[#1a1918] whitespace-nowrap">
                      ${product.price.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                {/* Primary High-Res Photo Display - At least half the screen size (50vh) */}
                <div className="w-full relative group bg-[#f4f2ec] overflow-hidden border border-[#eae6dc] h-[50vh] sm:h-[55vh] lg:h-[520px] min-h-[50vh] flex items-center justify-center">
                  {/* Floating Back Button on mobile directly on image */}
                  <button
                    id="mobile-floating-back-btn"
                    onClick={onClose}
                    className="sm:hidden absolute top-3 left-3 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
                    aria-label="Back to catalog"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <ImageWithPlaceholder
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.name}
                    aspectRatio="h-full w-full"
                    objectFit="cover"
                    className="w-full h-full shadow-inner"
                  />
                  
                  {/* Previous / Next Image Nav Controls */}
                  {product.images.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2.5 pointer-events-none opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
                        }}
                        className="pointer-events-auto p-2 bg-white/95 text-[#1a1918] hover:bg-[#1a1918] hover:text-white transition-colors shadow-md rounded-full cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
                        }}
                        className="pointer-events-auto p-2 bg-white/95 text-[#1a1918] hover:bg-[#1a1918] hover:text-white transition-colors shadow-md rounded-full cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Photo Indicators / Carousel Dots */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full pointer-events-auto">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(idx);
                          }}
                          className={`transition-all rounded-full cursor-pointer ${
                            selectedImageIndex === idx 
                              ? 'w-5 h-1.5 bg-white' 
                              : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/90'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Photo Counter Indicator */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 z-10 bg-black/75 backdrop-blur text-white text-[11px] px-2.5 py-1 rounded tracking-widest font-mono hidden sm:block">
                      {selectedImageIndex + 1} / {product.images.length}
                    </div>
                  )}

                  {product.isNew && (
                    <span className="absolute top-3 right-3 sm:left-3 sm:right-auto bg-[#1a1918] text-[#faf9f6] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium z-10">
                      Atelier New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-11 right-3 sm:top-3 sm:right-3 bg-[#c6a76c] text-[#1a1918] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold z-10">
                      Collector Favorite
                    </span>
                  )}
                </div>

                {/* ATELIER PALETTE - DIRECTLY BELOW THE IMAGE */}
                <div className="mt-2.5 sm:mt-3 p-3.5 sm:p-4 bg-[#f6f4ee] border border-[#e2ddd0] rounded-sm">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c6a76c]"></span>
                      <span className="uppercase tracking-[0.2em] text-[#57534a] font-semibold text-xs">
                        Atelier Palette
                      </span>
                    </div>
                    <span className="text-[#1a1918] font-medium bg-white px-2.5 py-0.5 border border-[#d8d3c5] text-xs shadow-2xs">
                      {selectedColor.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        id={`detail-color-btn-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setSelectedColor(c)}
                        className={`group relative w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor.name === c.name 
                            ? 'ring-2 ring-[#1a1918] ring-offset-2 scale-110 shadow-sm' 
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        title={c.name}
                        aria-label={`Select color ${c.name}`}
                      >
                        <span 
                          className="w-full h-full rounded-full border border-black/15 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thumbnails Row (Positioned below the Color Palette) */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-1 mt-2.5 scrollbar-none flex-shrink-0">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative flex-shrink-0 w-12 h-16 sm:w-16 sm:h-20 overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImageIndex === idx ? 'border-[#1a1918] opacity-100 shadow-sm ring-1 ring-[#1a1918]' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <ImageWithPlaceholder 
                          src={img} 
                          alt={`${product.name} thumbnail ${idx + 1}`} 
                          aspectRatio="h-full w-full aspect-[3/4]" 
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Product Narrative & Interactive Controls */}
              <div className="lg:col-span-6 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="hidden lg:block">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#9c9688] font-medium">
                      SIYA &bull; {product.category}
                    </span>
                    <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#1a1918] mt-1 mb-2 leading-tight">
                      {product.name}
                    </h1>
                  </div>

                  {/* Ratings summary banner */}
                  <div className="flex items-center gap-3 mb-4 mt-2 lg:mt-0">
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
                      className="text-xs text-[#1a1918] underline underline-offset-4 hover:text-[#c6a76c] transition-colors ml-auto font-medium cursor-pointer"
                    >
                      Rate & Review
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-5">
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
