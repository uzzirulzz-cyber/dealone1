'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/marketplace/Navbar';
import { Footer } from '@/components/marketplace/Footer';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { WhatsAppButton } from '@/components/marketplace/WhatsAppButton';
import { HomeView } from '@/components/views/HomeView';
import { MarketplaceView } from '@/components/views/MarketplaceView';
import { BusinessDetailView } from '@/components/views/BusinessDetailView';
import { CheckoutView } from '@/components/views/CheckoutView';
import { UserDashboardView } from '@/components/views/UserDashboardView';
import { AdminDashboardView } from '@/components/views/AdminDashboardView';
import { AdminLoginView } from '@/components/views/AdminLoginView';
import { BlogIndexView } from '@/components/views/BlogIndexView';
import { BlogPostView } from '@/components/views/BlogPostView';
import { FeaturesArticleView } from '@/components/views/FeaturesArticleView';
import { useMarketplace } from '@/lib/store';
import { getBlogPostBySlug } from '@/lib/seo';
import { Toaster } from 'sonner';

export default function Home() {
  const { currentView, setView, openBlogPost, selectedBlogSlug, isAdminAuthenticated } = useMarketplace();

  // Scroll to top on view change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView, selectedBlogSlug]);

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
      case 'admin-dashboard':
        // Auth gate — if not authenticated, show login form instead of dashboard
        if (!isAdminAuthenticated) {
          return <AdminLoginView />;
        }
        return <AdminDashboardView />;
      case 'blog-index':
        return (
          <BlogIndexView
            onReadPost={(slug) => openBlogPost(slug)}
          />
        );
      case 'blog-post': {
        const post = selectedBlogSlug
          ? getBlogPostBySlug(selectedBlogSlug)
          : undefined;
        if (!post) {
          return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Article not found</h2>
              <button
                onClick={() => setView('blog-index')}
                className="text-blue-400 hover:text-blue-300"
              >
                Back to Blog
              </button>
            </div>
          );
        }
        return (
          <BlogPostView
            post={post}
            onBack={() => setView('blog-index')}
            onReadPost={(slug) => openBlogPost(slug)}
          />
        );
      }
      case 'blog-features':
        return (
          <FeaturesArticleView
            onBack={() => setView('blog-index')}
            onReadPost={(slug) => openBlogPost(slug)}
          />
        );
      default:
        return <HomeView />;
    }
  };

  // Hide navbar/footer on admin login for a focused auth screen
  const isAdminLogin = currentView === 'admin-dashboard' && !isAdminAuthenticated;

  // Hide footer on checkout, article, and admin login pages for focus
  const hideFooter =
    currentView === 'checkout' ||
    currentView === 'business-detail' ||
    currentView === 'blog-post' ||
    isAdminLogin;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
      {!isAdminLogin && <Navbar />}
      {!isAdminLogin && <CartDrawer />}
      <main className="flex-1">{renderView()}</main>
      {!hideFooter && <Footer />}
      {!isAdminLogin && <WhatsAppButton />}
    </div>
  );
}
