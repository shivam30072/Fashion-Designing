import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedProducts: Product[];
  onRemoveBookmark: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onMoveToBag: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedProducts,
  onRemoveBookmark,
  onSelectProduct,
  onMoveToBag,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="wishlist-drawer-backdrop" 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="wishlist-drawer-panel"
          className="w-screen max-w-md bg-[#faf9f6] text-[#1a1918] shadow-2xl flex flex-col border-l border-[#e5e0d3] animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#ece7dc] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h2 className="font-editorial text-2xl font-light tracking-wide">
                Bookmarked Creations
              </h2>
              <span className="text-xs text-[#7d786d]">({bookmarkedProducts.length})</span>
            </div>
            <button
              id="close-wishlist-btn"
              onClick={onClose}
              className="p-1.5 text-[#7d786d] hover:text-[#1a1918] rounded-full hover:bg-[#efebe2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#eee9df]">
            {bookmarkedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#f4f1ea] flex items-center justify-center mb-4 text-[#8a8579]">
                  <Heart className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-editorial text-2xl font-light mb-1">No bookmarked pieces</h3>
                <p className="text-xs text-[#7d786d] max-w-xs mb-6">
                  Bookmark pieces using the heart icon on cards or editorial lookbooks to revisit them later.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              bookmarkedProducts.map((product) => (
                <div key={product.id} className="py-5 flex gap-4 first:pt-0 last:pb-0">
                  <div 
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-20 h-26 flex-shrink-0 bg-[#f4f1ea] cursor-pointer overflow-hidden"
                  >
                    <ImageWithPlaceholder
                      src={product.images[0]}
                      alt={product.name}
                      aspectRatio="aspect-[3/4]"
                      className="w-full h-full hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#8a8579]">{product.category}</span>
                        <button
                          onClick={() => onRemoveBookmark(product.id)}
                          className="text-[#9e998e] hover:text-rose-600 transition-colors p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="font-editorial text-base text-[#1a1918] hover:text-[#c6a76c] cursor-pointer leading-tight"
                      >
                        {product.name}
                      </h4>

                      <p className="text-xs font-semibold text-[#1a1918] mt-1">
                        ${product.price.toLocaleString()} USD
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          onMoveToBag(product);
                        }}
                        className="flex-1 py-2 px-3 bg-[#1a1918] text-[#faf9f6] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" /> Move to Bag
                      </button>

                      <button
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="p-2 border border-[#d8d4cb] text-[#1a1918] hover:border-[#1a1918] transition-colors"
                        title="View details"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          {bookmarkedProducts.length > 0 && (
            <div className="p-4 bg-[#f2efe9] border-t border-[#e2ddd0] text-center">
              <p className="text-[11px] text-[#7d786d]">
                Bookmarked creations are synchronized with your private atelier account.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
