/**
 * Robots.txt Configuration for Casino Website
 * Controls search engine crawling behavior
 *
 * Key rules:
 * - Disallow search parameters to prevent duplicate content
 * - Block API and admin routes
 * - Block AI crawlers
 */

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Search and filter parameters (prevent duplicate content)
          '/haku',
          '/*?q=*',
          '/*?search=*',
          '/*?filter=*',
          '/*?sort=*',
          '/*?page=*',
          '/*?order=*',

          // Technical routes
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',

          // Preview and draft content
          '/preview/',
          '/draft/',

          // Authentication routes
          '/login',
          '/logout',
          '/register',
          '/auth/',

          // Tracking parameters (prevent duplicate content)
          '/*?ref=*',
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
          '/*?msclkid=*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/*?q=*',
          '/*?search=*',
          '/*?filter=*',
        ],
      },
      // Block AI crawlers
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/'],
      },
      {
        userAgent: 'anthropic-ai',
        disallow: ['/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
