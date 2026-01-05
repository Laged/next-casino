/**
 * SEO Utilities - Main Export
 * Centralized exports for all SEO-related utilities
 */

// Schema generators
export {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateReviewSchema,
  generateItemListSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  SITE_CONFIG as SCHEMA_SITE_CONFIG,
} from './schema';

export type { Casino, FAQ, ReviewAuthor } from './schema';

// Metadata utilities
export {
  generateMetadata,
  generateCasinoMetadata,
  generateListMetadata,
  generateArticleMetadata,
  defaultMetadata,
  defaultViewport,
  SITE_CONFIG,
  TITLE_TEMPLATES,
} from './metadata';

export type { MetadataOptions } from './metadata';
