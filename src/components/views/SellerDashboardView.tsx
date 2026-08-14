'use client';

import { useState } from 'react';
import {
  Plus,
  Store,
  TrendingUp,
  DollarSign,
  Package,
  Trash2,
  Edit3,
  Eye,
  BadgeCheck,
  Clock,
  XCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMarketplace } from '@/lib/store';
import { formatCurrency, formatNumber } from '@/lib/format';
import { toast } from 'sonner';
import type { BusinessCategory, BusinessMonetization } from '@/lib/types';

const categories: BusinessCategory[] = [
  'E-Commerce',
  'SaaS / Software',
  'Content & Media',
  'Agency / Services',
  'Mobile Apps',
  'Marketplace',
  'Subscription',
  'Other',
];

const monetizationOptions: BusinessMonetization[] = [
  'Subscription',
  'One-time Sales',
  'Advertising',
  'Affiliate',
  'Marketplace Fees',
  'Services',
];

export function SellerDashboardView() {
  const { businesses, currentUser, addBusiness, deleteBusiness, offers, setView, openBusiness } =
    useMarketplace();
  const [listModalOpen, setListModalOpen] = useState(false);

  const myBusinesses = businesses.filter((b) => b.sellerId === currentUser.id);
  const myOffers = offers.filter((o) => o.sellerId === currentUser.id);

  const totalRevenue = myBusinesses.reduce((s, b) => s + b.metrics.revenue, 0);
  const totalMRR = myBusinesses.reduce((s, b) => s + b.metrics.mrr, 0);
  const activeListings = myBusinesses.filter((b) => b.status === 'active').length;
  const pendingOffers = myOffers.filter((o) => o.status === 'pending').length;

  const stats = [
    {
      label: 'Active Listings',
      value: activeListings.toString(),
      icon: Package,
      accent: 'text-emerald-400',
    },
    {
      label: 'Combined MRR',
      value: formatCurrency(totalMRR, { compact: true }),
      icon: TrendingUp,
      accent: 'text-emerald-400',
    },
    {
      label: 'Total Monthly Revenue',
      value: formatCurrency(totalRevenue, { compact: true }),
      icon: DollarSign,
      accent: 'text-white',
    },
    {
      label: 'Pending Offers',
      value: pendingOffers.toString(),
      icon: Clock,
      accent: 'text-amber-400',
    },
  ];

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-900/40 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Badge className="bg-emerald-900/30 border-emerald-700/40 text-emerald-300 mb-3">
                <Store className="w-3 h-3 mr-1" /> Seller Dashboard
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Welcome back, {currentUser.name.split(' ')[0]}
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Manage your business listings and review incoming offers.
              </p>
            </div>
            <Button
              onClick={() => setListModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white h-11"
            >
              <Plus className="w-4 h-4 mr-2" />
              List New Business
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="bg-zinc-900 border-zinc-800 p-5">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`w-5 h-5 ${s.accent}`} />
              </div>
              <div className={`text-2xl font-black ${s.accent}`}>{s.value}</div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </Card>
          ))}
        </div>

        {/* My listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">My Listings</h2>
            <span className="text-xs text-zinc-500">{myBusinesses.length} total</span>
          </div>
          {myBusinesses.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800 p-10 text-center">
              <Package className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">No listings yet</h3>
              <p className="text-sm text-zinc-500 mb-4">
                List your first business to start receiving offers from qualified buyers.
              </p>
              <Button
                onClick={() => setListModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                List Your First Business
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {myBusinesses.map((b) => (
                <Card key={b.id} className="bg-zinc-900 border-zinc-800 p-4 hover:border-zinc-700 transition">
                  <div className="flex gap-4">
                    <img
                      src={b.images[0]}
                      alt={b.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">{b.title}</h3>
                          <p className="text-xs text-zinc-500 mt-0.5">{b.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 capitalize text-[10px]">
                              {b.status}
                            </Badge>
                            {b.isVerified && (
                              <Badge className="bg-emerald-900/40 text-emerald-400 border-emerald-800 text-[10px]">
                                <BadgeCheck className="w-3 h-3 mr-0.5" /> Verified
                              </Badge>
                            )}
                            <span className="text-xs text-emerald-400 font-bold">
                              {formatCurrency(b.askingPrice)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openBusiness(b.id)}
                            className="text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 h-8 w-8 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              deleteBusiness(b.id);
                              toast.success('Listing deleted');
                            }}
                            className="text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-500">
                        {b.metrics.mrr > 0 && (
                          <span>MRR: <span className="text-emerald-400 font-bold">{formatCurrency(b.metrics.mrr)}</span></span>
                        )}
                        <span>Profit: <span className="text-white">{formatCurrency(b.metrics.profit)}/mo</span></span>
                        <span>Traffic: <span className="text-white">{formatNumber(b.metrics.traffic)}/mo</span></span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Offers received */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Offers Received</h2>
          {myOffers.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800 p-8 text-center">
              <p className="text-sm text-zinc-500">No offers yet. They will appear here when buyers submit them.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {myOffers.map((o) => (
                <Card key={o.id} className="bg-zinc-900 border-zinc-800 p-4">
                  <div className="flex gap-3">
                    <img
                      src={o.businessImage}
                      alt={o.businessTitle}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">{o.businessTitle}</h3>
                          <p className="text-xs text-zinc-500">
                            Offer from <span className="text-zinc-300">{o.buyerName}</span>
                          </p>
                        </div>
                        <Badge
                          className={`text-[10px] capitalize ${
                            o.status === 'pending'
                              ? 'bg-amber-900/40 text-amber-400 border-amber-800'
                              : o.status === 'accepted'
                                ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800'
                                : o.status === 'rejected'
                                  ? 'bg-rose-900/40 text-rose-400 border-rose-800'
                                  : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                          }`}
                        >
                          {o.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-zinc-500">
                          Offer: <span className="text-emerald-400 font-bold">{formatCurrency(o.offerPrice)}</span>
                        </span>
                        <span className="text-zinc-500">
                          Asking: <span className="text-zinc-300 line-through">{formatCurrency(o.originalPrice)}</span>
                        </span>
                      </div>
                      {o.message && (
                        <p className="text-xs text-zinc-400 mt-2 italic line-clamp-2">&ldquo;{o.message}&rdquo;</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <ListBusinessModal open={listModalOpen} onOpenChange={setListModalOpen} onAdd={addBusiness} />
    </div>
  );
}

interface ListBusinessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: ReturnType<typeof useMarketplace>['addBusiness'];
}

function ListBusinessModal({ open, onOpenChange, onAdd }: ListBusinessModalProps) {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('E-Commerce');
  const [mrr, setMrr] = useState('');
  const [revenue, setRevenue] = useState('');
  const [profit, setProfit] = useState('');
  const [traffic, setTraffic] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200');

  const reset = () => {
    setTitle(''); setTagline(''); setDescription(''); setAskingPrice('');
    setCategory('E-Commerce'); setMrr(''); setRevenue(''); setProfit(''); setTraffic('');
    setImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !askingPrice) {
      toast.error('Please fill all required fields');
      return;
    }
    onAdd({
      title,
      tagline: tagline || title,
      description,
      askingPrice: parseFloat(askingPrice),
      images: [image],
      category,
      monetization: ['One-time Sales'],
      stock: 1,
      isFeatured: false,
      isVerified: false,
      location: 'Remote',
      techStack: [],
      highlights: [
        `Asking price: ${formatCurrency(parseFloat(askingPrice))}`,
        mrr && `Monthly recurring revenue: ${formatCurrency(parseFloat(mrr) || 0)}`,
        `Monthly traffic: ${formatNumber(parseInt(traffic) || 0)} visitors`,
      ].filter(Boolean) as string[],
      metrics: {
        mrr: parseFloat(mrr) || 0,
        revenue: parseFloat(revenue) || 0,
        profit: parseFloat(profit) || 0,
        profitMargin: parseFloat(revenue) > 0 ? Math.round(((parseFloat(profit) || 0) / parseFloat(revenue)) * 100) : 0,
        traffic: parseInt(traffic) || 0,
        ageMonths: 1,
      },
    });
    toast.success('Business listed! It will be reviewed before going live.');
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-800 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">List a New Business</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Provide accurate financials — they will be verified before the listing goes live.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-zinc-300">Business Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Profitable Shopify Pet Supplies Store"
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300">Tagline</Label>
            <Input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="One-sentence summary"
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300">Description *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Describe the business, operations, what's included, growth opportunities..."
              className="bg-zinc-900 border-zinc-800 text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Asking Price (USD) *</Label>
              <Input
                type="number"
                value={askingPrice}
                onChange={(e) => setAskingPrice(e.target.value)}
                required
                min={1}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as BusinessCategory)}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {categories.map((c) => (
                    <SelectItem key={c} value={c} className="text-white focus:bg-zinc-800">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-zinc-300">MRR ($/mo)</Label>
              <Input
                type="number"
                value={mrr}
                onChange={(e) => setMrr(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Revenue ($/mo)</Label>
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Profit ($/mo)</Label>
              <Input
                type="number"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Traffic /mo</Label>
              <Input
                type="number"
                value={traffic}
                onChange={(e) => setTraffic(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300">Image URL</Label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white">
              Submit Listing
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
