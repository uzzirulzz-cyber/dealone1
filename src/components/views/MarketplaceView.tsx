'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, X, BadgeCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { BusinessCard } from '@/components/marketplace/BusinessCard';
import { OfferModal } from '@/components/marketplace/OfferModal';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import type { BusinessListing, BusinessCategory } from '@/lib/types';

const categories: (BusinessCategory | 'All')[] = [
  'All',
  'E-Commerce',
  'SaaS / Software',
  'Content & Media',
  'Agency / Services',
  'Mobile Apps',
  'Marketplace',
  'Subscription',
];

const sortOptions = [
  { value: 'featured', label: 'Featured First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'mrr-desc', label: 'Highest MRR' },
  { value: 'profit-desc', label: 'Most Profitable' },
  { value: 'newest', label: 'Newest Listings' },
] as const;

type SortValue = (typeof sortOptions)[number]['value'];

export function MarketplaceView() {
  const { businesses } = useMarketplace();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortValue>('featured');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [selectedForOffer, setSelectedForOffer] = useState<BusinessListing | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = businesses.filter((b) => b.status === 'active');

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.tagline.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.techStack?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (selectedCategory !== 'All') {
      list = list.filter((b) => b.category === selectedCategory);
    }

    if (verifiedOnly) {
      list = list.filter((b) => b.isVerified);
    }

    list = list.filter((b) => b.askingPrice <= maxPrice);

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.askingPrice - b.askingPrice);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.askingPrice - a.askingPrice);
        break;
      case 'mrr-desc':
        list = [...list].sort((a, b) => b.metrics.mrr - a.metrics.mrr);
        break;
      case 'profit-desc':
        list = [...list].sort((a, b) => b.metrics.profit - a.metrics.profit);
        break;
      case 'newest':
        list = [...list].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case 'featured':
      default:
        list = [...list].sort(
          (a, b) => Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false),
        );
    }

    return list;
  }, [businesses, search, selectedCategory, sortBy, verifiedOnly, maxPrice]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSortBy('featured');
    setVerifiedOnly(false);
    setMaxPrice(500000);
  };

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-900/40 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Badge className="bg-emerald-900/30 border-emerald-700/40 text-emerald-300 mb-3">
            <TrendingUp className="w-3 h-3 mr-1" /> Browse Marketplace
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Verified Businesses For Sale
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            {filtered.length} of {businesses.length} listings — all financials verified,
            all transactions escrow-protected.
          </p>

          {/* Search bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search businesses by niche, tech stack, or keyword..."
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 pl-11 h-11"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="bg-transparent border-zinc-700 text-zinc-200 hover:bg-zinc-900 h-11 lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              filtersOpen ? 'block' : 'hidden'
            } lg:block space-y-6 lg:sticky lg:top-32 lg:self-start`}
          >
            <Card className="bg-zinc-900 border-zinc-800 p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-[11px] text-zinc-500 hover:text-emerald-400"
                >
                  Reset
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Category
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max price */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Max Asking Price
                  </Label>
                  <span className="text-xs font-bold text-emerald-400">
                    {formatCurrency(maxPrice, { compact: true })}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={10000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>$10K</span>
                  <span>$500K</span>
                </div>
              </div>

              {/* Verified only */}
              <div className="flex items-center justify-between">
                <Label htmlFor="verified" className="text-sm text-zinc-300 flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  Verified only
                </Label>
                <Switch
                  id="verified"
                  checked={verifiedOnly}
                  onCheckedChange={setVerifiedOnly}
                />
              </div>
            </Card>
          </aside>

          {/* Listings */}
          <div>
            {/* Sort + count */}
            <div className="flex items-center justify-between mb-5 gap-3">
              <p className="text-sm text-zinc-400">
                Showing <span className="text-white font-bold">{filtered.length}</span> businesses
              </p>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-zinc-500 hidden sm:block">Sort by</Label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortValue)}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value} className="bg-zinc-900">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {(selectedCategory !== 'All' || verifiedOnly || search) && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {search && (
                  <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 gap-1">
                    "{search}"
                    <button onClick={() => setSearch('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory !== 'All' && (
                  <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {verifiedOnly && (
                  <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 gap-1">
                    Verified only
                    <button onClick={() => setVerifiedOnly(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 mx-auto flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-zinc-600" />
                </div>
                <h3 className="text-white font-semibold text-lg">No businesses match your filters</h3>
                <p className="text-sm text-zinc-500 mt-2 mb-4">
                  Try widening your price range or clearing your search.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((b) => (
                  <BusinessCard
                    key={b.id}
                    business={b}
                    onMakeOffer={setSelectedForOffer}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <OfferModal
        business={selectedForOffer}
        isOpen={Boolean(selectedForOffer)}
        onClose={() => setSelectedForOffer(null)}
      />
    </div>
  );
}
