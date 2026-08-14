'use client';

import { ShoppingCart, X, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import { toast } from 'sonner';

export function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, removeFromCart, setView } = useMarketplace();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.business.askingPrice * item.quantity,
    0,
  );
  const platformFee = Math.round(subtotal * 0.08);
  const total = subtotal + platformFee;

  const goToCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setCartOpen(false);
    setView('checkout');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-zinc-800 p-0 flex flex-col">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-zinc-800">
          <SheetTitle className="flex items-center gap-2 text-white">
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            Acquisition Cart
            <Badge className="bg-emerald-900/40 text-emerald-400 border-emerald-800">
              {cart.length}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-zinc-600" />
            </div>
            <h3 className="text-white font-semibold">Your cart is empty</h3>
            <p className="text-sm text-zinc-500 max-w-xs">
              Browse verified businesses for sale and add them to your cart to begin
              an escrow-protected acquisition.
            </p>
            <Button
              onClick={() => {
                setCartOpen(false);
                setView('marketplace');
              }}
              className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Browse Marketplace
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.business.id}
                  className="flex gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800"
                >
                  <img
                    src={item.business.images[0]}
                    alt={item.business.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white line-clamp-1">
                      {item.business.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {item.business.category}
                    </p>
                    <div className="flex items-end justify-between mt-2">
                      <span className="text-base font-bold text-emerald-400">
                        {formatCurrency(item.business.askingPrice)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.business.id)}
                        className="text-zinc-500 hover:text-rose-400 transition p-1"
                        aria-label="remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-zinc-800 px-5 pt-4 pb-5 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Platform fee (8%)</span>
                  <span className="text-white">{formatCurrency(platformFee)}</span>
                </div>
                <Separator className="bg-zinc-800" />
                <div className="flex justify-between text-base">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-emerald-400 font-bold">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Funds held in escrow until due diligence completes
              </div>
              <Button
                onClick={goToCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-11"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
