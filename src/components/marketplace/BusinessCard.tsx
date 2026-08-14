'use client';

import { Heart, TrendingUp, Users, Eye, BadgeCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useMarketplace } from '@/lib/store';
import { formatCurrency, formatNumber } from '@/lib/format';
import type { BusinessListing } from '@/lib/types';

interface BusinessCardProps {
  business: BusinessListing;
  onMakeOffer?: (business: BusinessListing) => void;
  variant?: 'default' | 'compact';
}

export function BusinessCard({ business, onMakeOffer, variant = 'default' }: BusinessCardProps) {
  const { openBusiness, toggleWishlist, wishlist, addToCart } = useMarketplace();
  const isWishlisted = wishlist.includes(business.id);

  const mrr = business.metrics.mrr;
  const profit = business.metrics.profit;
  const traffic = business.metrics.traffic;
  const ageMonths = business.metrics.ageMonths;

  return (
    <Card
      className="group bg-white border-gray-200 hover:border-blue-700/60 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:shadow-xl hover:shadow-blue-900/20"
      onClick={() => openBusiness(business.id)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={business.images[0]}
          alt={business.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge className="bg-white/90 text-blue-400 border-blue-800/50 backdrop-blur-md text-[10px] uppercase tracking-wider">
            {business.category}
          </Badge>
          {business.isVerified && (
            <Badge className="bg-blue-600/90 text-gray-900 border-blue-500 backdrop-blur-md text-[10px]">
              <BadgeCheck className="w-3 h-3 mr-0.5" /> Verified
            </Badge>
          )}
          {business.isFeatured && (
            <Badge className="bg-amber-500/90 text-zinc-950 border-amber-400 backdrop-blur-md text-[10px] font-bold">
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(business.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
            isWishlisted
              ? 'bg-rose-500 text-gray-900'
              : 'bg-white/70 text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* MRR badge */}
        {mrr > 0 && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-blue-600 text-gray-900 border-blue-500 text-[10px] font-bold">
              MRR: {formatCurrency(mrr, { compact: true })}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-400 transition line-clamp-1">
            {business.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {business.tagline}
          </p>
        </div>

        {/* Metrics row */}
        {variant === 'default' && (
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-gray-200 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" /> Profit
              </div>
              <div className="text-xs font-bold text-blue-400 mt-0.5">
                {formatCurrency(profit, { compact: true })}/mo
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 uppercase tracking-wider">
                <Eye className="w-3 h-3" /> Traffic
              </div>
              <div className="text-xs font-bold text-gray-900 mt-0.5">
                {formatNumber(traffic)}/mo
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 uppercase tracking-wider">
                <Users className="w-3 h-3" /> Age
              </div>
              <div className="text-xs font-bold text-gray-900 mt-0.5">
                {ageMonths}mo
              </div>
            </div>
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto pt-1">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
              Asking Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-gray-900">
                {formatCurrency(business.askingPrice)}
              </span>
              {business.previousPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {formatCurrency(business.previousPrice)}
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openBusiness(business.id);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-gray-900 h-8"
          >
            View <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
