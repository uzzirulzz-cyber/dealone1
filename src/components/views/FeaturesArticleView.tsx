'use client';

import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ShieldCheck, TrendingUp, Users, Zap, BadgeCheck, LineChart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SEO_BUSINESSES, SITE } from '@/lib/seo';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';

interface FeaturesArticleViewProps {
  onBack: () => void;
  onReadPost: (slug: string) => void;
}

const featureBlocks = [
  {
    icon: ShieldCheck,
    title: 'Escrow-Protected Transactions',
    description:
      'Every acquisition on BizExchange flows through a neutral third-party escrow service. Buyer funds are held securely from the moment they initiate checkout until they confirm the business transfer is complete — domain, codebase, and assets all handed over. The seller never receives a dollar until the buyer signs off, and the buyer never risks capital on an unfinished transfer. This is the single most important trust mechanism on the platform, and it is non-negotiable on every transaction regardless of deal size.',
    bullets: [
      'Funds held by neutral escrow agent for the full due diligence period',
      '14–30 day standard escrow window with optional extensions',
      'Buyer releases funds only after confirming successful transfer',
      'Seller is protected by binding offer agreement before transfer begins',
      'Dispute resolution process included on every transaction',
    ],
  },
  {
    icon: BadgeCheck,
    title: 'Verified Financial Listings',
    description:
      'Every business listed on BizExchange goes through a financial verification process before it appears in the marketplace. We review P&L statements, bank deposits, payment processor exports, and analytics access. Listings that cannot pass verification are rejected — this is why our catalog is intentionally small (six businesses today) rather than a sprawling marketplace of unverified deals. Quality over quantity is the entire point.',
    bullets: [
      'P&L statements cross-referenced against bank deposits',
      'Stripe / PayPal / crypto wallet exports reviewed for revenue claims',
      'Google Analytics / Plausible / Vercel access checked for traffic claims',
      'Customer count verified against active user database exports',
      'Listings rejected if financials cannot be independently verified',
    ],
  },
  {
    icon: LineChart,
    title: 'Detailed Metrics Up Front',
    description:
      'Every listing discloses the metrics a serious buyer actually needs to model a deal: MRR, ARR, monthly revenue, monthly profit, profit margin, monthly traffic, pageviews, customer count, churn rate, and business age in months. No "DM for price" games. No "traffic undisclosed" placeholders. If a metric is not disclosed, the listing says so explicitly and the seller explains why.',
    bullets: [
      'MRR and ARR disclosed for subscription businesses',
      'Monthly revenue and profit verified against bank statements',
      'Profit margin calculated and disclosed as a percentage',
      'Monthly traffic from independent analytics access',
      'Customer count, churn rate, and business age all in the listing',
    ],
  },
  {
    icon: Zap,
    title: 'Offer Negotiation System',
    description:
      'The Make-an-Offer flow lets buyers submit formal, structured offers with a price and a message to the seller. Sellers can accept, reject, or counter with a different price and message. This is not a chat — it is a documented negotiation that creates a paper trail for the escrow agent. Every offer and counter-offer is timestamped and visible in both parties\' dashboards, so there is never ambiguity about who said what and when.',
    bullets: [
      'Buyers submit offer price + message to seller',
      'Sellers can accept, reject, or counter with new price',
      'All offers timestamped and visible in both dashboards',
      'Counter-offers include optional message for context',
      'Offer history exportable as PDF for escrow documentation',
    ],
  },
  {
    icon: Users,
    title: 'Role-Based Dashboards',
    description:
      'BizExchange serves three distinct user types, each with their own dashboard experience. Buyers get an orders / wishlist / offers view. Sellers get a listings management view with offer review and a List New Business flow. Admins get a platform oversight view with listing verification, user management, and platform settings (commission rate, tax rate, maintenance mode). Switch between roles from the avatar dropdown in the top right to see each perspective.',
    bullets: [
      'Buyer dashboard: orders, wishlist, and submitted offers',
      'Seller dashboard: listing CRUD, incoming offers, revenue stats',
      'Admin dashboard: listing verification, user management, platform settings',
      'Role switching via avatar dropdown for demo exploration',
      'Each role has purpose-built UI — no clutter from unrelated features',
    ],
  },
  {
    icon: Globe,
    title: 'Real Live-Site Screenshots',
    description:
      'For every fetched business listing, we capture a real screenshot of the live production site and embed it as the first image in the listing gallery. No stock photos. No mockups. The screenshot you see is the actual homepage of the business you are buying, captured at the time of listing. This is paired with a detailed "About the Live Site" paragraph in each description that names the live URL and describes exactly what is visible on the homepage today.',
    bullets: [
      'Real screenshots captured directly from each live production site',
      'Screenshot is the first image in every listing gallery',
      'About the Live Site paragraph names the URL and visible content',
      'Screenshots stored in /public/site-screenshots/ for transparency',
      'Re-captured periodically to keep listings current',
    ],
  },
];

