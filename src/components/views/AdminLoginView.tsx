'use client';

import { useState } from 'react';
import { Lock, Mail, ArrowLeft, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMarketplace } from '@/lib/store';
import { SITE } from '@/lib/seo';
import { toast } from 'sonner';

export function AdminLoginView() {
  const { adminLogin, setView } = useMarketplace();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Small delay for UX
    setTimeout(() => {
      const success = adminLogin(email, password);
      if (success) {
        toast.success('Welcome back, Administrator');
      } else {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <button
          onClick={() => setView('home')}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-emerald-400 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to storefront
        </button>

        <Card className="bg-zinc-900 border-zinc-800 p-8">
          {/* Logo + header */}
          <div className="text-center mb-6">
            <img
              src={SITE.logo}
              alt={`${SITE.name} logo`}
              className="h-12 w-auto object-contain mx-auto mb-4"
            />
            <Badge className="bg-emerald-900/40 border-emerald-800 text-emerald-400 mb-3">
              <Lock className="w-3 h-3 mr-1" />
              Admin Access
            </Badge>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Administrator Login
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Secure access to the {SITE.name} admin console. Authorized personnel only.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="text-sm text-rose-300">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email" className="text-zinc-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="bg-zinc-950 border-zinc-800 text-white pl-10 h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="admin-password" className="text-zinc-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="bg-zinc-950 border-zinc-800 text-white pl-10 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-11 mt-2"
            >
              {loading ? 'Verifying…' : 'Sign In to Admin Console'}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              All admin access is logged. Unauthorized access attempts are monitored and
              may be reported to the platform owner. By signing in you agree to the
              admin terms of use.
            </p>
          </div>
        </Card>

        <p className="text-center text-[11px] text-zinc-600 mt-4">
          &copy; {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </div>
  );
}
