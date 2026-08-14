import type { BusinessCategory, BusinessMonetization } from './types';

// ============================================================
// Site-wide SEO config
// ============================================================

export const SITE = {
  name: 'MakeThisDeal.biz',
  shortName: 'MakeThisDeal',
  tagline: 'Acquire Profitable Online Businesses',
  description:
    'MakeThisDeal.biz is a curated storefront for acquiring profitable online businesses — verified SaaS platforms, crypto trading terminals, digital product marketplaces, CRMs, and luxury real estate platforms. Every listing is financially verified and every transaction is escrow-protected.',
  url: 'https://makethisdeal.biz', // update to your production domain
  locale: 'en_US',
  twitter: '@makethisdeal',
  author: 'MakeThisDeal.biz Editorial Team',
  adsenseClient: 'ca-pub-8143075550797983',
  logo: '/logo.png',
  // Admin login credentials (demo — store securely in production via hashed env vars)
  adminEmail: 'trade@trade.com',
  adminPassword: 'trade123',
  keywords: [
    'buy a business',
    'acquire a startup',
    'online business marketplace',
    'SaaS for sale',
    'crypto trading platform for sale',
    'digital products marketplace',
    'AI CRM for sale',
    'luxury real estate platform',
    'verified business listings',
    'escrow business acquisition',
    'website acquisition',
    'micro-acquisition',
    'indie acquisitions',
    'make this deal',
    'makethisdeal',
  ],
};

// ============================================================
// The 6 user-provided businesses (drives listings + blog + SEO)
// ============================================================

export interface SeoBusinessEntry {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  liveUrl: string;
  askingPrice: number;
  previousPrice?: number;
  category: BusinessCategory;
  monetization: BusinessMonetization[];
  screenshot: string;
  ogImage: string;
  // For blog content
  blogSlug: string;
  blogTitle: string;
  blogExcerpt: string;
  blogKeywords: string[];
  // SEO key phrases the blog post targets
  seoH1: string;
  seoMetaDescription: string;
  // Highlighted metrics pulled from the live site
  keyMetrics: { label: string; value: string }[];
  // Key features for the blog post
  features: string[];
  // Why it's a good acquisition
  whyAcquire: string[];
  // Risks / things to verify in due diligence
  dueDiligence: string[];
}

