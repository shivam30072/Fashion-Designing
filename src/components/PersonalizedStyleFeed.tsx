import React, { useState } from 'react';
import { Sparkles, Heart, Plus, ArrowRight, Sliders, Check } from 'lucide-react';
import { Product, ProductColor, EditorialLook } from '../types';
import { STYLE_VIBES } from '../data/products';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';
import { EnsembleModal } from './EnsembleModal';

interface PersonalizedStyleFeedProps {
  products: Product[];
  bookmarks: string[];
  onToggleBookmark: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onAddToCart?: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  userName?: string;
}

const EDITORIAL_LOOKS: EditorialLook[] = [
  {
    id: 'look-01',
    title: 'The Monolithic Minimalist',
    season: 'Autumn / Winter Atelier',
    vibe: 'Tailoring',
    leadImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    curatorNote: 'Pairing architectural wool gabardine with whisper-thin silk drapery creates arresting contrast between structure and liquidity.',
    palette: ['#EBE2D5', '#313338', '#1C1B1A'],
    productIds: ['siya-02', 'siya-01', 'siya-07']
  },
  {
    id: 'look-02',
    title: 'Venetian Nocturne',
    season: 'High Gala Collection',
    vibe: 'Couture',
    leadImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    curatorNote: 'Deep light-absorbing velvet illuminated by brushed solid brass accessories. Designed for evening gala entrances.',
    palette: ['#16233B', '#8B4E2B', '#111111'],
    productIds: ['siya-08', 'siya-04', 'siya-07']
  },
  {
    id: 'look-03',
    title: 'Effortless Cashmere Envelop',
    season: 'Atelier Core',
    vibe: 'Quiet Luxury',
    leadImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
    curatorNote: 'Double-faced Mongolian cashmere unlined for featherweight warmth. Layered over a fluid bias slip.',
    palette: ['#C7B9A5', '#BAC5B8', '#EDECE6'],
    productIds: ['siya-06', 'siya-03', 'siya-07']
  }
];

