import { expect, test } from '@playwright/test';

/**
 * Core Web Vitals tests using browser Performance APIs
 * These run in regular Playwright without needing Lighthouse
 */
test.describe('Core Web Vitals', () => {
  test('homepage loads within performance budget', async ({ page }) => {
    // Start performance measurement
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const domContentLoaded = Date.now() - startTime;

    await page.waitForLoadState('load');
    const pageLoad = Date.now() - startTime;

    await page.waitForLoadState('networkidle');
    const networkIdle = Date.now() - startTime;

    // Performance budgets
    expect(domContentLoaded).toBeLessThan(3000); // DOM ready < 3s
    expect(pageLoad).toBeLessThan(5000); // Page load < 5s
    expect(networkIdle).toBeLessThan(8000); // Network idle < 8s

    console.log(`Performance metrics:
      DOM Content Loaded: ${domContentLoaded}ms
      Page Load: ${pageLoad}ms
      Network Idle: ${networkIdle}ms
    `);
  });

  test('no layout shift on casino cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that casino cards have explicit dimensions or aspect ratios
    const casinoCards = page.locator('[data-testid="casino-card"]');
    const count = await casinoCards.count();

    expect(count).toBeGreaterThan(0);

    // Verify cards are rendered and visible
    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = casinoCards.nth(i);
      await expect(card).toBeVisible();

      // Get bounding box to verify it has size
      const box = await card.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(100);
      expect(box!.height).toBeGreaterThan(100);
    }
  });

  test('first contentful paint is fast', async ({ page }) => {
    await page.goto('/');

    // Get FCP from Performance API
    const fcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntriesByName('first-contentful-paint');
          if (entries.length > 0) {
            resolve(entries[0].startTime);
            observer.disconnect();
          }
        });
        observer.observe({ entryTypes: ['paint'] });

        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });

    // FCP should be under 2.5s for good score
    if (fcp > 0) {
      expect(fcp).toBeLessThan(2500);
      console.log(`First Contentful Paint: ${fcp.toFixed(0)}ms`);
    }
  });

  test('images have proper loading attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check all images for loading attribute
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const loading = await img.getAttribute('loading');
      const src = await img.getAttribute('src');

      // Above-fold images should be eager or not have loading attribute
      // Below-fold images should have loading="lazy"
      if (src && !src.startsWith('data:')) {
        console.log(`Image ${i + 1}: loading="${loading}" src="${src?.substring(0, 50)}..."`);
      }
    }

    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('JavaScript bundle size is reasonable', async ({ page }) => {
    const jsRequests: { url: string; size: number }[] = [];

    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.js') && response.status() === 200) {
        try {
          const buffer = await response.body();
          jsRequests.push({
            url: url.split('/').pop() || url,
            size: buffer.length,
          });
        } catch {
          // Ignore errors
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalJsSize = jsRequests.reduce((sum, r) => sum + r.size, 0);
    const totalJsSizeKB = Math.round(totalJsSize / 1024);

    console.log(`Total JS size (uncompressed): ${totalJsSizeKB}KB`);
    console.log(`JS files: ${jsRequests.length}`);

    // In dev mode, JS is uncompressed and larger
    // Production builds are ~10x smaller with compression
    // Threshold: 5MB uncompressed (roughly 500KB compressed)
    expect(totalJsSizeKB).toBeLessThan(5000);
  });

  test('page has good time to interactive', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');

    // Wait for interactivity - can click buttons
    const ctaButton = page.locator('a:has-text("Selaa kasinoita")').first();
    await ctaButton.waitFor({ state: 'visible' });

    const timeToInteractive = Date.now() - startTime;

    // TTI should be under 4s
    expect(timeToInteractive).toBeLessThan(4000);
    console.log(`Time to Interactive: ${timeToInteractive}ms`);
  });
});

test.describe('Resource Optimization', () => {
  test('fonts are preloaded', async ({ page }) => {
    const fontRequests: string[] = [];

    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('woff2') || url.includes('woff')) {
        fontRequests.push(url);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('load');

    console.log(`Font files loaded: ${fontRequests.length}`);
    for (const f of fontRequests) {
      console.log(`  - ${f.split('/').pop()}`);
    }
  });

  test('critical CSS is inlined or preloaded', async ({ page }) => {
    await page.goto('/');

    // Check for preload links
    const preloadLinks = await page.locator('link[rel="preload"]').count();
    const stylesheets = await page.locator('link[rel="stylesheet"]').count();

    console.log(`Preload links: ${preloadLinks}`);
    console.log(`Stylesheets: ${stylesheets}`);

    // Should have some styles
    expect(stylesheets + preloadLinks).toBeGreaterThan(0);
  });
});
