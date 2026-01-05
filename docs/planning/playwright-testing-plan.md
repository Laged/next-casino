# Playwright E2E Testing Setup Plan

## Project Context

**Project**: Finnish Casino Recommendation Website (Kasinolista)
**Framework**: Next.js 16.1.1 with App Router
**Goal**: Enable Playwright testing with commands Claude Code can invoke to verify functionality

---

## Current Codebase Analysis

### Pages to Test (8 route types)

| Route | File | Description | Priority |
|-------|------|-------------|----------|
| `/` | `src/app/page.tsx` | Hero + demo casino page | High |
| `/(marketing)` | `src/app/(marketing)/page.tsx` | Finnish home with casino listings | Critical |
| `/(marketing)/tietosuojaseloste` | Privacy policy page | Medium |
| `/(marketing)/ota-yhteytta` | Contact form | Medium |
| `/(casino-lists)/[category]` | Dynamic category pages | Critical |
| `/(reviews)/arvostelut/[slug]` | Casino review pages | High |
| `/(articles)/[slug]` | SEO article pages | Medium |
| `/not-found` | Custom 404 page | Low |

### Components to Test (25 components)

#### UI Components (5)
- `Button` - variants, sizes, disabled states, icons
- `Badge` - variants, sizes, icons
- `Card` - variants, interactive states
- `Accordion` - expand/collapse, animations

#### Casino Components (5)
- `CasinoCard` - all 3 variants (default, compact, featured)
- `CasinoTopList` - ranking badges, max items
- `CasinoQuickList` - sidebar variant
- `ComparisonTable` - scrolling, category tabs, responsive
- `BonusBadge` - all bonus types

#### Content Components (4)
- `HeroSection` - variants, CTAs, trust badges
- `PageHero` - breadcrumbs, title
- `ContentAccordion` - expand/collapse
- `ProsCons` - layout
- `AuthorBio` - E-E-A-T display

#### Layout Components (2)
- `Navbar` - mega-menu, mobile menu, navigation
- `Footer` - links, newsletter, social

#### SEO Components (1)
- `JsonLd` - structured data injection

### Key User Interactions

1. **Navigation**
   - Desktop mega-menu hover/click
   - Mobile hamburger menu
   - Internal link navigation
   - External affiliate link (target="_blank")

2. **Casino Lists**
   - Category tab switching
   - Comparison table horizontal scroll
   - Sort dropdown selection
   - "Load more" pagination

3. **Forms**
   - Newsletter email subscription
   - Contact form submission

4. **Interactive Elements**
   - Accordion expand/collapse
   - Card hover effects
   - Button click states

---

## Playwright Setup Configuration

### 1. Installation

```bash
# Initialize Playwright
npm init playwright@latest

# This will create:
# - playwright.config.ts
# - tests/ directory
# - tests-examples/ (can remove)
# - .github/workflows/playwright.yml (optional)
```

### 2. playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is left
  forbidOnly: !!process.env.CI,

  // Retry failed tests
  retries: process.env.CI ? 2 : 0,

  // Workers for parallel execution
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],

  // Shared settings
  use: {
    baseURL: 'http://localhost:3000',

    // Collect trace on failure
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'on-first-retry',
  },

  // Project configurations for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Start dev server before running tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

### 3. Directory Structure

```
tests/
├── e2e/                           # End-to-end tests
│   ├── pages/                     # Page-level tests
│   │   ├── home.spec.ts
│   │   ├── category.spec.ts
│   │   ├── review.spec.ts
│   │   └── static-pages.spec.ts
│   ├── components/                # Component integration tests
│   │   ├── navbar.spec.ts
│   │   ├── footer.spec.ts
│   │   ├── casino-card.spec.ts
│   │   └── comparison-table.spec.ts
│   ├── seo/                       # SEO verification tests
│   │   ├── metadata.spec.ts
│   │   ├── structured-data.spec.ts
│   │   └── sitemap.spec.ts
│   └── accessibility/             # Accessibility tests
│       └── a11y.spec.ts
├── fixtures/                      # Test fixtures
│   ├── casino-data.ts
│   └── test-utils.ts
└── smoke/                         # Quick smoke tests
    └── smoke.spec.ts
```

