# ReactBits Component Implementation Plan

## Overview

This plan outlines the strategic implementation of ReactBits animated components for the Kasinolista casino site, with **performance and SEO as the #1 priority**. We'll select components that enhance the "high-tech, next level casino experience" while maintaining excellent Core Web Vitals.

## Performance-First Component Selection

### Selection Criteria (Priority Order)

1. **SEO Impact**: Must not block rendering or affect LCP
2. **Bundle Size**: Prefer lighter animation libraries (Framer Motion > GSAP for most cases)
3. **SSR Compatibility**: Must work with Next.js App Router
4. **Hydration Cost**: Minimize JavaScript execution on page load
5. **Visual Impact**: Create premium casino atmosphere

### Library Dependencies Analysis

| Library | Bundle Size | SSR Support | Use Case |
|---------|-------------|-------------|----------|
| Framer Motion | ~50KB gzipped | ✅ Excellent | Text animations, micro-interactions |
| GSAP | ~60KB gzipped | ⚠️ Requires setup | Complex scroll animations |
| CSS Animations | 0KB | ✅ Native | Simple hover effects |

**Decision**: Prioritize Framer Motion-based components, use CSS for simple effects, reserve GSAP for hero sections only.

---

## Selected Components by Page Section

### 1. Hero Section (Homepage)

#### Primary: `Aurora` Background
- **Source**: ReactBits Backgrounds
- **Why**: Creates premium casino atmosphere without blocking content
- **Performance Strategy**:
  ```tsx
  // Lazy load background, render content immediately
  const Aurora = dynamic(() => import('@/components/ui/aurora'), {
    ssr: false, // Background only - no SEO impact
    loading: () => <div className="bg-gradient-to-b from-slate-900 to-slate-800" />
  })
  ```
- **SEO Impact**: None (decorative, loaded after content)

#### Secondary: `BlurText` for Headlines
- **Source**: ReactBits Text Animations (Framer Motion variant)
- **Why**: Lighter than GSAP SplitText, excellent SSR support
- **Performance Strategy**:
  ```tsx
  // Server-render text content, animate on client
  <h1>
    <BlurText
      text="Suomen Parhaat Kasinot 2025"
      delay={150}
      animateBy="words"
      className="text-5xl font-bold"
    />
  </h1>
  ```
- **SEO Impact**: ✅ Text is server-rendered and indexable

### 2. Casino Cards (Listing Pages)

#### `TiltCard` with CSS-only hover
- **Source**: Custom implementation inspired by ReactBits
- **Why**: Pure CSS = zero JS overhead for listing pages
- **Performance Strategy**:
  ```css
  .casino-card {
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
  }
  .casino-card:hover {
    transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
  }
  ```
- **SEO Impact**: None (CSS only)

#### `CountUp` for Ratings/Numbers
- **Source**: ReactBits Animations (Intersection Observer variant)
- **Why**: Numbers animate only when visible
- **Performance Strategy**:
  ```tsx
  // Only animates when scrolled into view
  <CountUp
    from={0}
    to={casino.rating}
    duration={1}
    startWhen="inView"
  />
  ```
- **SEO Impact**: ✅ Initial value rendered server-side

### 3. Navigation & Header

#### `MagneticButton` for CTAs
- **Source**: ReactBits Components
- **Why**: Subtle interaction without heavy animation
- **Performance Strategy**: Apply only to primary CTAs, not all buttons
- **SEO Impact**: None (interaction only)

#### `GradientText` for Logo/Brand
- **Source**: ReactBits Text Animations (CSS variant)
- **Why**: Pure CSS gradient animation
- **Performance Strategy**:
  ```css
  .gradient-text {
    background: linear-gradient(90deg, #ffd700, #ff6b00, #ffd700);
    background-size: 200% auto;
    animation: gradient 3s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ```
- **SEO Impact**: ✅ Text remains accessible

### 4. Review Pages (Individual Casino)

#### `SplitText` for Review Headlines (GSAP)
- **Source**: ReactBits Text Animations
- **Why**: Premium feel for detailed review pages (lower traffic, can afford more JS)
- **Performance Strategy**:
  ```tsx
  // Load GSAP only on review pages
  const SplitText = dynamic(() => import('@/components/ui/split-text'), {
    ssr: true, // Text content is critical
  })
  ```
