import { expect, test } from '@playwright/test';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo links to home', async ({ page }) => {
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();
  });

  test('shows navigation links (desktop)', async ({ page }) => {
    // Ensure desktop viewport for this test
    await page.setViewportSize({ width: 1280, height: 720 });

    // Check for Finnish navigation links in the navbar specifically
    const nav = page.locator('header nav');
    const uudetLink = nav.locator('a[href="/uudet-kasinot"]').first();
    const bonuksetLink = nav.locator('a[href="/bonukset"]').first();

    await expect(uudetLink).toBeVisible();
    await expect(bonuksetLink).toBeVisible();
  });

  test('mobile menu toggles', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Find and click the menu button by aria-label
    const menuButton = page.locator('button[aria-label="Valikko"]');
    await menuButton.click();

    // Mobile menu should show navigation links - use text match for specificity
    const mobileNavLink = page.getByRole('navigation').getByRole('link', { name: 'Uudet Kasinot' });
    await expect(mobileNavLink).toBeVisible();
  });
});
