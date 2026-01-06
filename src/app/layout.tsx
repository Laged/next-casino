import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Parhaat Nettikasinot 2026 | Kasinolista.fi',
    template: '%s | Kasinolista.fi',
  },
  description:
    'Vertaile parhaat nettikasinot ja löydä luotettavat kasinot suomalaisille pelaajille. Uudet kasinot, bonukset ja ilmaiskierrokset - kaikki yhdestä paikasta.',
  keywords: [
    'nettikasinot',
    'parhaat kasinot',
    'uudet kasinot',
    'kasinobonukset',
    'ilmaiskierrokset',
    'pikakasinot',
    'verovapaat kasinot',
  ],
  authors: [{ name: 'Kasinolista.fi' }],
  creator: 'Kasinolista.fi',
  publisher: 'Kasinolista.fi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'fi-FI': siteUrl,
      'x-default': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fi_FI',
    url: siteUrl,
    siteName: 'Kasinolista.fi',
    title: 'Parhaat Nettikasinot 2026 | Kasinolista.fi',
    description:
      'Vertaile parhaat nettikasinot ja löydä luotettavat kasinot suomalaisille pelaajille.',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kasinolista.fi - Parhaat Nettikasinot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parhaat Nettikasinot 2026 | Kasinolista.fi',
    description:
      'Vertaile parhaat nettikasinot ja löydä luotettavat kasinot suomalaisille pelaajille.',
    images: [`${siteUrl}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10B981' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Structured data for the website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kasinolista.fi',
    url: siteUrl,
    description: 'Parhaat nettikasinot suomalaisille pelaajille',
    inLanguage: 'fi-FI',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/haku?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kasinolista.fi',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: 'Suomen luotetuin nettikasinovertailu',
    foundingDate: '2020',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@kasinolista.fi',
      contactType: 'customer service',
      availableLanguage: 'Finnish',
    },
  };

  return (
    <html
      lang="fi"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="alternate" hrefLang="fi-FI" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-casino-dark font-sans text-white antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
