'use client';

import { Briefcase, ShieldCheck, TrendingUp, Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import type { ViewName } from '@/lib/types';

export function Footer() {
  const { setView, businesses } = useMarketplace();

  const go = (view: ViewName) => setView(view);

  return (
    <footer className="mt-auto bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-lg font-black tracking-tight text-white">
                  Biz<span className="text-emerald-400">Exchange</span>
                </span>
                <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                  Verified Businesses For Sale
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              The trusted marketplace where founders buy and sell profitable online
              businesses, SaaS platforms, e-commerce stores, agencies, and content
              assets. Every listing is verified and every transaction is escrow-protected.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-emerald-900/40 border border-zinc-800 hover:border-emerald-800 flex items-center justify-center text-zinc-400 hover:text-emerald-400 transition"
                  aria-label="social link"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-emerald-400 transition">
                  All Listings ({businesses.length})
                </button>
              </li>
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-emerald-400 transition">
                  Featured Deals
                </button>
              </li>
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-emerald-400 transition">
                  SaaS For Sale
                </button>
              </li>
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-emerald-400 transition">
                  E-Commerce Stores
                </button>
              </li>
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-emerald-400 transition">
                  Agencies
                </button>
              </li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Sell Your Business
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => go('seller-dashboard')} className="hover:text-emerald-400 transition">
                  List Your Business
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition">
                  How It Works
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition">
                  Pricing & Fees
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition">
                  Seller Resources
                </button>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Trust & Safety
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Verified Listings
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Financial Due Diligence
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Escrow Protection
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                24/7 Support
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-zinc-500">
            &copy; {new Date().getFullYear()} BizExchange. All rights reserved. For
            demonstration purposes.
          </p>
          <div className="flex items-center gap-5 text-zinc-500">
            <button className="hover:text-emerald-400 transition">Privacy</button>
            <button className="hover:text-emerald-400 transition">Terms</button>
            <button className="hover:text-emerald-400 transition">Escrow Policy</button>
            <button className="hover:text-emerald-400 transition">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
