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
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Badge className="bg-blue-900/30 border-blue-700/40 text-blue-300 mb-3">
            <TrendingUp className="w-3 h-3 mr-1" /> Browse Marketplace
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Verified Businesses For Sale
          </h1>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl">
            {filtered.length} of {businesses.length} listings — all financials verified,
            all transactions escrow-protected.
          </p>

          {/* Search bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search businesses by niche, tech stack, or keyword..."
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 pl-11 h-11"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="bg-transparent border-gray-300 text-gray-800 hover:bg-white h-11 lg:hidden"
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
            <Card className="bg-white border-gray-200 p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-[11px] text-gray-500 hover:text-blue-400"
                >
                  Reset
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Category
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-gray-900'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Max Asking Price
                  </Label>
                  <span className="text-xs font-bold text-blue-400">
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
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>$10K</span>
                  <span>$500K</span>
                </div>
              </div>

              {/* Verified only */}
              <div className="flex items-center justify-between">
                <Label htmlFor="verified" className="text-sm text-gray-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-blue-400" />
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
              <p className="text-sm text-gray-600">
                Showing <span className="text-gray-900 font-bold">{filtered.length}</span> businesses
              </p>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-gray-500 hidden sm:block">Sort by</Label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortValue)}
                  className="bg-white border border-gray-200 text-gray-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value} className="bg-white">
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
                  <Badge className="bg-gray-100 text-gray-700 border-gray-300 gap-1">
                    "{search}"
                    <button onClick={() => setSearch('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory !== 'All' && (
                  <Badge className="bg-gray-100 text-gray-700 border-gray-300 gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {verifiedOnly && (
                  <Badge className="bg-gray-100 text-gray-700 border-gray-300 gap-1">
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
                <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-semibold text-lg">No businesses match your filters</h3>
                <p className="text-sm text-gray-500 mt-2 mb-4">
                  Try widening your price range or clearing your search.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-500 text-gray-900"
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
