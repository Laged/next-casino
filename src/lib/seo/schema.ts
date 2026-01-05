/**
 * JSON-LD Schema Generators for Casino Website
 * Generates structured data for improved SEO and rich snippets
 */

// Types for schema generation
export interface Casino {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  url?: string;
  rating: number;
  reviewCount: number;
  bonusTitle?: string;
  bonusDescription?: string;
  licensedBy?: string;
  founded?: string;
  minDeposit?: number;
  payoutTime?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ReviewAuthor {
  name: string;
  url?: string;
}

// Site configuration
const SITE_CONFIG = {
  name: 'Kasinolista',
  url: 'https://kasinolista.fi',
  logo: 'https://kasinolista.fi/logo.png',
  description: 'Suomen kattavin kasino-opas. Vertaile nettikasinoita, lue arvosteluja ja loyda parhaat bonukset.',
  locale: 'fi-FI',
  founder: 'Kasinolista',
  foundingDate: '2024',
  sameAs: [
    'https://twitter.com/kasinolista',
    'https://facebook.com/kasinolista',
  ],
} as const;

/**
 * Generates Website schema for the main site
 */
export function generateWebsiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/haku?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo,
      },
    },
  };
}

/**
 * Generates Organization schema for the company
 */
export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: SITE_CONFIG.logo,
      width: 600,
      height: 60,
    },
    description: SITE_CONFIG.description,
    foundingDate: SITE_CONFIG.foundingDate,
    founder: {
      '@type': 'Organization',
      name: SITE_CONFIG.founder,
    },
    sameAs: SITE_CONFIG.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Finnish', 'English'],
      email: 'info@kasinolista.fi',
    },
  };
}

/**
 * Generates Review schema for a casino review
 */
export function generateReviewSchema(
  casino: Casino,
  author?: ReviewAuthor
): Record<string, unknown> {
  const reviewAuthor = author || {
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Casino',
      name: casino.name,
      description: casino.description,
      url: casino.url || `${SITE_CONFIG.url}/kasino/${casino.slug}`,
      image: casino.logo,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: casino.rating.toFixed(1),
        bestRating: '5',
        worstRating: '1',
        ratingCount: casino.reviewCount,
      },
      ...(casino.licensedBy && {
        areaServed: {
          '@type': 'Country',
          name: 'Finland',
        },
      }),
    },
    author: {
      '@type': 'Organization',
      name: reviewAuthor.name,
      url: reviewAuthor.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo,
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: casino.rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: casino.description,
    datePublished: new Date().toISOString().split('T')[0],
  };
}

/**
 * Generates ItemList schema for casino listings
 */
export function generateItemListSchema(
  casinos: Casino[],
  listName: string = 'Parhaat nettikasinot'
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    description: `${listName} - vertailu ja arvostelut`,
    numberOfItems: casinos.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: casinos.map((casino, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: casino.name,
      url: `${SITE_CONFIG.url}/kasino/${casino.slug}`,
      item: {
        '@type': 'Casino',
        name: casino.name,
        description: casino.description,
        url: casino.url || `${SITE_CONFIG.url}/kasino/${casino.slug}`,
        image: casino.logo,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: casino.rating.toFixed(1),
          bestRating: '5',
          worstRating: '1',
          ratingCount: casino.reviewCount,
        },
        ...(casino.bonusTitle && {
          offers: {
            '@type': 'Offer',
            name: casino.bonusTitle,
            description: casino.bonusDescription,
            category: 'Casino Bonus',
          },
        }),
      },
    })),
  };
}

/**
 * Generates FAQ schema for frequently asked questions
 */
export function generateFAQSchema(faqs: FAQ[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

/**
 * Generates Article schema for blog posts/articles
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || SITE_CONFIG.logo,
    url: `${SITE_CONFIG.url}/artikkelit/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/artikkelit/${article.slug}`,
    },
    inLanguage: SITE_CONFIG.locale,
  };
}

// Export site config for use in other modules
export { SITE_CONFIG };
