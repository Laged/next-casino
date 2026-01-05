/**
 * Finnish Language & E-E-A-T Verification Tests
 *
 * Verifies Finnish language implementation and E-E-A-T (Experience, Expertise,
 * Authoritativeness, Trustworthiness) signals for Google ranking.
 */

import { expect, test } from '@playwright/test';

test.describe('Finnish Language Implementation', () => {
  test('HTML lang attribute is Finnish', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toMatch(/^fi/i);
  });

  test('hreflang tags are present', async ({ page }) => {
    await page.goto('/');
    const hreflang = page.locator('link[hreflang]');
    const count = await hreflang.count();
    expect(count).toBeGreaterThan(0);

    // Should have Finnish hreflang
    const fiHreflang = page.locator('link[hreflang="fi-FI"], link[hreflang="fi"]');
    expect(await fiHreflang.count()).toBeGreaterThan(0);
  });

  test('OG locale is Finnish', async ({ page }) => {
    await page.goto('/');
    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(ogLocale).toMatch(/fi/i);
  });
});

test.describe('E-E-A-T Signals', () => {
  test('has responsible gambling information', async ({ page }) => {
    await page.goto('/');

    // Check footer or dedicated section
    const content = await page.content();
    const hasResponsibleGambling =
      content.includes('18+') ||
      content.includes('vastuullinen pelaaminen') ||
      content.includes('pelihait') ||
      content.includes('peluuri');

    expect(hasResponsibleGambling).toBe(true);
  });

  test('has license information visible', async ({ page }) => {
    await page.goto('/');

    // License badges or text in footer
    const footer = page.locator('footer');
    const footerText = await footer.textContent();

    const hasLicenseInfo =
      footerText?.includes('MGA') ||
      footerText?.includes('Malta') ||
      footerText?.includes('lisenssi') ||
      footerText?.includes('Curacao');

    expect(hasLicenseInfo).toBe(true);
  });

  test('casino cards show license info', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const casinoCards = page.locator('[data-testid="casino-card"], article');
    const firstCard = casinoCards.first();

    if ((await firstCard.count()) > 0) {
      const cardText = await firstCard.textContent();
      const hasLicense =
        cardText?.includes('MGA') ||
        cardText?.includes('Malta') ||
        cardText?.includes('Viro') ||
        cardText?.includes('lisenssi');

      expect(hasLicense).toBe(true);
    }
  });

  test('has privacy policy link', async ({ page }) => {
    await page.goto('/');

    const privacyLink = page.locator('a[href*="tietosuoja"], a[href*="privacy"]');
    expect(await privacyLink.count()).toBeGreaterThan(0);
  });

  test('has terms and conditions link', async ({ page }) => {
    await page.goto('/');

    const termsLink = page.locator('a[href*="ehdot"], a[href*="terms"]');
    expect(await termsLink.count()).toBeGreaterThan(0);
  });
});
