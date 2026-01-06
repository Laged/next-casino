import type { Metadata } from 'next';
import { Star, Shield, Clock, CreditCard, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

export const metadata: Metadata = {
  title: 'Uudet Nettikasinot 2025 | Tuoreimmat Kasinot',
  description:
    'Löydä uudet nettikasinot 2025! Vertaile tuoreimmat suomalaiset kasinot, bonukset ja ilmaiskierrokset. Päivitetty lista uusista kasinoista.',
  alternates: {
    canonical: `${siteUrl}/uudet-kasinot`,
  },
  openGraph: {
    title: 'Uudet Nettikasinot 2025 | Tuoreimmat Kasinot',
    description:
      'Löydä uudet nettikasinot 2025! Vertaile tuoreimmat suomalaiset kasinot.',
    url: `${siteUrl}/uudet-kasinot`,
    locale: 'fi_FI',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Uudet Nettikasinot 2025',
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

const newCasinos: Casino[] = [
  {
    id: 'uusi-kasino-1',
    name: 'Uusi Kasino 2025',
    rating: 4.9,
    bonus: '200% bonus + 100 ilmaiskierrosta',
    bonusValue: '500€',
    features: ['Uusi 2025', 'Nopeat kotiutukset', 'Suomenkielinen tuki'],
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
    features: ['Uusi 2025', 'Pikakasino', 'VIP-ohjelma'],
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
    features: ['Uusi 2025', 'Cashback-bonus', 'Live kasino'],
    license: 'Curacao',
    minDeposit: '10€',
    withdrawalTime: '1-2 päivää',
    href: '/arvostelut/uusi-kasino-3',
    isNew: true,
  },
];

function CasinoCard({ casino, position }: { casino: Casino; position: number }) {
  return (
    <article
      data-testid="casino-card"
      className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-colors"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">
                #{position} Uusi
              </span>
              {casino.isNew && (
                <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  2025
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white">{casino.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-amber-400 font-semibold">{casino.rating}</span>
              </div>
              <span className="text-xs text-slate-500">|</span>
              <span className="text-xs text-emerald-400 font-medium">{casino.license}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-amber-400">{casino.bonusValue}</div>
            <div className="text-xs text-slate-400">bonus</div>
          </div>
        </div>

        <p className="text-slate-300 mb-4">{casino.bonus}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {casino.features.map((feature) => (
            <span
              key={feature}
              className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-1">
            <CreditCard className="w-3 h-3" />
            <span>Min. {casino.minDeposit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Kotiutus: {casino.withdrawalTime}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={`https://example.com/go/${casino.id}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg text-center hover:from-amber-600 hover:to-orange-600 transition-colors"
          >
            Pelaa nyt
          </a>
          <Link
            href={casino.href}
            className="px-4 py-3 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            Arvostelu
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function UudetKasinotPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Uudet Nettikasinot 2025',
    description: 'Lista uusista nettikasinoista suomalaisille pelaajille',
    numberOfItems: newCasinos.length,
    itemListElement: newCasinos.map((casino, index) => ({
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
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400">
              Etusivu
            </Link>
            <span>/</span>
            <span className="text-white">Uudet Kasinot</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Päivitetty tammikuu 2025</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Uudet Nettikasinot 2025
            </h1>

            <p className="text-lg text-slate-400 mb-6">
              Löydä tuoreimmat nettikasinot suomalaisille pelaajille. Kaikki uudet kasinot on
              testattu ja arvioitu asiantuntijoidemme toimesta.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Lisensioidut kasinot</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Star className="w-5 h-5 text-amber-400" />
                <span>Asiantuntija-arvostelut</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casino List */}
      <section className="py-12 bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Tuoreimmat Kasinot 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newCasinos.map((casino, index) => (
              <CasinoCard key={casino.id} casino={casino} position={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Miksi valita uusi nettikasino?
            </h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-slate-400">
                Uudet nettikasinot tarjoavat usein parempia bonuksia ja modernimpia
                pelikokemuksia. Ne käyttävät uusinta teknologiaa ja tarjoavat nopeammat
                kotiutukset. Testaamme kaikki uudet kasinot varmistaaksemme, että ne ovat
                turvallisia suomalaisille pelaajille.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
