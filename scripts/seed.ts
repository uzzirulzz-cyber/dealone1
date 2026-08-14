import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import {
  initialUsers,
  initialBusinesses,
  initialOrders,
  initialOffers,
  initialAdminSettings,
} from '../src/lib/businessData';
import type { BusinessCategory, BusinessStatus, UserRole, OfferStatus, PaymentMethod, PaymentStatus, OrderStatus } from '../src/lib/types';

// Map TS enums to Prisma enums
const categoryMap: Record<BusinessCategory, string> = {
  'E-Commerce': 'ECOMMERCE',
  'SaaS / Software': 'SAAS_SOFTWARE',
  'Content & Media': 'CONTENT_MEDIA',
  'Agency / Services': 'AGENCY_SERVICES',
  'Mobile Apps': 'MOBILE_APPS',
  'Marketplace': 'MARKETPLACE',
  'Subscription': 'SUBSCRIPTION',
  'Other': 'OTHER',
};

const roleMap: Record<UserRole, string> = {
  user: 'user',
  seller: 'seller',
  admin: 'admin',
};

const statusMap: Record<string, BusinessStatus> = {
  active: 'active',
  pending: 'pending',
  sold: 'sold',
};

const offerStatusMap: Record<OfferStatus, string> = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  counter: 'counter',
};

const paymentMethodMap: Record<string, PaymentMethod> = {
  escrow: 'escrow',
  wire: 'wire',
  card: 'card',
};

const paymentStatusMap: Record<string, PaymentStatus> = {
  paid: 'paid',
  pending: 'pending',
  escrow: 'escrow',
  failed: 'failed',
};

const orderStatusMap: Record<string, OrderStatus> = {
  'In Escrow': 'IN_ESCROW',
  'Due Diligence': 'DUE_DILIGENCE',
  Transferred: 'TRANSFERRED',
  Cancelled: 'CANCELLED',
};

const db = new PrismaClient();

// Map our internal stable IDs (u-1, biz-1, etc.) to cuid() IDs created by Prisma
const userIdMap = new Map<string, string>();
const businessIdMap = new Map<string, string>();

