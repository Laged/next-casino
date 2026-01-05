import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Accessibility', () => {
  test('homepage has no critical a11y violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('category page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Check H1 comes before H2
    const headings = await page.locator('h1, h2, h3').all();
    const firstH1Index = await headings.findIndex(
      async (h) => (await h.evaluate((el) => el.tagName)) === 'H1'
    );
    expect(firstH1Index).toBe(0);
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const allImages = await images.all();

    for (const img of allImages) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through focusable elements
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(firstFocused);
  });
});
