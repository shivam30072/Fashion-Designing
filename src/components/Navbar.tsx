import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Search,
  ChevronDown
} from 'lucide-react';
import { ActiveTab, ProductCategory, UserAuth } from '../types';
import { SiyaLogo } from './SiyaLogo';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  selectedCategory: ProductCategory;
  onCategoryChange: (cat: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  userAuth: UserAuth;
  onOpenAuth: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  selectedCategory,
  onCategoryChange,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  userAuth,
  onOpenAuth,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: ProductCategory[] = [
    'All',
    'Couture',
    'Ready to Wear',
    'Silk & Satin',
    'Tailoring',
    'Outerwear',
    'Dresses',
    'Accessories'
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#ece7dc]">
      {/* Top Haute Couture Announcement Marquee */}
      <div className="bg-[#161514] text-[#e8e4dc] py-1.5 px-4 text-center text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium flex items-center justify-center gap-2">
        <span>Complimentary White-Glove Atelier Courier Worldwide</span>
        <span className="opacity-40">&bull;</span>
        <span className="hidden sm:inline">Use Voucher &apos;SIYA10&apos; For Atelier Privilège</span>
        <span className="opacity-40 hidden sm:inline">&bull;</span>
        <span className="text-[#c6a76c] font-semibold">Bespoke Couture Consultations</span>
      </div>

      {/* Main Brand & Nav Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Menu Button / Left Area */}
          <div className="flex items-center lg:flex-initial flex-shrink-0">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#1a1918] hover:text-[#7d786d] transition-colors rounded"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            {/* Desktop Left Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.22em] font-medium">
              <button
                id="nav-link-shop"
                onClick={() => onTabChange('shop')}
                className={`py-2 transition-colors relative ${
                  activeTab === 'shop' 
                    ? 'text-[#1a1918] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1a1918]' 
                    : 'text-[#6e6a5f] hover:text-[#1a1918]'
                }`}
              >
                Collections
              </button>

              <button
                id="nav-link-style-feed"
                onClick={() => onTabChange('style-feed')}
                className={`py-2 flex items-center gap-1.5 transition-colors relative ${
                  activeTab === 'style-feed' 
                    ? 'text-[#1a1918] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1a1918]' 
                    : 'text-[#6e6a5f] hover:text-[#1a1918]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c6a76c]" />
                <span>Personalized Style Feed</span>
              </button>

              <button
                id="nav-link-atelier"
                onClick={() => onTabChange('atelier')}
                className={`py-2 transition-colors relative ${
                  activeTab === 'atelier' 
                    ? 'text-[#1a1918] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1a1918]' 
                    : 'text-[#6e6a5f] hover:text-[#1a1918]'
                }`}
              >
                The Atelier
              </button>
            </nav>
          </div>

          {/* Center Brand Identity / Bespoke Logo */}
          <div 
            onClick={() => onTabChange('shop')}
            className="flex-1 lg:flex-initial flex items-center justify-center py-1 cursor-pointer min-w-0 px-1 text-center"
          >
            <SiyaLogo size="md" />
          </div>

          {/* Right Action Icons: Search, Wishlist, Auth, Bag */}
          <div className="flex items-center justify-end gap-1 sm:gap-3 flex-shrink-0">
            {/* Search toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="hidden sm:flex items-center bg-white border border-[#d8d4cb] px-2.5 py-1 text-xs">
                  <input
                    id="search-catalog-input"
                    type="text"
                    placeholder="Search silk, trench, gown..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="w-28 sm:w-44 bg-transparent outline-none text-xs"
                  />
                  <button 
                    onClick={() => {
                      setSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="p-1 text-[#8a8579] hover:text-[#1a1918]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : null}

              <button
                id="open-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-1.5 sm:p-2 text-[#5c584f] hover:text-[#1a1918] transition-colors ${
                  searchOpen ? 'sm:hidden text-[#1a1918]' : ''
                }`}
                title="Search collections"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Bookmarks / Wishlist */}
            <button
              id="open-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-1.5 sm:p-2 text-[#5c584f] hover:text-[#1a1918] transition-colors relative"
              title="View bookmarks"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-rose-600 text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Authentication / User Profile */}
            <button
              id="open-auth-btn"
              onClick={onOpenAuth}
              className="p-1.5 sm:p-2 text-[#5c584f] hover:text-[#1a1918] transition-colors flex items-center gap-1.5"
              title={userAuth.isLoggedIn ? `Account: ${userAuth.name}` : 'Sign in to SIYA'}
            >
              {userAuth.isLoggedIn ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-[#1a1918] p-0.5">
                    <img 
                      src={userAuth.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${userAuth.name}`} 
                      alt={userAuth.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </span>
                  <span className="hidden xl:inline text-xs font-medium text-[#1a1918] max-w-[100px] truncate">
                    {userAuth.name.split(' ')[0]}
                  </span>
                </div>
              ) : (
                <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              id="open-cart-btn"
              onClick={onOpenCart}
              className="p-1.5 sm:p-2 text-[#1a1918] hover:text-[#886c35] transition-colors relative flex items-center gap-1 sm:gap-2"
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#1a1918] text-[#faf9f6] text-[8px] sm:text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs uppercase tracking-wider font-semibold">
                Bag
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown (when open on small screens) */}
        {searchOpen && (
          <div className="sm:hidden pb-3 pt-1 border-t border-[#ede8dc] flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex-1 flex items-center bg-white border border-[#d8d4cb] px-3 py-1.5 text-xs">
              <Search className="w-3.5 h-3.5 text-[#8a8579] mr-2" />
              <input
                id="search-catalog-mobile-input"
                type="text"
                placeholder="Search silk, trench, gown, jacket..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full bg-transparent outline-none text-xs text-[#1a1918]"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="p-0.5 text-[#8a8579] hover:text-[#1a1918]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setSearchOpen(false);
                onSearchChange('');
              }}
              className="text-xs uppercase tracking-wider font-medium text-[#7d786d] px-2 py-1"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Category Sub-Navigation Bar (for Shop view) */}
        {activeTab === 'shop' && (
          <div className="py-2.5 border-t border-[#ece7dc] overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-4 sm:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[#7d786d]">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onCategoryChange(cat)}
                className={`py-1 whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'text-[#1a1918] font-bold border-b border-[#1a1918]'
                    : 'hover:text-[#1a1918]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf9f6] border-b border-[#ded8cb] px-6 py-6 space-y-5 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4 text-xs uppercase tracking-[0.25em] font-medium text-[#1a1918]">
            <button
              onClick={() => { onTabChange('shop'); setMobileMenuOpen(false); }}
              className="text-left py-1"
            >
              Collections Archive
            </button>
            <button
              onClick={() => { onTabChange('style-feed'); setMobileMenuOpen(false); }}
              className="text-left py-1 flex items-center gap-2 text-[#c6a76c]"
            >
              <Sparkles className="w-4 h-4" />
              Personalized Style Feed
            </button>
            <button
              onClick={() => { onTabChange('atelier'); setMobileMenuOpen(false); }}
              className="text-left py-1"
            >
              The Atelier & Heritage
            </button>
          </nav>

          <div className="pt-4 border-t border-[#ded8cb] flex items-center justify-between text-xs">
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 font-medium text-[#1a1918]"
            >
              <User className="w-4 h-4" />
              <span>{userAuth.isLoggedIn ? userAuth.name : 'Sign In with Gmail / Phone'}</span>
            </button>

            <button
              onClick={() => { onOpenWishlist(); setMobileMenuOpen(false); }}
              className="flex items-center gap-1.5 text-rose-600 font-medium"
            >
              <Heart className="w-4 h-4 fill-rose-600" />
              <span>{wishlistCount} Bookmarks</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
