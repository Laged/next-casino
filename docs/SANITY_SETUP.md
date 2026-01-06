# Sanity CMS Setup Guide

This guide explains how to connect your Kasinolista.fi site to Sanity CMS.

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io) and sign in (or create an account)
2. Click **"Create new project"**
3. Choose **"Start from scratch"** (not a template)
4. Enter project details:
   - **Project name**: `kasinolista` (or your preferred name)
   - **Dataset**: Leave as `production`
5. Click **Create project**

## Step 2: Get Your Project ID

1. After creation, you'll be on the project dashboard
2. Your **Project ID** is shown in the URL: `https://www.sanity.io/manage/project/YOUR_PROJECT_ID`
3. Copy this ID (looks like: `abc123xyz`)

## Step 3: Configure Environment Variables

1. Copy the example env file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Project ID:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_SITE_URL=https://kasinolista.fi
   ```

3. **IMPORTANT: Never commit `.env.local` to git!** It's already in `.gitignore`.

## Step 4: Add CORS Origins

1. In Sanity dashboard, go to **Settings** → **API**
2. Under **CORS origins**, add:
   - `http://localhost:3000` (for development)
   - `https://your-production-domain.com` (for production)
3. Check "Allow credentials" for both

## Step 5: Deploy Schema to Sanity

Run the Sanity CLI to deploy your schemas:

```bash
bunx sanity deploy
```

This uploads your content schemas to Sanity so you can start adding content.

## Step 6: Access the Studio

Start your dev server:
```bash
bun run dev
```

Access the studio at: `http://localhost:3000/studio`

You'll see the Finnish content management interface with sections for:
- **Kasinot** (Casinos)
- **Bonukset** (Bonuses)
- **Ilmaiskierrokset** (Free Spins)
- **Kategoriat** (Categories)
- **Sivut** (Pages)
- **Asetukset** (Settings)

## Step 7: Add Content

1. Click **Kasinot** → **Kaikki kasinot** → **+ Create**
2. Fill in casino details (name, rating, bonus, etc.)
3. Click **Publish**

## Optional: API Token for Preview Mode

If you want to preview draft (unpublished) content:

1. In Sanity dashboard, go to **Settings** → **API** → **Tokens**
2. Click **Add API token**
3. Name it `preview-token`
4. Set permissions to **Viewer**
5. Copy the token and add to `.env.local`:
   ```
   SANITY_API_TOKEN=your-token-here
   ```

## File Structure

```
sanity/
├── schemas/           # Content type definitions
│   ├── casino.ts     # Casino reviews
│   ├── bonus.ts      # Bonus offers
│   ├── freeSpins.ts  # Free spins offers
│   ├── category.ts   # Categories
│   ├── page.ts       # Static pages
│   └── siteSettings.ts # Site settings
└── lib/
    ├── client.ts     # Sanity client
    ├── queries.ts    # GROQ queries
    ├── fetch.ts      # Data fetching functions
    └── image.ts      # Image URL builder
```

## Security Notes

- **Never expose `SANITY_API_TOKEN` to the client** - it's only used server-side
- **CORS origins** limit which domains can access your data
- **Public project ID** is safe to expose - it's required for the client
- All sensitive tokens should be in `.env.local` (gitignored)

## Next Steps

Once you've added content in Sanity, you can update the pages to fetch from Sanity instead of using hardcoded data. The fetch functions are ready in `sanity/lib/fetch.ts`.

Example usage in a page:
```typescript
import { getFeaturedCasinos } from '@/sanity/lib/fetch';

export default async function HomePage() {
  const casinos = await getFeaturedCasinos();
  // ... use casinos data
}
```
