'use client';

import { useState } from 'react';
import { Tag, Send, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import type { BusinessListing } from '@/lib/types';
import { toast } from 'sonner';

interface OfferModalProps {
  business: BusinessListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OfferModal({ business, isOpen, onClose }: OfferModalProps) {
  // Mount the inner form with a key tied to the business id so it resets
  // naturally when a new business is selected — no useEffect needed.
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-zinc-950 border-zinc-800 max-w-lg">
        {business && (
          <OfferForm key={business.id} business={business} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface OfferFormProps {
  business: BusinessListing;
  onClose: () => void;
}

function OfferForm({ business, onClose }: OfferFormProps) {
  const { createOffer } = useMarketplace();
  const [offerPrice, setOfferPrice] = useState(
    () => Math.round(business.askingPrice * 0.9).toString(),
  );
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(offerPrice);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid offer amount');
      return;
    }
    if (price > business.askingPrice * 1.2) {
      toast.error('Offer cannot exceed 120% of asking price');
      return;
    }
    createOffer(business.id, price, message.trim() || 'Interested in acquiring this business.');
    toast.success(`Offer of ${formatCurrency(price)} submitted to ${business.sellerName}`);
    onClose();
  };

  const pctOfAsking = Math.round((parseFloat(offerPrice || '0') / business.askingPrice) * 100);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-white">
          <Tag className="w-5 h-5 text-emerald-400" />
          Make an Offer
        </DialogTitle>
        <DialogDescription className="text-zinc-400">
          Submit a formal offer to acquire this business. The seller will respond
          within 48 hours.
        </DialogDescription>
      </DialogHeader>

      <div className="flex gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 mb-2">
        <img
          src={business.images[0]}
          alt={business.title}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white line-clamp-1">
            {business.title}
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">{business.category}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm text-zinc-400">Asking:</span>
            <span className="text-sm font-bold text-emerald-400">
              {formatCurrency(business.askingPrice)}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="offer-price" className="text-zinc-300">
            Your Offer (USD)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <Input
              id="offer-price"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              min={1}
              step={100}
              className="pl-8 bg-zinc-900 border-zinc-800 text-white"
              placeholder="0"
            />
          </div>
          {offerPrice && !isNaN(parseFloat(offerPrice)) && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">
                {pctOfAsking}% of asking price
              </span>
              {pctOfAsking < 70 && (
                <Badge className="bg-amber-900/40 text-amber-400 border-amber-800 text-[10px]">
                  <AlertCircle className="w-3 h-3 mr-1" /> Low offer
                </Badge>
              )}
              {pctOfAsking >= 95 && pctOfAsking <= 100 && (
                <Badge className="bg-emerald-900/40 text-emerald-400 border-emerald-800 text-[10px]">
                  Strong offer
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="offer-message" className="text-zinc-300">
            Message to Seller (optional)
          </Label>
          <Textarea
            id="offer-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="bg-zinc-900 border-zinc-800 text-white resize-none"
            placeholder="Introduce yourself, your acquisition timeline, and why you're interested..."
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-900"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Offer
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
