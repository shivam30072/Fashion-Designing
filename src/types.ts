export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductCategory = 
  | 'All'
  | 'Couture'
  | 'Ready to Wear'
  | 'Silk & Satin'
  | 'Tailoring'
  | 'Outerwear'
  | 'Dresses'
  | 'Accessories';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  description: string;
  details: string[];
  materials: string;
  care: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  designerNote: string;
  editorialStory?: string;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
  customNote?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface UserAuth {
  isLoggedIn: boolean;
  method?: 'google' | 'phone';
  identifier?: string;
  name: string;
  avatar?: string;
}

export interface EditorialLook {
  id: string;
  title: string;
  season: string;
  vibe: string;
  leadImage: string;
  curatorNote: string;
  palette: string[];
  productIds: string[];
}

export type ActiveTab = 'shop' | 'style-feed' | 'lookbook' | 'atelier';
