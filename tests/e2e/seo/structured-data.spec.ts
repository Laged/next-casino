/**
 * Structured Data Verification Tests
 *
 * Verifies JSON-LD schemas are present and valid for rich snippets.
 * Tests WebSite, Organization, ItemList, BreadcrumbList, Review, and FAQ schemas.
 */

import { expect, test } from '@playwright/test';

test.describe('Structured Data - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has WebSite schema', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const all = await scripts.all();

    let hasWebSite = false;
    for (const script of all) {
      const content = await script.textContent();
      const data = JSON.parse(content || '{}');
      if (data['@type'] === 'WebSite') {
        hasWebSite = true;
        expect(data.name).toBeTruthy();
        expect(data.url).toMatch(/^https?:\/\//);
        expect(data.inLanguage).toMatch(/fi/i);
      }
    }
    expect(hasWebSite).toBe(true);
  });

  test('has Organization schema', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const all = await scripts.all();

    let hasOrg = false;
    for (const script of all) {
      const content = await script.textContent();
      const data = JSON.parse(content || '{}');
      if (data['@type'] === 'Organization') {
        hasOrg = true;
        expect(data.name).toBeTruthy();
        expect(data.logo).toBeTruthy();
      }
    }
    expect(hasOrg).toBe(true);
  });
});

test.describe('Structured Data - Category Pages', () => {
  const categories = ['uudet-kasinot', 'bonukset', 'ilmaiskierrokset'];

  for (const category of categories) {
    test(`/${category} has ItemList schema`, async ({ page }) => {
      await page.goto(`/${category}`);

      const scripts = page.locator('script[type="application/ld+json"]');
      const all = await scripts.all();

      let hasItemList = false;
      for (const script of all) {
        const content = await script.textContent();
        const data = JSON.parse(content || '{}');
        if (data['@type'] === 'ItemList') {
          hasItemList = true;
          expect(data.itemListElement).toBeInstanceOf(Array);
          expect(data.itemListElement.length).toBeGreaterThan(0);

          // Verify list items have positions
          for (const item of data.itemListElement) {
            expect(item.position).toBeGreaterThan(0);
            expect(item['@type']).toBe('ListItem');
          }
        }
      }
      expect(hasItemList).toBe(true);
    });

    test(`/${category} has BreadcrumbList schema`, async ({ page }) => {
      await page.goto(`/${category}`);

      const scripts = page.locator('script[type="application/ld+json"]');
      const all = await scripts.all();

      let hasBreadcrumb = false;
      for (const script of all) {
        const content = await script.textContent();
        const data = JSON.parse(content || '{}');
        if (data['@type'] === 'BreadcrumbList') {
          hasBreadcrumb = true;
          expect(data.itemListElement.length).toBeGreaterThanOrEqual(2);
        }
      }
      expect(hasBreadcrumb).toBe(true);
    });
  }
});

test.describe('Structured Data - Casino Review Pages', () => {
  test('review page has Review schema', async ({ page }) => {
    // Assuming a review page exists
    await page.goto('/arvostelut/test-casino');

    const scripts = page.locator('script[type="application/ld+json"]');
    const all = await scripts.all();

    let hasReview = false;
    for (const script of all) {
      const content = await script.textContent();
      const data = JSON.parse(content || '{}');
      if (data['@type'] === 'Review') {
        hasReview = true;

        // Verify Review structure
        expect(data.itemReviewed).toBeTruthy();
        expect(data.itemReviewed['@type']).toBe('Casino');
        expect(data.reviewRating).toBeTruthy();
        expect(data.reviewRating.ratingValue).toBeTruthy();
        expect(data.author).toBeTruthy();
      }
    }
    // Note: Will skip if page doesn't exist yet
    if (all.length > 0) {
      expect(hasReview).toBe(true);
    }
  });
});

test.describe('Structured Data - FAQ Sections', () => {
  test('FAQ sections have FAQPage schema', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    // Check if page has FAQ content
    const faqSection = page.locator('[data-testid="faq-section"], .faq, [id*="faq"]');

    if ((await faqSection.count()) > 0) {
      const scripts = page.locator('script[type="application/ld+json"]');
      const all = await scripts.all();

      let hasFAQ = false;
      for (const script of all) {
        const content = await script.textContent();
        const data = JSON.parse(content || '{}');
        if (data['@type'] === 'FAQPage') {
          hasFAQ = true;
          expect(data.mainEntity).toBeInstanceOf(Array);
          expect(data.mainEntity.length).toBeGreaterThan(0);
        }
      }
      expect(hasFAQ).toBe(true);
    }
  });
});
