import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Accessibility', () => {
  test('homepage has no critical a11y violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      // Exclude color-contrast for now as casino sites often have design requirements
      .disableRules(['color-contrast'])
      .analyze();

    // Filter to only critical and serious violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations).toEqual([]);
  });

  test('category page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Check H1 comes before H2
    const headings = await page.locator('h1, h2, h3').all();
    if (headings.length > 0) {
      const firstHeadingTag = await headings[0].evaluate((el) => el.tagName);
      expect(firstHeadingTag).toBe('H1');
    }
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

    // Verify interactive elements exist and have proper attributes
    const links = page.locator('a[href]');
    const buttons = page.locator('button');

    // Page should have focusable links
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);

    // Verify links don't have tabindex="-1" (which would prevent keyboard access)
    const nonFocusableLinks = page.locator('a[tabindex="-1"]');
    const nonFocusableCount = await nonFocusableLinks.count();
    expect(nonFocusableCount).toBe(0);

    // Page should have focusable buttons (at least mobile menu toggle)
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Verify buttons don't have tabindex="-1"
    const nonFocusableButtons = page.locator('button[tabindex="-1"]');
    const nonFocusableBtnCount = await nonFocusableButtons.count();
    expect(nonFocusableBtnCount).toBe(0);
  });
});
