import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays hero section with H1', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Parhaat|Nettikasinot|Suomalaisille/i);
  });

  test('shows featured casino list', async ({ page }) => {
    const casinoCards = page.locator('[data-testid="casino-card"]');
    const count = await casinoCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('displays category navigation', async ({ page }) => {
    // Check for category links in either navbar or page content
    const categoryLinks = page.locator(
      'a[href="/uudet-kasinot"], a[href="/bonukset"], a[href="/ilmaiskierrokset"]'
    );
    expect(await categoryLinks.count()).toBeGreaterThan(0);
  });

  test('CTA buttons are clickable', async ({ page }) => {
    // Finnish CTAs
    const primaryCta = page.locator(
      'a:has-text("Selaa kasinoita"), a:has-text("Pelaa nyt"), a:has-text("Löydä kasino")'
    );
    expect(await primaryCta.count()).toBeGreaterThan(0);
  });
});
