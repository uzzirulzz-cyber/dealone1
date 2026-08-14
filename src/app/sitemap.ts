import type { MetadataRoute } from 'next';
import { SITE, SEO_BUSINESSES } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE.url}/?view=marketplace`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/?view=blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // One route per business listing
  const businessRoutes: MetadataRoute.Sitemap = SEO_BUSINESSES.map((b) => ({
    url: `${SITE.url}/?business=${b.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // One route per blog post
  const blogRoutes: MetadataRoute.Sitemap = SEO_BUSINESSES.map((b) => ({
    url: `${SITE.url}/?blog=${b.blogSlug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Feature article
  const featureRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/?blog=features`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];

  return [...staticRoutes, ...businessRoutes, ...blogRoutes, ...featureRoutes];
}