async function seed() {
  console.log('🌱 Seeding Neon database...\n');

  // 0. Clean slate — delete in dependency order
  console.log('→ Cleaning existing data...');
  await db.orderItem.deleteMany({});
  await db.order.deleteMany({});
  await db.offer.deleteMany({});
  await db.review.deleteMany({});
  await db.businessListing.deleteMany({});
  await db.adminSettings.deleteMany({});
  await db.user.deleteMany({});

  // 1. Users
  console.log('\n→ Inserting users...');
  for (const u of initialUsers) {
    const created = await db.user.create({
      data: {
        name: u.name,
        email: u.email,
        role: roleMap[u.role] as UserRole,
        avatar: u.avatar,
        isVerifiedSeller: !!u.isVerifiedSeller,
        createdAt: new Date(u.createdAt),
      },
    });
    userIdMap.set(u.id, created.id);
    console.log(`  ✓ ${u.name} → ${created.id}`);
  }

  // 2. Businesses
  console.log('\n→ Inserting business listings...');
  for (const b of initialBusinesses) {
    const sellerId = userIdMap.get(b.sellerId);
    if (!sellerId) {
      console.warn(`  ⚠️  Seller ${b.sellerId} not found for ${b.title}, skipping`);
      continue;
    }

    const created = await db.businessListing.create({
      data: {
        title: b.title,
        tagline: b.tagline,
        description: b.description,
        askingPrice: b.askingPrice,
        previousPrice: b.previousPrice ?? null,
        images: b.images,
        category: categoryMap[b.category] as BusinessCategory,
        monetization: b.monetization,
        stock: b.stock,
        rating: b.rating,
        reviewsCount: b.reviewsCount,
        isFeatured: !!b.isFeatured,
        isVerified: !!b.isVerified,
        status: statusMap[b.status],
        location: b.location ?? null,
        techStack: b.techStack ?? [],
        reasonForSelling: b.reasonForSelling ?? null,
        mrr: b.metrics.mrr ?? 0,
        arr: b.metrics.arr ?? null,
        revenue: b.metrics.revenue ?? 0,
        profit: b.metrics.profit ?? 0,
        profitMargin: b.metrics.profitMargin ?? 0,
        traffic: b.metrics.traffic ?? 0,
        pageviews: b.metrics.pageviews ?? null,
        customers: b.metrics.customers ?? null,
        churnRate: b.metrics.churnRate ?? null,
        ageMonths: b.metrics.ageMonths ?? 0,
        highlights: b.highlights,
        sellerId,
        createdAt: new Date(b.createdAt),
        reviews: {
          create: b.reviews.map((r) => ({
            rating: r.rating,
            comment: r.comment,
            userId: userIdMap.get(r.userId)!,
            createdAt: new Date(r.createdAt),
          })),
        },
      },
      include: { reviews: true },
    });
    businessIdMap.set(b.id, created.id);
    console.log(`  ✓ ${b.title} (with ${b.reviews.length} reviews)`);
  }

  // 3. Admin Settings (single row, id=1)
  console.log('\n→ Inserting admin settings...');
  await db.adminSettings.create({
    data: {
      id: 1,
      siteName: initialAdminSettings.siteName,
      logo: initialAdminSettings.logo,
      currency: initialAdminSettings.currency,
      taxRate: initialAdminSettings.taxRate,
      commissionRate: initialAdminSettings.commissionRate,
      maintenanceMode: initialAdminSettings.maintenanceMode,
    },
  });
  console.log('  ✓ AdminSettings row created');

  // 4. Orders + Order Items
  console.log('\n→ Inserting orders...');
  for (const o of initialOrders) {
    const userId = userIdMap.get(o.userId);
    if (!userId) continue;
    const created = await db.order.create({
      data: {
        totalAmount: o.totalAmount,
        paymentMethod: paymentMethodMap[o.paymentMethod] as PaymentMethod,
        paymentStatus: paymentStatusMap[o.paymentStatus] as PaymentStatus,
        orderStatus: orderStatusMap[o.orderStatus] as OrderStatus,
        userId,
        createdAt: new Date(o.createdAt),
        items: {
          create: o.businesses.map((p) => ({
            price: p.price,
            title: p.title,
            image: p.image,
            businessId: businessIdMap.get(p.businessId)!,
          })),
        },
      },
    });
    console.log(`  ✓ Order ${o.id} → ${created.id}`);
  }

  // 5. Offers
  console.log('\n→ Inserting offers...');
  for (const o of initialOffers) {
    const buyerId = userIdMap.get(o.buyerId);
    const sellerId = userIdMap.get(o.sellerId);
    const businessId = businessIdMap.get(o.businessId);
    if (!buyerId || !sellerId || !businessId) continue;
    const created = await db.offer.create({
      data: {
        offerPrice: o.offerPrice,
        originalPrice: o.originalPrice,
        message: o.message,
        status: offerStatusMap[o.status] as OfferStatus,
        counterPrice: o.counterPrice ?? null,
        counterMessage: o.counterMessage ?? null,
        businessId,
        buyerId,
        sellerId,
        createdAt: new Date(o.createdAt),
      },
    });
    console.log(`  ✓ Offer ${o.id} → ${created.id}`);
  }

  // Summary
  console.log('\n🎉 Seed complete!\n');
  const counts = {
    users: await db.user.count(),
    businesses: await db.businessListing.count(),
    reviews: await db.review.count(),
    orders: await db.order.count(),
    orderItems: await db.orderItem.count(),
    offers: await db.offer.count(),
    adminSettings: await db.adminSettings.count(),
  };
  console.log('📊 Final row counts:');
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k}: ${v}`);
  }
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
