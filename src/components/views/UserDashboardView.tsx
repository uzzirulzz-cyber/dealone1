'use client';

import { useState } from 'react';
import {
  User as UserIcon,
  ShoppingBag,
  Heart,
  Tag,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMarketplace } from '@/lib/store';
import { formatCurrency, timeAgo } from '@/lib/format';
import { toast } from 'sonner';

export function UserDashboardView() {
  const { currentUser, orders, wishlist, businesses, offers, openBusiness, setView, toggleWishlist } =
    useMarketplace();

  const myOrders = orders.filter((o) => o.userId === currentUser.id);
  const myOffers = offers.filter((o) => o.buyerId === currentUser.id);
  const wishlisted = businesses.filter((b) => wishlist.includes(b.id));

  const totalSpent = myOrders.reduce((s, o) => s + o.totalAmount, 0);
  const activeOffers = myOffers.filter((o) => o.status === 'pending' || o.status === 'counter').length;

  const stats = [
    { label: 'Total Acquisitions', value: myOrders.length.toString(), icon: ShoppingBag, accent: 'text-blue-400' },
    { label: 'Total Invested', value: formatCurrency(totalSpent, { compact: true }), icon: TrendingUp, accent: 'text-gray-900' },
    { label: 'Saved Businesses', value: wishlisted.length.toString(), icon: Heart, accent: 'text-rose-400' },
    { label: 'Active Offers', value: activeOffers.toString(), icon: Clock, accent: 'text-amber-400' },
  ];

  const statusIcon = (status: string) => {
    if (status === 'Transferred' || status === 'Delivered') return <CheckCircle2 className="w-4 h-4 text-blue-400" />;
    if (status === 'Cancelled' || status === 'rejected') return <XCircle className="w-4 h-4 text-rose-400" />;
    return <Clock className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-blue-500/40">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-gray-100 text-blue-400 text-xl">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <Badge className="bg-blue-900/30 border-blue-700/40 text-blue-300 mb-2">
                <UserIcon className="w-3 h-3 mr-1" /> Buyer Dashboard
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {currentUser.name}
              </h1>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="bg-white border-gray-200 p-5">
              <s.icon className={`w-5 h-5 ${s.accent} mb-2`} />
              <div className={`text-2xl font-black ${s.accent}`}>{s.value}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders">
          <TabsList className="bg-white border border-gray-200 p-1 h-auto w-full justify-start overflow-x-auto">
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
            >
              Orders ({myOrders.length})
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
            >
              Wishlist ({wishlisted.length})
            </TabsTrigger>
            <TabsTrigger
              value="offers"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
            >
              My Offers ({myOffers.length})
            </TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders" className="mt-4 space-y-3">
            {myOrders.length === 0 ? (
              <Card className="bg-white border-gray-200 p-10 text-center">
                <ShoppingBag className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-gray-900 font-semibold mb-1">No orders yet</h3>
                <p className="text-sm text-gray-500 mb-4">Browse businesses and make your first acquisition.</p>
                <Button
                  onClick={() => setView('marketplace')}
                  className="bg-blue-600 hover:bg-blue-500 text-gray-900"
                >
                  Browse Marketplace
                </Button>
              </Card>
            ) : (
              myOrders.map((o) => (
                <Card key={o.id} className="bg-white border-gray-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">Order {o.id}</span>
                        <Badge className="bg-gray-100 text-gray-700 border-gray-300 capitalize text-[10px]">
                          {statusIcon(o.orderStatus)}
                          <span className="ml-1">{o.orderStatus}</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Placed {timeAgo(o.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-lg font-black text-blue-400">
                        {formatCurrency(o.totalAmount)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {o.businesses.map((b) => (
                      <button
                        key={b.businessId}
                        onClick={() => openBusiness(b.businessId)}
                        className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition w-full text-left"
                      >
                        <img src={b.image} alt={b.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{b.title}</h4>
                          <div className="text-xs text-blue-400 font-bold mt-0.5">
                            {formatCurrency(b.price)}
                          </div>
                        </div>
                        <Eye className="w-4 h-4 text-gray-500 self-center" />
                      </button>
                    ))}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist" className="mt-4 space-y-3">
            {wishlisted.length === 0 ? (
              <Card className="bg-white border-gray-200 p-10 text-center">
                <Heart className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-gray-900 font-semibold mb-1">No saved businesses</h3>
                <p className="text-sm text-gray-500 mb-4">Tap the heart icon on any listing to save it here.</p>
                <Button
                  onClick={() => setView('marketplace')}
                  className="bg-blue-600 hover:bg-blue-500 text-gray-900"
                >
                  Browse Marketplace
                </Button>
              </Card>
            ) : (
              wishlisted.map((b) => (
                <Card key={b.id} className="bg-white border-gray-200 p-4">
                  <div className="flex gap-3">
                    <img
                      src={b.images[0]}
                      alt={b.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => openBusiness(b.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => openBusiness(b.id)}
                          className="text-sm font-bold text-gray-900 hover:text-blue-400 truncate text-left"
                        >
                          {b.title}
                        </button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            toggleWishlist(b.id);
                            toast.success('Removed from wishlist');
                          }}
                          className="text-gray-600 hover:text-rose-400 hover:bg-gray-100 h-8 w-8 p-0"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{b.category}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-blue-400 font-bold">{formatCurrency(b.askingPrice)}</span>
                        {b.metrics.mrr > 0 && (
                          <span className="text-gray-500">MRR: {formatCurrency(b.metrics.mrr)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Offers */}
          <TabsContent value="offers" className="mt-4 space-y-3">
            {myOffers.length === 0 ? (
              <Card className="bg-white border-gray-200 p-10 text-center">
                <Tag className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-gray-900 font-semibold mb-1">No offers submitted</h3>
                <p className="text-sm text-gray-500 mb-4">Make an offer on a business to start a negotiation.</p>
                <Button
                  onClick={() => setView('marketplace')}
                  className="bg-blue-600 hover:bg-blue-500 text-gray-900"
                >
                  Browse Marketplace
                </Button>
              </Card>
            ) : (
              myOffers.map((o) => (
                <Card key={o.id} className="bg-white border-gray-200 p-4">
                  <div className="flex gap-3">
                    <img
                      src={o.businessImage}
                      alt={o.businessTitle}
                      className="w-16 h-16 rounded-lg object-cover shrink-0 cursor-pointer"
                      onClick={() => openBusiness(o.businessId)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <button
                          onClick={() => openBusiness(o.businessId)}
                          className="text-sm font-bold text-gray-900 hover:text-blue-400 truncate text-left"
                        >
                          {o.businessTitle}
                        </button>
                        <Badge
                          className={`text-[10px] capitalize ${
                            o.status === 'pending'
                              ? 'bg-amber-900/40 text-amber-400 border-amber-800'
                              : o.status === 'accepted'
                                ? 'bg-blue-900/40 text-blue-400 border-blue-800'
                                : o.status === 'rejected'
                                  ? 'bg-rose-900/40 text-rose-400 border-rose-800'
                                  : 'bg-gray-100 text-gray-700 border-gray-300'
                          }`}
                        >
                          {o.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-gray-500">
                          Your offer: <span className="text-blue-400 font-bold">{formatCurrency(o.offerPrice)}</span>
                        </span>
                        <span className="text-gray-500">
                          Asking: <span className="text-gray-700">{formatCurrency(o.originalPrice)}</span>
                        </span>
                        <span className="text-gray-500">{timeAgo(o.createdAt)}</span>
                      </div>
                      {o.counterPrice && (
                        <div className="mt-2 p-2 rounded-lg bg-gray-50 border border-gray-200 text-xs">
                          <p className="text-gray-600">
                            <span className="text-blue-400 font-bold">Seller countered:</span>{' '}
                            {formatCurrency(o.counterPrice)}
                          </p>
                          {o.counterMessage && (
                            <p className="text-gray-500 italic mt-1">&ldquo;{o.counterMessage}&rdquo;</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
