Here is the comprehensive project blueprint for the Casino Recommendation Website, broken down into six copy-pasteable implementation documents.

### 1. `site-structure.md`

```markdown
# Site Architecture & Routing Map

## 1. Core Directory Structure (Next.js App Router)
The application utilizes the Next.js App Router for optimal performance, utilizing React Server Components (RSC) by default.

```text
/app
├── (marketing)             # Group for standard pages
│   ├── page.tsx            # Homepage (Hero + Top Lists)
│   ├── tietosuojaseloste/  # Static legal pages
│   └── ota-yhteytta/       # Contact form
├── (casino-lists)          # Dynamic Landing Pages
│   ├── [category]/         # e.g., /uudet-pikakasinot, /verovapaat
│   │   └── page.tsx        # Render list based on slug params
├── (reviews)               # Individual Casino Reviews
│   ├── arvostelut/
│   │   └── [slug]/         # e.g., /arvostelut/hurmio-kasino
│   │       └── page.tsx    # Full review data + schema.org
├── (articles)              # SEO Articles / Guides
│   ├── [slug]/             # e.g., /miten-pikakasinot-toimivat
│   │   └── page.tsx
├── layout.tsx              # Root Layout (Navbar, Footer, Fonts)
├── not-found.tsx           # Custom 404
└── loading.tsx             # Global Suspense boundary

```

## 2. Key Components Library

These components should be developed in isolation (Storybook).

* **Global**
* `Navbar`: Responsive, sticky, mega-menu support.
* `Footer`: SEO-optimized link columns, trust badges.


* **Casino Specific**
* `CasinoCard`: The primary unit. Shows Logo, Bonus, "Play Now" CTA, and Rating.
* `CasinoTopList`: Ordered list of CasinoCards with ranking badges (1, 2, 3...).
* `ComparisonTable`: Horizontal scrollable table comparing features (License, Speed, Bonus).
* `BonusBadge`: Visual indicator for "Non-Sticky", "No Wagering".


* **Content Blocks**
* `HeroSection`: H1, Subtext, and primary CTA.
* `ContentAccordion`: For FAQ sections (collapsible).
* `ProsCons`: Two-column layout for positives/negatives.
* `AuthorBio`: Credibility block for E-E-A-T.



```

---

### 2. `site-content.md`

```markdown
# Content Models & Data Schema

These models define the shape of data in the CMS and the props for Next.js components.

## 1. Casino Object (The Core Entity)
* **Name:** string (e.g., "Hurmio Kasino")
* **Slug:** slug (e.g., "hurmio-kasino")
* **Affiliate Link:** url (The tracking link)
* **Rank/Score:** number (e.g., 98/100)
* **Tags:** array (e.g., ["Uusi", "Verovapaa", "Pay N Play"])
* **Offer:**
    * *Bonus Text:* string (e.g., "100% up to 500€")
    * *Free Spins:* number (e.g., 200)
    * *Wagering:* string (e.g., "35x (B)")
    * *Type:* enum (Sticky, Non-Sticky, Cashback)
* **Specs:**
    * *License:* enum (Malta, Viro, Curacao)
    * *Foundation Date:* date
    * *Payment Methods:* array (Trustly, Brite, Zimpler)
    * *Min Deposit:* number
    * *Withdrawal Speed:* string (e.g., "5 mins")

## 2. Page Content Blocks (Modular Content)
Used to construct the Homepage and Category pages dynamically.

* **Hero Block:** { Title, Description, BackgroundImage }
* **Casino List Block:** { ListTitle, FilterTag (e.g., "show only new"), Limit }
* **Text Block:** { RichText (H2, H3, p, ul), InternalLinks }
* **FAQ Block:** { Array of { Question, Answer } }
* **Pros/Cons Block:** { Array of Pros, Array of Cons }

## 3. SEO Metadata (Per Page)
* **Meta Title:** (Template: {Page Title} - Tammikuu 2026 | Pikakasinot)
* **Meta Description:** Max 160 chars.
* **OG Image:** Dynamic generation or CMS upload.
* **Canonical URL:** Auto-generated.

```

---

### 3. `nextjs-17-tech.md`

```markdown
# Technology Stack & Implementation Guide (Next.js Modern)

## Core Stack
* **Framework:** Next.js 15+ (App Router, Turbopack)
* **Language:** TypeScript (Strict mode)
* **Styling:** Tailwind CSS v4 (Zero-runtime CSS-in-JS) + `clsx` / `tailwind-merge`.
* **UI Primitives:** Radix UI or Shadcn/UI (Accessible, unstyled base).
* **Validation:** Zod (Schema validation for CMS data).

## Key Architecture Concepts

### 1. Rendering Strategy: Hybrid
* **Marketing Pages (Home/Lists):** Uses **Incremental Static Regeneration (ISR)**.
    * *Why:* Content changes daily/weekly, not instantly. Fast TTFB is crucial.
    * *Config:* `export const revalidate = 600` (Rebuild every 10 mins).
* **Casino Status (Real-time):** Uses **Suspense & Streaming**.
    * If we need real-time bonus data, wrap the specific `BonusDisplay` component in Suspense and fetch via a Server Action or Client Component, leaving the rest of the page Static.

### 2. Partial Prerendering (PPR) - *Experimental/Future*
* We aim to use PPR to keep the "Shell" (Navbar, Footer, Hero text) static (served from edge), while the actual list of Casinos fetches dynamically to ensure affiliate links are never stale.

### 3. Image Optimization
* Use `next/image` strictly.
* Define `loader` if using a CMS (Sanity/Contentful) to offload transformations to their CDN.
* Use `priority` prop for the LCP element (Hero Image or top Casino Logo).

### 4. Server Actions
* Use Server Actions for "Subscribe to Newsletter" or "Report Broken Link" features.
* Avoid heavy client-side `useEffect` for data fetching. Fetch data in `page.tsx` (Server Component) and pass down.

```

