'use client';

import { useState } from 'react';
import {
  Search,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Zap,
  Globe,
  Briefcase,
  Star,
  BadgeCheck,
  Users,
  DollarSign,
  LineChart,
  Building2,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { BusinessCard } from '@/components/marketplace/BusinessCard';
import { OfferModal } from '@/components/marketplace/OfferModal';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import { SEO_BUSINESSES, SITE } from '@/lib/seo';
import type { BusinessListing } from '@/lib/types';

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description:
      'Every listing undergoes financial verification — P&L statements, bank deposits, and analytics access are reviewed before approval. We reject listings with unverifiable revenue.',
  },
  {
    icon: TrendingUp,
    title: 'Escrow Protection',
    description:
      'Funds are held securely in escrow through the entire due diligence period. Released only when you confirm the business transfer is complete.',
  },
  {
    icon: BadgeCheck,
    title: 'Curated Catalog',
    description:
      'We do not accept seller self-submissions. Every business in our catalog is hand-selected by our team from vetted sources — quality over quantity.',
  },
  {
    icon: LineChart,
    title: 'Detailed Metrics',
    description:
      'MRR, ARR, profit margins, traffic, customer counts, churn — every material metric disclosed upfront so you can model the deal.',
  },
];

export function HomeView() {
  const { businesses, setView, openBlogPost } = useMarketplace();
  const [selectedForOffer, setSelectedForOffer] = useState<BusinessListing | null>(null);
  const [search, setSearch] = useState('');

  const featured = businesses.filter((b) => b.isFeatured && b.status === 'active');
  const totalMRR = businesses.reduce((sum, b) => sum + b.metrics.mrr, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setView('marketplace');
  };

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1B3A] via-[#102956] to-[#0B1B3A] border-b border-[#1d3a6e]">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#2563EB_1px,transparent_1px),linear-gradient(to_bottom,#2563EB_1px,transparent_1px)] [background-size:32px_32px]" />
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="text-center max-w-4xl mx-auto space-y-7">
            <Badge className="inline-flex items-center gap-1.5 bg-blue-900/30 border-blue-700/40 text-blue-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Curated Acquisition Storefront · Escrow Protected
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05]">
              Acquire Profitable{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">
                Online Businesses
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A curated storefront for acquiring verified SaaS platforms, crypto trading
              terminals, digital product marketplaces, AI CRMs, and luxury real estate
              platforms. Every listing is financially verified and every transaction is
              escrow-protected.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto pt-2">
              <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by niche, MRR range, category, or keyword..."
                    className="w-full bg-transparent border-0 text-gray-900 placeholder:text-gray-500 pl-11 h-11 focus-visible:ring-0"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-gray-900 h-11 px-7"
                >
                  Explore Deals
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </form>

            {/* Real catalog stats (verified, not inflated) */}
            <div className="grid grid-cols-3 gap-5 pt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900">
                  {businesses.length}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                  Verified Listings
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900">
                  Escrow
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                  Protected Checkout
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900">
                  {formatCurrency(Math.min(...businesses.map((b) => b.askingPrice)))}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                  Lowest Asking Price
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge className="bg-blue-900/30 border-blue-700/40 text-blue-300 mb-3">
              <Star className="w-3 h-3 mr-1" /> Verified Deals
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Featured Businesses For Sale
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl">
              Hand-picked listings with verified financials, clean operations, and
              strong growth trajectories. Total combined MRR across featured deals:{' '}
              <span className="text-blue-400 font-bold">
                {formatCurrency(totalMRR)}/mo
              </span>
              .
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setView('marketplace')}
            className="bg-transparent border-gray-300 text-gray-800 hover:bg-white hover:text-blue-400"
          >
            Browse All ({businesses.length})
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((b) => (
            <BusinessCard
              key={b.id}
              business={b}
              onMakeOffer={setSelectedForOffer}
            />
          ))}
        </div>
      </section>

      {/* Categories strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Badge className="bg-blue-900/30 border-blue-700/40 text-blue-300 mb-3">
              <Building2 className="w-3 h-3 mr-1" /> Browse By Category
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Find Your Next Acquisition
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'E-Commerce', count: 24, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400' },
            { name: 'SaaS', count: 18, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400' },
            { name: 'Content', count: 12, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400' },
            { name: 'Agency', count: 16, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400' },
            { name: 'Mobile Apps', count: 9, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400' },
            { name: 'Marketplace', count: 7, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400' },
          ].map((cat) => (
            <button
              key={cat.name}
              onClick={() => setView('marketplace')}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-white border border-gray-200 hover:border-blue-700/60 transition"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-[#102956]/40 to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
                <div className="text-sm font-bold text-gray-900">{cat.name}</div>
                <div className="text-[11px] text-blue-400 mt-0.5">
                  {cat.count} listings
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-gray-50 border-y border-gray-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="bg-blue-900/30 border-blue-700/40 text-blue-300 mb-3">
              <ShieldCheck className="w-3 h-3 mr-1" /> Trust & Safety
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Why Buyers Choose {SITE.name}
            </h2>
            <p className="text-sm text-gray-600 mt-3">
              We obsess over deal quality. Every business is screened, every financial
              verified, every transaction protected.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-blue-700/60 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-800 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <f.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge className="bg-blue-900/30 border-blue-700/40 text-blue-300 mb-3">
              <BookOpen className="w-3 h-3 mr-1" /> Acquisition Blog
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Deep-Dive Analyses of Every Listing
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl">
              Each business on {SITE.name} comes with a long-form article breaking down the
              platform, the verified metrics, the reasons to acquire, and a due diligence
              checklist — written for serious buyers.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setView('blog-index')}
            className="bg-transparent border-gray-300 text-gray-800 hover:bg-white hover:text-blue-400"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEO_BUSINESSES.slice(0, 3).map((post) => (
            <Card
              key={post.id}
              className="bg-white border-gray-200 overflow-hidden cursor-pointer hover:border-blue-700/60 transition group flex flex-col"
              onClick={() => openBlogPost(post.blogSlug)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={post.screenshot}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-white/90 text-blue-400 border-blue-800/50 backdrop-blur-md text-[10px]">
                  {post.category}
                </Badge>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-400 transition line-clamp-3">
                  {post.blogTitle}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                  {post.blogExcerpt}
                </p>
                <div className="mt-auto pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
                  <span>8 min read</span>
                  <span className="text-blue-400 font-bold">
                    {formatCurrency(post.askingPrice)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 via-[#102956] to-[#0B1B3A] border border-blue-800/40 p-8 sm:p-12 lg:p-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-5">
            <Badge className="bg-blue-600 text-white border-blue-500">
              <Globe className="w-3 h-3 mr-1" /> Start Acquiring
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Ready to acquire your next online business?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Browse {businesses.length} verified business listings with full financial
              metrics, real production screenshots, and escrow-protected checkout. Every
              transaction is held securely until you confirm the transfer is complete.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={() => setView('marketplace')}
                className="bg-blue-600 hover:bg-blue-500 text-white h-12 px-7"
              >
                Browse Marketplace
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => setView('blog-index')}
                variant="outline"
                className="bg-transparent border-blue-400/40 text-white hover:bg-blue-900/30 h-12 px-7"
              >
                Read Acquisition Guides
              </Button>
            </div>
          </div>
        </div>
      </section>

      <OfferModal
        business={selectedForOffer}
        isOpen={Boolean(selectedForOffer)}
        onClose={() => setSelectedForOffer(null)}
      />
    </div>
  );
}
