# Content Models & Data Schema

These models define the shape of data in the CMS and the props for Next.js components.

## 1. Casino Object (The Core Entity)
- **Name:** string (e.g., "Hurmio Kasino")
- **Slug:** slug (e.g., "hurmio-kasino")
- **Affiliate Link:** url (The tracking link)
- **Rank/Score:** number (e.g., 98/100)
- **Tags:** array (e.g., ["Uusi", "Verovapaa", "Pay N Play"])
- **Offer:**
    - *Bonus Text:* string (e.g., "100% up to 500€")
    - *Free Spins:* number (e.g., 200)
    - *Wagering:* string (e.g., "35x (B)")
    - *Type:* enum (Sticky, Non-Sticky, Cashback)
- **Specs:**
    - *License:* enum (Malta, Viro, Curacao)
    - *Foundation Date:* date
    - *Payment Methods:* array (Trustly, Brite, Zimpler)
    - *Min Deposit:* number
    - *Withdrawal Speed:* string (e.g., "5 mins")

## 2. Page Content Blocks (Modular Content)
Used to construct the Homepage and Category pages dynamically.

- **Hero Block:** { Title, Description, BackgroundImage }
- **Casino List Block:** { ListTitle, FilterTag (e.g., "show only new"), Limit }
- **Text Block:** { RichText (H2, H3, p, ul), InternalLinks }
- **FAQ Block:** { Array of { Question, Answer } }
- **Pros/Cons Block:** { Array of Pros, Array of Cons }

## 3. SEO Metadata (Per Page)
- **Meta Title:** (Template: {Page Title} - Tammikuu 2026 | Pikakasinot)
- **Meta Description:** Max 160 chars.
- **OG Image:** Dynamic generation or CMS upload.
- **Canonical URL:** Auto-generated.