- **SEO Impact**: ✅ Server-rendered text, animation is enhancement

#### `ScrollFloat` for Feature Sections
- **Source**: ReactBits Animations
- **Why**: Reveals content on scroll without blocking initial render
- **Performance Strategy**: Use `will-change: transform` and Intersection Observer
- **SEO Impact**: ✅ Content is in DOM, just visually hidden initially

### 5. Backgrounds & Atmosphere

#### `Particles` for Hero (Optional)
- **Source**: ReactBits Backgrounds
- **Why**: Casino atmosphere with floating elements
- **Performance Strategy**:
  ```tsx
  // Canvas-based, non-blocking
  const Particles = dynamic(() => import('@/components/ui/particles'), {
    ssr: false,
    loading: () => null // No placeholder needed
  })

  // Reduce particle count on mobile
  <Particles count={isMobile ? 20 : 50} />
  ```
- **SEO Impact**: None (decorative canvas)

#### `Noise` Texture Overlay
- **Source**: ReactBits Backgrounds (CSS variant)
- **Why**: Adds depth without any JS
- **Performance Strategy**: Single CSS pseudo-element with noise SVG
- **SEO Impact**: None

---

## Implementation Architecture

### File Structure

```
src/
├── components/
│   └── ui/
│       └── reactbits/
│           ├── blur-text.tsx       # Framer Motion
│           ├── split-text.tsx      # GSAP (lazy loaded)
│           ├── count-up.tsx        # Intersection Observer
│           ├── magnetic-button.tsx # Pointer events
│           ├── aurora.tsx          # Canvas (ssr: false)
│           ├── particles.tsx       # Canvas (ssr: false)
│           └── index.ts            # Barrel export
├── styles/
│   └── reactbits.css              # CSS-only animations
```

### Loading Strategy

```tsx
// lib/reactbits-loader.ts

// Tier 1: Critical (loaded immediately)
export { BlurText } from '@/components/ui/reactbits/blur-text'
export { GradientText } from '@/components/ui/reactbits/gradient-text'

// Tier 2: Above fold (preloaded)
export const CountUp = dynamic(
  () => import('@/components/ui/reactbits/count-up'),
  { ssr: true }
)

// Tier 3: Below fold (lazy loaded)
export const ScrollFloat = dynamic(
  () => import('@/components/ui/reactbits/scroll-float'),
  { ssr: true }
)

// Tier 4: Decorative (client only)
export const Aurora = dynamic(
  () => import('@/components/ui/reactbits/aurora'),
  { ssr: false }
)

export const Particles = dynamic(
  () => import('@/components/ui/reactbits/particles'),
  { ssr: false }
)
```

---

## Performance Budget

### JavaScript Budget per Page

| Page Type | Animation JS Budget | Components Allowed |
|-----------|--------------------|--------------------|
| Homepage | 80KB | Aurora, BlurText, CountUp |
| Listing | 30KB | CSS effects only, CountUp |
| Review | 100KB | SplitText, ScrollFloat, all |
| Article | 50KB | BlurText, ScrollFloat |

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | No animation blocking main content |
| FID | < 100ms | Defer non-critical JS |
| CLS | < 0.1 | Reserve space for animated elements |
| INP | < 200ms | Use CSS transforms, not layout |

---

## Implementation Phases

### Phase 1: CSS Foundation (Week 1)
- [ ] Create `reactbits.css` with pure CSS animations
- [ ] Implement `GradientText` (CSS only)
- [ ] Implement `TiltCard` hover effect (CSS only)
- [ ] Add `Noise` texture overlay (CSS only)
- [ ] Test CWV scores baseline

### Phase 2: Framer Motion Components (Week 2)
- [ ] Install Framer Motion (`bun add framer-motion`)
- [ ] Implement `BlurText` component
- [ ] Implement `CountUp` with Intersection Observer
- [ ] Implement `MagneticButton`
- [ ] Verify no CWV regression

### Phase 3: Background Effects (Week 3)
- [ ] Implement `Aurora` background (canvas)
- [ ] Implement `Particles` background (canvas)
- [ ] Add reduced motion media query support
- [ ] Mobile optimization (reduce effects)
- [ ] Test on low-end devices

