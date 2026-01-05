/**
 * Central type exports for the casino application
 *
 * Usage:
 * import { Casino, CasinoSchema, License, BonusType } from '@/types';
 * import type { PageMetadata, ContentBlock } from '@/types';
 */

// ============================================================================
// CASINO TYPES
// ============================================================================

// Enums
export {
  License,
  BonusType,
  BonusBadgeType,
  PaymentMethod,
  GameProvider,
} from "./casino";

// Schemas
export {
  LicenseSchema,
  BonusTypeSchema,
  BonusBadgeTypeSchema,
  PaymentMethodSchema,
  GameProviderSchema,
  WelcomeOfferSchema,
  WageringSchema,
  FreeSpinsOfferSchema,
  OfferSchema,
  WithdrawalLimitsSchema,
  SpecsSchema,
  CasinoTagSchema,
  CasinoBadgeSchema,
  RatingBreakdownSchema,
  CasinoSchema,
  CreateCasinoSchema,
  UpdateCasinoSchema,
  CasinoListItemSchema,
} from "./casino";

// Types
export type {
  WelcomeOffer,
  Wagering,
  FreeSpinsOffer,
  Offer,
  WithdrawalLimits,
  Specs,
  CasinoTag,
  CasinoBadge,
  RatingBreakdown,
  Casino,
  CreateCasino,
  UpdateCasino,
  CasinoListItem,
} from "./casino";

// Validation helpers
export {
  validateCasino,
  safeParseCasino,
  validateCasinoArray,
  validateCasinoListItem,
} from "./casino";

// ============================================================================
// CONTENT TYPES
// ============================================================================

// Schemas
export {
  HeroBadgeSchema,
  CTASchema,
  StatItemSchema,
  TrustBadgeSchema,
  HeroBlockSchema,
  CasinoListDisplaySchema,
  CasinoListBlockSchema,
  TextBlockSchema,
  FAQItemSchema,
  FAQBlockSchema,
  ProsConsItemSchema,
  ProsConsBlockSchema,
  ComparisonColumnSchema,
  ComparisonTableBlockSchema,
  AuthorSchema,
  AuthorBioBlockSchema,
  CTABannerBlockSchema,
  ImageBlockSchema,
  ContentBlockSchema,
  OpenGraphSchema,
  TwitterCardSchema,
  BreadcrumbItemSchema,
  PageMetadataSchema,
  PageContentSchema,
} from "./content";

// Types
export type {
  HeroBadge,
  CTA,
  StatItem,
  TrustBadge,
  HeroBlock,
  CasinoListDisplay,
  CasinoListBlock,
  TextBlock,
  FAQItem,
  FAQBlock,
  ProsConsItem,
  ProsConsBlock,
  ComparisonColumn,
  ComparisonTableBlock,
  Author,
  AuthorBioBlock,
  CTABannerBlock,
  ImageBlock,
  ContentBlock,
  OpenGraph,
  TwitterCard,
  BreadcrumbItem,
  PageMetadata,
  PageContent,
} from "./content";

// Validation helpers
export {
  validatePageMetadata,
  validateContentBlock,
  validatePageContent,
  safeParsePageContent,
  validateFAQItems,
} from "./content";
