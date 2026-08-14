'use client';

import { ShieldCheck, TrendingUp, Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { SITE } from '@/lib/seo';
import type { ViewName } from '@/lib/types';

export function Footer() {
  const { setView, businesses } = useMarketplace();

  const go = (view: ViewName) => setView(view);

  return (
    <footer className="mt-auto bg-[#0B1B3A] border-t border-[#1d3a6e] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src={SITE.logo}
                alt={`${SITE.name} logo`}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              {SITE.description}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-[#102956] hover:bg-blue-900/40 border border-[#1d3a6e] hover:border-blue-800 flex items-center justify-center text-zinc-400 hover:text-blue-400 transition"
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
                <button onClick={() => go('marketplace')} className="hover:text-blue-400 transition">
                  All Listings ({businesses.length})
                </button>
              </li>
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-blue-400 transition">
                  Featured Deals
                </button>
              </li>
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-blue-400 transition">
                  SaaS For Sale
                </button>
              </li>
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-blue-400 transition">
                  E-Commerce Stores
                </button>
              </li>
              <li>
                <button onClick={() => go('marketplace')} className="hover:text-blue-400 transition">
                  Agencies
                </button>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Blog & Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => go('blog-index')} className="hover:text-blue-400 transition">
                  All Articles
                </button>
              </li>
              <li>
                <button onClick={() => go('blog-features')} className="hover:text-blue-400 transition">
                  Platform Features
                </button>
              </li>
              <li>
                <button onClick={() => go('blog-index')} className="hover:text-blue-400 transition">
                  Acquisition Guides
                </button>
              </li>
              <li>
                <button onClick={() => go('blog-index')} className="hover:text-blue-400 transition">
                  Due Diligence Tips
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
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                Verified Listings
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                Financial Due Diligence
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                Escrow Protection
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                24/7 Support
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1d3a6e] flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-zinc-500">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-zinc-500">
            <button className="hover:text-blue-400 transition">Privacy</button>
            <button className="hover:text-blue-400 transition">Terms</button>
            <button className="hover:text-blue-400 transition">Escrow Policy</button>
            <button className="hover:text-blue-400 transition">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
