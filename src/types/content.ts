import { z } from "zod";
import { CasinoListItemSchema, CasinoTagSchema } from "./casino";

// ============================================================================
// BASE BLOCK SCHEMA
// ============================================================================

/**
 * Base fields for all content blocks
 */
const BaseBlockSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().nonnegative(),
});

// ============================================================================
// HERO BLOCK
// ============================================================================

/**
 * Hero section badge
 */
export const HeroBadgeSchema = z.object({
  text: z.string().min(1),
  icon: z.string().optional(), // Icon name from lucide-react
});

export type HeroBadge = z.infer<typeof HeroBadgeSchema>;

/**
 * Call-to-action button
 */
export const CTASchema = z.object({
  text: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(["primary", "secondary", "outline", "ghost"]).default("primary"),
});

export type CTA = z.infer<typeof CTASchema>;

/**
 * Stat display item
 */
export const StatItemSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export type StatItem = z.infer<typeof StatItemSchema>;

/**
 * Trust badge
 */
export const TrustBadgeSchema = z.object({
  icon: z.string(), // Icon name
  text: z.string().min(1),
});

export type TrustBadge = z.infer<typeof TrustBadgeSchema>;

/**
 * Hero block for page headers
 */
export const HeroBlockSchema = BaseBlockSchema.extend({
  type: z.literal("hero"),
  badge: HeroBadgeSchema.optional(),
  title: z.string().min(1, "Hero title is required"),
  titleHighlight: z.string().optional(), // Part of title to highlight
  subtitle: z.string().min(1, "Hero subtitle is required"),
  primaryCta: CTASchema.optional(),
  secondaryCta: CTASchema.optional(),
  stats: z.array(StatItemSchema).optional(),
  trustBadges: z.array(TrustBadgeSchema).optional(),
  variant: z.enum(["default", "centered", "split"]).default("default"),
  backgroundVariant: z.enum(["gradient", "pattern", "minimal"]).default("gradient"),
  image: z.string().url().optional(),
  imageAlt: z.string().optional(),
});

export type HeroBlock = z.infer<typeof HeroBlockSchema>;

// ============================================================================
// CASINO LIST BLOCK
// ============================================================================

/**
 * Display configuration for casino list
 */
export const CasinoListDisplaySchema = z.object({
  variant: z.enum(["default", "compact", "featured", "comparison"]).default("default"),
  showRank: z.boolean().default(true),
  showRating: z.boolean().default(true),
  showFeatures: z.boolean().default(true),
  maxFeatures: z.number().int().positive().default(3),
  columnsDesktop: z.number().int().min(1).max(4).default(1),
  columnsMobile: z.number().int().min(1).max(2).default(1),
});

export type CasinoListDisplay = z.infer<typeof CasinoListDisplaySchema>;

/**
 * Casino list block
 */
export const CasinoListBlockSchema = BaseBlockSchema.extend({
  type: z.literal("casinoList"),
  title: z.string().optional(),
  description: z.string().optional(),
  casinos: z.array(CasinoListItemSchema).min(1),
  display: CasinoListDisplaySchema.optional(),
  showViewAll: z.boolean().default(false),
  viewAllLink: z.string().optional(),
  viewAllText: z.string().default("View All"),
  filterByTag: CasinoTagSchema.optional(),
  maxItems: z.number().int().positive().optional(),
  sortBy: z.enum(["rank", "rating", "newest", "name"]).default("rank"),
});

export type CasinoListBlock = z.infer<typeof CasinoListBlockSchema>;

// ============================================================================
// TEXT BLOCK
// ============================================================================

/**
 * Rich text content block
 */
export const TextBlockSchema = BaseBlockSchema.extend({
  type: z.literal("text"),
  title: z.string().optional(),
  content: z.string().min(1, "Text content is required"),
  format: z.enum(["markdown", "html", "plain"]).default("markdown"),
  columns: z.number().int().min(1).max(3).default(1),
  backgroundColor: z.string().optional(),
  textAlign: z.enum(["left", "center", "right"]).default("left"),
  maxWidth: z.enum(["sm", "md", "lg", "xl", "full"]).default("lg"),
});

export type TextBlock = z.infer<typeof TextBlockSchema>;

// ============================================================================
// FAQ BLOCK
// ============================================================================

/**
 * Single FAQ item
 */
export const FAQItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1, "FAQ question is required"),
  answer: z.string().min(1, "FAQ answer is required"),
  order: z.number().int().nonnegative().optional(),
});

export type FAQItem = z.infer<typeof FAQItemSchema>;

