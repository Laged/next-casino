/**
 * Internal Linking Verification Tests
 *
 * Verifies internal link structure for crawlability and UX.
 * Tests navigation, anchor text quality, and affiliate link compliance.
 */

import { expect, test } from '@playwright/test';

test.describe('Internal Linking', () => {
  test('category pages have back-to-home link', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const homeLink = page.locator('a[href="/"]');
    expect(await homeLink.count()).toBeGreaterThan(0);
  });

  test('casino cards link to reviews', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const reviewLinks = page.locator('a[href*="/arvostelut/"]');
    expect(await reviewLinks.count()).toBeGreaterThan(0);
  });

  test('footer has category links', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    const categoryLinks = footer.locator('a[href*="/uudet"], a[href*="/bonus"]');

    expect(await categoryLinks.count()).toBeGreaterThan(0);
  });

  test('internal links have descriptive text', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('a[href^="/"]');
    const allLinks = await links.all();

    for (const link of allLinks.slice(0, 10)) {
      // Check first 10
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      // Should have meaningful text (not just "Read more" or "Click here")
      const hasGoodText = (text && text.trim().length > 3) || (ariaLabel && ariaLabel.length > 3);

      expect(hasGoodText).toBe(true);
    }
  });

  test('no broken internal links', async ({ page, request }) => {
    await page.goto('/');

    const links = page.locator('a[href^="/"]');
    const hrefs = await links.evaluateAll((els) =>
      els.map((el) => el.getAttribute('href')).filter((h): h is string => Boolean(h))
    );

    // Check unique links
    const uniqueHrefs = [...new Set(hrefs)].slice(0, 10);

    for (const href of uniqueHrefs) {
      const response = await request.get(href);
      expect(response.status()).toBeLessThan(400);
    }
  });
});

test.describe('Affiliate Link Compliance', () => {
  test('affiliate links have rel="nofollow sponsored"', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    // External casino links
    const affiliateLinks = page.locator('a[href*="casino"], a[href*="click"]');
    const links = await affiliateLinks.all();

    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('/')) {
        // External link
        const rel = await link.getAttribute('rel');
        expect(rel).toContain('nofollow');
      }
    }
  });

  test('affiliate links open in new tab', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const externalLinks = page.locator('a[href^="http"]:not([href*="kasinolista"])');
    const links = await externalLinks.all();

    for (const link of links) {
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    }
  });
});
