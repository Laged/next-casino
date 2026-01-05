import { z } from 'zod';

// ============================================================================
// ENUMS
// ============================================================================

/**
 * License jurisdictions for casinos
 * Malta (MGA) - Most prestigious, strict EU regulation
 * Estonia (Viro) - Popular for Nordic/EU markets
 * Curacao - Common offshore license
 */
export const License = {
  Malta: 'malta',
  Viro: 'viro',
  Curacao: 'curacao',
} as const;

export type License = (typeof License)[keyof typeof License];

export const LicenseSchema = z.enum(['malta', 'viro', 'curacao']);

/**
 * Bonus type classification
 * Sticky - Bonus cannot be withdrawn, only winnings
 * NonSticky - Bonus can be withdrawn after wagering
 * Cashback - Returns percentage of losses
 */
export const BonusType = {
  Sticky: 'sticky',
  NonSticky: 'non-sticky',
  Cashback: 'cashback',
} as const;

export type BonusType = (typeof BonusType)[keyof typeof BonusType];

export const BonusTypeSchema = z.enum(['sticky', 'non-sticky', 'cashback']);

/**
 * UI bonus badge types for display purposes
 */
export const BonusBadgeType = {
  Welcome: 'welcome',
  NoDeposit: 'noDeposit',
  FreeSpins: 'freeSpins',
  Cashback: 'cashback',
  Exclusive: 'exclusive',
  Vip: 'vip',
  Limited: 'limited',
  New: 'new',
} as const;

export type BonusBadgeType = (typeof BonusBadgeType)[keyof typeof BonusBadgeType];

export const BonusBadgeTypeSchema = z.enum([
  'welcome',
  'noDeposit',
  'freeSpins',
  'cashback',
  'exclusive',
  'vip',
  'limited',
  'new',
]);

/**
 * Payment method categories
 */
