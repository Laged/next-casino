# Technology Stack & Implementation Guide (Next.js Modern)

## Core Stack
- **Framework:** Next.js 15+ (App Router, Turbopack)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4 (Zero-runtime CSS-in-JS) + `clsx` / `tailwind-merge`.
- **UI Primitives:** Radix UI or Shadcn/UI (Accessible, unstyled base).
- **Validation:** Zod (Schema validation for CMS data).

## Key Architecture Concepts

### 1. Rendering Strategy: Hybrid
- **Marketing Pages (Home/Lists):** Uses **Incremental Static Regeneration (ISR)**.
    - *Why:* Content changes daily/weekly, not instantly. Fast TTFB is crucial.
    - *Config:* `export const revalidate = 600` (Rebuild every 10 mins).
- **Casino Status (Real-time):** Uses **Suspense & Streaming**.
    - If we need real-time bonus data, wrap the specific `BonusDisplay` component in Suspense and fetch via a Server Action or Client Component, leaving the rest of the page Static.

### 2. Partial Prerendering (PPR) - *Experimental/Future*
- We aim to use PPR to keep the "Shell" (Navbar, Footer, Hero text) static (served from edge), while the actual list of Casinos fetches dynamically to ensure affiliate links are never stale.

### 3. Image Optimization
- Use `next/image` strictly.
- Define `loader` if using a CMS (Sanity/Contentful) to offload transformations to their CDN.
- Use `priority` prop for the LCP element (Hero Image or top Casino Logo).

### 4. Server Actions
- Use Server Actions for "Subscribe to Newsletter" or "Report Broken Link" features.
- Avoid heavy client-side `useEffect` for data fetching. Fetch data in `page.tsx` (Server Component) and pass down.