/**
 * FAQ block
 */
export const FAQBlockSchema = BaseBlockSchema.extend({
  type: z.literal("faq"),
  title: z.string().default("Frequently Asked Questions"),
  description: z.string().optional(),
  items: z.array(FAQItemSchema).min(1, "At least one FAQ item is required"),
  variant: z.enum(["accordion", "list", "grid"]).default("accordion"),
  defaultOpen: z.array(z.string()).optional(), // IDs of items to open by default
  allowMultiple: z.boolean().default(true),
  showSchema: z.boolean().default(true), // Include JSON-LD FAQ schema
});

export type FAQBlock = z.infer<typeof FAQBlockSchema>;

// ============================================================================
// PROS CONS BLOCK
// ============================================================================

/**
 * Pro or con item
 */
export const ProsConsItemSchema = z.object({
  text: z.string().min(1),
  highlight: z.boolean().default(false),
});

export type ProsConsItem = z.infer<typeof ProsConsItemSchema>;

/**
 * Pros and cons block
 */
export const ProsConsBlockSchema = BaseBlockSchema.extend({
  type: z.literal("prosCons"),
  title: z.string().optional(),
  pros: z.array(ProsConsItemSchema).min(1, "At least one pro is required"),
  cons: z.array(ProsConsItemSchema).min(1, "At least one con is required"),
  variant: z.enum(["default", "compact", "detailed"]).default("default"),
  showIcons: z.boolean().default(true),
  layout: z.enum(["side-by-side", "stacked"]).default("side-by-side"),
});

export type ProsConsBlock = z.infer<typeof ProsConsBlockSchema>;

// ============================================================================
// COMPARISON TABLE BLOCK
// ============================================================================

/**
 * Comparison column
 */
export const ComparisonColumnSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(["text", "number", "boolean", "rating", "badge"]).default("text"),
  sortable: z.boolean().default(false),
  width: z.enum(["auto", "sm", "md", "lg"]).default("auto"),
});

export type ComparisonColumn = z.infer<typeof ComparisonColumnSchema>;

/**
 * Comparison table block
 */
export const ComparisonTableBlockSchema = BaseBlockSchema.extend({
  type: z.literal("comparisonTable"),
  title: z.string().optional(),
  description: z.string().optional(),
  columns: z.array(ComparisonColumnSchema).min(2),
  casinos: z.array(CasinoListItemSchema).min(2),
  highlightBest: z.boolean().default(true),
  stickyHeader: z.boolean().default(true),
  showRank: z.boolean().default(true),
});

export type ComparisonTableBlock = z.infer<typeof ComparisonTableBlockSchema>;

// ============================================================================
// AUTHOR BIO BLOCK
// ============================================================================

/**
 * Author information
 */
export const AuthorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  role: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  socialLinks: z.object({
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    website: z.string().url().optional(),
  }).optional(),
});

export type Author = z.infer<typeof AuthorSchema>;

/**
 * Author bio block
 */
export const AuthorBioBlockSchema = BaseBlockSchema.extend({
  type: z.literal("authorBio"),
  author: AuthorSchema,
  variant: z.enum(["default", "compact", "detailed"]).default("default"),
  showSocial: z.boolean().default(true),
  showExpertise: z.boolean().default(true),
});

export type AuthorBioBlock = z.infer<typeof AuthorBioBlockSchema>;

// ============================================================================
// CTA BANNER BLOCK
// ============================================================================

/**
 * CTA banner block
 */
export const CTABannerBlockSchema = BaseBlockSchema.extend({
  type: z.literal("ctaBanner"),
  title: z.string().min(1),
  description: z.string().optional(),
  cta: CTASchema,
  secondaryCta: CTASchema.optional(),
  variant: z.enum(["default", "gradient", "minimal"]).default("default"),
  backgroundColor: z.string().optional(),
  image: z.string().url().optional(),
  imagePosition: z.enum(["left", "right", "background"]).default("right"),
});

export type CTABannerBlock = z.infer<typeof CTABannerBlockSchema>;

// ============================================================================
// IMAGE BLOCK
// ============================================================================

/**
 * Image block
 */
export const ImageBlockSchema = BaseBlockSchema.extend({
  type: z.literal("image"),
  src: z.string().url(),
  alt: z.string().min(1, "Image alt text is required"),
  caption: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  layout: z.enum(["full", "contained", "float-left", "float-right"]).default("contained"),
  priority: z.boolean().default(false),
});

export type ImageBlock = z.infer<typeof ImageBlockSchema>;

// ============================================================================
// UNION CONTENT BLOCK TYPE
// ============================================================================

