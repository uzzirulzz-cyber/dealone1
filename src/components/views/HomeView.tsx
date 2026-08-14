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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BusinessCard } from '@/components/marketplace/BusinessCard';
import { OfferModal } from '@/components/marketplace/OfferModal';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import type { BusinessListing } from '@/lib/types';

const stats = [
  { value: '$48M+', label: 'Total Deal Volume', icon: DollarSign },
  { value: '420+', label: 'Businesses Sold', icon: Briefcase },
  { value: '100%', label: 'Escrow Protected', icon: ShieldCheck },
  { value: '14 days', label: 'Avg. Deal Time', icon: Zap },
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: 'Verified Financials',
    description:
      'Every listing undergoes financial verification — P&L statements, bank deposits, and analytics access are reviewed before approval.',
  },
  {
    icon: TrendingUp,
    title: 'Escrow Protection',
    description:
      'Funds are held securely in escrow through the entire due diligence period. Released only when both parties confirm the transfer.',
  },
  {
    icon: BadgeCheck,
    title: 'Hand-picked Sellers',
    description:
      'Sellers are vetted for legitimacy and operational history. We reject listings with unverifiable revenue or shallow operational records.',
  },
  {
    icon: LineChart,
    title: 'Detailed Metrics',
    description:
      'MRR, ARR, profit margins, traffic, customer counts, churn — every material metric disclosed upfront so you can model the deal.',
  },
];

export function HomeView() {
  const { businesses, setView } = useMarketplace();
  const [selectedForOffer, setSelectedForOffer] = useState<BusinessListing | null>(null);
  const [search, setSearch] = useState('');

  const featured = businesses.filter((b) => b.isFeatured && b.status === 'active');
  const totalMRR = businesses.reduce((sum, b) => sum + b.metrics.mrr, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setView('marketplace');
  };

  return (
    <div className="bg-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 border-b border-zinc-800">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] [background-size:32px_32px]" />
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="text-center max-w-4xl mx-auto space-y-7">
            <Badge className="inline-flex items-center gap-1.5 bg-emerald-900/30 border-emerald-700/40 text-emerald-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Verified Businesses Marketplace · Escrow Protected
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
              Buy & Sell Profitable{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                Online Businesses
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              The trusted marketplace for acquiring SaaS platforms, e-commerce stores,
              agencies, content assets, and subscription businesses. Every listing is
              financially verified and every transaction is escrow-protected.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto pt-2">
              <div className="flex flex-col sm:flex-row gap-2 p-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by niche, MRR range, category, or keyword..."
                    className="w-full bg-transparent border-0 text-white placeholder:text-zinc-500 pl-11 h-11 focus-visible:ring-0"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white h-11 px-7"
                >
                  Explore Deals
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </form>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-12 max-w-4xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <s.icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge className="bg-emerald-900/30 border-emerald-700/40 text-emerald-300 mb-3">
              <Star className="w-3 h-3 mr-1" /> Verified Deals
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Featured Businesses For Sale
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              Hand-picked listings with verified financials, clean operations, and
              strong growth trajectories. Total combined MRR across featured deals:{' '}
              <span className="text-emerald-400 font-bold">
                {formatCurrency(totalMRR)}/mo
              </span>
              .
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setView('marketplace')}
            className="bg-transparent border-zinc-700 text-zinc-200 hover:bg-zinc-900 hover:text-emerald-400"
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
            <Badge className="bg-emerald-900/30 border-emerald-700/40 text-emerald-300 mb-3">
              <Building2 className="w-3 h-3 mr-1" /> Browse By Category
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
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
              className="group relative rounded-2xl overflow-hidden aspect-square bg-zinc-900 border border-zinc-800 hover:border-emerald-700/60 transition"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
                <div className="text-sm font-bold text-white">{cat.name}</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">
                  {cat.count} listings
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-zinc-900/30 border-y border-zinc-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="bg-emerald-900/30 border-emerald-700/40 text-emerald-300 mb-3">
              <ShieldCheck className="w-3 h-3 mr-1" /> Trust & Safety
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Why Founders Choose BizExchange
            </h2>
            <p className="text-sm text-zinc-400 mt-3">
              We obsess over deal quality. Every business is screened, every
              financial verified, every transaction protected.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-700/60 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-900/40 border border-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <f.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-zinc-900 to-zinc-950 border border-emerald-800/40 p-8 sm:p-12 lg:p-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-5">
            <Badge className="bg-emerald-600 text-white border-emerald-500">
              <Globe className="w-3 h-3 mr-1" /> Sell Your Business
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Ready to exit your business? List in 10 minutes.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Reach 50,000+ qualified buyers actively searching for profitable online
              businesses. Pay only 8% commission when your deal closes — no upfront fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={() => setView('seller-dashboard')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white h-12 px-7"
              >
                List Your Business
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => setView('marketplace')}
                variant="outline"
                className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 h-12 px-7"
              >
                Browse Marketplace
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