export const SEO_BUSINESSES: SeoBusinessEntry[] = [
  {
    id: 'biz-9',
    slug: 'playbeat-tv-vectorengine-ai-studio',
    title: 'PlayBeat TV — VectorEngine AI Studio',
    tagline: 'Multi-model AI workspace owner portal with Supabase Auth',
    shortDescription:
      'A turnkey single-owner VectorEngine AI Studio deployment with Supabase-authenticated multi-model LLM routing — ready to productize into a paid SaaS.',
    liveUrl: 'https://playbeattv.buzz/',
    askingPrice: 750,
    category: 'SaaS / Software',
    monetization: ['Subscription'],
    screenshot: '/site-screenshots/playbeattv.buzz.png',
    ogImage: '/site-screenshots/playbeattv.buzz.png',
    blogSlug: 'buy-playbeat-tv-vectorengine-ai-studio',
    blogTitle: 'Why PlayBeat TV (VectorEngine AI Studio) Is the Best $750 AI SaaS Acquisition in 2026',
    blogExcerpt:
      'A turnkey VectorEngine AI Studio deployment on Supabase Auth — multi-model LLM routing already wired, owner portal live, asking just $750. Here is why this is the cheapest AI SaaS starter deal on the market and how to productize it for $5K+ MRR.',
    blogKeywords: [
      'buy ai saas',
      'vectorengine ai studio for sale',
      'playbeattv acquisition',
      'multi-model llm workspace',
      'supabase auth saas',
      'ai business for sale under 1000',
      'cheap saas starter',
      'ai tool acquisition 2026',
    ],
    seoH1: 'Buy PlayBeat TV — VectorEngine AI Studio for $750',
    seoMetaDescription:
      'Acquire PlayBeat TV, a turnkey VectorEngine AI Studio multi-model LLM workspace on Supabase Auth, for just $750. Live domain, clean codebase, ready to productize into a paid SaaS. Escrow-protected transfer.',
    keyMetrics: [
      { label: 'Asking Price', value: '$750' },
      { label: 'Category', value: 'SaaS / Software' },
      { label: 'Auth', value: 'Supabase' },
      { label: 'Stack', value: 'VectorEngine AI' },
    ],
    features: [
      'Authorized Owner Portal branded as "Vector Engine AI STUDIO"',
      'Secure Supabase Authentication with encrypted session management',
      'Multi-model LLM routing — access OpenAI, Anthropic, and others from one workspace',
      'Single-owner configuration today, ready to expand to multi-tenant SaaS',
      'Live domain (playbeattv.buzz) transferred with the sale',
      'Supabase project ownership included',
    ],
    whyAcquire: [
      'Lowest entry price on the AI SaaS market — $750 buys you a live, deployed, working AI product',
      'VectorEngine AI Studio is a production-grade foundation — no infra to build',
      'Supabase Auth handles all security, sessions, and credentials — zero auth code to maintain',
      'Clear productization path: convert the single-owner portal into a $19-$49/mo paid SaaS',
      'The multi-model LLM routing alone would cost $5K-$10K to build from scratch',
    ],
    dueDiligence: [
      'Verify Supabase project ownership transfer (not just admin access)',
      'Confirm VectorEngine AI Studio license is transferable to the new owner',
      'Check monthly Supabase + LLM API costs (likely under $50/mo at current usage)',
      'Review domain registrar and ensure clean transfer of playbeattv.buzz',
      'Audit the multi-model routing config to confirm which LLM providers are wired',
    ],
  },
  {
    id: 'biz-10',
    slug: 'nextrade-crypto-trading-terminal',
    title: 'NEXTRADE — Crypto Trading Terminal',
    tagline: 'Institutional-grade crypto trading platform with 384K active traders',
    shortDescription:
      'A full-featured crypto trading terminal at nextradepro.top supporting 80+ assets, $1.84B in 24h volume, 384K active traders, binary options, and a USDT staking program with up to 12% APY.',
    liveUrl: 'https://nextradepro.top/',
    askingPrice: 850,
    category: 'SaaS / Software',
    monetization: ['Marketplace Fees', 'Subscription'],
    screenshot: '/site-screenshots/nextradepro.top.png',
    ogImage: '/site-screenshots/nextradepro.top.png',
    blogSlug: 'buy-nextrade-crypto-trading-terminal',
    blogTitle: 'NEXTRADE Crypto Trading Terminal for Sale — $850 Buys a 384K-Trader Platform',
    blogExcerpt:
      'NEXTRADE at nextradepro.top is a fully operational crypto trading terminal with 384,000 active traders, $1.84B in 24h volume, 80+ listed assets, binary options, and USDT staking at 12% APY. Asking just $850. Here is the full breakdown of what you get and the due diligence you must do.',
    blogKeywords: [
      'buy crypto exchange',
      'crypto trading platform for sale',
      'nextradepro acquisition',
      'buy bitcoin trading terminal',
      'crypto saas acquisition 2026',
      'binary options platform for sale',
      'usdt staking platform',
      'cryptocurrency business for sale',
    ],
    seoH1: 'Buy NEXTRADE Crypto Trading Terminal — 384K Traders for $850',
    seoMetaDescription:
      'Acquire NEXTRADE, a live crypto trading terminal with 384K active traders, $1.84B 24h volume, 80+ assets, binary options, and USDT staking at 12% APY. Asking $850. Escrow-protected transfer of nextradepro.top.',
    keyMetrics: [
      { label: 'Asking Price', value: '$850' },
      { label: 'Active Traders', value: '384,000' },
      { label: '24h Volume', value: '$1.84B' },
      { label: 'Listed Assets', value: '80+' },
    ],
    features: [
      'Live ticker with 10 cryptocurrencies (BTC, ETH, SOL, AVAX, BNB, XRP, DOGE, LINK, ADA, DOT)',
      'Portfolio dashboard tracking 7+ assets with realized + unrealized P&L',
      'Binary options trading module with 68.4% win-rate benchmark over 30 days',
      'USDT staking rewards program offering up to 12% APY',
      'KYC-verified institutional-grade infrastructure',
      '99.99% uptime with instant settlement',
      '24/7 live in-app support',
      '"Get $20 in BTC on your first $100 deposit" acquisition promotion built in',
      'Top Movers section highlighting largest 24h gainers (BTC, UNI, DOT, ADA, LTC, MATIC)',
      'Recent Activity feed showing completed deposits in real time',
    ],
    whyAcquire: [
      'Massive active user base — 384,000 traders is more than most regulated exchanges',
      'Recurring revenue path through the USDT staking program (12% APY)',
      'Two monetization streams already wired: trading fees + binary options spreads',
      '$1.84B in 24h volume signals real user activity, not inflated metrics',
      '80+ assets supported — broad market coverage without needing to add new listings',
    ],
    dueDiligence: [
      'CRITICAL: Verify the 384K trader count is unique active users, not total signups',
      'CRITICAL: Audit the $1.84B 24h volume against on-chain wallet data',
      'Confirm KYC provider integration is transferable to the new owner',
      'Review the binary options legal framework in your operating jurisdiction',
      'Audit cold wallet storage and verify the 256-bit SSL claim',
      'Check the USDT staking contracts for solvency and TVL',
      'Verify the $20 BTC promotion is sustainable at current CAC',
      'Review all 80+ asset integrations for API key ownership and rate limits',
    ],
  },
  {
    id: 'biz-11',
    slug: 'blockexchange-ultra-crypto-binary-terminal',
    title: 'BlockExchange Ultra — Crypto Binary Terminal',
    tagline: 'Next-gen crypto binary options platform with 50K+ active traders',
    shortDescription:
      'A high-frequency crypto binary options trading terminal at blockexchange.buzz with 50K+ active traders, $2.4B+ cumulative volume, up to 50% payouts on 120-second contracts, and a sub-agent invitation network.',
    liveUrl: 'https://www.blockexchange.buzz/',
    askingPrice: 850,
    category: 'SaaS / Software',
    monetization: ['Marketplace Fees'],
    screenshot: '/site-screenshots/blockexchange.buzz.png',
    ogImage: '/site-screenshots/blockexchange.buzz.png',
    blogSlug: 'buy-blockexchange-ultra-binary-terminal',
    blogTitle: 'BlockExchange Ultra for Sale — $850 for a 50K-Trader Crypto Binary Options Terminal',
    blogExcerpt:
      'BlockExchange Ultra at blockexchange.buzz is a high-frequency crypto binary options terminal with 50,000+ active traders, $2.4B+ cumulative volume, up to 50% payout on 120-second contracts, and a sub-agent network. Asking $850. Full breakdown of features, revenue, and due diligence inside.',
    blogKeywords: [
      'buy binary options platform',
      'crypto binary terminal for sale',
      'blockexchange acquisition',
      'crypto trading business for sale',
      'high frequency trading platform',
      'btc usdt trading terminal',
      'cryptocurrency business acquisition',
      'binary options business sale',
    ],
    seoH1: 'Buy BlockExchange Ultra — 50K-Trader Crypto Binary Terminal for $850',
    seoMetaDescription:
      'Acquire BlockExchange Ultra, a live crypto binary options terminal with 50K+ traders, $2.4B+ volume, up to 50% payouts on 120s contracts, and a sub-agent network. Asking $850. Escrow-protected transfer of blockexchange.buzz.',
    keyMetrics: [
      { label: 'Asking Price', value: '$850' },
      { label: 'Active Traders', value: '50,000+' },
      { label: 'Cumulative Volume', value: '$2.4B+' },
      { label: 'Settlement Time', value: '<1 second' },
    ],
    features: [
      'Real-time BTC/USDT widget showing $94,820.50 (+3.42%) with 24h High/Low',
      'Live ticker for 8 cryptocurrencies (BTC, ETH, SOL, BNB, XRP, ADA, DOGE, AVAX)',
      'Real-time Bollinger Bands, EMA, SMA, and Support/Resistance overlays on every chart',
      'Binary options settlement in 30s, 60s, or 120s with instant payout crediting',
      'Up to 50% profit on 120-second options with exact-tick price matching',
      'Multi-asset deposits: Bank wire, Credit Card, USDT-TRC20, BTC, ETH, BNB',
      '256-bit SSL encryption with cold wallet storage',
      'Sub-agent invitation-code system for tiered rewards and viral growth',
      '24/7 dedicated in-app chat support',
      'Sub-second latency order routing engine',
    ],
    whyAcquire: [
      '$2.4B+ cumulative volume signals deep liquidity and active user base',
      'Up to 50% payout returns create a strong value prop for traders',
      'Sub-agent network is a built-in viral growth channel — agents recruit traders',
      '8 platform features documented on the homepage reduce buyer education cost',
      'Sub-1-second settlement is a competitive moat vs. slower binary platforms',
    ],
    dueDiligence: [
      'CRITICAL: Audit the $2.4B+ cumulative volume — request trade-by-trade export',
      'Verify the 50K+ active trader count is unique monthly actives, not total accounts',
      'Confirm cold wallet storage with proof-of-reserves audit',
      'Review the 256-bit SSL claim and request security penetration test report',
      'Audit the sub-agent invitation system for compliance with securities laws',
      'Verify all 6 deposit methods (Bank wire, Card, USDT-TRC20, BTC, ETH, BNB) are operational',
      'Check the 50% payout sustainability at current trade volumes',
      'Review jurisdictional compliance for binary options trading',
    ],
  },
  {
    id: 'biz-12',
    slug: 'creed-crm-ai-native-sales-os',
    title: 'Creed CRM — AI-Native Sales OS',
    tagline: 'AI-native sales operating system with lead gen, forecasting & AI assistant',
    shortDescription:
      'An AI-native sales operating system at creedbixby.lat unifying lead generation, sales forecasting, and an AI assistant into a single product. Built on VectorEngine AI with the ByeWind UI theme.',
    liveUrl: 'https://creedbixby.lat/',
    askingPrice: 850,
    category: 'SaaS / Software',
    monetization: ['Subscription'],
    screenshot: '/site-screenshots/creedbixby.lat.png',
    ogImage: '/site-screenshots/creedbixby.lat.png',
    blogSlug: 'buy-creed-crm-ai-native-sales-os',
    blogTitle: 'Creed CRM for Sale — $850 Buys an AI-Native Sales OS Built on VectorEngine',
    blogExcerpt:
      'Creed CRM at creedbixby.lat is an AI-native sales operating system combining lead generation, sales forecasting, and an AI assistant in one product. Built on VectorEngine AI with the ByeWind UI. Asking $850. Here is the full breakdown and productization playbook.',
    blogKeywords: [
      'buy ai crm',
      'crm for sale',
      'ai sales platform acquisition',
      'creed crm acquisition',
      'ai native sales os',
      'saas business for sale under 1000',
      'vectorengine ai crm',
      'sales forecasting software',
      'ai sales assistant business',
    ],
    seoH1: 'Buy Creed CRM — AI-Native Sales OS for $850',
    seoMetaDescription:
      'Acquire Creed CRM, an AI-native sales operating system with lead gen, forecasting, and AI assistant built on VectorEngine AI + ByeWind UI. Asking $850. Single-tenant today, ready for multi-tenant SaaS. Escrow-protected.',
    keyMetrics: [
      { label: 'Asking Price', value: '$850' },
      { label: 'Category', value: 'SaaS / Software' },
      { label: 'AI Engine', value: 'VectorEngine AI' },
      { label: 'UI Theme', value: 'ByeWind' },
    ],
    features: [
      'Three core modules: Lead Gen, Forecast, and AI Assistant — visible in top nav',
      'Single sign-on screen branded "Creed CRM — AI-native sales operating system"',
      'Built on VectorEngine AI infrastructure — production-grade LLM orchestration',
      'ByeWind UI theme — modern, polished, mobile-responsive sales interface',
      'Email + Password authentication ready for Supabase integration',
      'Footer reads "Creed CRM v2 · ByeWind theme · Powered by VectorEngine AI"',
    ],
    whyAcquire: [
      'AI-native CRM is one of the hottest B2B SaaS categories in 2026',
      'Three modules already built — Lead Gen + Forecasting + AI Assistant would cost $30K+ to build',
      'VectorEngine AI foundation means no LLM infra to build — just productize',
      'ByeWind UI theme saves $5K-$10K in design work',
      'Clear multi-tenant SaaS path: charge $29-$99/user/month',
      'The AI sales assistant category has 5+ funded competitors — proven demand',
    ],
    dueDiligence: [
      'Verify VectorEngine AI license is transferable to the new owner',
      'Confirm the Lead Gen module actually works end-to-end (not just a UI shell)',
      'Test the Forecasting model against historical data for accuracy',
      'Audit the AI Assistant orchestration layer and confirm which LLMs are wired',
      'Check ByeWind UI theme license allows commercial use and resale',
      'Review the v2 version history — what changed from v1?',
      'Verify creedbixby.lat domain registrar transfer process',
    ],
  },
  {
    id: 'biz-13',
    slug: 'playbeat-digital-products-marketplace',
    title: 'PlayBeat Digital — Premium Digital Products Marketplace',
    tagline: '500+ subscriptions across 50+ platforms with global region-unlocked delivery',
    shortDescription:
      'A premium digital products marketplace at playbeat.digital offering 500+ subscriptions across 50+ platforms — streaming, gaming, AI tools, software, and cloud plans — with sub-60-second delivery.',
    liveUrl: 'https://playbeat.digital/',
    askingPrice: 2250,
    previousPrice: 2500,
    category: 'Marketplace',
    monetization: ['One-time Sales', 'Affiliate'],
    screenshot: '/site-screenshots/playbeat.digital.png',
    ogImage: '/site-screenshots/playbeat.digital.png',
    blogSlug: 'buy-playbeat-digital-marketplace',
    blogTitle: 'PlayBeat Digital for Sale — $2,250 Buys a 500-Product Digital Subscription Marketplace',
    blogExcerpt:
      'PlayBeat Digital at playbeat.digital is a premium digital products marketplace with 500+ subscriptions across 50+ platforms, 4,200 paying customers, 38% profit margin, and 54K monthly traffic. Asking $2,250 (was $2,500). Full breakdown of inventory, suppliers, and growth levers inside.',
    blogKeywords: [
      'buy digital marketplace',
      'digital products business for sale',
      'playbeat digital acquisition',
      'subscription marketplace for sale',
      'vpn reseller business',
      'spotify premium reseller',
      'ai tools marketplace',
      'gift card marketplace for sale',
      'digital goods business',
    ],
    seoH1: 'Buy PlayBeat Digital — 500+ Subscription Marketplace for $2,250',
    seoMetaDescription:
      'Acquire PlayBeat Digital, a premium digital products marketplace with 500+ subscriptions, 50+ platforms, 4,200 customers, 38% profit margin, and 54K monthly traffic. Asking $2,250. Escrow-protected transfer of playbeat.digital.',
    keyMetrics: [
      { label: 'Asking Price', value: '$2,250 (was $2,500)' },
      { label: 'Subscriptions', value: '500+' },
      { label: 'Platforms', value: '50+' },
      { label: 'Customers', value: '4,200' },
    ],
    features: [
      '500+ digital subscriptions across 50+ platforms — broad catalog',
      'Sub-60-second automated delivery — verified and region-unlocked',
      'Featured products: Kaspersky Total Security (Rs 1,116), Spotify Premium 3-Month (Rs 781)',
      'Jasper AI — Featured AI Pick (Rs 3,348) — high-margin AI tools category',
      'ESET Internet Security, Norton 360 Deluxe, McAfee Total Protection',
      'NordVPN (5,000+ servers, military encryption) and ExpressVPN (3,000+ servers, 94 countries)',
      '5 catalog categories: Games, Gift Cards, Software, AI Tools, Subscriptions',
      'PKR pricing with worldwide sales supported — global customer base',
      'Search with Best Value and Trending filters',
      'Each product card shows Sales count, Rating, and Reviews',
    ],
    whyAcquire: [
      'Established customer base of 4,200 paying customers — not zero-revenue',
      '38% profit margin is healthy for a digital goods marketplace',
      '54K monthly traffic = organic acquisition channel already exists',
      'AI tools category (Jasper AI featured) is the highest-margin growth lever',
      '50+ supplier relationships already negotiated — no cold-start sourcing',
      'Sub-60-second delivery is a strong operational moat',
      'Discounted from $2,500 to $2,250 — 10% price reduction already applied',
    ],
    dueDiligence: [
      'CRITICAL: Verify all 50+ platform supplier relationships are transferable',
      'Audit the 4,200 customer count — request email export with consent',
      'Review PKR pricing strategy and verify it converts to USD profitability',
      'Test the sub-60-second delivery system end-to-end',
      'Check Jasper AI reseller agreement (AI tools have stricter resale terms)',
      'Verify Spotify Premium 3-Month reseller complies with Spotify ToS',
      'Audit NordVPN and ExpressVPN reseller agreements for transferability',
      'Review the 38% profit margin by SKU — some categories may be loss-leaders',
      'Confirm Kaspersky, ESET, Norton, McAfee licenses are transferable',
    ],
  },
  {
    id: 'biz-14',
    slug: 'propertyatlas-luxury-real-estate',
    title: 'PropertyAtlas — Luxury Real Estate Lifestyle',
    tagline: 'Luxury real estate platform with 2,400+ active listings across 42 cities',
    shortDescription:
      'A luxury real estate platform at propertyatlas.lifestyle featuring 2,400+ active listings across 42 cities, 8,900+ closed deals, and 18 years of operating history. Includes mortgage calculator, agent CRM, and multi-channel integration.',
    liveUrl: 'https://propertyatlas.lifestyle/',
    askingPrice: 2100,
    category: 'Marketplace',
    monetization: ['Marketplace Fees', 'Services', 'Advertising'],
    screenshot: '/site-screenshots/propertyatlas.lifestyle.png',
    ogImage: '/site-screenshots/propertyatlas.lifestyle.png',
    blogSlug: 'buy-propertyatlas-luxury-real-estate',
    blogTitle: 'PropertyAtlas for Sale — $2,100 Buys an 18-Year-Old Luxury Real Estate Platform',
    blogExcerpt:
      'PropertyAtlas at propertyatlas.lifestyle is a luxury real estate platform with 2,400+ active listings across 42 cities, 8,900+ closed deals, and 18 years of operating history. Asking $2,100. Full breakdown of inventory, agent network, and expansion opportunities inside.',
    blogKeywords: [
      'buy real estate website',
      'luxury real estate platform for sale',
      'propertyatlas acquisition',
      'real estate marketplace for sale',
      'islamabad real estate platform',
      'luxury property business',
      'real estate saas acquisition',
      'property listing website for sale',
      'buy a real estate business',
    ],
    seoH1: 'Buy PropertyAtlas — 18-Year Luxury Real Estate Platform for $2,100',
    seoMetaDescription:
      'Acquire PropertyAtlas, an 18-year-old luxury real estate platform with 2,400+ listings across 42 cities, 8,900+ closed deals, mortgage calculator, and agent CRM. Asking $2,100. Escrow-protected transfer of propertyatlas.lifestyle.',
    keyMetrics: [
      { label: 'Asking Price', value: '$2,100' },
      { label: 'Active Listings', value: '2,400+' },
      { label: 'Closed Deals', value: '8,900+' },
      { label: 'Cities Served', value: '42' },
    ],
    features: [
      '2,400+ active luxury property listings across 42 cities',
      '8,900+ closed deals over 18 years of operating history',
      'Featured properties: Rawal Lake View Villa in Bani Gala (Rs 850,000/mo, 5 bed/6 bath/6,500 ft²)',
      'The Pinnacle Penthouse in F-8, Islamabad (Rs 1,200,000/mo, 4 bed/5 bath/5,200 ft²)',
      'Centaurus Towers pre-construction (Rs 65,000,000, 3 bed/3 bath/2,100 ft²)',
      'Gulberg Greens Duplex Residences (Rs 42,000,000 — SOLD)',
      'Capital Smart City Phase 2 (Rs 35,000,000 — AVAILABLE)',
      'Built-in mortgage calculator',
      'Multi-channel agent integration: WhatsApp, Email, Admin dashboard',
      'Property types: villas, penthouses, apartments, duplexes, ongoing projects',
      'Search filter by property type, beds, and listing status (For Sale / For Rent / Projects)',
    ],
    whyAcquire: [
      '18 years of operating history is a massive moat — impossible to replicate quickly',
      '8,900+ closed deals = proven transactional revenue model',
      '42 cities served = broad geographic coverage, not single-market risk',
      'Established luxury brand positioning — premium pricing power',
      'Multi-revenue stream: marketplace fees + services + advertising',
      'Built-in mortgage calculator = lead generation for lending partners',
      'Agent network already in place — no cold-start sales team needed',
      'WhatsApp + Email + Admin integration = modern agent workflow already built',
    ],
    dueDiligence: [
      'CRITICAL: Verify the 8,900+ closed deals claim with transaction records',
      'Audit the 2,400+ active listings — confirm they are current, not stale',
      'Review the agent network agreements and confirm they transfer with the sale',
      'Verify Centaurus Towers pre-construction inventory is real and transferable',
      'Check the mortgage calculator accuracy and any lender partnerships',
      'Review 18 years of financial records — request tax returns',
      'Audit the 42 cities claim — request city-by-city listing count',
      'Verify Capital Smart City Phase 2 inventory and developer relationship',
      'Check the WhatsApp Business API integration is transferable',
    ],
  },
];

// ============================================================
// Helper functions
// ============================================================

export function getBusinessBySlug(slug: string): SeoBusinessEntry | undefined {
  return SEO_BUSINESSES.find((b) => b.slug === slug);
}

export function getBusinessById(id: string): SeoBusinessEntry | undefined {
  return SEO_BUSINESSES.find((b) => b.id === id);
}

export function getBlogPostBySlug(slug: string): SeoBusinessEntry | undefined {
  return SEO_BUSINESSES.find((b) => b.blogSlug === slug);
}
