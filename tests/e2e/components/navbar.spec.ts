import { expect, test } from '@playwright/test';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo links to home', async ({ page }) => {
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();
  });

  test('mega-menu opens on hover (desktop)', async ({ page }) => {
    // Skip on mobile
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 1024) {
      test.skip();
    }

    const casinosNav = page.getByRole('button', { name: 'Casinos' });
    await casinosNav.hover();

    const megaMenu = page.locator('[data-testid="mega-menu"]');
    await expect(megaMenu).toBeVisible();
  });

  test('mobile menu toggles', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByRole('button', { name: /menu|toggle/i });
    await menuButton.click();

    const mobileNav = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileNav).toBeVisible();
  });
});