---

### 4. `seo-practices.md`

```markdown
# SEO Strategy & Technical Implementation

## 1. Technical SEO
* **Dynamic Sitemaps:**
    * Use `app/sitemap.ts` to generate XML.
    * Fetch all Casinos and Articles from CMS to generate URLs dynamically.
    * Priority: Homepage (1.0), Lists (0.9), Reviews (0.8), Articles (0.7).
* **Robots.txt:**
    * Standard `app/robots.ts`.
    * Disallow internal search parameters to prevent crawl budget waste.
* **Canonical Tags:**
    * Enforce self-referencing canonicals to prevent "http/https" or "www/non-www" duplicate content issues.

## 2. Structured Data (Schema.org)
Implement JSON-LD via a helper component in `layout.tsx` or individual pages.

* **Homepage:** `WebSite`, `Organization`.
* **Review Pages:** `Review` type.
    * `itemReviewed`: type `Casino`.
    * `reviewRating`: { ratingValue: 98, bestRating: 100 }.
    * `author`: { type: Person, name: "Editor Name" }.
* **Lists:** `ItemList` type (Show Google the order of top casinos).
* **FAQ:** `FAQPage` type (Eligible for Rich Snippets).

## 3. Core Web Vitals (CWV)
* **LCP (Loading):** Ensure the Top 3 Casino Logos are eager loaded.
* **CLS (Stability):** Reserve specific height for the "Expand" accordions in casino cards so layout doesn't jump.
* **INP (Interactivity):** Defer non-essential JS (tracking scripts) using `next/script` with `strategy="lazyOnload"`.

## 4. Internal Linking Strategy
* Every Review page must link back to its parent Category (e.g., "Back to New Casinos").
* Use descriptive anchor text ("Check out Hurmio Review" vs "Read more").

```

---

### 5. `storybook-cms-plan.md`

```markdown
# Content Management & Design System Workflow

## 1. The Headless CMS Choice
**Recommendation: Sanity.io** or **Contentful**.
* *Why:* They separate content from presentation perfectly.
* *Non-Dev Friendly:* They offer "Visual Editing" or "Live Preview" modes where editors can see changes in real-time before publishing.

## 2. Storybook as the "Component Workshop"
We will use Storybook to build the UI components in isolation before connecting them to the CMS. This ensures the design is robust.

* **Story Hierarchy:**
    * `Atoms`: Buttons, badges, star ratings.
    * `Molecules`: Casino Card, Info Box.
    * `Organisms`: Top List Section, Footer.
    * `Pages`: Full mockups of the Homepage.
* **Controls:** Developers will add "Controls" (knobs) to Storybook. This mimics the CMS experience. For example, a "Non-Sticky" boolean toggle in Storybook will eventually map to the CMS boolean field.

## 3. The "Block Content" Strategy
Instead of hardcoding pages, we define "Blocks" in the CMS.
* **CMS:** Editor selects "Add Block" -> Chooses "Comparison Table".
* **Next.js:** A `BlockRenderer` component maps the CMS string to the actual React Component.

## 4. Editor Workflow
1.  Developer builds `CasinoCard` in Storybook.
2.  Developer connects `CasinoCard` props to Sanity schema.
3.  Editor logs into Sanity, creates "Hurmio Kasino", fills in fields.
4.  Next.js fetches data and renders `CasinoCard` with Hurmio data.

```

---

### 6. `project-phases-plan.md`

```markdown
# Project Implementation Roadmap

## Phase 1: Foundation & Design System (Weeks 1-2)
* **Goal:** A running Next.js app and a library of UI components.
* **Tasks:**
    * Initialize Next.js 15 repo with TypeScript & Tailwind.
    * Setup Storybook.
    * Build core components: Typography, Buttons, CasinoCard, Navbar.
    * Configure Colors/Branding (Green/Dark theme based on pikakasinot.com).

## Phase 2: CMS Integration & Data (Weeks 3-4)
* **Goal:** Content flows from CMS to App.
* **Tasks:**
    * Setup Sanity/Contentful project.
    * Define Schemas (Casino, Article, Page).
    * Create `lib/sanity.ts` fetch functions.
    * Build the `[slug]` dynamic routing logic.
    * Populate dummy data for top 10 casinos.

## Phase 3: Page Assembly & SEO (Weeks 5-6)
* **Goal:** Full pages are renderable and SEO-ready.
* **Tasks:**
    * Assemble Homepage using Block Components.
    * Implement Dynamic Metadata (OpenGraph, Titles).
    * Add JSON-LD Schema generators.
    * Generate `sitemap.xml` and `robots.txt`.

## Phase 4: Polish & Performance (Week 7)
* **Goal:** 100/100 Lighthouse Score.
* **Tasks:**
    * Optimize Images (WebP/AVIF).
    * Audit CLS (Layout Shift) on mobile.
    * Implement "Show More" pagination for lists.
    * Add tracking (GTM/Analytics) via Partytown (web worker) to save main thread.

## Phase 5: Launch
* **Tasks:**
    * Deploy to Vercel.
    * Connect custom domain.
    * Verify in Google Search Console.
    * Handover CMS training to editors.

```
