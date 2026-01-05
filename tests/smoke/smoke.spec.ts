import { expect, test } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Casino|Kasino/i);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('/');
    expect(errors).toHaveLength(0);
  });

  test('API routes respond', async ({ request }) => {
    // Sitemap check
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();

    // Robots.txt check
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBeTruthy();
  });
});
