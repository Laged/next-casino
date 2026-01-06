/**
 * Content Verification Tests
 *
 * These tests verify that the landing page content matches the Finnish
 * casino recommendation website (Kasinolista) with Finnish content.
 */

import { expect, test } from '@playwright/test';

test.describe('Content Verification - Root Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Landing page displays Finnish content', async ({ page }) => {
    const h1 = page.locator('h1');
    const h1Text = await h1.textContent();

    // Title should be in Finnish
    const hasFinnishTitle =
      h1Text?.includes('Parhaat') ||
      h1Text?.includes('Nettikasinot') ||
      h1Text?.includes('Suomalaisille');
    expect(hasFinnishTitle).toBe(true);
  });

  test('CTA buttons are in Finnish', async ({ page }) => {
    // Finnish CTAs should exist
    const finnishCta = page.locator(
      'a:has-text("Selaa kasinoita"), a:has-text("Katso bonukset"), a:has-text("Pelaa nyt")'
    );
    expect(await finnishCta.count()).toBeGreaterThan(0);
  });

  test('Page shows casino recommendations with data-testid', async ({ page }) => {
    // Casino recommendation cards should exist
    const casinoCards = page.locator('[data-testid="casino-card"]');
    expect(await casinoCards.count()).toBeGreaterThan(0);
  });
});

test.describe('Content Verification - Finnish Category Pages', () => {
  test('Finnish category pages are accessible', async ({ page }) => {
    const response = await page.goto('/uudet-kasinot');
    expect(response?.status()).toBe(200);

    const h1 = page.locator('h1');
    const h1Text = await h1.textContent();
    expect(h1Text?.toLowerCase()).toContain('uudet');
  });

  test('Bonukset page is accessible', async ({ page }) => {
    const response = await page.goto('/bonukset');
    expect(response?.status()).toBe(200);
  });

  test('Ilmaiskierrokset page is accessible', async ({ page }) => {
    const response = await page.goto('/ilmaiskierrokset');
    expect(response?.status()).toBe(200);
  });
});

test.describe('Navigation Link Verification', () => {
  test('Navbar links point to Finnish URL patterns', async ({ page }) => {
    await page.goto('/');

    // Check for Finnish link patterns in navbar
    const finnishLinks = page.locator(
      'a[href="/uudet-kasinot"], a[href="/bonukset"], a[href="/ilmaiskierrokset"]'
    );
    expect(await finnishLinks.count()).toBeGreaterThan(0);
  });

  test('Verify internal links return valid responses', async ({ page }) => {
    await page.goto('/');

    // Collect all internal links
    const links = await page.locator('a[href^="/"]').all();
    const testedLinks: Array<{ href: string; status: number }> = [];

    for (const link of links.slice(0, 10)) {
      const href = await link.getAttribute('href');
      if (href) {
        const response = await page.request.get(href);
        testedLinks.push({
          href,
          status: response.status(),
        });
      }
    }

    // No broken links
    const brokenLinks = testedLinks.filter((l) => l.status >= 400);
    expect(brokenLinks).toHaveLength(0);
  });
});

test.describe('Route Configuration', () => {
  test('Finnish routes return 200', async ({ page }) => {
    const routes = [
      { path: '/', expected: 'Root page' },
      { path: '/uudet-kasinot', expected: 'Finnish: New casinos category' },
      { path: '/bonukset', expected: 'Finnish: Bonuses category' },
      { path: '/ilmaiskierrokset', expected: 'Finnish: Free spins category' },
      { path: '/arvostelut/kasino-yksi', expected: 'Finnish: Casino review' },
      { path: '/tietosuoja', expected: 'Finnish: Privacy policy' },
      { path: '/ehdot', expected: 'Finnish: Terms' },
    ];

    for (const route of routes) {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
    }
  });
});