/**
 * Union of all content block types
 */
export const ContentBlockSchema = z.discriminatedUnion("type", [
  HeroBlockSchema,
  CasinoListBlockSchema,
  TextBlockSchema,
  FAQBlockSchema,
  ProsConsBlockSchema,
  ComparisonTableBlockSchema,
  AuthorBioBlockSchema,
  CTABannerBlockSchema,
  ImageBlockSchema,
]);

export type ContentBlock = z.infer<typeof ContentBlockSchema>;

// ============================================================================
// PAGE METADATA
// ============================================================================

/**
 * Open Graph metadata
 */
export const OpenGraphSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  image: z.string().url().optional(),
  imageAlt: z.string().optional(),
  type: z.enum(["website", "article", "profile"]).default("website"),
  siteName: z.string().optional(),
  locale: z.string().default("fi_FI"),
});

export type OpenGraph = z.infer<typeof OpenGraphSchema>;

/**
 * Twitter card metadata
 */
export const TwitterCardSchema = z.object({
  card: z.enum(["summary", "summary_large_image", "app", "player"]).default("summary_large_image"),
  title: z.string().max(70).optional(),
  description: z.string().max(200).optional(),
  image: z.string().url().optional(),
  imageAlt: z.string().optional(),
  site: z.string().optional(), // @username
  creator: z.string().optional(), // @username
});

export type TwitterCard = z.infer<typeof TwitterCardSchema>;

/**
 * Breadcrumb item
 */
export const BreadcrumbItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().optional(),
});

export type BreadcrumbItem = z.infer<typeof BreadcrumbItemSchema>;

/**
 * Page SEO metadata
 */
export const PageMetadataSchema = z.object({
  // Basic meta
  title: z.string().min(1).max(60, "Title should be under 60 characters"),
  description: z.string().min(1).max(160, "Description should be under 160 characters"),
  keywords: z.array(z.string()).optional(),

  // URLs
  canonical: z.string().url().optional(),
  alternates: z.record(z.string(), z.string().url()).optional(), // hreflang alternates

  // Robots
  robots: z.object({
    index: z.boolean().default(true),
    follow: z.boolean().default(true),
    noarchive: z.boolean().default(false),
    nosnippet: z.boolean().default(false),
    maxSnippet: z.number().int().optional(),
    maxImagePreview: z.enum(["none", "standard", "large"]).optional(),
    maxVideoPreview: z.number().int().optional(),
  }).optional(),

  // Social
  openGraph: OpenGraphSchema.optional(),
  twitter: TwitterCardSchema.optional(),

  // Navigation
  breadcrumbs: z.array(BreadcrumbItemSchema).optional(),

  // Schema.org
  schemaType: z.enum([
    "WebPage",
    "Article",
    "FAQPage",
    "ReviewPage",
    "CollectionPage",
    "AboutPage",
    "ContactPage",
  ]).default("WebPage"),

  // Article specific
  article: z.object({
    publishedTime: z.string().datetime().optional(),
    modifiedTime: z.string().datetime().optional(),
    author: AuthorSchema.optional(),
    section: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),

  // Review specific
  review: z.object({
    itemReviewed: z.string().optional(),
    ratingValue: z.number().min(0).max(5).optional(),
    bestRating: z.number().default(5),
    worstRating: z.number().default(0),
  }).optional(),
});

export type PageMetadata = z.infer<typeof PageMetadataSchema>;

// ============================================================================
// PAGE CONTENT SCHEMA
// ============================================================================

/**
 * Complete page content structure
 */
export const PageContentSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  metadata: PageMetadataSchema,
  blocks: z.array(ContentBlockSchema),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  template: z.enum(["default", "landing", "article", "review", "list"]).default("default"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().optional(),
});

export type PageContent = z.infer<typeof PageContentSchema>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate page metadata
 */
export function validatePageMetadata(data: unknown): PageMetadata {
  return PageMetadataSchema.parse(data);
}

/**
 * Validate content block
 */
export function validateContentBlock(data: unknown): ContentBlock {
  return ContentBlockSchema.parse(data);
}

/**
 * Validate complete page content
 */
export function validatePageContent(data: unknown): PageContent {
  return PageContentSchema.parse(data);
}

/**
 * Safe parse page content with error details
 */
export function safeParsePageContent(data: unknown) {
  return PageContentSchema.safeParse(data);
}

/**
 * Validate FAQ items for schema.org
 */
export function validateFAQItems(data: unknown): FAQItem[] {
  return z.array(FAQItemSchema).parse(data);
}