export const PersonalizedStyleFeed: React.FC<PersonalizedStyleFeedProps> = ({
  products,
  bookmarks,
  onToggleBookmark,
  onSelectProduct,
  onQuickAdd,
  onAddToCart,
  userName = 'Client',
}) => {
  const [activeVibe, setActiveVibe] = useState<string>('Quiet Luxury');
  const [selectedPalettes, setSelectedPalettes] = useState<string[]>(['Champagne', 'Obsidian', 'Bone']);
  const [selectedEnsembleLook, setSelectedEnsembleLook] = useState<EditorialLook | null>(null);

  // Fallback cart handler if not directly provided
  const handleAddToCartInternal = (p: Product, size: string, color: ProductColor, quantity: number) => {
    if (onAddToCart) {
      onAddToCart(p, size, color, quantity);
    } else {
      onQuickAdd(p);
    }
  };

  // Filter products based on selected vibe or general recommendation
  const matchingProducts = products.filter(p => 
    p.tags.includes(activeVibe) || (activeVibe === 'All' ? true : false)
  );

  const displayList = matchingProducts.length > 0 ? matchingProducts : products;

  return (
    <div id="personalized-style-feed" className="py-6 sm:py-10 space-y-12 sm:space-y-16">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e2ddd0] pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#9c9688] font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#c6a76c]" />
            <span>SIYA Haute Curations &bull; For {userName}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-light tracking-wide text-[#1a1918]">
            Personalized Style Feed
          </h2>
          <p className="text-xs sm:text-sm text-[#736e63] mt-2 max-w-xl font-sans leading-relaxed">
            Tailored wardrobe narratives, architectural silhouettes, and editorial moodboards aligned with your aesthetic preferences.
          </p>
        </div>

        {/* Vibe Chips Selector */}
        <div className="flex flex-wrap gap-2">
          {STYLE_VIBES.map((vibe) => (
            <button
              key={vibe.id}
              onClick={() => setActiveVibe(vibe.tag)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium border transition-all cursor-pointer ${
                activeVibe === vibe.tag
                  ? 'bg-[#1a1918] text-[#faf9f6] border-[#1a1918] shadow-sm'
                  : 'bg-white text-[#5c584f] border-[#d8d3c5] hover:border-[#1a1918]'
              }`}
            >
              {vibe.title}
            </button>
          ))}
          <button
            onClick={() => setActiveVibe('All')}
            className={`px-3 py-2 text-xs uppercase tracking-[0.18em] font-medium border transition-all ${
              activeVibe === 'All'
                ? 'bg-[#1a1918] text-[#faf9f6] border-[#1a1918]'
                : 'bg-white text-[#5c584f] border-[#d8d3c5] hover:border-[#1a1918]'
            }`}
          >
            All Moods
          </button>
        </div>
      </div>

      {/* Hero Moodboard Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f3f0e8] border border-[#e5e0d3] p-6 sm:p-10">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] bg-[#1a1918] text-white px-3 py-1 font-medium inline-block">
            Curated Direction
          </span>
          <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#1a1918] leading-tight">
            The {activeVibe === 'All' ? 'Haute Couture' : activeVibe} Edit
          </h3>
          <p className="text-xs sm:text-sm text-[#5c584f] leading-relaxed">
            Crafted for the modern purist who demands uncompromising textile weight, architectural drape, and timeless silhouette longevity.
          </p>

          <div className="pt-2 border-t border-[#ded8c9]">
            <span className="text-[11px] uppercase tracking-wider text-[#7d786d] font-medium block mb-2">
              Recommended Atelier Swatches
            </span>
            <div className="flex gap-2">
              {['#EBE2D5', '#BAC5B8', '#966D4E', '#1C1B1A'].map((hex, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white px-2.5 py-1 border border-[#ded8c9] text-[10px] text-[#635f56]">
                  <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: hex }} />
                  <span>Tone 0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          {displayList.slice(0, 2).map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="group relative cursor-pointer overflow-hidden bg-white border border-[#ded9cc]"
            >
              <ImageWithPlaceholder 
                src={item.images[0]} 
                alt={item.name} 
                aspectRatio="aspect-[3/4]"
                className="group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="p-3 bg-white/95 backdrop-blur-sm border-t border-[#eee9df]">
                <p className="text-[10px] uppercase tracking-wider text-[#7d786d]">{item.category}</p>
                <h4 className="font-editorial text-base text-[#1a1918] group-hover:text-[#c6a76c] transition-colors line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-xs font-medium text-[#1a1918] mt-0.5">${item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curated Editorial Lookbooks */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9c9688] font-medium">
              Runway & Atelier Storyboards
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#1a1918]">
              Signature Editorial Looks
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EDITORIAL_LOOKS.map((look) => {
            const lookProducts = products.filter(p => look.productIds.includes(p.id));

            return (
              <div 
                key={look.id}
                className="bg-white border border-[#e5e0d3] flex flex-col justify-between overflow-hidden shadow-sm"
              >
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f2ec]">
                    <ImageWithPlaceholder
                      src={look.leadImage}
                      alt={look.title}
                      aspectRatio="aspect-[4/5]"
                      className="hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#1a1918] text-[#faf9f6] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1">
                      {look.season}
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-editorial text-2xl text-[#1a1918] mb-2">
                      {look.title}
                    </h4>
                    <p className="text-xs text-[#6e695e] leading-relaxed mb-4">
                      {look.curatorNote}
                    </p>

                    {/* Look Pieces preview */}
                    <div className="border-t border-[#f0ece3] pt-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#8a8579] font-medium block mb-2">
                        Look Pieces in Silhouette
                      </span>
                      <div className="space-y-2">
                        {lookProducts.map((p) => (
                          <div 
                            key={p.id}
                            onClick={() => onSelectProduct(p)}
                            className="flex items-center justify-between p-2 hover:bg-[#faf9f6] transition-colors cursor-pointer border border-transparent hover:border-[#e2ddd0]"
                          >
                            <span className="text-xs font-medium text-[#1a1918] line-clamp-1">{p.name}</span>
                            <span className="text-xs text-[#7d786d] font-mono">${p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    id={`inspect-ensemble-btn-${look.id}`}
                    onClick={() => setSelectedEnsembleLook(look)}
                    className="w-full py-2.5 border border-[#1a1918] text-[#1a1918] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#1a1918] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inspect Full Ensemble</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curated Grid of Recommended Products */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9c9688] font-medium">
              Algorithmic Atelier Selection
            </span>
            <h3 className="font-editorial text-2xl font-light text-[#1a1918]">
              Pieces Selected for Your Aesthetic
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayList.map((product) => {
            const isBookmarked = bookmarks.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col cursor-pointer bg-white border border-[#e5e0d3] p-3 transition-all hover:shadow-md"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f2ec] mb-3">
                  <ImageWithPlaceholder
                    src={product.images[0]}
                    alt={product.name}
                    aspectRatio="aspect-[3/4]"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
                      isBookmarked
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-white/80 text-[#635f56] hover:bg-white hover:text-black'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8a8579]">{product.category}</span>
                    <h4 className="font-editorial text-base text-[#1a1918] group-hover:text-[#c6a76c] transition-colors leading-snug">
                      {product.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f2eee6]">
                    <span className="text-xs font-semibold text-[#1a1918]">${product.price.toLocaleString()}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAdd(product);
                      }}
                      className="text-[10px] uppercase tracking-wider font-medium text-[#1a1918] hover:text-[#c6a76c] flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Quick Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Ensemble Inspection Modal */}
      <EnsembleModal
        look={selectedEnsembleLook}
        isOpen={!!selectedEnsembleLook}
        onClose={() => setSelectedEnsembleLook(null)}
        products={products}
        onSelectProduct={(p) => {
          setSelectedEnsembleLook(null);
          onSelectProduct(p);
        }}
        onAddToCart={handleAddToCartInternal}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
};