---

## Test Categories

### 1. Smoke Tests (Quick Health Check)

**Purpose**: Fast verification that the site is running
**Invocation**: `npm run test:smoke`
**Duration**: < 30 seconds

```typescript
// tests/smoke/smoke.spec.ts
import { test, expect } from '@playwright/test';

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
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
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
```

### 2. Page Tests (Core Functionality)

**Purpose**: Verify each page renders correctly with expected content
**Invocation**: `npm run test:pages`

```typescript
// tests/e2e/pages/home.spec.ts
import { test, expect } from '@playwright/test';

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
    await expect(casinoCards).toHaveCount({ minimum: 1 });
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
```

### 3. Component Tests (Interaction Verification)

**Purpose**: Verify component behavior and interactions
**Invocation**: `npm run test:components`

```typescript
// tests/e2e/components/navbar.spec.ts
import { test, expect } from '@playwright/test';

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

// tests/e2e/components/comparison-table.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Comparison Table', () => {
  test('category tabs switch content', async ({ page }) => {
    await page.goto('/vertailu'); // or page with comparison table

    const bonusesTab = page.getByRole('button', { name: 'Bonuses' });
    await bonusesTab.click();

    await expect(bonusesTab).toHaveClass(/active|selected/);
  });

  test('horizontal scroll works', async ({ page }) => {
    await page.goto('/vertailu');

    const table = page.locator('[data-testid="comparison-table"]');
    const scrollButton = page.getByRole('button', { name: /scroll right/i });

    if (await scrollButton.isVisible()) {
      await scrollButton.click();
      // Verify scroll happened
    }
  });
});
```

### 4. SEO Tests (Critical for Business)

**Purpose**: Verify SEO elements are correctly rendered
**Invocation**: `npm run test:seo`

```typescript
// tests/e2e/seo/metadata.spec.ts
import { test, expect } from '@playwright/test';

test.describe('SEO Metadata', () => {
  test('homepage has proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Title
    await expect(page).toHaveTitle(/Parhaat Nettikasinot|Kasinolista/i);

    // Description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.{50,}/);

    // OpenGraph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);

    // Canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /https?:\/\//);
  });

  test('category pages have unique metadata', async ({ page }) => {
    const categories = ['uudet-kasinot', 'bonukset', 'ilmaiskierrokset'];

    for (const category of categories) {
      await page.goto(`/${category}`);

      const title = await page.title();
      expect(title.toLowerCase()).toContain(category.replace('-', ' ').split('-')[0]);
    }
  });
});

// tests/e2e/seo/structured-data.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Structured Data', () => {
  test('homepage has WebSite schema', async ({ page }) => {
    await page.goto('/');

    const jsonLd = page.locator('script[type="application/ld+json"]');
    const content = await jsonLd.first().textContent();
    const schema = JSON.parse(content || '{}');

    expect(schema['@type']).toMatch(/WebSite|Organization/);
  });

  test('category pages have ItemList schema', async ({ page }) => {
    await page.goto('/uudet-kasinot');

    const jsonLd = page.locator('script[type="application/ld+json"]');
    const scripts = await jsonLd.all();

    let hasItemList = false;
    for (const script of scripts) {
      const content = await script.textContent();
      if (content?.includes('ItemList')) {
        hasItemList = true;
        break;
      }
    }

    expect(hasItemList).toBeTruthy();
  });
});
```

### 5. Accessibility Tests

**Purpose**: Verify WCAG compliance
**Invocation**: `npm run test:a11y`

```typescript
// tests/e2e/accessibility/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
    const firstH1Index = await headings.findIndex(async h => (await h.evaluate(el => el.tagName)) === 'H1');
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
```

---

## Claude Code Invokable Commands

### Package.json Scripts

