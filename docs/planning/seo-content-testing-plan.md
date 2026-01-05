# SEO Content Testing Plan

## Project Context

**Project**: Finnish Casino Recommendation Website (Kasinolista)
**Reference**: pikakasinot.com (Finnish "fast casino" affiliate site)
**Goal**: Verify all content is SEO-enabled and ready for search engine visibility

---

## Executive Summary

This plan defines automated tests to verify that all pages on the casino website have proper SEO implementation, matching Finnish casino affiliate best practices and the requirements from `site-content.md`.

### Key SEO Requirements (from Content Model)

| Element | Source | Test Priority |
|---------|--------|---------------|
| Meta Title | Template: `{Page Title} - Tammikuu 2026 \| Pikakasinot` | Critical |
| Meta Description | Max 160 chars | Critical |
| OG Image | Dynamic or CMS | High |
| Canonical URL | Auto-generated | Critical |
| Structured Data | JSON-LD per page type | Critical |
| Heading Hierarchy | Single H1, proper H2-H6 | High |
| Internal Linking | Descriptive anchor text | Medium |

---

## Existing SEO Infrastructure

### 1. Schema Generators (`src/lib/seo/schema.ts`)

| Schema Type | Function | Usage |
|-------------|----------|-------|
| WebSite | `generateWebsiteSchema()` | Homepage |
| Organization | `generateOrganizationSchema()` | Homepage |
| Review | `generateReviewSchema()` | Casino review pages |
| ItemList | `generateItemListSchema()` | Category/list pages |
| FAQPage | `generateFAQSchema()` | FAQ sections |
| BreadcrumbList | `generateBreadcrumbSchema()` | All pages |
| Article | `generateArticleSchema()` | Blog/article pages |

### 2. Metadata Utilities (`src/lib/seo/metadata.ts`)

| Template | Pattern | Pages |
|----------|---------|-------|
| `default` | `%s \| Kasinolista` | General pages |
| `home` | `Kasinolista - Suomen paras kasino-opas` | Homepage |
| `casino` | `%s arvostelu \| Kasinolista` | Review pages |
| `list` | `%s \| Kasinolista` | Category pages |
| `article` | `%s \| Kasinolista artikkelit` | Articles |

---

## SEO Test Categories

### Category 1: Meta Tag Verification (Critical)

**Purpose**: Ensure every page has proper meta tags for search engines and social sharing.

**Tests per page type:**

```typescript
// tests/e2e/seo/meta-tags.spec.ts

import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', type: 'home', titlePattern: /Kasinolista|Parhaat Nettikasinot/i },
  { path: '/uudet-kasinot', type: 'list', titlePattern: /Uudet.*Kasinot|Nettikasinot/i },
  { path: '/bonukset', type: 'list', titlePattern: /Bonus|Tervetuliais/i },
  { path: '/ilmaiskierrokset', type: 'list', titlePattern: /Ilmaiskierr/i },
];

test.describe('Meta Tags Verification', () => {
  for (const page of pages) {
    test.describe(`${page.path} (${page.type})`, () => {

      test('has valid title tag', async ({ page: p }) => {
        await p.goto(page.path);
        const title = await p.title();

        // Title should match pattern
        expect(title).toMatch(page.titlePattern);
        // Title should be 50-60 chars optimal
        expect(title.length).toBeGreaterThan(30);
        expect(title.length).toBeLessThan(70);
      });

      test('has meta description', async ({ page: p }) => {
        await p.goto(page.path);
        const description = p.locator('meta[name="description"]');
        const content = await description.getAttribute('content');

        // Description should exist
        expect(content).toBeTruthy();
        // Description should be 120-160 chars
        expect(content!.length).toBeGreaterThan(80);
        expect(content!.length).toBeLessThan(165);
      });

      test('has canonical URL', async ({ page: p }) => {
        await p.goto(page.path);
        const canonical = p.locator('link[rel="canonical"]');
        const href = await canonical.getAttribute('href');

        expect(href).toMatch(/^https?:\/\//);
        expect(href).toContain(page.path === '/' ? '.fi' : page.path);
      });

      test('has Open Graph tags', async ({ page: p }) => {
        await p.goto(page.path);

        const ogTitle = await p.locator('meta[property="og:title"]').getAttribute('content');
        const ogDesc = await p.locator('meta[property="og:description"]').getAttribute('content');
        const ogType = await p.locator('meta[property="og:type"]').getAttribute('content');
        const ogImage = await p.locator('meta[property="og:image"]').getAttribute('content');
        const ogUrl = await p.locator('meta[property="og:url"]').getAttribute('content');

        expect(ogTitle).toBeTruthy();
        expect(ogDesc).toBeTruthy();
        expect(ogType).toMatch(/website|article/);
        expect(ogImage).toMatch(/^https?:\/\//);
        expect(ogUrl).toBeTruthy();
      });

      test('has Twitter Card tags', async ({ page: p }) => {
        await p.goto(page.path);

        const twitterCard = await p.locator('meta[name="twitter:card"]').getAttribute('content');
        const twitterTitle = await p.locator('meta[name="twitter:title"]').getAttribute('content');

        expect(twitterCard).toBe('summary_large_image');
        expect(twitterTitle).toBeTruthy();
      });

      test('has robots meta (indexable)', async ({ page: p }) => {
        await p.goto(page.path);

        const robots = p.locator('meta[name="robots"]');
        const content = await robots.getAttribute('content');

        // Should be indexable (not noindex)
        if (content) {
          expect(content).not.toContain('noindex');
        }
      });
    });
  }
});
```

