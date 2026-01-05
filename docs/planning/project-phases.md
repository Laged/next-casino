# Project Implementation Roadmap

## Phase 1: Foundation & Design System
- **Goal:** A running Next.js app and a library of UI components.
- **Tasks:**
    - Initialize Next.js 15 repo with TypeScript & Tailwind.
    - Setup Storybook.
    - Build core components: Typography, Buttons, CasinoCard, Navbar.
    - Configure Colors/Branding (Green/Dark theme based on pikakasinot.com).

## Phase 2: CMS Integration & Data
- **Goal:** Content flows from CMS to App.
- **Tasks:**
    - Setup Sanity/Contentful project.
    - Define Schemas (Casino, Article, Page).
    - Create `lib/sanity.ts` fetch functions.
    - Build the `[slug]` dynamic routing logic.
    - Populate dummy data for top 10 casinos.

## Phase 3: Page Assembly & SEO
- **Goal:** Full pages are renderable and SEO-ready.
- **Tasks:**
    - Assemble Homepage using Block Components.
    - Implement Dynamic Metadata (OpenGraph, Titles).
    - Add JSON-LD Schema generators.
    - Generate `sitemap.xml` and `robots.txt`.

## Phase 4: Polish & Performance
- **Goal:** 100/100 Lighthouse Score.
- **Tasks:**
    - Optimize Images (WebP/AVIF).
    - Audit CLS (Layout Shift) on mobile.
    - Implement "Show More" pagination for lists.
    - Add tracking (GTM/Analytics) via Partytown (web worker) to save main thread.

## Phase 5: Launch
- **Tasks:**
    - Deploy to Vercel.
    - Connect custom domain.
    - Verify in Google Search Console.
    - Handover CMS training to editors.
