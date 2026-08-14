'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  CreditCard,
  Building2,
  Wallet,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useMarketplace } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import { toast } from 'sonner';
import type { Order } from '@/lib/types';

export function CheckoutView() {
  const { cart, createOrder, setView, currentUser, adminSettings } = useMarketplace();
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('escrow');
  const [fullName, setFullName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [completed, setCompleted] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.business.askingPrice * i.quantity, 0);
  const platformFee = Math.round(subtotal * (adminSettings.commissionRate / 100));
  const tax = Math.round(subtotal * (adminSettings.taxRate / 100));
  const total = subtotal + platformFee + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    const order = createOrder(paymentMethod);
    setCompleted(order);
    toast.success('Escrow initiated! Seller has been notified.');
  };

  if (completed) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4 py-12">
        <Card className="bg-zinc-900 border-emerald-800/40 p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600/20 border border-emerald-700 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Escrow Initiated!</h2>
          <p className="text-sm text-zinc-400 mb-1">
            Order <span className="text-emerald-400 font-mono">{completed.id}</span>
          </p>
          <p className="text-sm text-zinc-400 mb-6">
            Your funds are now held securely in escrow. The seller has been notified and
            will begin the due diligence and transfer process within 24 hours.
          </p>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-6 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-500">Total in escrow</span>
              <span className="text-emerald-400 font-bold">{formatCurrency(completed.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-500">Payment method</span>
              <span className="text-white capitalize">{completed.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Status</span>
              <Badge className="bg-emerald-900/40 text-emerald-400 border-emerald-800 capitalize">
                {completed.orderStatus}
              </Badge>
            </div>
          </div>
          <Button
            onClick={() => {
              setCompleted(null);
              setView('user-dashboard');
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-11"
          >
            View My Orders
          </Button>
        </Card>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
          <ShieldCheck className="w-7 h-7 text-zinc-600" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-sm text-zinc-400 mb-6">Add a business to your cart to begin checkout.</p>
        <Button
          onClick={() => setView('marketplace')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          Browse Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="border-b border-zinc-800 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => setView('marketplace')}
            className="text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Continue Shopping
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Secure Checkout
        </h1>
        <p className="text-sm text-zinc-400 mb-8 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          All transactions are escrow-protected and encrypted.
        </p>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left: form */}
          <div className="space-y-6">
            {/* Buyer info */}
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h3 className="text-base font-bold text-white mb-4">Buyer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-zinc-300">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-zinc-950 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-zinc-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-950 border-zinc-800 text-white"
                  />
                </div>
              </div>
            </Card>

            {/* Payment method */}
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h3 className="text-base font-bold text-white mb-4">Payment Method</h3>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as Order['paymentMethod'])}
                className="space-y-3"
              >
                <Label
                  htmlFor="escrow"
                  className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800 hover:border-emerald-700/60 cursor-pointer has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-900/10"
                >
                  <RadioGroupItem value="escrow" id="escrow" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-bold text-white">Escrow (Recommended)</span>
                      <Badge className="bg-emerald-900/40 text-emerald-400 border-emerald-800 text-[10px]">
                        Safest
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      Funds held by a neutral third party. Released to seller only after
                      you confirm the business transfer is complete.
                    </p>
                  </div>
                </Label>

                <Label
                  htmlFor="wire"
                  className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800 hover:border-emerald-700/60 cursor-pointer has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-900/10"
                >
                  <RadioGroupItem value="wire" id="wire" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-bold text-white">Wire Transfer</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      Direct bank-to-bank transfer. Faster but offers less buyer protection
                      than escrow. Best for trusted sellers.
                    </p>
                  </div>
                </Label>

                <Label
                  htmlFor="card"
                  className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800 hover:border-emerald-700/60 cursor-pointer has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-900/10"
                >
                  <RadioGroupItem value="card" id="card" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-bold text-white">Credit Card</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      For deals under $50K only. Processing fee of 2.9% + $0.30 applies.
                    </p>
                  </div>
                </Label>
              </RadioGroup>
            </Card>

            {/* Cart items */}
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h3 className="text-base font-bold text-white mb-4">
                Items in this transaction ({cart.length})
              </h3>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.business.id}
                    className="flex gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800"
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
                      <p className="text-xs text-zinc-500 mt-0.5">{item.business.category}</p>
                      <div className="text-sm font-bold text-emerald-400 mt-1">
                        {formatCurrency(item.business.askingPrice)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: order summary */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Platform fee ({adminSettings.commissionRate}%)</span>
                  <span className="text-white">{formatCurrency(platformFee)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Processing tax ({adminSettings.taxRate}%)</span>
                  <span className="text-white">{formatCurrency(tax)}</span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between text-base">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-emerald-400 font-black">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-12"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Initiate Escrow · {formatCurrency(total)}
              </Button>

              <div className="flex items-start gap-2 text-[11px] text-zinc-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <p>
                  By proceeding, you agree to MakeThisDeal.biz&apos;s escrow terms. Funds
                  are released only after you confirm successful business transfer.
                </p>
              </div>
            </Card>
          </aside>
        </form>
      </div>
    </div>
  );
}