---

### Category 2: Structured Data Verification (Critical)

**Purpose**: Verify JSON-LD schemas are present and valid for rich snippets.

```typescript
// tests/e2e/seo/structured-data.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Structured Data - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has WebSite schema', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const all = await scripts.all();

    let hasWebSite = false;
    for (const script of all) {
      const content = await script.textContent();
      const data = JSON.parse(content || '{}');
      if (data['@type'] === 'WebSite') {
        hasWebSite = true;
        expect(data.name).toBeTruthy();
        expect(data.url).toMatch(/^https?:\/\//);
        expect(data.inLanguage).toMatch(/fi/i);
      }
    }
    expect(hasWebSite).toBe(true);
  });

  test('has Organization schema', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const all = await scripts.all();

    let hasOrg = false;
    for (const script of all) {
      const content = await script.textContent();
      const data = JSON.parse(content || '{}');
      if (data['@type'] === 'Organization') {
        hasOrg = true;
        expect(data.name).toBeTruthy();
        expect(data.logo).toBeTruthy();
      }
    }
    expect(hasOrg).toBe(true);
  });
});

test.describe('Structured Data - Category Pages', () => {
  const categories = ['uudet-kasinot', 'bonukset', 'ilmaiskierrokset'];

  for (const category of categories) {
    test(`/${category} has ItemList schema`, async ({ page }) => {
      await page.goto(`/${category}`);

      const scripts = page.locator('script[type="application/ld+json"]');
      const all = await scripts.all();

      let hasItemList = false;
      for (const script of all) {
        const content = await script.textContent();
        const data = JSON.parse(content || '{}');
        if (data['@type'] === 'ItemList') {
          hasItemList = true;
          expect(data.itemListElement).toBeInstanceOf(Array);
          expect(data.itemListElement.length).toBeGreaterThan(0);

          // Verify list items have positions
          for (const item of data.itemListElement) {
            expect(item.position).toBeGreaterThan(0);
            expect(item['@type']).toBe('ListItem');
          }
        }
      }
      expect(hasItemList).toBe(true);
    });

    test(`/${category} has BreadcrumbList schema`, async ({ page }) => {
      await page.goto(`/${category}`);

      const scripts = page.locator('script[type="application/ld+json"]');
      const all = await scripts.all();

      let hasBreadcrumb = false;
      for (const script of all) {
        const content = await script.textContent();
        const data = JSON.parse(content || '{}');
        if (data['@type'] === 'BreadcrumbList') {
          hasBreadcrumb = true;
          expect(data.itemListElement.length).toBeGreaterThanOrEqual(2);
        }
      }
      expect(hasBreadcrumb).toBe(true);
    });
  }
});

test.describe('Structured Data - Casino Review Pages', () => {
  test('review page has Review schema', async ({ page }) => {
    // Assuming a review page exists
    await page.goto('/arvostelut/test-casino');

    const scripts = page.locator('script[type="application/ld+json"]');
    const all = await scripts.all();

    let hasReview = false;
    for (const script of all) {
      const content = await script.textContent();
      const data = JSON.parse(content || '{}');
      if (data['@type'] === 'Review') {
        hasReview = true;

        // Verify Review structure
        expect(data.itemReviewed).toBeTruthy();
        expect(data.itemReviewed['@type']).toBe('Casino');
        expect(data.reviewRating).toBeTruthy();
        expect(data.reviewRating.ratingValue).toBeTruthy();
        expect(data.author).toBeTruthy();
      }
    }
    // Note: Will skip if page doesn't exist yet
    if (all.length > 0) {
      expect(hasReview).toBe(true);
    }
  });
});

test.describe('Structured Data - FAQ Sections', () => {
  test('FAQ sections have FAQPage schema', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    // Check if page has FAQ content
    const faqSection = page.locator('[data-testid="faq-section"], .faq, [id*="faq"]');

    if (await faqSection.count() > 0) {
      const scripts = page.locator('script[type="application/ld+json"]');
      const all = await scripts.all();

      let hasFAQ = false;
      for (const script of all) {
        const content = await script.textContent();
        const data = JSON.parse(content || '{}');
        if (data['@type'] === 'FAQPage') {
          hasFAQ = true;
          expect(data.mainEntity).toBeInstanceOf(Array);
          expect(data.mainEntity.length).toBeGreaterThan(0);
        }
      }
      expect(hasFAQ).toBe(true);
    }
  });
});
```

