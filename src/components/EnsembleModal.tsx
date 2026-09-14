import React, { useState } from 'react';
import { X, ArrowRight, ShoppingBag, Check, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { EditorialLook, Product, ProductColor } from '../types';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';

interface EnsembleModalProps {
  look: EditorialLook | null;
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  bookmarks: string[];
  onToggleBookmark: (productId: string) => void;
}

export const EnsembleModal: React.FC<EnsembleModalProps> = ({
  look,
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
  bookmarks,
  onToggleBookmark,
}) => {
  const [addedAllAnimation, setAddedAllAnimation] = useState(false);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  if (!isOpen || !look) return null;

  const ensembleProducts = products.filter(p => look.productIds.includes(p.id));
  const totalPrice = ensembleProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddSingle = (p: Product) => {
    onAddToCart(p, p.sizes[0] || 'M', p.colors[0], 1);
    setAddedItems(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [p.id]: false }));
    }, 2000);
  };

  const handleAddAll = () => {
    ensembleProducts.forEach(p => {
      onAddToCart(p, p.sizes[0] || 'M', p.colors[0], 1);
    });
    setAddedAllAnimation(true);
    setTimeout(() => {
      setAddedAllAnimation(false);
    }, 2500);
  };

  return (
    <div 
      id="ensemble-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="ensemble-modal-dialog"
        className="relative w-full max-w-4xl bg-[#faf9f6] text-[#1a1918] shadow-2xl flex flex-col sm:border border-[#ded9cb] max-h-[92vh] overflow-hidden"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-6 py-4 bg-[#faf9f6]/95 backdrop-blur border-b border-[#ece7dc]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#7d786d] min-w-0">
            <span className="hidden sm:inline">SIYA Editorial Lookbook</span>
            <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
            <span className="text-[#1a1918] font-medium truncate">{look.title}</span>
          </div>

          <button
            id="ensemble-close-btn"
            onClick={onClose}
            className="p-1.5 sm:p-2 text-[#7d786d] hover:text-[#1a1918] hover:bg-[#efebe2] transition-colors rounded-full"
            aria-label="Close ensemble modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Left Column: Editorial Campaign Visual & Story */}
            <div className="md:col-span-5 min-w-0">
              <div className="relative overflow-hidden bg-[#f4f2ec] border border-[#e5e0d3]">
                <ImageWithPlaceholder
                  src={look.leadImage}
                  alt={look.title}
                  aspectRatio="aspect-[3/4]"
                  className="w-full shadow-inner"
                />
                <div className="absolute top-3 left-3 bg-[#1a1918] text-[#faf9f6] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium">
                  {look.season}
                </div>
              </div>

              <div className="mt-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9c9688] font-medium">
                  Curator&apos;s Styling Note
                </span>
                <p className="text-xs text-[#5c574c] leading-relaxed mt-1.5 font-sans">
                  {look.curatorNote}
                </p>

                {/* Harmonious Palette Swatches */}
                <div className="mt-4 pt-3 border-t border-[#ede8dc] flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#8a8579] font-medium">
                    Atelier Palette
                  </span>
                  <div className="flex items-center gap-1.5">
                    {look.palette.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Garments within Ensemble */}
            <div className="md:col-span-7 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9c9688] font-medium">
                      Complete Silhouette
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#1a1918]">
                      Ensemble Garments
                    </h3>
                  </div>
                  <span className="text-xs text-[#7d786d] font-mono">
                    {ensembleProducts.length} Atelier Pieces
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {ensembleProducts.map((p) => {
                    const isBookmarked = bookmarks.includes(p.id);
                    const isAdded = !!addedItems[p.id];

                    return (
                      <div
                        key={p.id}
                        className="bg-white border border-[#eae5d8] p-3 sm:p-3.5 flex gap-3 sm:gap-4 items-center justify-between hover:border-[#c6a76c] transition-colors group"
                      >
                        {/* Thumbnail Image */}
                        <div 
                          onClick={() => {
                            onClose();
                            onSelectProduct(p);
                          }}
                          className="w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 cursor-pointer overflow-hidden border border-[#ede8de]"
                        >
                          <ImageWithPlaceholder
                            src={p.images[0]}
                            alt={p.name}
                            aspectRatio="aspect-[3/4]"
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8a8579] font-medium block truncate">
                            {p.category}
                          </span>
                          <h4 
                            onClick={() => {
                              onClose();
                              onSelectProduct(p);
                            }}
                            className="font-editorial text-base sm:text-lg text-[#1a1918] cursor-pointer hover:text-[#886c35] transition-colors truncate"
                          >
                            {p.name}
                          </h4>
                          <p className="text-xs font-light text-[#1a1918] mt-0.5">
                            ${p.price.toLocaleString()} USD
                          </p>
                          <p className="text-[11px] text-[#7d786d] hidden sm:block truncate mt-0.5">
                            {p.materials}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-1.5 sm:gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleAddSingle(p)}
                            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1 transition-all ${
                              isAdded
                                ? 'bg-emerald-800 text-white'
                                : 'bg-[#1a1918] text-[#faf9f6] hover:bg-black'
                            }`}
                            title="Add this piece to shopping bag"
                          >
                            {isAdded ? <Check className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                            <span className="hidden sm:inline">{isAdded ? 'Added' : 'Add Piece'}</span>
                          </button>

                          <button
                            onClick={() => {
                              onClose();
                              onSelectProduct(p);
                            }}
                            className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium border border-[#d8d4cb] text-[#4a4740] hover:border-[#1a1918] hover:text-[#1a1918] transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total & 1-Click Complete Ensemble Add */}
              <div className="mt-6 pt-5 border-t border-[#ded9cb] bg-[#f5f2ea] p-4 border border-[#e2ddd0]">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#7d786d] font-medium block">
                      Ensemble Complete Value
                    </span>
                    <span className="text-xl sm:text-2xl font-light text-[#1a1918]">
                      ${totalPrice.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 inline-block">
                      Complimentary Atelier Delivery
                    </span>
                  </div>
                </div>

                <button
                  id="add-all-ensemble-btn"
                  onClick={handleAddAll}
                  className={`w-full py-3.5 text-xs uppercase tracking-[0.22em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedAllAnimation
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#1a1918] text-[#faf9f6] hover:bg-black'
                  }`}
                >
                  {addedAllAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>All {ensembleProducts.length} Ensemble Pieces Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#c6a76c]" />
                      <span>Acquire Complete Ensemble &bull; ${totalPrice.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
