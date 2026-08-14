'use client';

import {
  LayoutDashboard,
  Users,
  DollarSign,
  TrendingUp,
  BadgeCheck,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Settings,
  LogOut,
  Store,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMarketplace } from '@/lib/store';
import { SITE } from '@/lib/seo';
import { formatCurrency, timeAgo } from '@/lib/format';
import { toast } from 'sonner';

export function AdminDashboardView() {
  const {
    currentUser,
    businesses,
    users,
    orders,
    offers,
    adminSettings,
    updateAdminSettings,
    deleteBusiness,
    updateBusiness,
    adminLogout,
  } = useMarketplace();

  const totalGMV = orders.reduce((s, o) => s + o.totalAmount, 0);
  const platformRevenue = Math.round(totalGMV * (adminSettings.commissionRate / 100));
  const pendingListings = businesses.filter((b) => b.status === 'pending');

  const stats = [
    { label: 'Total GMV', value: formatCurrency(totalGMV, { compact: true }), icon: DollarSign, accent: 'text-blue-400' },
    { label: 'Platform Revenue', value: formatCurrency(platformRevenue, { compact: true }), icon: TrendingUp, accent: 'text-gray-900' },
    { label: 'Total Listings', value: businesses.length.toString(), icon: Store, accent: 'text-gray-900' },
    { label: 'Registered Users', value: users.length.toString(), icon: Users, accent: 'text-gray-900' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Badge className="bg-blue-900/30 border-blue-700/40 text-blue-300 mb-3">
                <LayoutDashboard className="w-3 h-3 mr-1" /> Admin Console
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {SITE.name} · Platform Overview
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Signed in as <span className="text-blue-400 font-semibold">{currentUser.email}</span> · Manage listings, users, and platform configuration.
              </p>
            </div>
            <Button
              onClick={() => {
                adminLogout();
                toast.success('Signed out of admin console');
              }}
              variant="outline"
              className="bg-transparent border-gray-300 text-gray-800 hover:bg-white hover:text-rose-400 h-11"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
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

        <Tabs defaultValue="listings">
          <TabsList className="bg-white border border-gray-200 p-1 h-auto w-full justify-start overflow-x-auto">
            <TabsTrigger
              value="listings"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
            >
              Listings ({businesses.length})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
            >
              Pending ({pendingListings.length})
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
            >
              Users ({users.length})
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-gray-900 text-gray-600"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* All Listings */}
          <TabsContent value="listings" className="mt-4 space-y-3">
            {businesses.map((b) => (
              <Card key={b.id} className="bg-white border-gray-200 p-4">
                <div className="flex gap-3">
                  <img src={b.images[0]} alt={b.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate">{b.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {b.category} · by {b.sellerName}
                        </p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge className="bg-gray-100 text-gray-700 border-gray-300 capitalize text-[10px]">
                            {b.status}
                          </Badge>
                          {b.isVerified && (
                            <Badge className="bg-blue-900/40 text-blue-400 border-blue-800 text-[10px]">
                              <BadgeCheck className="w-3 h-3 mr-0.5" /> Verified
                            </Badge>
                          )}
                          <span className="text-xs text-blue-400 font-bold">
                            {formatCurrency(b.askingPrice)}
                          </span>
                          <span className="text-xs text-gray-500">{timeAgo(b.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {!b.isVerified && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              updateBusiness(b.id, { isVerified: true, status: 'active' });
                              toast.success('Listing verified');
                            }}
                            className="bg-transparent border-blue-700 text-blue-400 hover:bg-blue-900/30 h-8"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Verify
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            deleteBusiness(b.id);
                            toast.success('Listing removed');
                          }}
                          className="text-gray-600 hover:text-rose-400 hover:bg-gray-100 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Pending */}
          <TabsContent value="pending" className="mt-4 space-y-3">
            {pendingListings.length === 0 ? (
              <Card className="bg-white border-gray-200 p-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h3 className="text-gray-900 font-semibold">All caught up</h3>
                <p className="text-sm text-gray-500 mt-1">No listings pending review.</p>
              </Card>
            ) : (
              pendingListings.map((b) => (
                <Card key={b.id} className="bg-white border-amber-800/40 p-4">
                  <div className="flex gap-3">
                    <img src={b.images[0]} alt={b.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 truncate">{b.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">by {b.sellerName}</p>
                          <div className="text-xs text-blue-400 font-bold mt-2">
                            {formatCurrency(b.askingPrice)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              updateBusiness(b.id, { isVerified: true, status: 'active' });
                              toast.success('Listing approved and verified');
                            }}
                            className="bg-blue-600 hover:bg-blue-500 text-gray-900 h-8"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              deleteBusiness(b.id);
                              toast.success('Listing rejected');
                            }}
                            className="bg-transparent border-rose-700 text-rose-400 hover:bg-rose-900/30 h-8"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="mt-4 space-y-3">
            {users.map((u) => (
              <Card key={u.id} className="bg-white border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border border-gray-300">
                    <AvatarImage src={u.avatar} alt={u.name} />
                    <AvatarFallback className="bg-gray-100 text-blue-400">
                      {u.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-gray-900">{u.name}</h3>
                      <Badge className="bg-blue-900/40 text-blue-400 border-blue-800 text-[10px] uppercase">
                        {u.role}
                      </Badge>
                      {u.isVerifiedSeller && (
                        <Badge className="bg-blue-600 text-gray-900 border-blue-500 text-[10px]">
                          <BadgeCheck className="w-3 h-3 mr-0.5" /> Verified Seller
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{u.email}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Joined {timeAgo(u.createdAt)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="mt-4">
            <Card className="bg-white border-gray-200 p-6 max-w-2xl">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                Platform Settings
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-700">Site Name</Label>
                  <Input
                    value={adminSettings.siteName}
                    onChange={(e) => updateAdminSettings({ siteName: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-gray-700">Commission Rate (%)</Label>
                    <Input
                      type="number"
                      value={adminSettings.commissionRate}
                      onChange={(e) => updateAdminSettings({ commissionRate: parseFloat(e.target.value) })}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-700">Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={adminSettings.taxRate}
                      onChange={(e) => updateAdminSettings({ taxRate: parseFloat(e.target.value) })}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div>
                    <Label className="text-sm text-gray-700">Maintenance Mode</Label>
                    <p className="text-xs text-gray-500 mt-0.5">Take the platform offline for users</p>
                  </div>
                  <Switch
                    checked={adminSettings.maintenanceMode}
                    onCheckedChange={(checked) => {
                      updateAdminSettings({ maintenanceMode: checked });
                      toast.success(checked ? 'Maintenance mode on' : 'Maintenance mode off');
                    }}
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={() => toast.success('Settings saved')}
                    className="bg-blue-600 hover:bg-blue-500 text-gray-900"
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
