/**
 * Sitemap Configuration for Casino Website
 * Generates dynamic XML sitemap with proper SEO priorities
 *
 * Priority Configuration:
 * - Home: 1.0 (highest importance)
 * - Lists/Categories: 0.9 (casino lists, bonus pages)
 * - Reviews: 0.8 (individual casino reviews)
 * - Articles: 0.7 (blog posts, guides)
 * - Info pages: 0.3 (privacy, contact, etc.)
 */

import type { MetadataRoute } from 'next';

// ISR configuration - revalidate every 10 minutes
export const revalidate = 600;

// SEO Priority Configuration
const PRIORITIES = {
  home: 1.0,
  lists: 0.9,
  reviews: 0.8,
  articles: 0.7,
  info: 0.3,
} as const;

// Change frequency configuration
const CHANGE_FREQUENCIES = {
  home: 'daily',
  lists: 'daily',
  reviews: 'weekly',
  articles: 'weekly',
  info: 'monthly',
} as const;

// Types for data
interface CasinoData {
  slug: string;
  updatedAt: string;
}

interface ArticleData {
  slug: string;
  updatedAt: string;
}

interface CategoryData {
  slug: string;
}

// Static list pages with high priority (0.9)
const LIST_PAGES = [
  'uudet-kasinot',
  'bonukset',
  'ilmaiskierrokset',
  'pikakotiutus',
  'pay-n-play',
  'parhaat-nettikasinot',
  'pikakasinot',
  'ilman-rekisteroitymista',
] as const;

// Mock data fetching functions - replace with actual API calls
async function getAllCasinos(): Promise<CasinoData[]> {
  // TODO: Fetch from CMS/API
  return [
    { slug: 'casino-1', updatedAt: new Date().toISOString() },
    { slug: 'casino-2', updatedAt: new Date().toISOString() },
  ];
}

async function getAllArticles(): Promise<ArticleData[]> {
  // TODO: Fetch from CMS/API
  return [
    { slug: 'paras-kasino-opas', updatedAt: new Date().toISOString() },
    { slug: 'bonusten-kierratysvaatimukset', updatedAt: new Date().toISOString() },
  ];
}

async function getAllCategories(): Promise<CategoryData[]> {
  // TODO: Fetch from CMS/API
  return LIST_PAGES.map((slug) => ({ slug }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const now = new Date();

  // Home page (priority: 1.0)
  const homePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: CHANGE_FREQUENCIES.home,
      priority: PRIORITIES.home,
    },
  ];

  // Info pages (priority: 0.3)
  const infoPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tietosuojaseloste`,
      lastModified: now,
      changeFrequency: CHANGE_FREQUENCIES.info,
      priority: PRIORITIES.info,
    },
    {
      url: `${baseUrl}/ota-yhteytta`,
      lastModified: now,
      changeFrequency: CHANGE_FREQUENCIES.info,
      priority: PRIORITIES.info,
    },
    {
      url: `${baseUrl}/kayttoehdot`,
      lastModified: now,
      changeFrequency: CHANGE_FREQUENCIES.info,
      priority: PRIORITIES.info,
    },
    {
      url: `${baseUrl}/vastuullinen-pelaaminen`,
      lastModified: now,
      changeFrequency: CHANGE_FREQUENCIES.info,
      priority: PRIORITIES.info,
    },
    {
      url: `${baseUrl}/tietoa-meista`,
      lastModified: now,
      changeFrequency: CHANGE_FREQUENCIES.info,
      priority: PRIORITIES.info,
    },
  ];

  // Fetch dynamic data
  const [casinos, articles, categories] = await Promise.all([
    getAllCasinos(),
    getAllArticles(),
    getAllCategories(),
  ]);

  // List/Category pages (priority: 0.9)
  const listPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: now,
    changeFrequency: CHANGE_FREQUENCIES.lists as 'daily',
    priority: PRIORITIES.lists,
  }));

  // Casino review pages (priority: 0.8)
  const reviewPages: MetadataRoute.Sitemap = casinos.map((casino) => ({
    url: `${baseUrl}/arvostelut/${casino.slug}`,
    lastModified: new Date(casino.updatedAt),
    changeFrequency: CHANGE_FREQUENCIES.reviews as 'weekly',
    priority: PRIORITIES.reviews,
  }));

  // Article pages (priority: 0.7)
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/artikkelit/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: CHANGE_FREQUENCIES.articles as 'weekly',
    priority: PRIORITIES.articles,
  }));

  return [...homePages, ...listPages, ...reviewPages, ...articlePages, ...infoPages];
}
