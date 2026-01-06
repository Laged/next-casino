import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { CreditCard, RotateCcw, Shield, Star, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

export const metadata: Metadata = {
  title: 'Ilmaiskierrokset 2026 | Ilmaiset Pyöräytykset',
  description:
    'Parhaat ilmaiskierrokset 2026! Ilmaiset pyöräytykset ilman talletusta ja talletuksen kanssa. Vertaile ilmaiskierrostarjoukset.',
  alternates: {
    canonical: `${siteUrl}/ilmaiskierrokset`,
  },
  openGraph: {
    title: 'Ilmaiskierrokset 2026 | Ilmaiset Pyöräytykset',
    description: 'Parhaat ilmaiskierrokset 2026! Ilmaiset pyöräytykset ilman talletusta.',
    url: `${siteUrl}/ilmaiskierrokset`,
    locale: 'fi_FI',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ilmaiskierrokset 2026',
      },
    ],
  },
};

interface FreeSpinOffer {
  id: string;
  casinoName: string;
  spinsAmount: number;
  spinsType: string;
  wageringRequirement: string;
  minDeposit: string;
  game: string;
  features: string[];
  license: string;
  rating: number;
  href: string;
}

const freeSpinOffers: FreeSpinOffer[] = [
  {
    id: 'spins-1',
    casinoName: 'Kasino Yksi',
    spinsAmount: 200,
    spinsType: 'Talletuksen kanssa',
    wageringRequirement: '35x',
    minDeposit: '10€',
    game: 'Book of Dead',
    features: ['Suosittu peli', 'Nopea aktivointi', 'Matala kierrätys'],
    license: 'MGA',
    rating: 4.8,
    href: '/arvostelut/kasino-yksi',
  },
  {
    id: 'spins-2',
    casinoName: 'Kasino Kaksi',
    spinsAmount: 50,
    spinsType: 'Ilman talletusta',
    wageringRequirement: '40x',
    minDeposit: '0€',
    game: 'Starburst',
    features: ['Ei talletusta', 'Klassikkopeli', 'Välitön aktivointi'],
    license: 'Malta MGA',
    rating: 4.7,
    href: '/arvostelut/kasino-kaksi',
  },
  {
    id: 'spins-3',
    casinoName: 'Kasino Kolme',
    spinsAmount: 100,
    spinsType: 'Talletuksen kanssa',
    wageringRequirement: '30x',
    minDeposit: '20€',
    game: "Gonzo's Quest",
    features: ['Megaways', 'Cashback', 'VIP-kierrokset'],
    license: 'Curacao',
    rating: 4.6,
    href: '/arvostelut/kasino-kolme',
  },
];

function FreeSpinCard({ offer, position }: { offer: FreeSpinOffer; position: number }) {
  const isNoDeposit = offer.minDeposit === '0€';

  return (
    <article
      data-testid="casino-card"
      className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-colors hover:border-amber-500/50"
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-blue-400 text-xs">
                #{position}
              </span>
              {isNoDeposit ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-400 text-xs">
                  <Zap className="h-3 w-3" />
                  Ilman talletusta
                </span>
              ) : (
                <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-purple-400 text-xs">
                  {offer.spinsType}
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg text-white">{offer.casinoName}</h3>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-amber-400">{offer.rating}</span>
              </div>
              <span className="text-slate-500 text-xs">|</span>
              <span className="font-medium text-emerald-400 text-xs">{offer.license}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-2xl text-amber-400">{offer.spinsAmount}</div>
            <div className="text-slate-400 text-xs">ilmaiskierrosta</div>
          </div>
        </div>

        <p className="mb-4 text-slate-300">
          <span className="font-medium">{offer.game}</span> - {offer.spinsAmount} ilmaiskierrosta
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {offer.features.map((feature) => (
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
            <span>Min. {offer.minDeposit}</span>
          </div>
          <div className="flex items-center gap-1">
            <RotateCcw className="h-3 w-3" />
            <span>Kierrätys: {offer.wageringRequirement}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={`https://example.com/go/${offer.id}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-center font-semibold text-white transition-colors hover:from-amber-600 hover:to-orange-600"
          >
            Hae kierrokset
          </a>
          <Link
            href={offer.href}
            className="rounded-lg bg-slate-800 px-4 py-3 font-medium text-slate-300 transition-colors hover:bg-slate-700"
          >
            Arvostelu
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function IlmaiskierroksetPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ilmaiskierrokset 2026',
    description: 'Lista parhaista ilmaiskierrostarjouksista suomalaisille pelaajille',
    numberOfItems: freeSpinOffers.length,
    itemListElement: freeSpinOffers.map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${offer.casinoName} - ${offer.spinsAmount} ilmaiskierrosta`,
      url: `${siteUrl}${offer.href}`,
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
        name: 'Ilmaiskierrokset',
        item: `${siteUrl}/ilmaiskierrokset`,
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
            <span className="text-white">Ilmaiskierrokset</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-blue-400 text-sm">
              <Zap className="h-4 w-4" />
              <span>Ilmaiset pyöräytykset</span>
            </div>

            <h1 className="mb-4 font-bold text-3xl text-white md:text-4xl lg:text-5xl">
              Ilmaiskierrokset 2026
            </h1>

            <p className="mb-6 text-lg text-slate-400">
              Vertaile parhaat ilmaiskierrostarjoukset. Löydä ilmaiset pyöräytykset ilman talletusta
              ja parhaat talletusbonukset kierroksilla.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span>Verifoidut tarjoukset</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Star className="h-5 w-5 text-amber-400" />
                <span>Päivitetty päivittäin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Spins List */}
      <section className="bg-slate-950 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 font-bold text-2xl text-white">Parhaat Ilmaiskierrostarjoukset</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {freeSpinOffers.map((offer, index) => (
              <FreeSpinCard key={offer.id} offer={offer} position={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 font-bold text-2xl text-white">Mitä ovat ilmaiskierrokset?</h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-slate-400">
                Ilmaiskierrokset ovat nettikasinoiden tarjoamia ilmaisia pyöräytyksiä
                kolikkopeleihin. Ne voivat olla joko talletusvapaita tai sidottuja talletukseen.
                Voitot ilmaiskierroksista tulee yleensä kierrättää ennen kotiuttamista.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
