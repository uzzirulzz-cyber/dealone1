export type UserRole = 'user' | 'seller' | 'admin';

export type ViewName =
  | 'home'
  | 'marketplace'
  | 'business-detail'
  | 'checkout'
  | 'user-dashboard'
  | 'seller-dashboard'
  | 'admin-dashboard'
  | 'blog-index'
  | 'blog-post'
  | 'blog-features';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isVerifiedSeller?: boolean;
  createdAt: string;
}

export type BusinessCategory =
  | 'E-Commerce'
  | 'SaaS / Software'
  | 'Content & Media'
  | 'Agency / Services'
  | 'Mobile Apps'
  | 'Marketplace'
  | 'Subscription'
  | 'Other';

export type BusinessMonetization =
  | 'Subscription'
  | 'One-time Sales'
  | 'Advertising'
  | 'Affiliate'
  | 'Marketplace Fees'
  | 'Services';

export type BusinessStatus = 'active' | 'pending' | 'sold';

export interface BusinessMetrics {
  mrr: number; // Monthly Recurring Revenue in USD
  arr?: number; // Annual Recurring Revenue
  revenue: number; // Last 30 days net revenue
  profit: number; // Last 30 days net profit
  profitMargin: number; // percentage
  traffic: number; // monthly visitors
  pageviews?: number;
  customers?: number;
  churnRate?: number; // percentage
  ageMonths: number; // age of business in months
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BusinessListing {
  id: string;
  title: string;
  tagline: string;
  description: string;
  askingPrice: number;
  previousPrice?: number;
  images: string[];
  category: BusinessCategory;
  monetization: BusinessMonetization[];
  sellerId: string;
  sellerName: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isFeatured?: boolean;
  isVerified?: boolean;
  status: BusinessStatus;
  createdAt: string;
  location?: string;
  techStack?: string[];
  metrics: BusinessMetrics;
  highlights: string[];
  reasonForSelling?: string;
}

export interface CartItem {
  business: BusinessListing;
  quantity: number;
}

export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'counter';

export interface Offer {
  id: string;
  businessId: string;
  businessTitle: string;
  businessImage: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  offerPrice: number;
  originalPrice: number;
  message: string;
  status: OfferStatus;
  counterPrice?: number;
  counterMessage?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: BusinessCategory;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface AdminSettings {
  siteName: string;
  logo: string;
  currency: string;
  taxRate: number;
  commissionRate: number;
  maintenanceMode: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  businesses: {
    businessId: string;
    title: string;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  paymentMethod: 'escrow' | 'wire' | 'card';
  paymentStatus: 'paid' | 'pending' | 'escrow';
  orderStatus: 'In Escrow' | 'Due Diligence' | 'Transferred' | 'Cancelled';
  createdAt: string;
}
