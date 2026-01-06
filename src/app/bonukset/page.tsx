import type { Metadata } from 'next';
import { Star, Shield, Gift, Percent, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

export const metadata: Metadata = {
  title: 'Kasinobonukset 2025 | Parhaat Tervetuliaistarjoukset',
  description:
    'Parhaat kasinobonukset 2025! Vertaile tervetuliaistarjoukset, talletusbonukset ja ilmaiskierrokset. Eksklusiiviset bonukset suomalaisille.',
  alternates: {
    canonical: `${siteUrl}/bonukset`,
  },
  openGraph: {
    title: 'Kasinobonukset 2025 | Parhaat Tervetuliaistarjoukset',
    description:
      'Parhaat kasinobonukset 2025! Vertaile tervetuliaistarjoukset ja ilmaiskierrokset.',
    url: `${siteUrl}/bonukset`,
    locale: 'fi_FI',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kasinobonukset 2025',
      },
    ],
  },
};

interface BonusOffer {
  id: string;
  casinoName: string;
  bonusType: string;
  bonusAmount: string;
  wageringRequirement: string;
  minDeposit: string;
  maxBonus: string;
  features: string[];
  license: string;
  rating: number;
  href: string;
}

const bonusOffers: BonusOffer[] = [
  {
    id: 'bonus-1',
    casinoName: 'Kasino Yksi',
    bonusType: 'Tervetuliaisbonus',
    bonusAmount: '100% + 200 ilmaiskierrosta',
    wageringRequirement: '35x',
    minDeposit: '10€',
    maxBonus: '500€',
    features: ['Nopea aktivointi', 'Matala kierrätys', 'Ei maksimikotiutusta'],
    license: 'MGA',
    rating: 4.8,
    href: '/arvostelut/kasino-yksi',
  },
  {
    id: 'bonus-2',
    casinoName: 'Kasino Kaksi',
    bonusType: 'Talletusbonus',
    bonusAmount: '200% ensitalletukseen',
    wageringRequirement: '40x',
    minDeposit: '20€',
    maxBonus: '1000€',
    features: ['Korkea bonus', 'VIP-edut', 'Viikottaiset tarjoukset'],
    license: 'Malta MGA',
    rating: 4.7,
    href: '/arvostelut/kasino-kaksi',
  },
  {
    id: 'bonus-3',
    casinoName: 'Kasino Kolme',
    bonusType: 'Ilmaiskierrokset',
    bonusAmount: '50 ilmaiskierrosta ilman talletusta',
    wageringRequirement: '30x',
    minDeposit: '0€',
    maxBonus: 'Ilmainen',
    features: ['Ei talletusta', 'Välitön aktivointi', 'Cashback-tarjous'],
    license: 'Curacao',
    rating: 4.6,
    href: '/arvostelut/kasino-kolme',
  },
];

function BonusCard({ bonus, position }: { bonus: BonusOffer; position: number }) {
  return (
    <article
      data-testid="casino-card"
      className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-colors"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
                #{position} Bonus
              </span>
              <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">
                {bonus.bonusType}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{bonus.casinoName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-amber-400 font-semibold">{bonus.rating}</span>
              </div>
              <span className="text-xs text-slate-500">|</span>
              <span className="text-xs text-emerald-400 font-medium">{bonus.license}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-amber-400">{bonus.maxBonus}</div>
            <div className="text-xs text-slate-400">max bonus</div>
          </div>
        </div>

        <p className="text-slate-300 mb-4 text-lg font-medium">{bonus.bonusAmount}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {bonus.features.map((feature) => (
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
            <span>Min. {bonus.minDeposit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Percent className="w-3 h-3" />
            <span>Kierrätys: {bonus.wageringRequirement}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={`https://example.com/go/${bonus.id}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg text-center hover:from-amber-600 hover:to-orange-600 transition-colors"
          >
            Lunasta bonus
          </a>
          <Link
            href={bonus.href}
            className="px-4 py-3 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            Arvostelu
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BonuksetPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Kasinobonukset 2025',
    description: 'Lista parhaista kasinobonuksista suomalaisille pelaajille',
    numberOfItems: bonusOffers.length,
    itemListElement: bonusOffers.map((bonus, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${bonus.casinoName} - ${bonus.bonusAmount}`,
      url: `${siteUrl}${bonus.href}`,
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
        name: 'Bonukset',
        item: `${siteUrl}/bonukset`,
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
            <span className="text-white">Bonukset</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-4">
              <Gift className="w-4 h-4" />
              <span>Eksklusiiviset tarjoukset</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Kasinobonukset 2025
            </h1>

            <p className="text-lg text-slate-400 mb-6">
              Vertaile parhaat kasinobonukset ja tervetuliaistarjoukset. Löydä edullisin
              kierrätysvaatimus ja suurimmat bonukset suomalaisille pelaajille.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Verifoidut bonukset</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Star className="w-5 h-5 text-amber-400" />
                <span>Päivitetyt ehdot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus List */}
      <section className="py-12 bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Parhaat Bonustarjoukset</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonusOffers.map((bonus, index) => (
              <BonusCard key={bonus.id} bonus={bonus} position={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Miten kasinobonukset toimivat?
            </h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-slate-400">
                Kasinobonukset ovat etuja, joita nettikasinot tarjoavat houkutellakseen uusia
                pelaajia. Yleisin on tervetuliaisbonus, joka kerrotaan ensitalletuksestasi.
                Muista aina tarkistaa kierrätysvaatimus ennen bonuksen lunastamista.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
