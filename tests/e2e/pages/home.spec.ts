import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays hero section with H1', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Parhaat|Casino|Kasino/i);
  });

  test('shows featured casino list', async ({ page }) => {
    const casinoCards = page.locator('[data-testid="casino-card"]');
    const count = await casinoCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('displays category navigation', async ({ page }) => {
    const categoryLinks = page.locator('a[href*="/uudet-kasinot"], a[href*="/bonukset"]');
    await expect(categoryLinks.first()).toBeVisible();
  });

  test('CTA buttons are clickable', async ({ page }) => {
    const primaryCta = page.getByRole('link', { name: /selaa|pelaa|kasinolle/i });
    await expect(primaryCta.first()).toBeVisible();
  });
});
