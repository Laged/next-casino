# Next.js 16.1.1 Upgrade Plan

## Project Context

**Project**: Finnish Casino Recommendation Website (Kasinolista/Pikakasinot)
**Current State**: Next.js 16.1.1 already installed, but configuration not optimized for v16 features
**Goal**: Fully leverage Next.js 16 features for performance, caching, and developer experience

---

## Executive Summary

The project is already running Next.js 16.1.1 but is not utilizing the new v16 features. This plan outlines the steps to:

1. Remove deprecated configurations
2. Enable new caching features (`use cache`, `cacheLife`, `cacheTag`)
3. Enable React Compiler for automatic optimization
4. Update scroll behavior handling
5. Implement proper cache invalidation patterns for the casino affiliate content

---

## Phase 1: Configuration Updates (Critical)

### 1.1 Update package.json

**Current**:
```json
"scripts": {
  "dev": "next dev --turbopack",
  ...
}
```

**Change to**:
```json
"scripts": {
  "dev": "next dev",
  ...
}
```

**Reason**: Turbopack is now the default in Next.js 16. The `--turbopack` flag is no longer needed.

---

### 1.2 Update next.config.ts

**Current** (minimal configuration):
```ts
const nextConfig: NextConfig = {
  /* config options here */
};
```

**New Configuration**:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable component caching with 'use cache' directive
  cacheComponents: true,

  // Custom cache profiles for different content types
  cacheLife: {
    // Casino data - updates frequently (bonuses, offers)
    casino: {
      stale: 300,        // 5 minutes client cache
      revalidate: 600,   // 10 minutes server refresh
      expire: 3600,      // 1 hour max stale
    },
    // List pages - moderate update frequency
    lists: {
      stale: 600,        // 10 minutes client cache
      revalidate: 1800,  // 30 minutes server refresh
      expire: 86400,     // 24 hours max stale
    },
    // Static content - rarely changes
    static: {
      stale: 3600,       // 1 hour client cache
      revalidate: 86400, // 24 hours server refresh
      expire: 604800,    // 7 days max stale
    },
    // Articles - SEO content
    articles: {
      stale: 1800,       // 30 minutes client cache
      revalidate: 3600,  // 1 hour server refresh
      expire: 86400,     // 24 hours max stale
    },
  },

  // Enable React Compiler for automatic optimization
  reactCompiler: true,

  // Turbopack configuration (now at top level in v16)
  turbopack: {
    // Enable persistent file system cache for faster rebuilds
  },

  // Image optimization (updated defaults for v16)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 14400, // 4 hours (new default in v16)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.kasinolista.fi',
      },
      // Add CMS domains here when integrated
    ],
  },

  // Experimental features for casino use case
  experimental: {
    // Enable Turbopack file system caching for development
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
```

---

### 1.3 Install React Compiler Plugin

```bash
npm install -D babel-plugin-react-compiler
```

This enables automatic component optimization, eliminating the need for manual `useMemo` and `useCallback`.

---

## Phase 2: Breaking Changes Remediation

### 2.1 Scroll Behavior (Required)

Next.js 16 no longer overrides `scroll-behavior: smooth` by default.

**Update `src/app/layout.tsx`**:

```tsx
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-casino-dark text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Also update `src/app/globals.css`** (keep as fallback):
```css
html[data-scroll-behavior="smooth"] {
  scroll-behavior: smooth;
}
```

---

### 2.2 Version References

Update outdated Next.js version references:

1. **`src/app/page.tsx`** (footer):
   - Change: "Built with Next.js 15, React 19" → "Built with Next.js 16, React 19"

2. **`src/app/layout.tsx`** (metadata.description):
   - Update reference to "Next.js 15" → "Next.js 16"

3. **`docs/planning/nextjs-tech.md`**:
   - Update: "Next.js 15+" → "Next.js 16+"

---

### 2.3 No Middleware/Proxy Migration Needed

The project has no custom middleware, so no `middleware.ts → proxy.ts` migration is required.

---

### 2.4 No Parallel Routes

The project doesn't use parallel routes, so no `default.js` files are needed.

---

## Phase 3: New Feature Implementation

### 3.1 Cache Utilities Module

Create `src/lib/cache/index.ts`:

```ts
/**
 * Cache utilities for casino content
 * Leverages Next.js 16 'use cache' directive
 */

import { cacheLife, cacheTag } from 'next/cache';

/**
 * Cached casino data fetching
 * Uses 'casino' cache profile (5 min stale, 10 min revalidate)
 */
export async function getCasinoData(slug: string) {
  'use cache';
  cacheLife('casino');
  cacheTag(`casino-${slug}`);

  // Fetch from CMS/API
  const data = await fetch(`/api/casinos/${slug}`);
  return data.json();
}

/**
 * Cached casino list fetching
 * Uses 'lists' cache profile (10 min stale, 30 min revalidate)
 */
export async function getCasinoList(category?: string) {
  'use cache';
  cacheLife('lists');
  cacheTag('casino-list', category ? `category-${category}` : 'all-casinos');

  // Fetch from CMS/API
  const params = category ? `?category=${category}` : '';
  const data = await fetch(`/api/casinos${params}`);
  return data.json();
}

/**
 * Cached article fetching
 * Uses 'articles' cache profile (30 min stale, 1 hour revalidate)
 */
export async function getArticle(slug: string) {
  'use cache';
  cacheLife('articles');
  cacheTag(`article-${slug}`);

  const data = await fetch(`/api/articles/${slug}`);
  return data.json();
}

/**
 * Cached static content (legal pages, etc.)
 * Uses 'static' cache profile (1 hour stale, 24 hour revalidate)
 */
export async function getStaticContent(page: string) {
  'use cache';
  cacheLife('static');
  cacheTag('static-content', `page-${page}`);

  const data = await fetch(`/api/content/${page}`);
  return data.json();
}
```

---

### 3.2 Cache Revalidation Actions

Create `src/lib/cache/actions.ts`:

```ts
'use server';

import { updateTag, revalidateTag } from 'next/cache';

/**
 * Invalidate specific casino cache
 * Use when casino data is updated in CMS
 */
export async function invalidateCasino(slug: string) {
  updateTag(`casino-${slug}`);
}

/**
 * Invalidate all casino lists
 * Use when casino rankings change
 */
export async function invalidateCasinoLists() {
  revalidateTag('casino-list');
}

/**
 * Invalidate category-specific lists
 */
export async function invalidateCategory(category: string) {
  revalidateTag(`category-${category}`);
}

/**
 * Invalidate article cache
 */
export async function invalidateArticle(slug: string) {
  updateTag(`article-${slug}`);
}

/**
 * Full site revalidation (use sparingly)
 */
export async function invalidateAllContent() {
  revalidateTag('casino-list');
  revalidateTag('static-content');
}
```

---

### 3.3 Update Sitemap with Caching

Update `src/app/sitemap.ts` to use new caching:

```ts
import { cacheLife, cacheTag } from 'next/cache';

async function getAllCasinos(): Promise<CasinoData[]> {
  'use cache';
  cacheLife('lists');
  cacheTag('sitemap-casinos');

  // Fetch from CMS/API
  return [/* data */];
}
```

---

## Phase 4: Performance Optimizations

### 4.1 Enable View Transitions (Optional, Future Enhancement)

For smoother page transitions, add to `next.config.ts`:

```ts
experimental: {
  viewTransition: true,
}
```

This enables React 19's View Transitions API for smooth page navigations.

---

### 4.2 Image Optimization Updates

The project already uses `next/image`. Ensure:

1. Hero images use `priority` prop for LCP optimization
2. Casino logos use `sizes` prop for responsive loading
3. Remote patterns are configured for CMS images

---

## Phase 5: Testing & Verification

### 5.1 Build Verification

```bash
# Clean install
rm -rf node_modules .next
npm install

# Type check
npm run typecheck

# Build
npm run build

# Start production server
npm run start
```

### 5.2 Performance Verification

1. Run Lighthouse audit targeting:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 95+

2. Verify Core Web Vitals:
   - LCP < 2.5s
   - FID/INP < 100ms
   - CLS < 0.1

### 5.3 Cache Verification

Enable debug logging:
```bash
NEXT_PRIVATE_DEBUG_CACHE=1 npm run dev
```

Verify cache hits/misses in terminal output.

---

## Implementation Checklist

### Critical (Must Do)
- [ ] Remove `--turbopack` from package.json dev script
- [ ] Update next.config.ts with cacheComponents and cacheLife
- [ ] Install babel-plugin-react-compiler
- [ ] Add `data-scroll-behavior="smooth"` to html element
- [ ] Update version references (15 → 16)

### Recommended
- [ ] Create cache utilities module
- [ ] Create cache revalidation actions
- [ ] Update sitemap with new caching
- [ ] Enable turbopackFileSystemCacheForDev

### Optional/Future
- [ ] Enable View Transitions
- [ ] Add remote image patterns for CMS
- [ ] Implement ISR webhook for CMS updates

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Build failure after config changes | Low | High | Run typecheck and build before committing |
| Cache stale data issues | Medium | Medium | Configure appropriate cache TTLs, test revalidation |
| React Compiler incompatibility | Low | Medium | Use `"use no memo"` directive for problem components |
| Scroll behavior regression | Low | Low | Keep CSS fallback in globals.css |

---

## Timeline Estimate

| Phase | Effort |
|-------|--------|
| Phase 1: Configuration | 30 mins |
| Phase 2: Breaking Changes | 15 mins |
| Phase 3: New Features | 1-2 hours |
| Phase 4: Optimizations | 30 mins |
| Phase 5: Testing | 1 hour |
| **Total** | **3-4 hours** |

---

## References

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [use cache Directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [cacheLife Configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheLife)
- [React Compiler](https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler)

---

*Plan created: January 2026*
*Next.js Target Version: 16.1.1*