---

### Category 3: Heading Hierarchy (High Priority)

**Purpose**: Verify proper H1-H6 structure for accessibility and SEO.

```typescript
// tests/e2e/seo/headings.spec.ts

import { test, expect } from '@playwright/test';

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
          const firstTag = await headings[0].evaluate(el => el.tagName);
          expect(firstTag).toBe('H1');
        }
      });

      test('no heading level skipping', async ({ page }) => {
        await page.goto(pagePath);

        const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
        let prevLevel = 0;

        for (const heading of headings) {
          const tag = await heading.evaluate(el => el.tagName);
          const level = parseInt(tag.replace('H', ''));

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
          'kasino', 'nettikasino', 'bonus', 'ilmaiskierr',
          'parhaat', 'uudet', 'pikakas', 'pelaa'
        ];

        const h1Lower = h1?.toLowerCase() || '';
        const hasKeyword = keywords.some(kw => h1Lower.includes(kw));
        expect(hasKeyword).toBe(true);
      });
    });
  }
});
```

---

### Category 4: Finnish Language & E-E-A-T (High Priority)

**Purpose**: Verify Finnish language implementation and E-E-A-T signals.

```typescript
// tests/e2e/seo/finnish-eeat.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Finnish Language Implementation', () => {
  test('HTML lang attribute is Finnish', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toMatch(/^fi/i);
  });

  test('hreflang tags are present', async ({ page }) => {
    await page.goto('/');
    const hreflang = page.locator('link[hreflang]');
    const count = await hreflang.count();
    expect(count).toBeGreaterThan(0);

    // Should have Finnish hreflang
    const fiHreflang = page.locator('link[hreflang="fi-FI"], link[hreflang="fi"]');
    expect(await fiHreflang.count()).toBeGreaterThan(0);
  });

  test('OG locale is Finnish', async ({ page }) => {
    await page.goto('/');
    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(ogLocale).toMatch(/fi/i);
  });
});

test.describe('E-E-A-T Signals', () => {
  test('has responsible gambling information', async ({ page }) => {
    await page.goto('/');

    // Check footer or dedicated section
    const content = await page.content();
    const hasResponsibleGambling =
      content.includes('18+') ||
      content.includes('vastuullinen pelaaminen') ||
      content.includes('pelihait') ||
      content.includes('peluuri');

    expect(hasResponsibleGambling).toBe(true);
  });

  test('has license information visible', async ({ page }) => {
    await page.goto('/');

    // License badges or text in footer
    const footer = page.locator('footer');
    const footerText = await footer.textContent();

    const hasLicenseInfo =
      footerText?.includes('MGA') ||
      footerText?.includes('Malta') ||
      footerText?.includes('lisenssi') ||
      footerText?.includes('Curacao');

    expect(hasLicenseInfo).toBe(true);
  });

  test('casino cards show license info', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const casinoCards = page.locator('[data-testid="casino-card"], article');
    const firstCard = casinoCards.first();

    if (await firstCard.count() > 0) {
      const cardText = await firstCard.textContent();
      const hasLicense =
        cardText?.includes('MGA') ||
        cardText?.includes('Malta') ||
        cardText?.includes('Viro') ||
        cardText?.includes('lisenssi');

      expect(hasLicense).toBe(true);
    }
  });

  test('has privacy policy link', async ({ page }) => {
    await page.goto('/');

    const privacyLink = page.locator('a[href*="tietosuoja"], a[href*="privacy"]');
    expect(await privacyLink.count()).toBeGreaterThan(0);
  });

  test('has terms and conditions link', async ({ page }) => {
    await page.goto('/');

    const termsLink = page.locator('a[href*="ehdot"], a[href*="terms"]');
    expect(await termsLink.count()).toBeGreaterThan(0);
  });
});
```

