/**
 * Technical SEO Verification Tests
 *
 * Verifies sitemap, robots.txt, and Core Web Vitals readiness.
 * Tests sitemap validity, robots.txt rules, and performance optimizations.
 */

import { expect, test } from '@playwright/test';

test.describe('Sitemap', () => {
  test('sitemap.xml exists and is valid', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBe(true);

    const content = await response.text();
    expect(content).toContain('<?xml');
    expect(content).toContain('<urlset');
    expect(content).toContain('<url>');
    expect(content).toContain('<loc>');
  });

  test('sitemap contains main pages', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const content = await response.text();

    // Should contain category pages
    expect(content).toContain('uudet-kasinot');
    expect(content).toContain('bonukset');
  });

  test('sitemap has priority values', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const content = await response.text();

    expect(content).toContain('<priority>');
  });
});

test.describe('Robots.txt', () => {
  test('robots.txt exists', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBe(true);
  });

  test('robots.txt references sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();

    expect(content.toLowerCase()).toContain('sitemap');
  });

  test('robots.txt allows main pages', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Extract the default user-agent (*) section to check its rules
    // The AI crawler sections (GPTBot, CCBot, etc.) intentionally disallow /
    const defaultAgentSection =
      content.match(/User-Agent:\s*\*[\s\S]*?(?=User-Agent:|$)/i)?.[0] || '';

    // Default user-agent should allow main content
    expect(defaultAgentSection).toContain('Allow: /');
    expect(content).not.toContain('Disallow: /uudet-kasinot');
  });

  test('blocks AI crawlers appropriately', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Should block unwanted AI crawlers
    expect(content).toContain('GPTBot');
  });
});

test.describe('Core Web Vitals Readiness', () => {
  test('no layout shift on casino images', async ({ page }) => {
    await page.goto('/');

    // All images should have width and height
    const images = page.locator('img');
    const allImages = await images.all();

    for (const img of allImages) {
      const hasSize =
        (await img.getAttribute('width')) !== null ||
        (await img.getAttribute('height')) !== null ||
        (await img.evaluate((el) => getComputedStyle(el).width !== 'auto'));

      // Images should have explicit sizing
      expect(hasSize).toBe(true);
    }
  });

  test('deferred scripts are marked correctly', async ({ page }) => {
    await page.goto('/');

    // Third-party scripts should be deferred or async
    const trackingScripts = page.locator(
      'script[src*="analytics"], script[src*="gtag"], script[src*="facebook"]'
    );

    const scripts = await trackingScripts.all();
    for (const script of scripts) {
      const isDeferred =
        (await script.getAttribute('defer')) !== null ||
        (await script.getAttribute('async')) !== null;

      expect(isDeferred).toBe(true);
    }
  });

  test('above-fold images have priority', async ({ page }) => {
    await page.goto('/');

    // Check hero/logo images
    const heroImages = page.locator('header img, [data-testid="hero"] img');
    const firstImage = heroImages.first();

    if ((await firstImage.count()) > 0) {
      const priority = await firstImage.getAttribute('fetchpriority');
      const loading = await firstImage.getAttribute('loading');

      // Should be priority or not lazy loaded
      expect(priority === 'high' || loading !== 'lazy').toBe(true);
    }
  });
});
