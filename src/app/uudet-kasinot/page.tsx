import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { getNewCasinos } from '@sanity/lib/fetch';
import { Clock, CreditCard, Shield, Sparkles, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

export const metadata: Metadata = {
  title: 'Uudet Nettikasinot 2026 | Tuoreimmat Kasinot',
  description:
    'Löydä uudet nettikasinot 2026! Vertaile tuoreimmat suomalaiset kasinot, bonukset ja ilmaiskierrokset. Päivitetty lista uusista kasinoista.',
  alternates: {
    canonical: `${siteUrl}/uudet-kasinot`,
  },
  openGraph: {
    title: 'Uudet Nettikasinot 2026 | Tuoreimmat Kasinot',
    description: 'Löydä uudet nettikasinot 2026! Vertaile tuoreimmat suomalaiset kasinot.',
    url: `${siteUrl}/uudet-kasinot`,
    locale: 'fi_FI',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Uudet Nettikasinot 2026',
      },
    ],
  },
};

interface Casino {
  id: string;
  name: string;
  rating: number;
  bonus: string;
  bonusValue: string;
  features: string[];
  license: string;
  minDeposit: string;
  withdrawalTime: string;
  href: string;
  isNew: boolean;
}

function CasinoCard({ casino, position }: { casino: Casino; position: number }) {
  return (
    <article
      data-testid="casino-card"
      className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-colors hover:border-amber-500/50"
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-400 text-xs">
                #{position} Uusi
              </span>
              {casino.isNew && (
                <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-amber-400 text-xs">
                  <Sparkles className="h-3 w-3" />
                  2026
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg text-white">{casino.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-amber-400">{casino.rating}</span>
              </div>
              <span className="text-slate-500 text-xs">|</span>
              <span className="font-medium text-emerald-400 text-xs">{casino.license}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-2xl text-amber-400">{casino.bonusValue}</div>
            <div className="text-slate-400 text-xs">bonus</div>
          </div>
        </div>

        <p className="mb-4 text-slate-300">{casino.bonus}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {casino.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-slate-800 px-2 py-1 text-slate-300 text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="mb-4 flex items-center gap-4 text-slate-400 text-xs">
          <div className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            <span>Min. {casino.minDeposit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Kotiutus: {casino.withdrawalTime}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={`https://example.com/go/${casino.id}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-center font-semibold text-white transition-colors hover:from-amber-600 hover:to-orange-600"
          >
            Pelaa nyt
          </a>
          <Link
            href={casino.href}
            className="rounded-lg bg-slate-800 px-4 py-3 font-medium text-slate-300 transition-colors hover:bg-slate-700"
          >
            Arvostelu
          </Link>
        </div>
      </div>
    </article>
  );
}

// Fallback casinos when Sanity is empty
const fallbackCasinos: Casino[] = [
  {
    id: 'uusi-kasino-1',
    name: 'Uusi Kasino 2026',
    rating: 4.9,
    bonus: '200% bonus + 100 ilmaiskierrosta',
    bonusValue: '500€',
    features: ['Uusi 2026', 'Nopeat kotiutukset', 'Suomenkielinen tuki'],
    license: 'MGA',
    minDeposit: '10€',
    withdrawalTime: '0-24h',
    href: '/arvostelut/uusi-kasino-1',
    isNew: true,
  },
  {
    id: 'uusi-kasino-2',
    name: 'Fresh Casino',
    rating: 4.8,
    bonus: '150% bonus ensitalletukseen',
    bonusValue: '300€',
    features: ['Uusi 2026', 'Pikakasino', 'VIP-ohjelma'],
    license: 'Malta MGA',
    minDeposit: '15€',
    withdrawalTime: '5 min',
    href: '/arvostelut/uusi-kasino-2',
    isNew: true,
  },
  {
    id: 'uusi-kasino-3',
    name: 'Nordic Kasino',
    rating: 4.7,
    bonus: '100 ilmaiskierrosta ilman talletusta',
    bonusValue: 'Ilmainen',
    features: ['Uusi 2026', 'Cashback-bonus', 'Live kasino'],
    license: 'Curacao',
    minDeposit: '10€',
    withdrawalTime: '1-2 päivää',
    href: '/arvostelut/uusi-kasino-3',
    isNew: true,
  },
];

export default async function UudetKasinotPage() {
  // Fetch from Sanity with fallback
  let casinos: Casino[] = fallbackCasinos;

  try {
    const sanityCasinos = await getNewCasinos();
    if (sanityCasinos && sanityCasinos.length > 0) {
      casinos = sanityCasinos.map((c) => ({
        id: c._id,
        name: c.name,
        rating: c.rating,
        bonus: c.bonus || '',
        bonusValue: c.bonusValue || '',
        features: c.features || [],
        license: c.license || '',
        minDeposit: c.minDeposit || '',
        withdrawalTime: c.withdrawalTime || '',
        href: `/arvostelut/${c.slug}`,
        isNew: c.isNew ?? true,
      }));
    }
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    // Use fallback data
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Uudet Nettikasinot 2026',
    description: 'Lista uusista nettikasinoista suomalaisille pelaajille',
    numberOfItems: casinos.length,
    itemListElement: casinos.map((casino, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: casino.name,
      url: `${siteUrl}${casino.href}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Etusivu',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Uudet Kasinot',
        item: `${siteUrl}/uudet-kasinot`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <nav className="mb-6 flex items-center gap-2 text-slate-400 text-sm">
            <Link href="/" className="hover:text-amber-400">
              Etusivu
            </Link>
            <span>/</span>
            <span className="text-white">Uudet Kasinot</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-400 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>Päivitetty tammikuu 2026</span>
            </div>

            <h1 className="mb-4 font-bold text-3xl text-white md:text-4xl lg:text-5xl">
              Uudet Nettikasinot 2026
            </h1>

            <p className="mb-6 text-lg text-slate-400">
              Löydä tuoreimmat nettikasinot suomalaisille pelaajille. Kaikki uudet kasinot on
              testattu ja arvioitu asiantuntijoidemme toimesta.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span>Lisensioidut kasinot</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Star className="h-5 w-5 text-amber-400" />
                <span>Asiantuntija-arvostelut</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casino List */}
      <section className="bg-slate-950 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 font-bold text-2xl text-white">Tuoreimmat Kasinot 2026</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {casinos.map((casino, index) => (
              <CasinoCard key={casino.id} casino={casino} position={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 font-bold text-2xl text-white">Miksi valita uusi nettikasino?</h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-slate-400">
                Uudet nettikasinot tarjoavat usein parempia bonuksia ja modernimpia pelikokemuksia.
                Ne käyttävät uusinta teknologiaa ja tarjoavat nopeammat kotiutukset. Testaamme
                kaikki uudet kasinot varmistaaksemme, että ne ovat turvallisia suomalaisille
                pelaajille.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
