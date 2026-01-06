import { client } from './client';
import {
  allBonusesQuery,
  allCasinosQuery,
  casinoBySlugQuery,
  categoriesQuery,
  categoryBySlugQuery,
  featuredBonusesQuery,
  featuredCasinosQuery,
  featuredFreeSpinsQuery,
  footerPagesQuery,
  newCasinosQuery,
  noDepositFreeSpinsQuery,
  pageBySlugQuery,
  siteSettingsQuery,
} from './queries';

// Types
export interface SanityCasino {
  _id: string;
  name: string;
  slug: string;
  logo?: {
    asset: {
      _ref: string;
    };
  };
  rating: number;
  bonus: string;
  bonusValue: string;
  features: string[];
  license: string;
  paymentMethods?: string[];
  minDeposit: string;
  withdrawalTime: string;
  affiliateLink?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  review?: {
    summary?: string;
    content?: unknown[];
    pros?: string[];
    cons?: string[];
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SanityBonus {
  _id: string;
  title: string;
  slug: string;
  type: string;
  value?: string;
  maxAmount?: string;
  wageringRequirement?: number;
  minDeposit?: string;
  validDays?: number;
  bonusCode?: string;
  description?: string;
  terms?: string[];
  casino?: {
    name: string;
    slug: string;
    logo?: { asset: { _ref: string } };
    affiliateLink?: string;
  };
}

export interface SanityFreeSpins {
  _id: string;
  title: string;
  slug: string;
  spinsCount: number;
  spinValue?: string;
  requiresDeposit: boolean;
  minDeposit?: string;
  game?: string;
  wageringRequirement?: number;
  maxWinnings?: string;
  bonusCode?: string;
  casino?: {
    name: string;
    slug: string;
    logo?: { asset: { _ref: string } };
    affiliateLink?: string;
  };
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  content?: unknown[];
  featuredImage?: { asset: { _ref: string } };
  casinos?: SanityCasino[];
  casinoCount?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SanityPage {
  _id: string;
  title: string;
  slug: string;
  content?: unknown[];
  featuredImage?: { asset: { _ref: string } };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
  };
}

export interface SanitySiteSettings {
  title?: string;
  description?: string;
  logo?: { asset: { _ref: string } };
  favicon?: { asset: { _ref: string } };
  ogImage?: { asset: { _ref: string } };
  heroTitle?: string;
  heroSubtitle?: string;
  trustBadges?: Array<{
    icon: string;
    text: string;
  }>;
  stats?: {
    casinos?: number;
    bonuses?: number;
    yearsExperience?: number;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  footer?: {
    copyrightText?: string;
    disclaimerText?: string;
    showAgeRestriction?: boolean;
    showGamblingWarning?: boolean;
  };
  analytics?: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
  };
}

// Fetch functions
export async function getFeaturedCasinos(): Promise<SanityCasino[]> {
  return await client.fetch(featuredCasinosQuery);
}

export async function getNewCasinos(): Promise<SanityCasino[]> {
  return await client.fetch(newCasinosQuery);
}

export async function getAllCasinos(): Promise<SanityCasino[]> {
  return await client.fetch(allCasinosQuery);
}

export async function getCasinoBySlug(slug: string): Promise<SanityCasino | null> {
  return await client.fetch(casinoBySlugQuery, { slug });
}

export async function getFeaturedBonuses(): Promise<SanityBonus[]> {
  return await client.fetch(featuredBonusesQuery);
}

export async function getAllBonuses(): Promise<SanityBonus[]> {
  return await client.fetch(allBonusesQuery);
}

export async function getFeaturedFreeSpins(): Promise<SanityFreeSpins[]> {
  return await client.fetch(featuredFreeSpinsQuery);
}

export async function getNoDepositFreeSpins(): Promise<SanityFreeSpins[]> {
  return await client.fetch(noDepositFreeSpinsQuery);
}

export async function getCategories(): Promise<SanityCategory[]> {
  return await client.fetch(categoriesQuery);
}

export async function getCategoryBySlug(slug: string): Promise<SanityCategory | null> {
  return await client.fetch(categoryBySlugQuery, { slug });
}

export async function getPageBySlug(slug: string): Promise<SanityPage | null> {
  return await client.fetch(pageBySlugQuery, { slug });
}

export async function getFooterPages(): Promise<
  Array<{ _id: string; title: string; slug: string }>
> {
  return await client.fetch(footerPagesQuery);
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return await client.fetch(siteSettingsQuery);
}
