/**
 * JSON-LD Component for Schema.org Structured Data
 * Safely injects schema.org JSON-LD data into the page
 */

import type React from 'react';

interface JsonLdProps {
  /** Schema.org structured data object */
  data: Record<string, unknown> | Record<string, unknown>[];
  /** Optional key for lists of schemas */
  id?: string;
}

/**
 * Component that safely renders JSON-LD structured data
 * Handles XSS prevention by properly escaping the JSON content
 */
export function JsonLd({ data, id }: JsonLdProps): React.ReactElement {
  // Safely stringify JSON, handling potential XSS vectors
  const safeJsonLd = JSON.stringify(data, null, 0)
    // Escape closing script tags to prevent XSS
    .replace(/<\/script/gi, '<\\/script')
    // Escape HTML entities in strings
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

  return (
    <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd }} />
  );
}

/**
 * Component for rendering multiple JSON-LD schemas
 */
export function JsonLdMultiple({
  schemas,
}: {
  schemas: Array<{ id: string; data: Record<string, unknown> }>;
}): React.ReactElement {
  return (
    <>
      {schemas.map(({ id, data }) => (
        <JsonLd key={id} id={id} data={data} />
      ))}
    </>
  );
}

/**
 * Pre-built schema components for common use cases
 */

interface WebsiteSchemaProps {
  name: string;
  url: string;
  description: string;
  searchUrl?: string;
}

export function WebsiteSchema({
  name,
  url,
  description,
  searchUrl,
}: WebsiteSchemaProps): React.ReactElement {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
  };

  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    };
  }

  return <JsonLd id="website-schema" data={schema} />;
}

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  sameAs,
}: OrganizationSchemaProps): React.ReactElement {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
  };

  if (description) {
    schema.description = description;
  }

  if (sameAs && sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  return <JsonLd id="organization-schema" data={schema} />;
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd id="breadcrumb-schema" data={schema} />;
}

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps): React.ReactElement {
  const schema = {
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

  return <JsonLd id="faq-schema" data={schema} />;
}

interface ReviewSchemaProps {
  itemName: string;
  itemType?: string;
  rating: number;
  reviewCount: number;
  description: string;
  url: string;
  image?: string;
}

export function ReviewSchema({
  itemName,
  itemType = 'Casino',
  rating,
  reviewCount,
  description,
  url,
  image,
}: ReviewSchemaProps): React.ReactElement {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemType,
      name: itemName,
      url,
      ...(image && { image }),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toFixed(1),
        bestRating: '5',
        worstRating: '1',
        ratingCount: reviewCount,
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: description,
  };

  return <JsonLd id="review-schema" data={schema} />;
}

export default JsonLd;