export const PaymentMethod = {
  Trustly: 'trustly',
  Visa: 'visa',
  Mastercard: 'mastercard',
  Skrill: 'skrill',
  Neteller: 'neteller',
  Paysafecard: 'paysafecard',
  BankTransfer: 'bank-transfer',
  Crypto: 'crypto',
  ApplePay: 'apple-pay',
  GooglePay: 'google-pay',
  Zimpler: 'zimpler',
  MuchBetter: 'muchbetter',
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentMethodSchema = z.enum([
  'trustly',
  'visa',
  'mastercard',
  'skrill',
  'neteller',
  'paysafecard',
  'bank-transfer',
  'crypto',
  'apple-pay',
  'google-pay',
  'zimpler',
  'muchbetter',
]);

/**
 * Game provider names
 */
export const GameProvider = {
  NetEnt: 'netent',
  Microgaming: 'microgaming',
  Playtech: 'playtech',
  Evolution: 'evolution',
  Pragmatic: 'pragmatic',
  PlayNGo: 'playngo',
  Yggdrasil: 'yggdrasil',
  RedTiger: 'red-tiger',
  BTG: 'btg',
  Nolimit: 'nolimit',
  Hacksaw: 'hacksaw',
  PushGaming: 'push-gaming',
  Relax: 'relax',
  ELK: 'elk',
  Thunderkick: 'thunderkick',
} as const;

export type GameProvider = (typeof GameProvider)[keyof typeof GameProvider];

export const GameProviderSchema = z.enum([
  'netent',
  'microgaming',
  'playtech',
  'evolution',
  'pragmatic',
  'playngo',
  'yggdrasil',
  'red-tiger',
  'btg',
  'nolimit',
  'hacksaw',
  'push-gaming',
  'relax',
  'elk',
  'thunderkick',
]);

// ============================================================================
// OFFER SCHEMAS
// ============================================================================

/**
 * Welcome offer details
 */
export const WelcomeOfferSchema = z.object({
  title: z.string().min(1, 'Offer title is required'),
  description: z.string().min(1, 'Offer description is required'),
  value: z.string().optional(),
  matchPercentage: z.number().int().min(0).max(1000).optional(),
  maxBonus: z.number().positive().optional(),
  currency: z.string().default('EUR'),
});

export type WelcomeOffer = z.infer<typeof WelcomeOfferSchema>;

/**
 * Wagering requirements
 */
export const WageringSchema = z.object({
  multiplier: z.number().int().min(0).max(100),
  contributionSlots: z.number().min(0).max(100).default(100),
  contributionTable: z.number().min(0).max(100).default(10),
  contributionLive: z.number().min(0).max(100).default(10),
  maxBet: z.number().positive().optional(),
  timeLimit: z.number().int().positive().optional(), // in days
});

export type Wagering = z.infer<typeof WageringSchema>;

/**
 * Free spins offer
 */
export const FreeSpinsOfferSchema = z.object({
  count: z.number().int().positive(),
  value: z.number().positive().optional(), // value per spin
  game: z.string().optional(),
  wageringMultiplier: z.number().int().min(0).optional(),
  noWagering: z.boolean().default(false),
});

export type FreeSpinsOffer = z.infer<typeof FreeSpinsOfferSchema>;

/**
 * Complete offer structure
 */
export const OfferSchema = z.object({
  welcome: WelcomeOfferSchema,
  wagering: WageringSchema,
  freeSpins: FreeSpinsOfferSchema.optional(),
  bonusType: BonusTypeSchema,
  minDeposit: z.number().positive(),
  maxWin: z.number().positive().optional(),
  bonusCode: z.string().optional(),
  termsUrl: z.string().url().optional(),
  expiresAt: z.string().datetime().optional(),
});

export type Offer = z.infer<typeof OfferSchema>;

// ============================================================================
// SPECS SCHEMAS
// ============================================================================

/**
 * Withdrawal limits
 */
export const WithdrawalLimitsSchema = z.object({
  daily: z.number().positive().optional(),
  weekly: z.number().positive().optional(),
  monthly: z.number().positive().optional(),
  currency: z.string().default('EUR'),
});

export type WithdrawalLimits = z.infer<typeof WithdrawalLimitsSchema>;

/**
 * Casino specifications
 */
export const SpecsSchema = z.object({
  license: LicenseSchema,
  established: z.number().int().min(1990).max(new Date().getFullYear()),
  paymentMethods: z.array(PaymentMethodSchema).min(1),
  minDeposit: z.number().positive(),
  minWithdrawal: z.number().positive(),
  withdrawalTime: z.string(), // e.g., "0-24 hours", "1-3 days"
  withdrawalLimits: WithdrawalLimitsSchema.optional(),
  gameProviders: z.array(GameProviderSchema).min(1),
  gameCount: z.number().int().positive().optional(),
  liveCasino: z.boolean().default(true),
  mobileApp: z.boolean().default(false),
  languages: z.array(z.string()).min(1),
  customerSupport: z.object({
    liveChat: z.boolean().default(true),
    email: z.boolean().default(true),
    phone: z.boolean().default(false),
    hours: z.string().optional(), // e.g., "24/7", "09:00-21:00"
  }),
  responsibleGambling: z.object({
    depositLimits: z.boolean().default(true),
    selfExclusion: z.boolean().default(true),
    realityCheck: z.boolean().default(false),
    coolingOff: z.boolean().default(false),
  }),
});

export type Specs = z.infer<typeof SpecsSchema>;

// ============================================================================
// CASINO SCHEMA
// ============================================================================

/**
 * Casino tag for categorization
 */
export const CasinoTagSchema = z.object({
  slug: z.string().min(1),
  label: z.string().min(1),
});

export type CasinoTag = z.infer<typeof CasinoTagSchema>;

/**
 * Badge configuration for UI display
 */
export const CasinoBadgeSchema = z.object({
  type: BonusBadgeTypeSchema,
  label: z.string().optional(),
});

export type CasinoBadge = z.infer<typeof CasinoBadgeSchema>;

/**
 * Rating breakdown
 */
export const RatingBreakdownSchema = z.object({
  overall: z.number().min(0).max(5),
  bonuses: z.number().min(0).max(5).optional(),
  games: z.number().min(0).max(5).optional(),
  payments: z.number().min(0).max(5).optional(),
  support: z.number().min(0).max(5).optional(),
  mobile: z.number().min(0).max(5).optional(),
  trustworthiness: z.number().min(0).max(5).optional(),
});

export type RatingBreakdown = z.infer<typeof RatingBreakdownSchema>;

/**
 * Complete Casino interface
 */
export const CasinoSchema = z.object({
  // Core identification
  id: z.string().uuid(),
  name: z.string().min(1, 'Casino name is required'),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),

  // Branding
  logo: z.string().url(),
  logoAlt: z.string().optional(),
  brandColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),

  // Links
  affiliateLink: z.string().url(),
  reviewUrl: z.string().optional(),
  websiteUrl: z.string().url().optional(),

  // Ranking & Rating
  rank: z.number().int().positive(),
  rating: RatingBreakdownSchema,
  reviewCount: z.number().int().nonnegative().optional(),

  // Categorization
  tags: z.array(CasinoTagSchema).min(1),
  badges: z.array(CasinoBadgeSchema).optional(),
  features: z.array(z.string()),

  // Offer details
  offer: OfferSchema,

  // Technical specifications
  specs: SpecsSchema,

  // Status flags
  isNew: z.boolean().default(false),
  isExclusive: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),

  // Pros and cons for reviews
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),

  // SEO
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().optional(),
});

export type Casino = z.infer<typeof CasinoSchema>;

// ============================================================================
// PARTIAL SCHEMAS FOR FORMS/UPDATES
// ============================================================================

/**
 * Schema for creating a new casino (without auto-generated fields)
 */
export const CreateCasinoSchema = CasinoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateCasino = z.infer<typeof CreateCasinoSchema>;

/**
 * Schema for updating a casino (all fields optional)
 */
export const UpdateCasinoSchema = CasinoSchema.partial().omit({
  id: true,
  createdAt: true,
});

export type UpdateCasino = z.infer<typeof UpdateCasinoSchema>;

/**
 * Simplified casino for list views
 */
export const CasinoListItemSchema = CasinoSchema.pick({
  id: true,
  name: true,
  slug: true,
  logo: true,
  affiliateLink: true,
  rank: true,
  rating: true,
  tags: true,
  badges: true,
  features: true,
  isNew: true,
  isExclusive: true,
  isFeatured: true,
}).extend({
  offer: z.object({
    welcome: WelcomeOfferSchema,
    bonusType: BonusTypeSchema,
    termsUrl: z.string().url().optional(),
  }),
});

export type CasinoListItem = z.infer<typeof CasinoListItemSchema>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate a casino object
 */
export function validateCasino(data: unknown): Casino {
  return CasinoSchema.parse(data);
}

/**
 * Safe validate with error details
 */
export function safeParseCasino(data: unknown) {
  return CasinoSchema.safeParse(data);
}

/**
 * Validate an array of casinos
 */
export function validateCasinoArray(data: unknown): Casino[] {
  return z.array(CasinoSchema).parse(data);
}

/**
 * Validate casino for list display
 */
export function validateCasinoListItem(data: unknown): CasinoListItem {
  return CasinoListItemSchema.parse(data);
}
