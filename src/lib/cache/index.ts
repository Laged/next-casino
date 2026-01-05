/**
 * Cache utilities for casino content
 * Leverages Next.js 16 'use cache' directive
 */

import { cacheLife, cacheTag } from 'next/cache';

/**
 * Cached casino data fetching
 * Uses 'casino' cache profile (5 min stale, 10 min revalidate)
 */
export async function getCasinoData(slug: string) {
  'use cache';
  cacheLife('casino');
  cacheTag(`casino-${slug}`);

  // Fetch from CMS/API
  const data = await fetch(`/api/casinos/${slug}`);
  return data.json();
}

/**
 * Cached casino list fetching
 * Uses 'lists' cache profile (10 min stale, 30 min revalidate)
 */
export async function getCasinoList(category?: string) {
  'use cache';
  cacheLife('lists');
  cacheTag('casino-list', category ? `category-${category}` : 'all-casinos');

  // Fetch from CMS/API
  const params = category ? `?category=${category}` : '';
  const data = await fetch(`/api/casinos${params}`);
  return data.json();
}

/**
 * Cached article fetching
 * Uses 'articles' cache profile (30 min stale, 1 hour revalidate)
 */
export async function getArticle(slug: string) {
  'use cache';
  cacheLife('articles');
  cacheTag(`article-${slug}`);

  const data = await fetch(`/api/articles/${slug}`);
  return data.json();
}

/**
 * Cached static content (legal pages, etc.)
 * Uses 'static' cache profile (1 hour stale, 24 hour revalidate)
 */
export async function getStaticContent(page: string) {
  'use cache';
  cacheLife('static');
  cacheTag('static-content', `page-${page}`);

  const data = await fetch(`/api/content/${page}`);
  return data.json();
}