```json
{
  "scripts": {
    "test": "playwright test",
    "test:smoke": "playwright test tests/smoke/",
    "test:pages": "playwright test tests/e2e/pages/",
    "test:components": "playwright test tests/e2e/components/",
    "test:seo": "playwright test tests/e2e/seo/",
    "test:a11y": "playwright test tests/e2e/accessibility/",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report",
    "test:update-snapshots": "playwright test --update-snapshots",
    "test:status": "node scripts/test-status.js"
  }
}
```

### Test Status Script for Claude Code

Create `scripts/test-status.js`:

```javascript
#!/usr/bin/env node
/**
 * Test Status Reporter
 * Provides structured output for Claude Code to parse
 *
 * Usage: npm run test:status
 * Output: JSON with test results and coverage summary
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function getTestStatus() {
  const status = {
    timestamp: new Date().toISOString(),
    overall: 'unknown',
    tests: {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    },
    categories: {},
    lastRun: null,
    recommendations: [],
  };

  // Check if test results exist
  const resultsPath = path.join(process.cwd(), 'test-results', 'results.json');

  if (fs.existsSync(resultsPath)) {
    try {
      const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

      status.lastRun = results.stats?.startTime || null;
      status.tests.total = results.stats?.expected || 0;
      status.tests.passed = results.stats?.expected - (results.stats?.unexpected || 0);
      status.tests.failed = results.stats?.unexpected || 0;
      status.tests.skipped = results.stats?.skipped || 0;

      // Calculate overall status
      if (status.tests.failed > 0) {
        status.overall = 'failing';
      } else if (status.tests.passed === status.tests.total) {
        status.overall = 'passing';
      } else {
        status.overall = 'partial';
      }

      // Group by category
      if (results.suites) {
        for (const suite of results.suites) {
          const category = suite.file?.split('/')[2] || 'unknown';
          if (!status.categories[category]) {
            status.categories[category] = { passed: 0, failed: 0 };
          }
          // Count specs
          for (const spec of suite.specs || []) {
            if (spec.ok) {
              status.categories[category].passed++;
            } else {
              status.categories[category].failed++;
            }
          }
        }
      }
    } catch (e) {
      status.overall = 'error';
      status.recommendations.push('Failed to parse test results: ' + e.message);
    }
  } else {
    status.overall = 'no-results';
    status.recommendations.push('Run tests first: npm run test');
  }

  // Check test file coverage
  const testFiles = {
    smoke: fs.existsSync('tests/smoke/smoke.spec.ts'),
    pages: fs.existsSync('tests/e2e/pages/home.spec.ts'),
    components: fs.existsSync('tests/e2e/components/navbar.spec.ts'),
    seo: fs.existsSync('tests/e2e/seo/metadata.spec.ts'),
    a11y: fs.existsSync('tests/e2e/accessibility/a11y.spec.ts'),
  };

  status.coverage = testFiles;

  // Add recommendations
  if (!testFiles.smoke) {
    status.recommendations.push('Missing smoke tests - add tests/smoke/smoke.spec.ts');
  }
  if (!testFiles.seo) {
    status.recommendations.push('Missing SEO tests - critical for casino affiliate site');
  }

  return status;
}

// Run and output
getTestStatus().then(status => {
  console.log(JSON.stringify(status, null, 2));
});
```

### Quick Check Commands for Claude Code

```bash
# Quick smoke test (fastest verification)
npm run test:smoke

# Check specific functionality
npm run test:pages -- --grep "homepage"
npm run test:components -- --grep "navbar"
npm run test:seo -- --grep "metadata"

# Get structured status report
npm run test:status

# Visual debugging
npm run test:ui

# Run with visible browser
npm run test:headed

# Debug specific test
npm run test:debug -- tests/e2e/pages/home.spec.ts
```

---

## Integration with Verification-Quality Skill

### Pre-commit Hook Integration

Add to `.claude-flow/config.json`:

