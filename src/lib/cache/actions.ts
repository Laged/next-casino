'use server';

import { revalidateTag } from 'next/cache';

/**
 * Invalidate specific casino cache
 * Use when casino data is updated in CMS
 * The 'max' profile triggers immediate revalidation
 */
export async function invalidateCasino(slug: string) {
  revalidateTag(`casino-${slug}`, 'max');
}

/**
 * Invalidate all casino lists
 * Use when casino rankings change
 */
export async function invalidateCasinoLists() {
  revalidateTag('casino-list', 'max');
}

/**
 * Invalidate category-specific lists
 */
export async function invalidateCategory(category: string) {
  revalidateTag(`category-${category}`, 'max');
}

/**
 * Invalidate article cache
 */
export async function invalidateArticle(slug: string) {
  revalidateTag(`article-${slug}`, 'max');
}

/**
 * Full site revalidation (use sparingly)
 */
export async function invalidateAllContent() {
  revalidateTag('casino-list', 'max');
  revalidateTag('static-content', 'max');
}
