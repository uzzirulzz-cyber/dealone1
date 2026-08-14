# MakeThisDeal.biz — Acquire Profitable Online Businesses

A modern Next.js 16 marketplace where founders buy and sell verified online businesses — SaaS platforms, e-commerce stores, agencies, content assets, and subscription businesses. Every listing is financially verified and every transaction is escrow-protected.

![MakeThisDeal.biz](/site-screenshots/playbeat.digital.png)

## ✨ Features

- **Business-only marketplace** — 14 verified listings across 7 categories
- **Verified financials** — MRR, ARR, profit margins, traffic, customers, churn disclosed upfront
- **Escrow-protected checkout** — funds held securely until business transfer completes
- **Offer negotiation** — buyers submit formal offers, sellers can accept/reject/counter
- **Role-based dashboards** — Buyer, Seller, and Admin experiences
- **Real live-site screenshots** — every fetched listing includes a captured screenshot of the production site
- **Persistent state** — cart, wishlist, orders, and offers survive page reloads

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| State | Zustand (with localStorage persistence) |
| Database | PostgreSQL on **Neon** |
| ORM | Prisma 6 |
| Auth | NextAuth.js v4 (available, not yet wired) |
| Icons | lucide-react |
| Toasts | sonner |

## 📦 Categories

- E-Commerce
- SaaS / Software
- Content & Media
- Agency / Services
- Mobile Apps
- Marketplace
- Subscription

## 🗄 Database Setup

This project uses **Neon PostgreSQL**. Configure your connection in `.env`:

```bash
# Pooled connection (used by Prisma Client at runtime)
DATABASE_URL="postgresql://USER:PASSWORD@HOST-pooler.REGION.aws.neon.tech/DBNAME?sslmode=require&channel_binding=require&pgbouncer=true&connect_timeout=15"

# Direct connection (used by prisma db push / migrate)
DIRECT_URL="postgresql://USER:PASSWORD@HOST.REGION.aws.neon.tech/DBNAME?sslmode=require&channel_binding=require"
```

Then run:

```bash
bun run db:generate   # Generate Prisma Client
bun run db:push       # Push schema to Neon
bun run db:seed       # Seed 14 business listings + users + orders + offers
bun run db:verify     # Verify table counts
```

## 🚀 Local Development

```bash
# Install dependencies
bun install

# Run dev server
bun run dev

# Lint
bun run lint
```

Open `http://localhost:3000` to view the app.

## 📁 Project Structure

```
.
├── prisma/
│   └── schema.prisma           # Database schema (PostgreSQL)
├── public/
│   └── site-screenshots/       # Real screenshots from listed businesses
├── scripts/
│   ├── seed.ts                 # Database seeder
│   ├── verify-db.ts            # DB verification
│   └── fetched/                # Raw fetched website data (gitignored)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main SPA orchestrator
│   │   └── globals.css         # Tailwind + theme
│   ├── components/
│   │   ├── marketplace/        # Navbar, Footer, CartDrawer, OfferModal, BusinessCard
│   │   ├── views/              # Home, Marketplace, BusinessDetail, Checkout, Dashboards
│   │   └── ui/                 # shadcn/ui components
│   └── lib/
│       ├── types.ts            # TypeScript domain models
│       ├── businessData.ts     # Initial seed data (14 listings)
│       ├── store.ts            # Zustand store with persist
│       ├── format.ts           # Currency/number/date helpers
│       └── db.ts               # Prisma client
└── .env.example                # Template for env vars (safe to commit)
```

## 🎭 Demo Roles

The app supports 3 demo roles (switchable via the avatar dropdown in the top-right):

- **Buyer** — browse, make offers, checkout, view orders/wishlist
- **Seller** — list new businesses, manage listings, review incoming offers
- **Admin** — verify listings, manage users, configure platform settings

## 📊 Listings Included

8 curated listings + 6 fetched from real live websites:

| # | Business | Asking Price |
|---|----------|--------------|
| 1 | PetNest Dropshipping Co. | $12,500 |
| 2 | LumenWrite AI Content Platform | $78,000 |
| 3 | The Daily Fork Food Newsletter | $95,000 |
| 4 | NorthPeak Web Studio | $380,000 |
| 5 | FitTrack Pro iOS App | $42,000 |
| 6 | MakerHub Marketplace | $28,000 |
| 7 | GreenLeaf Garden Subscription Box | $65,000 |
| 8 | CodeCraft Coding Bootcamp | $210,000 |
| 9 | PlayBeat TV — VectorEngine AI Studio | $750 |
| 10 | NEXTRADE — Crypto Trading Terminal | $850 |
| 11 | BlockExchange Ultra — Crypto Binary Terminal | $850 |
| 12 | Creed CRM — AI-Native Sales OS | $850 |
| 13 | PlayBeat Digital — Digital Products Marketplace | $2,250 |
| 14 | PropertyAtlas — Luxury Real Estate | $2,100 |

## 🔐 Security Notes

- `.env` files are gitignored — never commit real database credentials
- The provided `.env.example` contains only placeholder values
- All passwords and connection strings in this README are examples

## 💰 Google AdSense Setup

This project includes full AdSense integration — the verification meta tag, the `adsbygoogle.js` script, and 7 manual ad placements across the site.

### What's already wired
- `<meta name="google-adsense-account" content="ca-pub-8143075550797983">` in `<head>` (verification)
- `adsbygoogle.js` script loaded via `next/script` with `afterInteractive` strategy
- 7 ad slots placed across views:
  - `homeFeatured` — after featured listings on home page
  - `homeCategories` — after the categories strip on home page
  - `marketplaceList` — below the marketplace listing grid
  - `blogIndex` — between blog cards and CTA on blog index
  - `blogPostMid` — mid-article in blog posts (before pricing analysis)
  - `blogPostEnd` — end of blog posts (before tags)
  - `businessDetail` — bottom of business detail page

### To activate ads
1. Go to **https://www.google.com/adsense** and sign in
2. Add your production domain (must be deployed — AdSense won't verify `localhost`)
3. Wait for Google to crawl and approve your site (1–14 days)
4. In the AdSense dashboard, create 7 ad units: **My ads → Ad units → New ad unit**
5. Copy each ad unit's `data-ad-slot` ID (the 10-digit number)
6. Edit `src/lib/seo.ts` → replace the placeholder slot IDs in `SITE.adsenseSlots`:
   ```typescript
   adsenseSlots: {
     homeFeatured: '1111111111',     // ← replace with real slot ID
     homeCategories: '2222222222',   // ← replace with real slot ID
     // ... etc
   }
   ```
7. Deploy — ads will start serving once Google approves

### Notes
- Ads will appear as empty gray boxes in development (slot IDs are placeholders)
- The `AdSlot` component fails silently if adsbygoogle.js hasn't loaded — the page still renders fine
- AdSense auto-ads are NOT enabled (we use manual placements for control over where ads appear)

## 📝 License

MIT — for demonstration purposes.