```json
{
  "verification": {
    "threshold": 0.95,
    "autoRollback": true,
    "hooks": {
      "preCommit": true,
      "prePush": true
    },
    "checks": {
      "playwright": {
        "enabled": true,
        "command": "npm run test:smoke",
        "threshold": 1.0
      }
    }
  }
}
```

### Claude Code Verification Workflow

```bash
# Step 1: Run quick verification
npm run test:smoke && npx claude-flow@alpha verify check

# Step 2: If passing, run full tests
npm run test

# Step 3: Generate verification report
npx claude-flow@alpha verify report --format json

# Step 4: Check truth score
npx claude-flow@alpha truth --threshold 0.95
```

---

## Test Data & Fixtures

### Mock Casino Data

Create `tests/fixtures/casino-data.ts`:

```typescript
export const mockCasinos = [
  {
    id: 'test-casino-1',
    name: 'Test Casino One',
    slug: 'test-casino-one',
    rating: 4.8,
    bonusTitle: '100% up to €500',
    features: ['Fast Payouts', 'Live Chat', '24/7 Support'],
  },
  // Add more mock data...
];

export const mockCategories = [
  { slug: 'uudet-kasinot', name: 'Uudet Kasinot' },
  { slug: 'bonukset', name: 'Bonukset' },
  { slug: 'ilmaiskierrokset', name: 'Ilmaiskierrokset' },
];
```

### Test Utilities

Create `tests/fixtures/test-utils.ts`:

```typescript
import { Page, expect } from '@playwright/test';

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
  return await element.count() > 0;
}

/**
 * Get all console errors from page
 */
export async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', msg => {
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
export async function verifyInternalLinks(page: Page, baseUrl: string) {
  const links = await page.locator('a[href^="/"]').all();
  const hrefs = await Promise.all(links.map(link => link.getAttribute('href')));

  // Check each internal link
  for (const href of hrefs.filter(Boolean)) {
    const response = await page.request.get(href!);
    expect(response.status()).toBeLessThan(400);
  }
}
```

---

## Implementation Checklist

### Phase 1: Setup (Day 1)
- [ ] Run `npm init playwright@latest`
- [ ] Configure `playwright.config.ts` with webServer
- [ ] Create directory structure under `tests/`
- [ ] Add npm scripts to `package.json`
- [ ] Install `@axe-core/playwright` for a11y testing

### Phase 2: Smoke Tests (Day 1)
- [ ] Create `tests/smoke/smoke.spec.ts`
- [ ] Verify basic page loads
- [ ] Check for console errors
- [ ] Verify sitemap/robots.txt

### Phase 3: Page Tests (Day 2)
- [ ] Create home page tests
- [ ] Create category page tests
- [ ] Create review page tests
- [ ] Add data-testid attributes to components

### Phase 4: Component Tests (Day 2-3)
- [ ] Create navbar tests (mega-menu, mobile)
- [ ] Create footer tests (links, newsletter)
- [ ] Create casino card tests
- [ ] Create comparison table tests

### Phase 5: SEO Tests (Day 3)
- [ ] Create metadata verification tests
- [ ] Create structured data tests
- [ ] Create sitemap verification tests

### Phase 6: Integration (Day 4)
- [ ] Create test status script
- [ ] Integrate with CI/CD
- [ ] Integrate with verification-quality skill
- [ ] Document Claude Code commands

---

## GitHub Actions CI Integration

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Run Playwright tests
        run: npm run test

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload test results JSON
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 30
```

---

## Quick Reference for Claude Code

### Check Site Status
```bash
# Quick smoke test
npm run test:smoke

# Get JSON status report
npm run test:status
```

### Debug Failing Tests
```bash
# Run with UI
npm run test:ui

# Run specific failing test
npm run test -- --grep "test name" --debug
```

### Verify Before Commit
```bash
# Full verification
npm run test:smoke && npm run lint && npm run typecheck
```

### Generate Reports
```bash
# Run tests and generate report
npm run test

# View HTML report
npm run test:report
```

---

*Plan created: January 2026*
*Framework: Playwright with Next.js 16.1.1*
*Integration: Claude Code + Verification-Quality Skill*
