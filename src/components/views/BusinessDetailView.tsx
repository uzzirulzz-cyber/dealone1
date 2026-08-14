'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingBag,
  Tag,
  TrendingUp,
  Eye,
  Users,
  Calendar,
  Globe,
  BadgeCheck,
  ShieldCheck,
  DollarSign,
  Activity,
  Code2,
  CheckCircle2,
  Star,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { OfferModal } from '@/components/marketplace/OfferModal';
import { useMarketplace } from '@/lib/store';
import { formatCurrency, formatNumber, timeAgo } from '@/lib/format';
import { toast } from 'sonner';

export function BusinessDetailView() {
  const {
    businesses,
    selectedBusinessId,
    setView,
    toggleWishlist,
    wishlist,
    addToCart,
    currentUser,
    addReview,
    cart,
  } = useMarketplace();

  const [activeImage, setActiveImage] = useState(0);
  const [offerOpen, setOfferOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const business = businesses.find((b) => b.id === selectedBusinessId);

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Business not found</h2>
        <p className="text-sm text-gray-600 mb-6">This listing may have been removed.</p>
        <Button
          onClick={() => setView('marketplace')}
          className="bg-blue-600 hover:bg-blue-500 text-gray-900"
        >
          Back to Marketplace
        </Button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(business.id);
  const inCart = cart.some((i) => i.business.id === business.id);

  const metrics = [
    { label: 'MRR', value: business.metrics.mrr > 0 ? formatCurrency(business.metrics.mrr) : '—', icon: TrendingUp, accent: true },
    { label: 'Monthly Revenue', value: formatCurrency(business.metrics.revenue), icon: DollarSign },
    { label: 'Monthly Profit', value: formatCurrency(business.metrics.profit), icon: Activity },
    { label: 'Profit Margin', value: `${business.metrics.profitMargin}%`, icon: TrendingUp },
    { label: 'Monthly Traffic', value: formatNumber(business.metrics.traffic), icon: Eye },
    { label: 'Pageviews', value: business.metrics.pageviews ? formatNumber(business.metrics.pageviews) : '—', icon: Eye },
    { label: 'Customers', value: business.metrics.customers ? formatNumber(business.metrics.customers) : '—', icon: Users },
    { label: 'Churn Rate', value: business.metrics.churnRate ? `${business.metrics.churnRate}%` : '—', icon: Activity },
    { label: 'Business Age', value: `${business.metrics.ageMonths} months`, icon: Calendar },
  ];

  const submitReview = () => {
    if (!reviewText.trim()) {
      toast.error('Please write a review comment');
      return;
    }
    addReview(business.id, reviewRating, reviewText.trim());
    setReviewText('');
    setReviewRating(5);
    toast.success('Review added');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => setView('marketplace')}
            className="text-gray-700 hover:text-blue-400 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Marketplace
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                toggleWishlist(business.id);
                toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
              }}
              className="text-gray-700 hover:text-rose-400 hover:bg-white"
            >
              <Heart className={`w-4 h-4 mr-1.5 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
              {isWishlisted ? 'Saved' : 'Save'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.success('Link copied to clipboard')}
              className="text-gray-700 hover:bg-white"
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Main column */}
          <div className="space-y-6">
            {/* Image gallery */}
            <Card className="bg-white border-gray-200 overflow-hidden">
              <div className="relative aspect-[16/9] bg-gray-100">
                <img
                  src={business.images[activeImage]}
                  alt={business.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-white/90 text-blue-400 border-blue-800/50 backdrop-blur-md">
                    {business.category}
                  </Badge>
                  {business.isVerified && (
                    <Badge className="bg-blue-600/90 text-gray-900 border-blue-500 backdrop-blur-md">
                      <BadgeCheck className="w-3 h-3 mr-0.5" /> Verified
                    </Badge>
                  )}
                  {business.isFeatured && (
                    <Badge className="bg-amber-500/90 text-zinc-950 border-amber-400 backdrop-blur-md font-bold">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              {business.images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {business.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        activeImage === i
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Title section */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                {business.title}
              </h1>
              <p className="text-base text-gray-600 mt-2">{business.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-gray-900 font-bold">{business.rating}</span>
                  <span>({business.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  {business.location || 'Remote'}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Listed {timeAgo(business.createdAt)}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-white border border-gray-200 p-1 h-auto w-full justify-start overflow-x-auto">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:shadow"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="financials"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
                >
                  Financials
                </TabsTrigger>
                <TabsTrigger
                  value="highlights"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
                >
                  Highlights
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
                >
                  Reviews ({business.reviewsCount})
                </TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="mt-4 space-y-5">
                <Card className="bg-white border-gray-200 p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Business Description</h3>
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {business.description}
                  </div>
                </Card>

                {business.reasonForSelling && (
                  <Card className="bg-white border-gray-200 p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-2">Reason for Selling</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{business.reasonForSelling}</p>
                  </Card>
                )}

                {business.techStack && business.techStack.length > 0 && (
                  <Card className="bg-white border-gray-200 p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-400" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {business.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-gray-100 text-gray-700 border-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}

                <Card className="bg-white border-gray-200 p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Monetization</h3>
                  <div className="flex flex-wrap gap-2">
                    {business.monetization.map((m) => (
                      <Badge
                        key={m}
                        className="bg-blue-900/30 text-blue-300 border-blue-800"
                      >
                        <DollarSign className="w-3 h-3 mr-0.5" />
                        {m}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Financials */}
              <TabsContent value="financials" className="mt-4">
                <Card className="bg-white border-gray-200 p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Verified Financial Metrics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {metrics.map((m) => (
                      <div
                        key={m.label}
                        className={`p-4 rounded-xl border ${
                          m.accent
                            ? 'bg-blue-900/20 border-blue-800/50'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                          <m.icon className="w-3 h-3" />
                          {m.label}
                        </div>
                        <div
                          className={`text-lg font-black ${
                            m.accent ? 'text-blue-400' : 'text-gray-900'
                          }`}
                        >
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-gray-200 flex items-start gap-2 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p>
                      All financial metrics are verified by MakeThisDeal.biz through
                      bank statements, payment processor exports, and analytics
                      access. Full due diligence documentation is provided post-offer acceptance.
                    </p>
                  </div>
                </Card>
              </TabsContent>

              {/* Highlights */}
              <TabsContent value="highlights" className="mt-4">
                <Card className="bg-white border-gray-200 p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Key Highlights</h3>
                  <ul className="space-y-3">
                    {business.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="mt-4 space-y-4">
                {/* Add review */}
                {currentUser.role === 'user' && (
                  <Card className="bg-white border-gray-200 p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      Leave a Review
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-gray-500">Rating</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              onClick={() => setReviewRating(n)}
                              type="button"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  n <= reviewRating
                                    ? 'text-amber-400 fill-current'
                                    : 'text-gray-400'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <Textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={3}
                        placeholder="Share your experience with this business or seller..."
                        className="bg-gray-50 border-gray-200 text-gray-900 resize-none"
                      />
                      <Button
                        onClick={submitReview}
                        className="bg-blue-600 hover:bg-blue-500 text-gray-900"
                      >
                        Submit Review
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Existing reviews */}
                {business.reviews.length === 0 ? (
                  <Card className="bg-white border-gray-200 p-8 text-center">
                    <p className="text-sm text-gray-500">No reviews yet. Be the first to review.</p>
                  </Card>
                ) : (
                  business.reviews.map((rev) => (
                    <Card key={rev.id} className="bg-white border-gray-200 p-5">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-9 h-9 border border-gray-300">
                          <AvatarImage src={rev.userAvatar} alt={rev.userName} />
                          <AvatarFallback className="bg-gray-100 text-blue-400 text-xs">
                            {rev.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-gray-900">{rev.userName}</span>
                            <span className="text-xs text-gray-500">{timeAgo(rev.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star
                                key={n}
                                className={`w-3 h-3 ${
                                  n <= rev.rating
                                    ? 'text-amber-400 fill-current'
                                    : 'text-gray-400'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700 mt-2 leading-relaxed">{rev.comment}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar — purchase panel */}
          <aside className="lg:sticky lg:top-32 lg:self-start space-y-4">
            <Card className="bg-white border-gray-200 p-6 space-y-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Asking Price</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-gray-900">
                    {formatCurrency(business.askingPrice)}
                  </span>
                  {business.previousPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatCurrency(business.previousPrice)}
                    </span>
                  )}
                </div>
                {business.metrics.mrr > 0 && (
                  <p className="text-xs text-blue-400 mt-1">
                    {Math.round(business.askingPrice / business.metrics.mrr)}x MRR multiple
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-200">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Monthly Profit</div>
                  <div className="text-sm font-bold text-blue-400 mt-0.5">
                    {formatCurrency(business.metrics.profit)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Profit Margin</div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    {business.metrics.profitMargin}%
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => {
                    if (!inCart) {
                      addToCart(business);
                      toast.success('Added to cart');
                    } else {
                      toast.info('Already in cart');
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-gray-900 h-11"
                  disabled={inCart}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {inCart ? 'In Cart' : `Buy Now · ${formatCurrency(business.askingPrice)}`}
                </Button>
                <Button
                  onClick={() => setOfferOpen(true)}
                  variant="outline"
                  className="w-full bg-transparent border-gray-300 text-gray-900 hover:bg-gray-100 h-11"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Make an Offer
                </Button>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-gray-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <p>
                  Funds held in escrow. Released to seller only after you confirm
                  successful business transfer.
                </p>
              </div>
            </Card>

            {/* Seller card */}
            <Card className="bg-white border-gray-200 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Seller
              </h4>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-blue-500/40">
                  <AvatarImage src={business.sellerId === 'u-2' ? 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' : ''} alt={business.sellerName} />
                  <AvatarFallback className="bg-gray-100 text-blue-400">
                    {business.sellerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900">{business.sellerName}</span>
                    <BadgeCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-xs text-gray-500">Verified seller · Responds in 24h</p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      <OfferModal
        business={business}
        isOpen={offerOpen}
        onClose={() => setOfferOpen(false)}
      />
    </div>
  );
}
