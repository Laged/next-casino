# Content Management & Design System Workflow

## 1. The Headless CMS Choice
**Recommendation: Sanity.io** or **Contentful**.
- *Why:* They separate content from presentation perfectly.
- *Non-Dev Friendly:* They offer "Visual Editing" or "Live Preview" modes where editors can see changes in real-time before publishing.

## 2. Storybook as the "Component Workshop"
We will use Storybook to build the UI components in isolation before connecting them to the CMS. This ensures the design is robust.

- **Story Hierarchy:**
    - `Atoms`: Buttons, badges, star ratings.
    - `Molecules`: Casino Card, Info Box.
    - `Organisms`: Top List Section, Footer.
    - `Pages`: Full mockups of the Homepage.
- **Controls:** Developers will add "Controls" (knobs) to Storybook. This mimics the CMS experience. For example, a "Non-Sticky" boolean toggle in Storybook will eventually map to the CMS boolean field.

## 3. The "Block Content" Strategy
Instead of hardcoding pages, we define "Blocks" in the CMS.
- **CMS:** Editor selects "Add Block" -> Chooses "Comparison Table".
- **Next.js:** A `BlockRenderer` component maps the CMS string to the actual React Component.

## 4. Editor Workflow
1.  Developer builds `CasinoCard` in Storybook.
2.  Developer connects `CasinoCard` props to Sanity schema.
3.  Editor logs into Sanity, creates "Hurmio Kasino", fills in fields.
4.  Next.js fetches data and renders `CasinoCard` with Hurmio data.
