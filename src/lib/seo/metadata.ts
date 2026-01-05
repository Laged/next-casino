/**
 * Metadata Utilities for Casino Website
 * Consistent meta tag generation for all pages
 */

import type { Metadata, Viewport } from 'next';

// Site configuration
const SITE_CONFIG = {
  name: 'Kasinolista',
  url: 'https://kasinolista.fi',
  locale: 'fi_FI',
  twitterHandle: '@kasinolista',
  defaultImage: 'https://kasinolista.fi/og-default.jpg',
} as const;

// Finnish locale title templates
const TITLE_TEMPLATES = {
  default: '%s | Kasinolista',
  home: 'Kasinolista - Suomen paras kasino-opas',
  casino: '%s arvostelu | Kasinolista',
  list: '%s | Kasinolista',
  article: '%s | Kasinolista artikkelit',
} as const;

export interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  template?: keyof typeof TITLE_TEMPLATES;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  type?: 'website' | 'article';
}

/**
 * Generates consistent metadata for all pages
 */
export function generateMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    path = '',
    image = SITE_CONFIG.defaultImage,
    noIndex = false,
    template = 'default',
    keywords = [],
    publishedTime,
    modifiedTime,
    authors = [],
    type = 'website',
  } = options;

  const url = `${SITE_CONFIG.url}${path}`;
  const titleTemplate = TITLE_TEMPLATES[template];
  const formattedTitle = titleTemplate.includes('%s') ? titleTemplate.replace('%s', title) : title;

  // Base keywords for all pages
  const baseKeywords = [
    'nettikasino',
    'kasino',
    'kasinobonukset',
    'pelaaminen',
    'uhkapeli',
    'vedonlyonti',
    'suomi',
    'suomalainen kasino',
  ];

  const metadata: Metadata = {
    title: formattedTitle,
    description,
    keywords: [...baseKeywords, ...keywords],
    authors: authors.length > 0 ? authors.map((name) => ({ name })) : [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
      languages: {
        'fi-FI': url,
      },
    },
    openGraph: {
      title: formattedTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: authors.length > 0 ? authors : [SITE_CONFIG.name],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
    category: 'gambling',
  };

  return metadata;
}

/**
 * Default viewport configuration
 */
export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
};

/**
 * Generates metadata for casino review pages
 */
export function generateCasinoMetadata(casino: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  rating?: number;
}): Metadata {
  return generateMetadata({
    title: casino.name,
    description: `${casino.name} arvostelu ja kokemuksia. ${casino.description}`,
    path: `/kasino/${casino.slug}`,
    image: casino.image,
    template: 'casino',
    keywords: [
      casino.name.toLowerCase(),
      `${casino.name.toLowerCase()} kokemuksia`,
      `${casino.name.toLowerCase()} arvostelu`,
      `${casino.name.toLowerCase()} bonus`,
    ],
  });
}

/**
 * Generates metadata for list pages
 */
export function generateListMetadata(list: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}): Metadata {
  return generateMetadata({
    title: list.title,
    description: list.description,
    path: `/${list.slug}`,
    image: list.image,
    template: 'list',
    keywords: [list.title.toLowerCase(), 'parhaat kasinot', 'kasinovertailu', 'kasinolista'],
  });
}

/**
 * Generates metadata for article pages
 */
export function generateArticleMetadata(article: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
}): Metadata {
  return generateMetadata({
    title: article.title,
    description: article.description,
    path: `/artikkelit/${article.slug}`,
    image: article.image,
    template: 'article',
    type: 'article',
    publishedTime: article.publishedTime,
    modifiedTime: article.modifiedTime,
    authors: article.author ? [article.author] : [],
  });
}

/**
 * Default metadata for the site
 */
export const defaultMetadata: Metadata = generateMetadata({
  title: 'Suomen paras kasino-opas',
  description:
    'Kasinolista - Suomen kattavin nettikasinoiden vertailusivusto. Loyda parhaat kasinobonukset, lue arvosteluja ja vertaile kasinoita.',
  template: 'home',
  keywords: ['parhaat nettikasinot', 'kasinobonukset 2024', 'uudet kasinot', 'ilmaiskierrokset'],
});

// Export SITE_CONFIG for use in other modules
export { SITE_CONFIG, TITLE_TEMPLATES };
