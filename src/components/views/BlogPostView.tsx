'use client';

import { ArrowLeft, ArrowRight, Clock, Tag, CheckCircle2, AlertTriangle, TrendingUp, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SEO_BUSINESSES, SITE, type SeoBusinessEntry } from '@/lib/seo';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import { toast } from 'sonner';

interface BlogPostViewProps {
  post: SeoBusinessEntry;
  onBack: () => void;
  onReadPost: (slug: string) => void;
}

export function BlogPostView({ post, onBack, onReadPost }: BlogPostViewProps) {
  const { setView, openBusiness } = useMarketplace();

  const relatedPosts = SEO_BUSINESSES.filter((b) => b.id !== post.id).slice(0, 3);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${SITE.url}/?blog=${post.blogSlug}`);
      toast.success('Article link copied to clipboard');
    }
  };

  const viewBusiness = () => {
    // Map seo id back to business id and open
    openBusiness(post.id);
  };

  return (
    <article className="bg-zinc-950 min-h-screen">
      {/* Hero */}
      <header className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={post.screenshot}
            alt=""
            className="w-full h-full object-cover blur-3xl"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-emerald-400 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
            <Badge className="bg-emerald-900/40 border-emerald-800 text-emerald-400">
              {post.category}
            </Badge>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> 8 min read
            </span>
            <span>·</span>
            <span>By {SITE.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] mb-4">
            {post.blogTitle}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6">
            {post.blogExcerpt}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-emerald-600 text-white border-emerald-500 text-sm font-bold px-3 py-1">
              Asking: {formatCurrency(post.askingPrice)}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={viewBusiness}
              className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800"
            >
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              View Listing
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-zinc-400 hover:text-emerald-400"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Featured image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <div className="relative aspect-[16/9] bg-zinc-800">
            <img
              src={post.screenshot}
              alt={`${post.title} — live screenshot of ${post.liveUrl}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-zinc-950/90 text-zinc-300 border-zinc-700 backdrop-blur-md text-[10px]">
                Live screenshot: {post.liveUrl}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-base text-zinc-300 leading-relaxed">
            <strong className="text-white">{post.title}</strong> is currently listed for sale on{' '}
            <span className="text-emerald-400 font-semibold">{SITE.name}</span> at an asking price of{' '}
            <strong className="text-emerald-400">{formatCurrency(post.askingPrice)}</strong>
            {post.previousPrice && (
              <> (discounted from <span className="text-zinc-500 line-through">{formatCurrency(post.previousPrice)}</span>)</>
            )}. The live site is accessible at{' '}
            <a
              href={post.liveUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              {post.liveUrl}
            </a>{' '}
            and the screenshot above was captured directly from the production deployment.
          </p>
          <p className="text-base text-zinc-300 leading-relaxed">
            {post.shortDescription} In this article we break down the platform in detail —
            what it does, who it serves, the verified metrics behind the asking price, why it
            represents a compelling acquisition at this valuation, and the exact due diligence
            checklist a serious buyer should run before signing the escrow agreement.
          </p>
        </section>

        {/* Key metrics */}
        <section>
          <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            Key Metrics at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {post.keyMetrics.map((m) => (
              <Card key={m.label} className="bg-zinc-900 border-zinc-800 p-4 text-center">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                  {m.label}
                </div>
                <div className="text-base font-black text-emerald-400">{m.value}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* What is it */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            What Is {post.title.split('—')[0].trim()}?
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            {post.title} is a {post.category.toLowerCase()} business operating at{' '}
            <a
              href={post.liveUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              {post.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
            . The platform monetizes through {post.monetization.join(', ').toLowerCase()} and is
            being sold as a turnkey acquisition — domain, codebase, user base, and operational
            documentation all transfer to the new owner on closing.
          </p>
          <p className="text-base text-zinc-300 leading-relaxed">
            The current owner has priced the business at{' '}
            <strong className="text-emerald-400">{formatCurrency(post.askingPrice)}</strong>,
            which represents one of the most accessible entry points in the current micro-acquisition
            market. For context, similar platforms in the {post.category.toLowerCase()} category
            typically trade at 2.5x–4x annual profit — buyers should evaluate this asking price
            against the verified monthly profit and traffic figures below.
          </p>
        </section>

        {/* Platform features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            Platform Features — What You Actually Buy
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            Every feature below was verified against the live production site at{' '}
            <a
              href={post.liveUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              {post.liveUrl}
            </a>
            . The screenshot embedded at the top of this article is a direct capture of the
            homepage as it appears today.
          </p>
          <ul className="space-y-3">
            {post.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why acquire */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            Why Acquire This Business?
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            For a buyer evaluating micro-acquisitions in the {post.category.toLowerCase()} space,
            {post.title.split('—')[0].trim()} stands out for several reasons:
          </p>
          <ul className="space-y-3">
            {post.whyAcquire.map((w, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600/20 border border-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-400">{i + 1}</span>
                </div>
                <span className="text-sm text-zinc-300 leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Due diligence */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            Due Diligence Checklist — Verify Before You Buy
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            Any serious acquisition requires verification. The following items should be
            audited during the escrow period before funds are released to the seller.{' '}
            <strong className="text-amber-400">Do not skip these steps</strong> — the
            asking price of {formatCurrency(post.askingPrice)} is low precisely because the
            buyer is expected to do their own homework.
          </p>
          <Card className="bg-amber-950/20 border-amber-800/40 p-5">
            <ul className="space-y-3">
              {post.dueDiligence.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <span className="text-sm text-zinc-300 leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Pricing analysis */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            Pricing Analysis — Is {formatCurrency(post.askingPrice)} a Fair Price?
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            At <strong className="text-emerald-400">{formatCurrency(post.askingPrice)}</strong>
            {post.previousPrice && (
              <>
                {' '}(down from <span className="text-zinc-500 line-through">{formatCurrency(post.previousPrice)}</span>
                — a {Math.round(((post.previousPrice - post.askingPrice) / post.previousPrice) * 100)}% discount)
              </>
            )}
            , this listing sits in the lower tier of the micro-acquisition market for{' '}
            {post.category.toLowerCase()} businesses. Micro-acquisitions typically price at
            2.5x–4x trailing-twelve-month (TTM) profit, with premiums for recurring revenue,
            strong brands, and growth trajectories.
          </p>
          <p className="text-base text-zinc-300 leading-relaxed">
            For a buyer, the question is not whether {formatCurrency(post.askingPrice)} is
            "cheap" in absolute terms — it is whether the verified monthly profit, the
            transferable assets (domain, codebase, user base), and the realistic growth runway
            justify the price within a 12–24 month payback window. Run the numbers yourself
            using the metrics disclosed above, and cross-reference them against bank statements
            and analytics access during the escrow period.
          </p>
        </section>

        {/* How to buy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            How to Acquire {post.title.split('—')[0].trim()}
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            The acquisition process on {SITE.name} is fully escrow-protected. Once you decide
            to proceed:
          </p>
          <ol className="space-y-3 list-decimal list-inside text-sm text-zinc-300 leading-relaxed">
            <li>
              <strong className="text-white">View the full listing</strong> to see all verified
              financials, the complete description, and the seller's reason for selling.
            </li>
            <li>
              <strong className="text-white">Make an offer</strong> — submit a formal offer
              with a message to the seller. The seller can accept, reject, or counter.
            </li>
            <li>
              <strong className="text-white">Initiate escrow</strong> — once the offer is
              accepted, funds are held securely by a neutral third-party escrow service.
            </li>
            <li>
              <strong className="text-white">Conduct due diligence</strong> — verify all
              metrics in the checklist above. The escrow period typically lasts 14–30 days.
            </li>
            <li>
              <strong className="text-white">Confirm transfer</strong> — once you confirm the
              domain, codebase, and assets have been transferred, escrow releases funds to
              the seller.
            </li>
          </ol>
          <div className="pt-4">
            <Button
              onClick={viewBusiness}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              View Full Listing & Make an Offer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>

        {/* FAQ-style keywords section for SEO */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-emerald-400 mb-1">
                How much does {post.title.split('—')[0].trim()} cost?
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The asking price is <strong className="text-white">{formatCurrency(post.askingPrice)}</strong>
                {post.previousPrice && (
                  <>, discounted from {formatCurrency(post.previousPrice)}</>
                )}. The price is negotiable through the formal offer system on {SITE.name}.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-400 mb-1">
                Is the transaction safe?
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Yes. All transactions on {SITE.name} are escrow-protected. Funds are held by
                a neutral third party and released to the seller only after you confirm the
                business transfer is complete.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-400 mb-1">
                Where can I see the live site?
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The live production site is at{' '}
                <a
                  href={post.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  {post.liveUrl}
                </a>
                . A real screenshot captured from the live site is included in the listing gallery.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-400 mb-1">
                What is included in the sale?
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The sale includes the domain, full source code, user database, supplier
                relationships (where applicable), and operational documentation. A 14–30 day
                transition period with the current owner is typically included.
              </p>
            </div>
          </div>
        </section>

        {/* Tags */}
        <section className="pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Tags
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.blogKeywords.map((k) => (
              <Badge
                key={k}
                className="bg-zinc-800 text-zinc-300 border-zinc-700 text-[11px]"
              >
                {k}
              </Badge>
            ))}
          </div>
        </section>
      </div>

      {/* Related posts */}
      <section className="bg-zinc-900/40 border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-black text-white">Related Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Card
                key={rp.id}
                className="bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer hover:border-emerald-700/60 transition group flex flex-col"
                onClick={() => onReadPost(rp.blogSlug)}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
                  <img
                    src={rp.screenshot}
                    alt={rp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-zinc-950/90 text-emerald-400 border-emerald-800/50 backdrop-blur-md text-[10px]">
                    {rp.category}
                  </Badge>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-emerald-400 transition line-clamp-3">
                    {rp.blogTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                    {rp.blogExcerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-[11px] text-zinc-500">
                    <span>{formatCurrency(rp.askingPrice)}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
