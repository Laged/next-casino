import { type Page, expect } from '@playwright/test';

/**
 * Wait for page to be fully loaded (no network requests)
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

/**
 * Check if element exists without throwing
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector);
  return (await element.count()) > 0;
}

/**
 * Get all console errors from page
 */
export async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

/**
 * Verify no broken images on page
 */
export async function verifyImages(page: Page) {
  const images = await page.locator('img').all();
  for (const img of images) {
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  }
}

/**
 * Verify all internal links are valid
 */
export async function verifyInternalLinks(page: Page, _baseUrl: string) {
  const links = await page.locator('a[href^="/"]').all();
  const hrefs = await Promise.all(links.map((link) => link.getAttribute('href')));

  // Check each internal link
  for (const href of hrefs.filter(Boolean)) {
    const response = await page.request.get(href!);
    expect(response.status()).toBeLessThan(400);
  }
}
