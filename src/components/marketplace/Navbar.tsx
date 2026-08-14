'use client';

import { useState } from 'react';
import {
  ShoppingCart,
  Heart,
  Search,
  ShieldCheck,
  User as UserIcon,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useMarketplace } from '@/lib/store';
import { SITE } from '@/lib/seo';
import type { ViewName } from '@/lib/types';
import { cn } from '@/lib/utils';

const navItems: { label: string; view: ViewName }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Marketplace', view: 'marketplace' },
  { label: 'Blog', view: 'blog-index' },
  { label: 'My Dashboard', view: 'user-dashboard' },
];

export function Navbar() {
  const {
    currentUser,
    switchRole,
    cart,
    wishlist,
    setView,
    setCartOpen,
    currentView,
  } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setView('marketplace');
    }
  };

  const go = (view: ViewName) => {
    setView(view);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1B3A]/95 backdrop-blur-md border-b border-[#1d3a6e]">
      {/* Utility banner */}
      <div className="bg-blue-700 text-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 text-xs flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300 shrink-0" />
            <span className="truncate">
              Curated acquisition storefront · Verified listings · Escrow-protected transactions
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <span className="text-emerald-200">
              Mode:{' '}
              <strong className="uppercase text-white tracking-wide">
                {currentUser.role}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <img
              src={SITE.logo}
              alt={`${SITE.name} logo`}
              className="h-9 lg:h-11 w-auto object-contain"
            />
          </button>

          {/* Search (desktop) */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search profitable businesses, SaaS, e-commerce, agencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#102956] border-[#1d3a6e] text-zinc-200 placeholder:text-zinc-500 pl-11 pr-24 h-11 focus-visible:border-blue-600 focus-visible:ring-blue-600/20"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-500 text-white"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.view}
                variant="ghost"
                size="sm"
                onClick={() => go(item.view)}
                className={cn(
                  'text-sm font-medium hover:text-blue-400 hover:bg-[#102956]',
                  currentView === item.view || (currentView === 'blog-post' && item.view === 'blog-index') || (currentView === 'blog-features' && item.view === 'blog-index')
                    ? 'text-blue-400 bg-[#102956]'
                    : 'text-zinc-300',
                )}
              >
                {item.label}
              </Button>
            ))}

            {currentUser.role === 'admin' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => go('admin-dashboard')}
                className={cn(
                  'text-sm font-medium hover:text-blue-400 hover:bg-[#102956]',
                  currentView === 'admin-dashboard'
                    ? 'text-blue-400 bg-[#102956]'
                    : 'text-zinc-300',
                )}
              >
                <LayoutDashboard className="w-4 h-4 mr-1.5" /> Admin
              </Button>
            )}

            <div className="flex items-center gap-1 pl-3 ml-1 border-l border-[#1d3a6e]">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => go('user-dashboard')}
                className="relative text-zinc-300 hover:text-rose-400 hover:bg-[#102956]"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(true)}
                className="relative text-zinc-300 hover:text-blue-400 hover:bg-[#102956]"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-1 flex items-center gap-2 rounded-full hover:opacity-90 transition">
                    <Avatar className="w-9 h-9 border-2 border-blue-500/50">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback className="bg-[#1d3a6e] text-blue-400 text-xs">
                        {currentUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500 hidden xl:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 bg-[#102956] border-[#1d3a6e]">
                  <DropdownMenuLabel className="text-zinc-400">
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">{currentUser.name}</span>
                      <span className="text-xs text-zinc-500 font-normal">{currentUser.email}</span>
                      <Badge className="mt-1.5 w-fit text-[10px] uppercase tracking-wider bg-blue-900/40 text-blue-400 border-blue-800">
                        {currentUser.role}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#1d3a6e]" />
                  <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                    Switch Role
                  </div>
                  <DropdownMenuItem
                    onClick={() => switchRole('user')}
                    className="text-zinc-300 hover:bg-[#1d3a6e] hover:text-blue-400 cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 mr-2 text-blue-500" />
                    Buyer / User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => go('admin-dashboard')}
                    className="text-zinc-300 hover:bg-[#1d3a6e] hover:text-blue-400 cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-blue-500" />
                    Admin Login
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(true)}
              className="relative text-zinc-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-zinc-300"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B1B3A] border-t border-[#1d3a6e] px-4 pt-4 pb-6 space-y-4 shadow-2xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#102956] border-[#1d3a6e] text-zinc-200 placeholder:text-zinc-500 pl-10 h-10"
            />
          </form>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => go(item.view)}
                className={cn(
                  'block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium',
                  currentView === item.view || (currentView === 'blog-post' && item.view === 'blog-index') || (currentView === 'blog-features' && item.view === 'blog-index')
                    ? 'bg-[#102956] text-blue-400'
                    : 'text-zinc-300 hover:bg-[#102956]',
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => go('admin-dashboard')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-[#102956]"
            >
              Admin Panel
            </button>
          </div>

          <div className="pt-4 border-t border-[#1d3a6e]">
            <p className="text-xs text-zinc-500 mb-2">Switch role:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={currentUser.role === 'user' ? 'default' : 'outline'}
                onClick={() => {
                  switchRole('user');
                  setMobileOpen(false);
                }}
                className={
                  currentUser.role === 'user'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-transparent border-[#2b4a85] text-zinc-300'
                }
              >
                Buyer
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  go('admin-dashboard');
                  setMobileOpen(false);
                }}
                className="bg-transparent border-[#2b4a85] text-zinc-300 hover:bg-[#102956]"
              >
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
