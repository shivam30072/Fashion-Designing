import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Filter, 
  SlidersHorizontal, 
  Heart, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Scissors,
  Star,
  ChevronDown
} from 'lucide-react';
import { 
  Product, 
  CartItem, 
  ProductCategory, 
  ActiveTab, 
  UserAuth, 
  Review,
  ProductColor 
} from './types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data/products';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { PersonalizedStyleFeed } from './components/PersonalizedStyleFeed';
import { AtelierView } from './components/AtelierView';
import { Footer } from './components/Footer';
import { ImageWithPlaceholder } from './components/ImageWithPlaceholder';
import { SiyaLogo } from './components/SiyaLogo';

export default function App() {
  // Products and Reviews State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('siya_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Flatten initial reviews into array
    return Object.values(INITIAL_REVIEWS).flat();
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('siya_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Start with 1 sample luxury item in bag for instant interactive delight
    return [
      {
        id: 'siya-01-M-Champagne',
        product: INITIAL_PRODUCTS[0],
        size: 'M',
        color: INITIAL_PRODUCTS[0].colors[0],
        quantity: 1,
      }
    ];
  });

  // Bookmarks / Wishlist State
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('siya_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['siya-01', 'siya-04'];
  });

  // User Authentication State
  const [userAuth, setUserAuth] = useState<UserAuth>(() => {
    const saved = localStorage.getItem('siya_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      isLoggedIn: true,
      method: 'google',
      identifier: 'shivamkumar181211@gmail.com',
      name: 'Shivam Kumar',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Shivam%20Kumar&backgroundColor=161514&textColor=faf9f6'
    };
  });

  // Navigation & Filter States
  const [activeTab, setActiveTab] = useState<ActiveTab>('shop');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modal / Drawer Open States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('siya_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('siya_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('siya_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('siya_user', JSON.stringify(userAuth));
  }, [userAuth]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product, 
    size: string, 
    color: ProductColor, 
    quantity: number, 
    customNote?: string
  ) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => 
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { id: itemId, product, size, color, quantity, customNote }];
      }
    });
    showToast(`Added "${product.name}" (${size}) to Atelier Bag`);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'M', product.colors[0], 1);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from bag');
  };

  // Bookmark Handlers
  const handleToggleBookmark = (productId: string) => {
    setBookmarks(prev => {
      const isExisting = prev.includes(productId);
      const updated = isExisting ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(isExisting ? 'Removed from Bookmarks' : 'Saved to Bookmarked Wishlist');
      return updated;
    });
  };

  // Review Handler
  const handleAddReview = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);
    showToast('Thank you! Your atelier review has been recorded.');
  };

  // Promo handler
  const handleApplyPromo = (code: string) => {
    setPromoCode(code);
    if (code === 'SIYA10') {
      setDiscountPercentage(10);
      showToast('10% Atelier Privilège Discount Applied');
    } else if (code === 'ATELIER15') {
      setDiscountPercentage(15);
      showToast('15% Haute Couture Privilege Discount Applied');
    }
  };

  // Filter & Sort Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  // Calculate totals for checkout
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  const shippingCost = subtotal >= 1000 || subtotal === 0 ? 0 : 45;
  const finalTotal = subtotal - discountAmount + (cartItems.length > 0 ? shippingCost : 0);

  const bookmarkedProductObjects = products.filter(p => bookmarks.includes(p.id));

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1918] flex flex-col font-sans selection:bg-[#1a1918] selection:text-[#faf9f6]">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161514] text-[#faf9f6] text-xs px-5 py-3.5 shadow-2xl border border-[#3b3834] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <Check className="w-4 h-4 text-[#c6a76c]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={bookmarks.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        userAuth={userAuth}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main App Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* VIEW 1: Collections / Shop */}
        {activeTab === 'shop' && (
          <div className="space-y-12 sm:space-y-16 pb-16">
            {/* Haute Couture Hero Showcase */}
            <div className="relative mt-6 sm:mt-8 overflow-hidden bg-[#161514] text-[#faf9f6] border border-[#2c2925]">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[560px]">
                {/* Left Narrative */}
                <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-between z-10">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#262422] border border-[#3d3a35] text-[10px] uppercase tracking-[0.25em] text-[#c6a76c] font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>Autumn / Winter 2026 Atelier Reveal</span>
                    </div>

                    <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-[1.05] text-[#fbfaf8]">
                      Architectural <br />
                      <span className="italic font-normal text-[#e2caa0]">Elegance</span> in Motion
                    </h1>

                    <p className="text-xs sm:text-sm text-[#b5b0a4] font-sans max-w-md leading-relaxed">
                      Hand-sculpted Mulberry silks, structural English gabardine, and double-faced Mongolian cashmere crafted to outlast the ephemeral cycles of fast trends.
                    </p>
                  </div>

                  <div className="pt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => {
                        const el = document.getElementById('collection-grid');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-7 py-3.5 bg-[#fbfaf8] text-[#161514] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#e2caa0] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setActiveTab('style-feed')}
                      className="px-6 py-3.5 border border-[#4a463f] text-[#fbfaf8] text-xs uppercase tracking-[0.25em] font-medium hover:border-[#fbfaf8] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#c6a76c]" />
                      <span>Style Feed</span>
                    </button>
                  </div>

                  {/* Highlights bar */}
                  <div className="pt-8 mt-8 border-t border-[#2d2a26] grid grid-cols-3 gap-4 text-left">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#8a857b]">Textile Purity</span>
                      <span className="font-editorial text-lg text-[#fbfaf8]">100% Grade 6A Silk</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#8a857b]">Tailoring Standard</span>
                      <span className="font-editorial text-lg text-[#fbfaf8]">Floating Canvas</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#8a857b]">Bespoke Guarantee</span>
                      <span className="font-editorial text-lg text-[#fbfaf8]">Made-to-Measure</span>
                    </div>
                  </div>
                </div>

                {/* Right Editorial Hero Image */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                  <ImageWithPlaceholder
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
                    alt="SIYA Haute Couture campaign"
                    aspectRatio="aspect-auto"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#161514] lg:via-transparent lg:to-transparent" />
                </div>
              </div>
            </div>

            {/* Catalog Controls Header */}
            <div id="collection-grid" className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e0d3] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#9c9688] font-medium block">
                  Curated Catalog ({filteredProducts.length} Creations)
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#1a1918]">
                  {selectedCategory === 'All' ? 'All Atelier Creations' : `${selectedCategory} Collection`}
                </h2>
              </div>

              {/* Sorting Filter */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-xs uppercase tracking-wider text-[#7d786d] flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
                </span>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#d8d3c5] px-3 py-1.5 text-xs text-[#1a1918] focus:outline-none focus:border-[#1a1918]"
                >
                  <option value="featured">Atelier Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Client Rating</option>
                </select>
              </div>
            </div>

            {/* Product Card Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#f4f2eb] p-8 border border-[#ded9cc]">
                <h3 className="font-editorial text-2xl font-light mb-2">No creations found</h3>
                <p className="text-xs text-[#7d786d] mb-4">
                  No matching garments under &quot;{searchQuery}&quot; in the {selectedCategory} category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-wider font-medium"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                    onQuickAdd={handleQuickAdd}
                    isBookmarked={bookmarks.includes(product.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            )}

            {/* Atelier Heritage Featurette Bar */}
            <div className="bg-[#f2efe8] border border-[#ded8c9] p-8 sm:p-12 my-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#ded8c9]">
                <div className="space-y-2 px-4 pt-4 md:pt-0">
                  <Scissors className="w-6 h-6 mx-auto text-[#1a1918]" />
                  <h4 className="font-editorial text-xl text-[#1a1918]">Atelier Made-to-Measure</h4>
                  <p className="text-xs text-[#736e63]">
                    Every couture dress and suiting piece is eligible for bespoke millimeter pattern calibration.
                  </p>
                </div>

                <div className="space-y-2 px-4 pt-4 md:pt-0">
                  <ShieldCheck className="w-6 h-6 mx-auto text-emerald-800" />
                  <h4 className="font-editorial text-xl text-[#1a1918]">Zero-Waste Silk Practice</h4>
                  <p className="text-xs text-[#736e63]">
                    All offcuts and remnants are reclaimed into limited-edition silk twill accessories.
                  </p>
                </div>

                <div className="space-y-2 px-4 pt-4 md:pt-0">
                  <Sparkles className="w-6 h-6 mx-auto text-[#c6a76c]" />
                  <h4 className="font-editorial text-xl text-[#1a1918]">White-Glove Courier</h4>
                  <p className="text-xs text-[#736e63]">
                    Delivered in garment-safe climate packaging with personal unboxing presentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Personalized Style Feed */}
        {activeTab === 'style-feed' && (
          <PersonalizedStyleFeed
            products={products}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectProduct={setSelectedProduct}
            onQuickAdd={handleQuickAdd}
            onAddToCart={handleAddToCart}
            userName={userAuth.name}
          />
        )}

        {/* VIEW 3: The Atelier Heritage */}
        {activeTab === 'atelier' && (
          <AtelierView 
            onExploreCollections={() => setActiveTab('shop')} 
          />
        )}
      </main>

      {/* Modals & Drawers */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isBookmarked={selectedProduct ? bookmarks.includes(selectedProduct.id) : false}
        onToggleBookmark={handleToggleBookmark}
        reviews={reviews}
        onAddReview={handleAddReview}
        userName={userAuth.name}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        promoCode={promoCode}
        onApplyPromo={handleApplyPromo}
        discountPercentage={discountPercentage}
      />

      {/* Checkout & Secure Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discountAmount={discountAmount}
        shippingCost={shippingCost}
        finalTotal={finalTotal}
        onOrderSuccess={(orderId) => {
          setCartItems([]);
          showToast(`Order ${orderId} placed securely!`);
        }}
        userEmail={userAuth.identifier || 'shivamkumar181211@gmail.com'}
        userName={userAuth.name}
      />

      {/* Bookmarks / Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        bookmarkedProducts={bookmarkedProductObjects}
        onRemoveBookmark={handleToggleBookmark}
        onSelectProduct={setSelectedProduct}
        onMoveToBag={(product) => {
          handleQuickAdd(product);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Mobile Number / Gmail Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(newUser) => {
          setUserAuth(newUser);
          showToast(`Welcome to SIYA Atelier, ${newUser.name}`);
        }}
        currentUser={userAuth}
        onLogout={() => {
          setUserAuth({ isLoggedIn: false, name: 'Guest Client' });
          showToast('Signed out of SIYA Atelier');
        }}
      />

      {/* Luxury Footer */}
      <Footer 
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    </div>
  );
}
