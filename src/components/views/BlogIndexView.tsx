'use client';

import { useMemo } from 'react';
import { ArrowRight, BookOpen, Clock, TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SEO_BUSINESSES, SITE } from '@/lib/seo';
import { AdSlot } from '@/components/marketplace/AdSlot';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import { useState } from 'react';

interface BlogIndexViewProps {
  onReadPost: (slug: string) => void;
}

export function BlogIndexView({ onReadPost }: BlogIndexViewProps) {
  const { setView } = useMarketplace();
  const [search, setSearch] = useState('');

  const featuredPost = SEO_BUSINESSES[0]; // PlayBeat TV

  const posts = useMemo(() => {
    if (!search.trim()) return SEO_BUSINESSES;
    const q = search.toLowerCase();
    return SEO_BUSINESSES.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.blogTitle.toLowerCase().includes(q) ||
        b.blogExcerpt.toLowerCase().includes(q) ||
        b.blogKeywords.some((k) => k.toLowerCase().includes(q)),
    );
  }, [search]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#0B1B3A] via-[#102956] to-[#0B1B3A] border-b border-[#1d3a6e] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center space-y-6">
          <Badge className="bg-blue-900/30 border-blue-700/40 text-blue-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            MakeThisDeal.biz Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.1]">
            Acquisition Insights for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">
              Online Business Buyers
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Deep-dive analyses of every business listed on {SITE.name}. Real metrics,
            verified financials, due diligence checklists, and productization playbooks —
            written for serious acquirers.
          </p>

          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search articles by business name, niche, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 pl-11 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Featured post */}
        {!search && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Featured Article
              </span>
            </div>
            <Card
              className="bg-white border-gray-200 overflow-hidden cursor-pointer hover:border-blue-700/60 transition group"
              onClick={() => onReadPost(featuredPost.blogSlug)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100">
                  <img
                    src={featuredPost.screenshot}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/80 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-gray-900 border-blue-500">
                    Featured
                  </Badge>
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 8 min read
                    </span>
                    <span>·</span>
                    <span>{featuredPost.category}</span>
                    <span>·</span>
                    <span className="text-blue-400 font-bold">
                      {formatCurrency(featuredPost.askingPrice)}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-3 group-hover:text-blue-400 transition">
                    {featuredPost.blogTitle}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {featuredPost.blogExcerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {featuredPost.blogKeywords.slice(0, 4).map((k) => (
                      <Badge
                        key={k}
                        className="bg-gray-100 text-gray-600 border-gray-300 text-[10px]"
                      >
                        {k}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-500 text-gray-900 w-fit"
                    onClick={() => onReadPost(featuredPost.blogSlug)}
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* All posts grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              {search ? `Results (${posts.length})` : 'All Articles'}
            </h2>
            <span className="text-xs text-gray-500">{posts.length} posts</span>
          </div>

          {posts.length === 0 ? (
            <Card className="bg-white border-gray-200 p-10 text-center">
              <p className="text-sm text-gray-500">No articles match your search.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white border-gray-200 overflow-hidden cursor-pointer hover:border-blue-700/60 transition group flex flex-col"
                  onClick={() => onReadPost(post.blogSlug)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={post.screenshot}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/80 via-transparent to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-blue-400 border-blue-800/50 backdrop-blur-md text-[10px]">
                      {post.category}
                    </Badge>
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-blue-600 text-gray-900 border-blue-500 text-[10px] font-bold">
                        {formatCurrency(post.askingPrice)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>6 min read</span>
                      <span>·</span>
                      <span>{post.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-400 transition line-clamp-3">
                      {post.blogTitle}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3">
                      {post.blogExcerpt}
                    </p>
                    <div className="mt-auto pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">
                        {post.blogKeywords.slice(0, 2).join(' · ')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* AdSense ad unit — between blog cards and CTA */}
          <AdSlot slotKey="blogIndex" format="horizontal" />
        </section>

        {/* CTA */}
        <section className="mt-16">
          <Card className="bg-gradient-to-br from-blue-900/40 via-[#102956] to-[#0B1B3A] border-blue-800/40 p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Ready to acquire a business?
            </h3>
            <p className="text-sm text-blue-100 mb-5 max-w-xl mx-auto">
              Browse all {SEO_BUSINESSES.length} verified business listings with full
              financial metrics, verified screenshots, and escrow-protected checkout.
            </p>
            <Button
              onClick={() => setView('marketplace')}
              className="bg-blue-600 hover:bg-blue-500 text-gray-900"
            >
              Browse Marketplace
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
}
