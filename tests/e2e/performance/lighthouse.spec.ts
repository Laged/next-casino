import { expect, test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

// Performance thresholds
const THRESHOLDS = {
  performance: 80,
  accessibility: 90,
  'best-practices': 90,
  seo: 90,
};

// Skip in CI for now - Lighthouse requires Chrome and special setup
// Run locally with: bun run test:perf
const describeOrSkip = process.env.CI ? test.describe.skip : test.describe;

describeOrSkip('Lighthouse Performance Audits', () => {
  test.setTimeout(120000); // 2 minutes per test

  test('homepage meets performance thresholds', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const result = await playAudit({
      page,
      port: 9222,
      thresholds: THRESHOLDS,
      reports: {
        formats: { html: true, json: true },
        name: 'homepage-lighthouse',
        directory: 'lighthouse-reports',
      },
    });

    const perfScore = (result.lhr.categories.performance?.score ?? 0) * 100;
    const a11yScore = (result.lhr.categories.accessibility?.score ?? 0) * 100;
    const bpScore = (result.lhr.categories['best-practices']?.score ?? 0) * 100;
    const seoScore = (result.lhr.categories.seo?.score ?? 0) * 100;

    expect(perfScore).toBeGreaterThanOrEqual(THRESHOLDS.performance);
    expect(a11yScore).toBeGreaterThanOrEqual(THRESHOLDS.accessibility);
    expect(bpScore).toBeGreaterThanOrEqual(THRESHOLDS['best-practices']);
    expect(seoScore).toBeGreaterThanOrEqual(THRESHOLDS.seo);

    await context.close();
  });

  test('uudet-kasinot page meets performance thresholds', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/uudet-kasinot');
    await page.waitForLoadState('networkidle');

    const result = await playAudit({
      page,
      port: 9222,
      thresholds: THRESHOLDS,
      reports: {
        formats: { html: true, json: true },
        name: 'uudet-kasinot-lighthouse',
        directory: 'lighthouse-reports',
      },
    });

    const perfScore = (result.lhr.categories.performance?.score ?? 0) * 100;
    expect(perfScore).toBeGreaterThanOrEqual(THRESHOLDS.performance);

    await context.close();
  });
});