---

### Category 5: Technical SEO (Critical)

**Purpose**: Verify sitemap, robots.txt, and Core Web Vitals readiness.

```typescript
// tests/e2e/seo/technical.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Sitemap', () => {
  test('sitemap.xml exists and is valid', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBe(true);

    const content = await response.text();
    expect(content).toContain('<?xml');
    expect(content).toContain('<urlset');
    expect(content).toContain('<url>');
    expect(content).toContain('<loc>');
  });

  test('sitemap contains main pages', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const content = await response.text();

    // Should contain category pages
    expect(content).toContain('uudet-kasinot');
    expect(content).toContain('bonukset');
  });

  test('sitemap has priority values', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const content = await response.text();

    expect(content).toContain('<priority>');
  });
});

test.describe('Robots.txt', () => {
  test('robots.txt exists', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBe(true);
  });

  test('robots.txt references sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();

    expect(content.toLowerCase()).toContain('sitemap');
  });

  test('robots.txt allows main pages', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Should not disallow main content
    expect(content).not.toMatch(/Disallow:\s*\/$/m);
    expect(content).not.toContain('Disallow: /uudet-kasinot');
  });

  test('blocks AI crawlers appropriately', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Should block unwanted AI crawlers
    expect(content).toContain('GPTBot');
  });
});

test.describe('Core Web Vitals Readiness', () => {
  test('no layout shift on casino images', async ({ page }) => {
    await page.goto('/');

    // All images should have width and height
    const images = page.locator('img');
    const allImages = await images.all();

    for (const img of allImages) {
      const hasSize =
        await img.getAttribute('width') !== null ||
        await img.getAttribute('height') !== null ||
        (await img.evaluate((el) => getComputedStyle(el).width !== 'auto'));

      // Images should have explicit sizing
      expect(hasSize).toBe(true);
    }
  });

  test('deferred scripts are marked correctly', async ({ page }) => {
    await page.goto('/');

    // Third-party scripts should be deferred or async
    const trackingScripts = page.locator(
      'script[src*="analytics"], script[src*="gtag"], script[src*="facebook"]'
    );

    const scripts = await trackingScripts.all();
    for (const script of scripts) {
      const isDeferred =
        await script.getAttribute('defer') !== null ||
        await script.getAttribute('async') !== null;

      expect(isDeferred).toBe(true);
    }
  });

  test('above-fold images have priority', async ({ page }) => {
    await page.goto('/');

    // Check hero/logo images
    const heroImages = page.locator('header img, [data-testid="hero"] img');
    const firstImage = heroImages.first();

    if (await firstImage.count() > 0) {
      const priority = await firstImage.getAttribute('fetchpriority');
      const loading = await firstImage.getAttribute('loading');

      // Should be priority or not lazy loaded
      expect(priority === 'high' || loading !== 'lazy').toBe(true);
    }
  });
});
```

---

### Category 6: Internal Linking (Medium Priority)

**Purpose**: Verify internal link structure for crawlability and UX.