### Phase 4: GSAP Components (Week 4, Review Pages Only)
- [ ] Install GSAP (`bun add gsap`)
- [ ] Implement `SplitText` for review headlines
- [ ] Implement `ScrollFloat` for sections
- [ ] Lazy load GSAP bundle
- [ ] Final performance audit

---

## SEO Safeguards

### 1. Server-Side Rendering Requirements

```tsx
// ✅ CORRECT: Text always server-rendered
export function CasinoHeadline({ text }: { text: string }) {
  return (
    <h1 className="text-4xl font-bold">
      <BlurText text={text} />
      {/* Fallback for bots/no-JS */}
      <noscript>{text}</noscript>
    </h1>
  )
}

// ❌ WRONG: Text only visible after animation
export function CasinoHeadline({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  useEffect(() => setShow(true), [])
  return show ? <h1>{text}</h1> : null
}
```

### 2. Structured Data Preservation

All animated casino cards must include schema.org markup:

```tsx
<article itemScope itemType="https://schema.org/Review">
  <TiltCard>
    <h2 itemProp="itemReviewed">{casino.name}</h2>
    <CountUp to={casino.rating} /> {/* Visual only */}
    <meta itemProp="ratingValue" content={casino.rating.toString()} />
  </TiltCard>
</article>
```

### 3. Accessibility (Reduced Motion)

```tsx
// hooks/use-reduced-motion.ts
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    mq.addEventListener('change', (e) => setReduced(e.matches))
  }, [])

  return reduced
}

// Usage in components
const reducedMotion = useReducedMotion()
if (reducedMotion) return <span>{text}</span>
return <BlurText text={text} />
```

---

## Testing Requirements

### Playwright Tests for Animations

```typescript
// tests/e2e/animations/reactbits.spec.ts

test.describe('ReactBits Performance', () => {
  test('homepage loads with LCP < 2.5s', async ({ page }) => {
    const metrics = await page.evaluate(() =>
      new Promise(resolve => {
        new PerformanceObserver((list) => {
          resolve(list.getEntries())
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    )
    expect(metrics[0].startTime).toBeLessThan(2500)
  })

  test('casino cards are indexable without JS', async ({ page }) => {
    await page.setJavaScriptEnabled(false)
    await page.goto('/kasinot')
    const cards = await page.locator('[itemtype="https://schema.org/Review"]').count()
    expect(cards).toBeGreaterThan(0)
  })

  test('animations respect reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const animated = await page.locator('[data-animated="true"]').count()
    expect(animated).toBe(0)
  })
})
```

### Claude Code Commands

```bash
# Test animation performance
bun run test:animations

# Check CWV after changes
bun run lighthouse --url=http://localhost:3000

# Verify SSR text content
bun run test:seo:animations
```

---

## Dependency Installation

```bash
# Phase 1: CSS only - no dependencies

# Phase 2: Framer Motion
bun add framer-motion

# Phase 3: No additional deps (canvas is native)

# Phase 4: GSAP (review pages only)
bun add gsap
```

**Total Bundle Impact (estimated):**
- Framer Motion: ~50KB gzipped
- GSAP (lazy): ~60KB gzipped (only on review pages)
- Custom CSS: ~5KB

---

## Summary

This plan delivers a **high-tech casino experience** while maintaining:

- ✅ **SEO**: All text content server-rendered and indexable
- ✅ **Performance**: LCP < 2.5s, no CLS from animations
- ✅ **Accessibility**: Reduced motion support throughout
- ✅ **Progressive Enhancement**: Site works without JavaScript

**Selected Components (8 total):**
1. `Aurora` - Hero background (canvas, ssr: false)
2. `BlurText` - Headlines (Framer Motion, SSR)
3. `GradientText` - Logo/brand (CSS only)
4. `CountUp` - Ratings/numbers (Intersection Observer)
5. `TiltCard` - Casino cards (CSS hover)
6. `MagneticButton` - CTAs (pointer events)
7. `Particles` - Atmosphere (canvas, optional)
8. `SplitText` - Review headlines (GSAP, lazy loaded)

All components follow the **render first, animate second** principle.
