'use client';

import { useMemo } from 'react';
import { ArrowRight, BookOpen, Clock, TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SEO_BUSINESSES, SITE } from '@/lib/seo';
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
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center space-y-6">
          <Badge className="bg-emerald-900/30 border-emerald-700/40 text-emerald-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            BizExchange Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Acquisition Insights for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              Online Business Buyers
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Deep-dive analyses of every business listed on {SITE.name}. Real metrics,
            verified financials, due diligence checklists, and productization playbooks —
            written for serious acquirers.
          </p>

          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search articles by business name, niche, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 pl-11 h-12"
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
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Featured Article
              </span>
            </div>
            <Card
              className="bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer hover:border-emerald-700/60 transition group"
              onClick={() => onReadPost(featuredPost.blogSlug)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-zinc-800">
                  <img
                    src={featuredPost.screenshot}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-emerald-600 text-white border-emerald-500">
                    Featured
                  </Badge>
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 8 min read
                    </span>
                    <span>·</span>
                    <span>{featuredPost.category}</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-bold">
                      {formatCurrency(featuredPost.askingPrice)}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight mb-3 group-hover:text-emerald-400 transition">
                    {featuredPost.blogTitle}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {featuredPost.blogExcerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {featuredPost.blogKeywords.slice(0, 4).map((k) => (
                      <Badge
                        key={k}
                        className="bg-zinc-800 text-zinc-400 border-zinc-700 text-[10px]"
                      >
                        {k}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-500 text-white w-fit"
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
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {search ? `Results (${posts.length})` : 'All Articles'}
            </h2>
            <span className="text-xs text-zinc-500">{posts.length} posts</span>
          </div>

          {posts.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800 p-10 text-center">
              <p className="text-sm text-zinc-500">No articles match your search.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer hover:border-emerald-700/60 transition group flex flex-col"
                  onClick={() => onReadPost(post.blogSlug)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
                    <img
                      src={post.screenshot}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-zinc-950/90 text-emerald-400 border-emerald-800/50 backdrop-blur-md text-[10px]">
                      {post.category}
                    </Badge>
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-emerald-600 text-white border-emerald-500 text-[10px] font-bold">
                        {formatCurrency(post.askingPrice)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>6 min read</span>
                      <span>·</span>
                      <span>{post.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-emerald-400 transition line-clamp-3">
                      {post.blogTitle}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-3">
                      {post.blogExcerpt}
                    </p>
                    <div className="mt-auto pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500">
                        {post.blogKeywords.slice(0, 2).join(' · ')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mt-16">
          <Card className="bg-gradient-to-br from-emerald-900/40 via-zinc-900 to-zinc-950 border-emerald-800/40 p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Ready to acquire a business?
            </h3>
            <p className="text-sm text-zinc-400 mb-5 max-w-xl mx-auto">
              Browse all {SEO_BUSINESSES.length} verified business listings with full
              financial metrics, verified screenshots, and escrow-protected checkout.
            </p>
            <Button
              onClick={() => setView('marketplace')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
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
