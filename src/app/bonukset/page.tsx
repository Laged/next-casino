import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { CreditCard, Gift, Percent, Shield, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

export const metadata: Metadata = {
  title: 'Kasinobonukset 2026 | Parhaat Tervetuliaistarjoukset',
  description:
    'Parhaat kasinobonukset 2026! Vertaile tervetuliaistarjoukset, talletusbonukset ja ilmaiskierrokset. Eksklusiiviset bonukset suomalaisille.',
  alternates: {
    canonical: `${siteUrl}/bonukset`,
  },
  openGraph: {
    title: 'Kasinobonukset 2026 | Parhaat Tervetuliaistarjoukset',
    description:
      'Parhaat kasinobonukset 2026! Vertaile tervetuliaistarjoukset ja ilmaiskierrokset.',
    url: `${siteUrl}/bonukset`,
    locale: 'fi_FI',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kasinobonukset 2026',
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
      className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-colors hover:border-amber-500/50"
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-amber-400 text-xs">
                #{position} Bonus
              </span>
              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-purple-400 text-xs">
                {bonus.bonusType}
              </span>
            </div>
            <h3 className="font-bold text-lg text-white">{bonus.casinoName}</h3>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-amber-400">{bonus.rating}</span>
              </div>
              <span className="text-slate-500 text-xs">|</span>
              <span className="font-medium text-emerald-400 text-xs">{bonus.license}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-2xl text-amber-400">{bonus.maxBonus}</div>
            <div className="text-slate-400 text-xs">max bonus</div>
          </div>
        </div>

        <p className="mb-4 font-medium text-lg text-slate-300">{bonus.bonusAmount}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {bonus.features.map((feature) => (
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
            <span>Min. {bonus.minDeposit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Percent className="h-3 w-3" />
            <span>Kierrätys: {bonus.wageringRequirement}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={`https://example.com/go/${bonus.id}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-center font-semibold text-white transition-colors hover:from-amber-600 hover:to-orange-600"
          >
            Lunasta bonus
          </a>
          <Link
            href={bonus.href}
            className="rounded-lg bg-slate-800 px-4 py-3 font-medium text-slate-300 transition-colors hover:bg-slate-700"
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
    name: 'Kasinobonukset 2026',
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
          <nav className="mb-6 flex items-center gap-2 text-slate-400 text-sm">
            <Link href="/" className="hover:text-amber-400">
              Etusivu
            </Link>
            <span>/</span>
            <span className="text-white">Bonukset</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-amber-400 text-sm">
              <Gift className="h-4 w-4" />
              <span>Eksklusiiviset tarjoukset</span>
            </div>

            <h1 className="mb-4 font-bold text-3xl text-white md:text-4xl lg:text-5xl">
              Kasinobonukset 2026
            </h1>

            <p className="mb-6 text-lg text-slate-400">
              Vertaile parhaat kasinobonukset ja tervetuliaistarjoukset. Löydä edullisin
              kierrätysvaatimus ja suurimmat bonukset suomalaisille pelaajille.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span>Verifoidut bonukset</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Star className="h-5 w-5 text-amber-400" />
                <span>Päivitetyt ehdot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus List */}
      <section className="bg-slate-950 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 font-bold text-2xl text-white">Parhaat Bonustarjoukset</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bonusOffers.map((bonus, index) => (
              <BonusCard key={bonus.id} bonus={bonus} position={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 font-bold text-2xl text-white">Miten kasinobonukset toimivat?</h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-slate-400">
                Kasinobonukset ovat etuja, joita nettikasinot tarjoavat houkutellakseen uusia
                pelaajia. Yleisin on tervetuliaisbonus, joka kerrotaan ensitalletuksestasi. Muista
                aina tarkistaa kierrätysvaatimus ennen bonuksen lunastamista.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