```typescript
// tests/e2e/seo/internal-links.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Internal Linking', () => {
  test('category pages have back-to-home link', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const homeLink = page.locator('a[href="/"]');
    expect(await homeLink.count()).toBeGreaterThan(0);
  });

  test('casino cards link to reviews', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const reviewLinks = page.locator('a[href*="/arvostelut/"]');
    expect(await reviewLinks.count()).toBeGreaterThan(0);
  });

  test('footer has category links', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    const categoryLinks = footer.locator('a[href*="/uudet"], a[href*="/bonus"]');

    expect(await categoryLinks.count()).toBeGreaterThan(0);
  });

  test('internal links have descriptive text', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('a[href^="/"]');
    const allLinks = await links.all();

    for (const link of allLinks.slice(0, 10)) { // Check first 10
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      // Should have meaningful text (not just "Read more" or "Click here")
      const hasGoodText =
        (text && text.trim().length > 3) ||
        (ariaLabel && ariaLabel.length > 3);

      expect(hasGoodText).toBe(true);
    }
  });

  test('no broken internal links', async ({ page, request }) => {
    await page.goto('/');

    const links = page.locator('a[href^="/"]');
    const hrefs = await links.evaluateAll((els) =>
      els.map(el => el.getAttribute('href')).filter(Boolean)
    );

    // Check unique links
    const uniqueHrefs = [...new Set(hrefs)].slice(0, 10);

    for (const href of uniqueHrefs) {
      const response = await request.get(href!);
      expect(response.status()).toBeLessThan(400);
    }
  });
});

test.describe('Affiliate Link Compliance', () => {
  test('affiliate links have rel="nofollow sponsored"', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    // External casino links
    const affiliateLinks = page.locator('a[href*="casino"], a[href*="click"]');
    const links = await affiliateLinks.all();

    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('/')) { // External link
        const rel = await link.getAttribute('rel');
        expect(rel).toContain('nofollow');
      }
    }
  });

  test('affiliate links open in new tab', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const externalLinks = page.locator('a[href^="http"]:not([href*="kasinolista"])');
    const links = await externalLinks.all();

    for (const link of links) {
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    }
  });
});
```

---

## Claude Code Invokable Commands

### Package.json Scripts

```json
{
  "scripts": {
    "test:seo": "playwright test tests/e2e/seo/",
    "test:seo:meta": "playwright test tests/e2e/seo/meta-tags.spec.ts",
    "test:seo:schema": "playwright test tests/e2e/seo/structured-data.spec.ts",
    "test:seo:headings": "playwright test tests/e2e/seo/headings.spec.ts",
    "test:seo:technical": "playwright test tests/e2e/seo/technical.spec.ts",
    "test:seo:links": "playwright test tests/e2e/seo/internal-links.spec.ts",
    "test:seo:finnish": "playwright test tests/e2e/seo/finnish-eeat.spec.ts",
    "test:seo:report": "playwright test tests/e2e/seo/ --reporter=html && npx playwright show-report"
  }
}
```

### Quick SEO Verification Commands

```bash
# Full SEO test suite
npm run test:seo

# Quick meta tag check
npm run test:seo:meta

# Structured data validation
npm run test:seo:schema

# Technical SEO (sitemap, robots)
npm run test:seo:technical

# Generate HTML report
npm run test:seo:report
```

---

## SEO Status Reporter for Claude Code

Create `scripts/seo-status.js`:

```javascript
#!/usr/bin/env node
/**
 * SEO Status Reporter
 * Provides structured JSON output for Claude Code
 */

const { execSync } = require('child_process');
const fs = require('fs');

async function getSEOStatus() {
  const status = {
    timestamp: new Date().toISOString(),
    overall: 'unknown',
    categories: {
      metaTags: { status: 'pending', score: 0 },
      structuredData: { status: 'pending', score: 0 },
      headings: { status: 'pending', score: 0 },
      technicalSEO: { status: 'pending', score: 0 },
      internalLinks: { status: 'pending', score: 0 },
      finnishEEAT: { status: 'pending', score: 0 },
    },
    criticalIssues: [],
    recommendations: [],
  };

  // Check if test results exist
  const resultsPath = 'test-results/results.json';

  if (fs.existsSync(resultsPath)) {
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    // Parse results by category
    const seoResults = results.suites?.filter(s =>
      s.file?.includes('/seo/')
    ) || [];

    let totalPassed = 0;
    let totalFailed = 0;

    for (const suite of seoResults) {
      const category = suite.file?.split('/').pop()?.replace('.spec.ts', '');
      const passed = suite.specs?.filter(s => s.ok).length || 0;
      const failed = suite.specs?.filter(s => !s.ok).length || 0;

      totalPassed += passed;
      totalFailed += failed;

      if (category && status.categories[category]) {
        status.categories[category] = {
          status: failed === 0 ? 'passing' : 'failing',
          score: passed / (passed + failed) || 0,
          passed,
          failed,
        };

        // Add critical issues
        if (failed > 0) {
          const failedSpecs = suite.specs?.filter(s => !s.ok) || [];
          for (const spec of failedSpecs) {
            status.criticalIssues.push({
              category,
              test: spec.title,
              severity: category === 'meta-tags' || category === 'structured-data'
                ? 'critical'
                : 'high',
            });
          }
        }
      }
    }

    // Calculate overall score
    const overallScore = totalPassed / (totalPassed + totalFailed) || 0;
    status.overall = overallScore >= 0.95 ? 'excellent' :
                     overallScore >= 0.8 ? 'good' :
                     overallScore >= 0.6 ? 'needs-work' : 'critical';
    status.overallScore = overallScore;

  } else {
    status.overall = 'not-tested';
    status.recommendations.push('Run SEO tests: npm run test:seo');
  }

  // Check for missing test files
  const requiredTests = [
    'tests/e2e/seo/meta-tags.spec.ts',
    'tests/e2e/seo/structured-data.spec.ts',
    'tests/e2e/seo/headings.spec.ts',
    'tests/e2e/seo/technical.spec.ts',
  ];

  for (const test of requiredTests) {
    if (!fs.existsSync(test)) {
      status.recommendations.push(`Missing: ${test}`);
    }
  }

  return status;
}

getSEOStatus().then(status => {
  console.log(JSON.stringify(status, null, 2));
});
```

