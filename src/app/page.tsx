'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/marketplace/Navbar';
import { Footer } from '@/components/marketplace/Footer';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { HomeView } from '@/components/views/HomeView';
import { MarketplaceView } from '@/components/views/MarketplaceView';
import { BusinessDetailView } from '@/components/views/BusinessDetailView';
import { CheckoutView } from '@/components/views/CheckoutView';
import { SellerDashboardView } from '@/components/views/SellerDashboardView';
import { UserDashboardView } from '@/components/views/UserDashboardView';
import { AdminDashboardView } from '@/components/views/AdminDashboardView';
import { useMarketplace } from '@/lib/store';
import { Toaster } from 'sonner';

export default function Home() {
  const { currentView } = useMarketplace();

  // Scroll to top on view change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'business-detail':
        return <BusinessDetailView />;
      case 'checkout':
        return <CheckoutView />;
      case 'user-dashboard':
        return <UserDashboardView />;
      case 'seller-dashboard':
        return <SellerDashboardView />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      default:
        return <HomeView />;
    }
  };

  // Hide footer on checkout flow for focus
  const hideFooter = currentView === 'checkout' || currentView === 'business-detail';

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#18181b',
            border: '1px solid #27272a',
            color: '#fafafa',
          },
        }}
      />
      <Navbar />
      <CartDrawer />
      <main className="flex-1">{renderView()}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
