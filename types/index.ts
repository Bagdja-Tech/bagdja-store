// TypeScript Types untuk Bagdja Store Web

export type LicenseType = 'license' | 'subscription';

export type LicenseStatus = 'available' | 'purchased' | 'revoked';

export type PlanDuration = 'monthly' | 'yearly' | 'lifetime';

export type ProductStatus = 'active' | 'inactive';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface License {
  id: string;
  appId: string;
  type: LicenseType;
  maxUsers: number;
  expTime: number | null; // days, null = no expiration
  price: number;
  status: LicenseStatus;
  metadata?: Record<string, any>;
}

export interface Plan {
  id: string;
  appId: string;
  name: string;
  description?: string;
  price: number;
  duration: PlanDuration;
  durationValue?: number; // e.g., 30 for 30 days
  features?: string[];
  status: ProductStatus;
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface Product {
  id: string;
  appId: string;
  name: string;
  description?: string;
  price: number;
  type: string;
  status: ProductStatus;
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface App {
  id: string;
  appId: string; // Public identifier
  appName: string;
  description?: string;
  shortDescription?: string; // Untuk card
  logo?: string;
  categoryId: string;
  category?: Category;
  
  // Store specific fields
  rating?: number; // 0-5
  ratingCount?: number; // Jumlah review
  userCount?: number; // Jumlah pengguna
  screenshots?: string[]; // Array of image URLs
  videoUrl?: string; // Video URL atau embed
  
  // Pricing info (untuk display di card)
  startingPrice?: number; // Harga terendah dari license/plan
  priceType?: 'license' | 'subscription' | 'both'; // Tipe harga
  
  // Relations
  licenses?: License[];
  plans?: Plan[];
  products?: Product[];
  
  // Metadata
  isActive: boolean;
  isPublished?: boolean; // Untuk store visibility
  contactEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppCardProps {
  app: App;
  onClick?: () => void;
}

export interface SearchFilters {
  query?: string;
  categoryId?: string;
  minRating?: number;
  priceType?: 'license' | 'subscription' | 'all';
  sortBy?: 'rating' | 'price' | 'users' | 'newest';
}

