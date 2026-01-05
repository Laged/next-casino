/**
 * Heading Hierarchy Verification Tests
 *
 * Verifies proper H1-H6 structure for accessibility and SEO.
 * Tests single H1, proper ordering, and Finnish keyword presence.
 */

import { expect, test } from '@playwright/test';

const testPages = ['/', '/uudet-kasinot', '/bonukset', '/ilmaiskierrokset'];

test.describe('Heading Hierarchy', () => {
  for (const pagePath of testPages) {
    test.describe(pagePath, () => {
      test('has exactly one H1', async ({ page }) => {
        await page.goto(pagePath);
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);
      });

      test('H1 is not empty', async ({ page }) => {
        await page.goto(pagePath);
        const h1 = page.locator('h1');
        const text = await h1.textContent();
        expect(text?.trim().length).toBeGreaterThan(5);
      });

      test('H1 comes before H2', async ({ page }) => {
        await page.goto(pagePath);

        const headings = await page.locator('h1, h2').all();
        if (headings.length > 1) {
          const firstTag = await headings[0].evaluate((el) => el.tagName);
          expect(firstTag).toBe('H1');
        }
      });

      test('no heading level skipping', async ({ page }) => {
        await page.goto(pagePath);

        const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
        let prevLevel = 0;

        for (const heading of headings) {
          const tag = await heading.evaluate((el) => el.tagName);
          const level = Number.parseInt(tag.replace('H', ''));

          // Should not skip more than one level
          if (prevLevel > 0) {
            expect(level - prevLevel).toBeLessThanOrEqual(1);
          }
          prevLevel = level;
        }
      });

      test('H1 contains relevant keywords (Finnish)', async ({ page }) => {
        await page.goto(pagePath);
        const h1 = await page.locator('h1').textContent();

        // Finnish casino-related keywords
        const keywords = [
          'kasino',
          'nettikasino',
          'bonus',
          'ilmaiskierr',
          'parhaat',
          'uudet',
          'pikakas',
          'pelaa',
        ];

        const h1Lower = h1?.toLowerCase() || '';
        const hasKeyword = keywords.some((kw) => h1Lower.includes(kw));
        expect(hasKeyword).toBe(true);
      });
    });
  }
});
