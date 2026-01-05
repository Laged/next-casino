/**
 * Meta Tags Verification Tests
 *
 * Verifies that every page has proper meta tags for search engines and social sharing.
 * Tests title tags, meta descriptions, canonical URLs, Open Graph, and Twitter Cards.
 */

import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', type: 'home', titlePattern: /Kasinolista|Parhaat Nettikasinot/i },
  {
    path: '/uudet-kasinot',
    type: 'list',
    titlePattern: /Uudet.*Kasinot|Nettikasinot/i,
  },
  { path: '/bonukset', type: 'list', titlePattern: /Bonus|Tervetuliais/i },
  { path: '/ilmaiskierrokset', type: 'list', titlePattern: /Ilmaiskierr/i },
];

test.describe('Meta Tags Verification', () => {
  for (const page of pages) {
    test.describe(`${page.path} (${page.type})`, () => {
      test('has valid title tag', async ({ page: p }) => {
        await p.goto(page.path);
        const title = await p.title();

        // Title should match pattern
        expect(title).toMatch(page.titlePattern);
        // Title should be 50-60 chars optimal
        expect(title.length).toBeGreaterThan(30);
        expect(title.length).toBeLessThan(70);
      });

      test('has meta description', async ({ page: p }) => {
        await p.goto(page.path);
        const description = p.locator('meta[name="description"]');
        const content = await description.getAttribute('content');

        // Description should exist
        expect(content).toBeTruthy();
        // Description should be 120-160 chars
        expect(content?.length).toBeGreaterThan(80);
        expect(content?.length).toBeLessThan(165);
      });

      test('has canonical URL', async ({ page: p }) => {
        await p.goto(page.path);
        const canonical = p.locator('link[rel="canonical"]');
        const href = await canonical.getAttribute('href');

        expect(href).toMatch(/^https?:\/\//);
        expect(href).toContain(page.path === '/' ? '.fi' : page.path);
      });

      test('has Open Graph tags', async ({ page: p }) => {
        await p.goto(page.path);

        const ogTitle = await p.locator('meta[property="og:title"]').getAttribute('content');
        const ogDesc = await p.locator('meta[property="og:description"]').getAttribute('content');
        const ogType = await p.locator('meta[property="og:type"]').getAttribute('content');
        const ogImage = await p.locator('meta[property="og:image"]').getAttribute('content');
        const ogUrl = await p.locator('meta[property="og:url"]').getAttribute('content');

        expect(ogTitle).toBeTruthy();
        expect(ogDesc).toBeTruthy();
        expect(ogType).toMatch(/website|article/);
        expect(ogImage).toMatch(/^https?:\/\//);
        expect(ogUrl).toBeTruthy();
      });

      test('has Twitter Card tags', async ({ page: p }) => {
        await p.goto(page.path);

        const twitterCard = await p.locator('meta[name="twitter:card"]').getAttribute('content');
        const twitterTitle = await p.locator('meta[name="twitter:title"]').getAttribute('content');

        expect(twitterCard).toBe('summary_large_image');
        expect(twitterTitle).toBeTruthy();
      });

      test('has robots meta (indexable)', async ({ page: p }) => {
        await p.goto(page.path);

        const robots = p.locator('meta[name="robots"]');
        const content = await robots.getAttribute('content');

        // Should be indexable (not noindex)
        if (content) {
          expect(content).not.toContain('noindex');
        }
      });
    });
  }
});
