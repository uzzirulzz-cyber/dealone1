'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  BusinessListing,
  User,
  Order,
  Offer,
  CartItem,
  AdminSettings,
  OfferStatus,
  ViewName,
  Review,
} from './types';
import {
  initialBusinesses,
  initialUsers,
  initialOrders,
  initialOffers,
  initialAdminSettings,
} from './businessData';

interface MarketplaceState {
  // navigation
  currentView: ViewName;
  selectedBusinessId: string | null;
  setView: (view: ViewName) => void;
  openBusiness: (id: string) => void;

  // user
  currentUser: User;
  users: User[];
  switchRole: (role: 'user' | 'seller' | 'admin') => void;

  // data
  businesses: BusinessListing[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  offers: Offer[];
  adminSettings: AdminSettings;

  // ui
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  // actions
  addToCart: (business: BusinessListing) => void;
  removeFromCart: (businessId: string) => void;
  clearCart: () => void;
  toggleWishlist: (businessId: string) => void;
  addBusiness: (
    data: Omit<
      BusinessListing,
      'id' | 'createdAt' | 'rating' | 'reviewsCount' | 'reviews' | 'sellerId' | 'sellerName' | 'status'
    >,
  ) => void;
  deleteBusiness: (id: string) => void;
  updateBusiness: (id: string, updates: Partial<BusinessListing>) => void;
  createOrder: (paymentMethod: Order['paymentMethod']) => Order;
  createOffer: (businessId: string, offerPrice: number, message: string) => void;
  respondToOffer: (
    offerId: string,
    status: OfferStatus,
    counterPrice?: number,
    counterMessage?: string,
  ) => void;
  addReview: (businessId: string, rating: number, comment: string) => void;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  updateUserStatus: (userId: string, isVerified: boolean) => void;
}

export const useMarketplace = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      currentView: 'home',
      selectedBusinessId: null,
      setView: (view) => set({ currentView: view, selectedBusinessId: view === 'business-detail' ? get().selectedBusinessId : null }),
      openBusiness: (id) => set({ selectedBusinessId: id, currentView: 'business-detail' }),

      currentUser: initialUsers[0],
      users: initialUsers,
      switchRole: (role) => {
        const target = get().users.find((u) => u.role === role);
        if (target) {
          set({ currentUser: target });
          if (role === 'user') set({ currentView: 'home' });
          else if (role === 'seller') set({ currentView: 'seller-dashboard' });
          else if (role === 'admin') set({ currentView: 'admin-dashboard' });
        }
      },

      businesses: initialBusinesses,
      cart: [],
      wishlist: ['biz-2'],
      orders: initialOrders,
      offers: initialOffers,
      adminSettings: initialAdminSettings,

      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (business) =>
        set((s) => {
          const existing = s.cart.find((i) => i.business.id === business.id);
          if (existing) return s; // businesses are unique cart items
          return { cart: [...s.cart, { business, quantity: 1 }] };
        }),

      removeFromCart: (businessId) =>
        set((s) => ({ cart: s.cart.filter((i) => i.business.id !== businessId) })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (businessId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(businessId)
            ? s.wishlist.filter((id) => id !== businessId)
            : [...s.wishlist, businessId],
        })),

      addBusiness: (data) =>
        set((s) => ({
          businesses: [
            {
              ...data,
              id: `biz-${Date.now()}`,
              sellerId: s.currentUser.id,
              sellerName: s.currentUser.name,
              rating: 0,
              reviewsCount: 0,
              reviews: [],
              status: 'pending',
              createdAt: new Date().toISOString().split('T')[0],
            },
            ...s.businesses,
          ],
        })),

      deleteBusiness: (id) =>
        set((s) => ({ businesses: s.businesses.filter((b) => b.id !== id) })),

      updateBusiness: (id, updates) =>
        set((s) => ({
          businesses: s.businesses.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),

      createOrder: (paymentMethod) => {
        const s = get();
        const totalAmount = s.cart.reduce(
          (sum, item) => sum + item.business.askingPrice * item.quantity,
          0,
        );
        const newOrder: Order = {
          id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: s.currentUser.id,
          userName: s.currentUser.name,
          businesses: s.cart.map((item) => ({
            businessId: item.business.id,
            title: item.business.title,
            price: item.business.askingPrice,
            image: item.business.images[0],
          })),
          totalAmount,
          paymentMethod,
          paymentStatus: paymentMethod === 'escrow' ? 'escrow' : 'pending',
          orderStatus: 'In Escrow',
          createdAt: new Date().toISOString().split('T')[0],
        };
        set((st) => ({ orders: [newOrder, ...st.orders], cart: [] }));
        return newOrder;
      },

      createOffer: (businessId, offerPrice, message) => {
        const s = get();
        const biz = s.businesses.find((b) => b.id === businessId);
        if (!biz) return;
        const newOffer: Offer = {
          id: `off-${Date.now()}`,
          businessId: biz.id,
          businessTitle: biz.title,
          businessImage: biz.images[0],
          buyerId: s.currentUser.id,
          buyerName: s.currentUser.name,
          sellerId: biz.sellerId,
          offerPrice,
          originalPrice: biz.askingPrice,
          message,
          status: 'pending',
          createdAt: new Date().toISOString().split('T')[0],
        };
        set((st) => ({ offers: [newOffer, ...st.offers] }));
      },

      respondToOffer: (offerId, status, counterPrice, counterMessage) =>
        set((s) => ({
          offers: s.offers.map((o) =>
            o.id === offerId
              ? {
                  ...o,
                  status,
                  ...(counterPrice !== undefined ? { counterPrice } : {}),
                  ...(counterMessage ? { counterMessage } : {}),
                }
              : o,
          ),
        })),

      addReview: (businessId, rating, comment) => {
        const s = get();
        const user = s.currentUser;
        const newReview: Review = {
          id: `rev-${Date.now()}`,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          rating,
          comment,
          createdAt: new Date().toISOString().split('T')[0],
        };
        set((st) => ({
          businesses: st.businesses.map((b) => {
            if (b.id !== businessId) return b;
            const reviews = [newReview, ...b.reviews];
            const newRating =
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            return {
              ...b,
              reviews,
              rating: Number(newRating.toFixed(1)),
              reviewsCount: reviews.length,
            };
          }),
        }));
      },

      updateAdminSettings: (settings) =>
        set((s) => ({ adminSettings: { ...s.adminSettings, ...settings } })),

      updateUserStatus: (userId, isVerified) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.id === userId ? { ...u, isVerifiedSeller: isVerified } : u,
          ),
        })),
    }),
    {
      name: 'bizexchange-storage-v3',
      partialize: (s) => ({
        currentUser: s.currentUser,
        businesses: s.businesses,
        cart: s.cart,
        wishlist: s.wishlist,
        orders: s.orders,
        offers: s.offers,
        adminSettings: s.adminSettings,
        users: s.users,
      }),
    },
  ),
);