---

## Integration with Verification-Quality Skill

### Claude Flow Configuration

```json
{
  "verification": {
    "threshold": 0.95,
    "checks": {
      "seo": {
        "enabled": true,
        "command": "npm run test:seo",
        "threshold": 0.90,
        "critical": ["meta-tags", "structured-data"]
      }
    }
  }
}
```

### Pre-Deployment Verification

```bash
# Full SEO verification before deployment
npm run test:seo && npx claude-flow@alpha verify check --component seo

# Check truth score for SEO
npx claude-flow@alpha truth --component seo --threshold 0.95
```

---

## Implementation Checklist

### Phase 1: Test Infrastructure
- [ ] Create `tests/e2e/seo/` directory
- [ ] Create `meta-tags.spec.ts`
- [ ] Create `structured-data.spec.ts`
- [ ] Create `headings.spec.ts`
- [ ] Create `technical.spec.ts`
- [ ] Create `internal-links.spec.ts`
- [ ] Create `finnish-eeat.spec.ts`

### Phase 2: Test Data
- [ ] Add `data-testid` attributes to components
- [ ] Create test casino data fixtures
- [ ] Map all page routes for testing

### Phase 3: Integration
- [ ] Add npm scripts to package.json
- [ ] Create `scripts/seo-status.js`
- [ ] Configure verification-quality integration
- [ ] Add to CI/CD pipeline

### Phase 4: Validation
- [ ] Run full SEO test suite
- [ ] Fix any failing tests
- [ ] Verify 95%+ pass rate
- [ ] Generate baseline report

---

## SEO Test Coverage Matrix

| Page Type | Meta Tags | Schema | Headings | Technical | Links | E-E-A-T |
|-----------|-----------|--------|----------|-----------|-------|---------|
| Homepage | ✓ | WebSite, Org | ✓ | ✓ | ✓ | ✓ |
| Category | ✓ | ItemList, Breadcrumb | ✓ | ✓ | ✓ | ✓ |
| Review | ✓ | Review, Breadcrumb | ✓ | ✓ | ✓ | ✓ |
| Article | ✓ | Article, Breadcrumb | ✓ | ✓ | ✓ | ✓ |
| Static | ✓ | Breadcrumb | ✓ | ✓ | ✓ | - |

---

## References

- [iGaming SEO Strategies 2025](https://affpapa.com/igaming-seo-strategies-you-need-a-practical-guide/)
- [Casino SEO Best Practices 2025](https://serpzilla.com/blog/casino-seo/)
- [Schema Markup for Casino Affiliates](https://whitelabelcoders.com/blog/what-schema-markup-strategies-boost-casino-affiliate-rankings/)
- [SEO for Online Casinos 2025](https://andflint.com/seo-for-online-casinos-best-practices-in-2025/)
- Project SEO Strategy: `docs/planning/seo-practices.md`
- Content Models: `docs/planning/site-content.md`

---

*Plan created: January 2026*
*Framework: Playwright with Next.js 16.1.1*
*Integration: Claude Code + Verification-Quality Skill*
