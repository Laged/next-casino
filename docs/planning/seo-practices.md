# SEO Strategy & Technical Implementation

## 1. Technical SEO
- **Dynamic Sitemaps:**
    - Use `app/sitemap.ts` to generate XML.
    - Fetch all Casinos and Articles from CMS to generate URLs dynamically.
    - Priority: Homepage (1.0), Lists (0.9), Reviews (0.8), Articles (0.7).
- **Robots.txt:**
    - Standard `app/robots.ts`.
    - Disallow internal search parameters to prevent crawl budget waste.
- **Canonical Tags:**
    - Enforce self-referencing canonicals to prevent "http/https" or "www/non-www" duplicate content issues.

## 2. Structured Data (Schema.org)
Implement JSON-LD via a helper component in `layout.tsx` or individual pages.

- **Homepage:** `WebSite`, `Organization`.
- **Review Pages:** `Review` type.
    - `itemReviewed`: type `Casino`.
    - `reviewRating`: { ratingValue: 98, bestRating: 100 }.
    - `author`: { type: Person, name: "Editor Name" }.
- **Lists:** `ItemList` type (Show Google the order of top casinos).
- **FAQ:** `FAQPage` type (Eligible for Rich Snippets).

## 3. Core Web Vitals (CWV)
- **LCP (Loading):** Ensure the Top 3 Casino Logos are eager loaded.
- **CLS (Stability):** Reserve specific height for the "Expand" accordions in casino cards so layout doesn't jump.
- **INP (Interactivity):** Defer non-essential JS (tracking scripts) using `next/script` with `strategy="lazyOnload"`.

## 4. Internal Linking Strategy
- Every Review page must link back to its parent Category (e.g., "Back to New Casinos").
- Use descriptive anchor text ("Check out Hurmio Review" vs "Read more").
