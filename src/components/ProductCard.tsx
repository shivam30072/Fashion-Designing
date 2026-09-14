import React, { useState } from 'react';
import { Heart, Star, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isBookmarked: boolean;
  onToggleBookmark: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const displayImage = isHovered && product.images[1] 
    ? product.images[1] 
    : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col cursor-pointer transition-all duration-300"
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Frame */}
      <div className="relative overflow-hidden bg-[#f4f2ec] aspect-[3/4] mb-3.5">
        <ImageWithPlaceholder
          src={displayImage}
          alt={product.name}
          aspectRatio="aspect-[3/4]"
          className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-[#1a1918] text-[#faf9f6] text-[9px] uppercase tracking-[0.25em] px-2.5 py-0.5 font-medium shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#c6a76c] text-[#1a1918] text-[9px] uppercase tracking-[0.25em] px-2.5 py-0.5 font-semibold shadow-sm">
              Signature
            </span>
          )}
        </div>

        {/* Bookmark Heart Button */}
        <button
          id={`bookmark-btn-${product.id}`}
          onClick={handleBookmark}
          aria-label={isBookmarked ? 'Remove from favorites' : 'Bookmark item'}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
            isBookmarked
              ? 'bg-rose-50/90 text-rose-600 scale-105'
              : 'bg-white/80 text-[#555148] hover:text-[#1a1918] hover:bg-white'
          }`}
        >
          <Heart 
            className={`w-4 h-4 transition-transform ${isBookmarked ? 'fill-rose-600' : ''}`} 
          />
        </button>

        {/* Floating Quick Action Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            className={`flex-1 py-2.5 px-3 text-[10px] uppercase tracking-[0.2em] font-medium backdrop-blur-md flex items-center justify-center gap-1.5 transition-all shadow-md ${
              justAdded
                ? 'bg-emerald-900 text-white'
                : 'bg-[#1a1918]/90 text-[#faf9f6] hover:bg-black'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Quick Bag
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="p-2.5 bg-white/90 text-[#1a1918] hover:bg-white backdrop-blur-md transition-all shadow-md"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details & Typography */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#7d786d] mb-1">
            <span className="uppercase tracking-[0.15em]">{product.category}</span>
            <div className="flex items-center gap-1 text-[#1a1918]">
              <Star className="w-3 h-3 fill-[#1a1918]" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-[#9e998e]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-editorial text-lg text-[#1a1918] group-hover:text-[#886c35] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#736e63] line-clamp-1 mt-0.5 font-sans">
            {product.tagline}
          </p>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-sm font-medium text-[#1a1918]">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#9e998e] line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
          <div className="ml-auto flex items-center gap-1">
            {product.colors.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
