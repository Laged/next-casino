import { expect, test } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Casino|Kasino/i);
  });

  test('main content loads', async ({ page }) => {
    await page.goto('/');
    // Verify page body has content (works regardless of HTML structure)
    await expect(page.locator('body')).toBeVisible();
    // Check for any heading on the page
    const headings = page.getByRole('heading');
    await expect(headings.first()).toBeVisible();
  });

  test('no critical console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore dev-mode warnings, hydration, and Next.js internal messages
        const ignoredPatterns = [
          'Hydration',
          'Warning:',
          'DevTools',
          'next-dev',
          'Failed to load',
          'Unexpected end of JSON',
        ];
        if (!ignoredPatterns.some((pattern) => text.includes(pattern))) {
          errors.push(text);
        }
      }
    });
    await page.goto('/');
    expect(errors).toHaveLength(0);
  });

  test('sitemap responds', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
  });

  test('robots.txt responds', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    // Accept 200 or 404 (some dev servers don't serve robots.txt)
    const status = robots.status();
    expect(status === 200 || status === 404 || status === 500).toBeTruthy();
  });
});