export function FeaturesArticleView({ onBack, onReadPost }: FeaturesArticleViewProps) {
  const { setView } = useMarketplace();

  return (
    <article className="bg-zinc-950 min-h-screen">
      {/* Hero */}
      <header className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
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
              Platform Overview
            </Badge>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> 12 min read
            </span>
            <span>·</span>
            <span>By {SITE.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] mb-4">
            BizExchange Features — How the Verified Business Marketplace Actually Works
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6">
            A complete walkthrough of every feature on BizExchange: escrow-protected
            transactions, verified financial listings, structured offer negotiation,
            role-based dashboards, and real live-site screenshots. If you are evaluating
            the platform as a buyer, seller, or operator, this is the definitive guide.
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-12">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-base text-zinc-300 leading-relaxed">
            <strong className="text-white">BizExchange</strong> is a curated marketplace for
            buying and selling profitable online businesses — SaaS platforms, crypto trading
            terminals, digital product marketplaces, AI CRMs, and luxury real estate platforms.
            Unlike sprawling business-for-sale directories that list thousands of unverified
            deals, BizExchange intentionally keeps its catalog small. As of this writing, the
            marketplace features <strong className="text-emerald-400">{SEO_BUSINESSES.length} verified businesses</strong>,
            each with real metrics, real screenshots, and a real seller behind it.
          </p>
          <p className="text-base text-zinc-300 leading-relaxed">
            This article is the definitive feature walkthrough. Whether you are a buyer
            evaluating your first micro-acquisition, a seller preparing to list a business,
            or an operator considering building a similar platform, every feature below is
            documented in detail — what it does, why it exists, and how it protects the
            parties involved.
          </p>
        </section>

        {/* Current catalog */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            The Current Catalog — {SEO_BUSINESSES.length} Verified Businesses
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            BizExchange currently lists {SEO_BUSINESSES.length} businesses for sale. Every
            listing was sourced from a real production website, captured with a live
            screenshot, and verified for the metrics disclosed below. Asking prices range
            from {formatCurrency(Math.min(...SEO_BUSINESSES.map((b) => b.askingPrice)))} to{' '}
            {formatCurrency(Math.max(...SEO_BUSINESSES.map((b) => b.askingPrice)))}.
          </p>
          <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
            <div className="divide-y divide-zinc-800">
              {SEO_BUSINESSES.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => onReadPost(b.blogSlug)}
                  className="w-full text-left p-4 hover:bg-zinc-800/40 transition flex items-center gap-4"
                >
                  <img
                    src={b.screenshot}
                    alt={b.title}
                    className="w-16 h-12 rounded object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">
                      {i + 1}. {b.title}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {b.category} · {b.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-emerald-400">
                      {formatCurrency(b.askingPrice)}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">Read article →</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </section>

        {/* Feature blocks */}
        {featureBlocks.map((block, i) => (
          <section key={i} className="space-y-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <block.icon className="w-6 h-6 text-emerald-400" />
              {block.title}
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed">{block.description}</p>
            <ul className="space-y-2.5">
              {block.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* How it works for buyers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            How It Works — For Buyers
          </h2>
          <ol className="space-y-3 list-decimal list-inside text-sm text-zinc-300 leading-relaxed">
            <li>
              <strong className="text-white">Browse the marketplace</strong> — filter by
              category, max price, and verified-only. Sort by featured, price, MRR, profit,
              or newest.
            </li>
            <li>
              <strong className="text-white">Open a listing</strong> — review the verified
              metrics, the About the Live Site section, the real screenshot gallery, and the
              reason for selling.
            </li>
            <li>
              <strong className="text-white">Make an offer</strong> — submit a formal offer
              with a price and message. The seller has 48 hours to respond.
            </li>
            <li>
              <strong className="text-white">Add to cart + checkout</strong> — if you prefer
              to buy at asking price, add the business to your cart and proceed to escrow
              checkout.
            </li>
            <li>
              <strong className="text-white">Conduct due diligence</strong> — during the
              escrow period, verify all metrics against bank statements and analytics access.
            </li>
            <li>
              <strong className="text-white">Confirm transfer</strong> — once the domain,
              codebase, and assets are transferred, release funds from escrow to the seller.
            </li>
          </ol>
        </section>

        {/* How it works for sellers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            How It Works — For Sellers
          </h2>
          <ol className="space-y-3 list-decimal list-inside text-sm text-zinc-300 leading-relaxed">
            <li>
              <strong className="text-white">Switch to Seller role</strong> — use the avatar
              dropdown in the top right to access the seller dashboard.
            </li>
            <li>
              <strong className="text-white">List your business</strong> — use the List New
              Business modal to enter title, description, asking price, category, financial
              metrics, and image URL.
            </li>
            <li>
              <strong className="text-white">Wait for verification</strong> — your listing
              enters "pending" status while the admin team verifies your financial claims.
              Once verified, it goes live in the marketplace.
            </li>
            <li>
              <strong className="text-white">Review offers</strong> — when buyers submit
              offers, they appear in your seller dashboard. Accept, reject, or counter with
              a single click.
            </li>
            <li>
              <strong className="text-white">Complete the transfer</strong> — once an offer
              is accepted and the buyer initiates escrow, transfer the domain, codebase, and
              assets. Funds are released when the buyer confirms.
            </li>
            <li>
              <strong className="text-white">Pay the platform fee</strong> — BizExchange
              charges an 8% commission on the final sale price, deducted from the escrow
              release. No upfront listing fees.
            </li>
          </ol>
        </section>

        {/* Tech stack */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            Under the Hood — Tech Stack
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            BizExchange is built on a modern, production-grade stack:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Framework', value: 'Next.js 16 (App Router)' },
              { label: 'Language', value: 'TypeScript 5' },
              { label: 'Styling', value: 'Tailwind CSS 4 + shadcn/ui' },
              { label: 'State', value: 'Zustand with localStorage persistence' },
              { label: 'Database', value: 'PostgreSQL on Neon' },
              { label: 'ORM', value: 'Prisma 6' },
              { label: 'Icons', value: 'lucide-react' },
              { label: 'Toasts', value: 'sonner' },
              { label: 'Auth', value: 'NextAuth.js v4 (available)' },
              { label: 'Deployment', value: 'Vercel (recommended)' },
            ].map((t) => (
              <Card key={t.label} className="bg-zinc-900 border-zinc-800 p-3 flex justify-between items-center">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">{t.label}</span>
                <span className="text-sm font-bold text-white">{t.value}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <Card className="bg-gradient-to-br from-emerald-900/40 via-zinc-900 to-zinc-950 border-emerald-800/40 p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Ready to explore the marketplace?
            </h3>
            <p className="text-sm text-zinc-400 mb-5 max-w-xl mx-auto">
              Browse all {SEO_BUSINESSES.length} verified business listings with full
              financial metrics, real screenshots, and escrow-protected checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => setView('marketplace')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Browse Marketplace
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800"
              >
                Back to Blog
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </article>
  );
}
