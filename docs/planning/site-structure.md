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

### Global
- `Navbar`: Responsive, sticky, mega-menu support.
- `Footer`: SEO-optimized link columns, trust badges.

### Casino Specific
- `CasinoCard`: The primary unit. Shows Logo, Bonus, "Play Now" CTA, and Rating.
- `CasinoTopList`: Ordered list of CasinoCards with ranking badges (1, 2, 3...).
- `ComparisonTable`: Horizontal scrollable table comparing features (License, Speed, Bonus).
- `BonusBadge`: Visual indicator for "Non-Sticky", "No Wagering".

### Content Blocks
- `HeroSection`: H1, Subtext, and primary CTA.
- `ContentAccordion`: For FAQ sections (collapsible).
- `ProsCons`: Two-column layout for positives/negatives.
- `AuthorBio`: Credibility block for E-E-A-T.
