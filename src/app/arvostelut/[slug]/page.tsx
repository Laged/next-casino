import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Check, Clock, CreditCard, ExternalLink, Shield, Star, X } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

interface CasinoReview {
  slug: string;
  name: string;
  rating: number;
  ratingCount: number;
  bonus: string;
  bonusValue: string;
  description: string;
  pros: string[];
  cons: string[];
  license: string;
  established: string;
  minDeposit: string;
  withdrawalTime: string;
  paymentMethods: string[];
  gameProviders: string[];
  customerSupport: string[];
  author: string;
  datePublished: string;
  dateModified: string;
}

const casinoReviews: Record<string, CasinoReview> = {
  'test-casino': {
    slug: 'test-casino',
    name: 'Test Casino',
    rating: 4.5,
    ratingCount: 100,
    bonus: '100% bonus + 100 ilmaiskierrosta',
    bonusValue: '500€',
    description:
      'Test Casino on luotettava nettikasino testaamista varten. MGA-lisenssi takaa turvallisen pelikokemuksen.',
    pros: ['Nopeat kotiutukset', 'Suomenkielinen tuki', 'MGA-lisenssi'],
    cons: ['Testikasino', 'Ei oikea kasino'],
    license: 'MGA',
    established: '2024',
    minDeposit: '10€',
    withdrawalTime: '0-24h',
    paymentMethods: ['Trustly', 'Visa', 'MasterCard'],
    gameProviders: ['NetEnt', 'Microgaming'],
    customerSupport: ['Live chat', 'Sähköposti'],
    author: 'Kasinolista.fi',
    datePublished: '2024-01-01',
    dateModified: '2026-01-06',
  },
  'kasino-yksi': {
    slug: 'kasino-yksi',
    name: 'Kasino Yksi',
    rating: 4.8,
    ratingCount: 156,
    bonus: '100% bonus + 200 ilmaiskierrosta',
    bonusValue: '500€',
    description:
      'Kasino Yksi on luotettava suomalainen nettikasino, joka tarjoaa laajan pelivalikoiman ja nopeat kotiutukset. MGA-lisenssi takaa turvallisen pelikokemuksen.',
    pros: [
      'Nopeat kotiutukset (0-24h)',
      'Suomenkielinen asiakaspalvelu',
      'MGA-lisenssi',
      'Laaja pelivalikoima',
    ],
    cons: ['Ei puhelinpalvelua', 'Kierrätysvaatimus 35x'],
    license: 'MGA',
    established: '2020',
    minDeposit: '10€',
    withdrawalTime: '0-24h',
    paymentMethods: ['Trustly', 'Visa', 'MasterCard', 'Skrill'],
    gameProviders: ['NetEnt', 'Microgaming', "Play'n GO", 'Evolution'],
    customerSupport: ['Live chat', 'Sähköposti'],
    author: 'Kasinolista.fi',
    datePublished: '2024-01-15',
    dateModified: '2026-01-06',
  },
  'kasino-kaksi': {
    slug: 'kasino-kaksi',
    name: 'Kasino Kaksi',
    rating: 4.7,
    ratingCount: 203,
    bonus: '200% bonus ensitalletukseen',
    bonusValue: '1000€',
    description:
      'Kasino Kaksi on pikakasino, joka mahdollistaa pelaamisen ilman rekisteröintiä. Pay N Play -konsepti tekee aloittamisesta helppoa.',
    pros: [
      'Pikakasino - ei rekisteröintiä',
      'Verovapaat voitot',
      '5 minuutin kotiutukset',
      'Korkea bonus',
    ],
    cons: ['Korkeampi kierrätysvaatimus 40x', 'Ei VIP-ohjelmaa'],
    license: 'Malta MGA',
    established: '2021',
    minDeposit: '20€',
    withdrawalTime: '5 min',
    paymentMethods: ['Trustly', 'Zimpler', 'Brite'],
    gameProviders: ['NetEnt', 'Pragmatic Play', 'Red Tiger'],
    customerSupport: ['Live chat 24/7', 'Sähköposti'],
    author: 'Kasinolista.fi',
    datePublished: '2024-03-20',
    dateModified: '2026-01-06',
  },
  'kasino-kolme': {
    slug: 'kasino-kolme',
    name: 'Kasino Kolme',
    rating: 4.6,
    ratingCount: 89,
    bonus: '50 ilmaiskierrosta ilman talletusta',
    bonusValue: 'Ilmainen',
    description:
      'Kasino Kolme on uusi kasino, joka tarjoaa ainutlaatuisen cashback-bonuksen. Curacao-lisenssi ja moderni käyttöliittymä.',
    pros: [
      'Ilmaiskierrokset ilman talletusta',
      'Cashback-bonus',
      'VIP-ohjelma',
      'Uusi moderni kasino',
    ],
    cons: ['Curacao-lisenssi', 'Hitaammat kotiutukset'],
    license: 'Curacao',
    established: '2024',
    minDeposit: '10€',
    withdrawalTime: '1-2 päivää',
    paymentMethods: ['Visa', 'Skrill', 'Neteller', 'Bitcoin'],
    gameProviders: ['BGaming', 'Hacksaw', 'Nolimit City'],
    customerSupport: ['Live chat', 'Sähköposti', 'Puhelin'],
    author: 'Kasinolista.fi',
    datePublished: '2024-11-01',
    dateModified: '2026-01-06',
  },
  'uusi-kasino-1': {
    slug: 'uusi-kasino-1',
    name: 'Uusi Kasino 2026',
    rating: 4.9,
    ratingCount: 45,
    bonus: '200% bonus + 100 ilmaiskierrosta',
    bonusValue: '500€',
    description:
      'Uusi Kasino 2026 on vuoden tuorein nettikasino, joka tarjoaa erinomaisen pelikokemuksen ja nopeat kotiutukset. MGA-lisenssi takaa turvallisen pelaamisen.',
    pros: [
      'Uusin kasino 2026',
      'Nopeat kotiutukset (0-24h)',
      'Suomenkielinen asiakaspalvelu',
      'MGA-lisenssi',
    ],
    cons: ['Uusi kasino, vähemmän arvosteluja', 'Kierrätysvaatimus 35x'],
    license: 'MGA',
    established: '2025',
    minDeposit: '10€',
    withdrawalTime: '0-24h',
    paymentMethods: ['Trustly', 'Visa', 'MasterCard', 'Skrill'],
    gameProviders: ['NetEnt', 'Microgaming', "Play'n GO", 'Evolution', 'Pragmatic Play'],
    customerSupport: ['Live chat 24/7', 'Sähköposti'],
    author: 'Kasinolista.fi',
    datePublished: '2025-12-15',
    dateModified: '2026-01-06',
  },
  'uusi-kasino-2': {
    slug: 'uusi-kasino-2',
    name: 'Fresh Casino',
    rating: 4.8,
    ratingCount: 32,
    bonus: '150% bonus ensitalletukseen',
    bonusValue: '300€',
    description:
      'Fresh Casino on moderni pikakasino, joka mahdollistaa pelaamisen ilman rekisteröintiä. VIP-ohjelma ja loistavat bonukset.',
    pros: [
      'Pikakasino - ei rekisteröintiä',
      'VIP-ohjelma',
      'Nopeat 5 minuutin kotiutukset',
      'Malta MGA-lisenssi',
    ],
    cons: ['Korkeampi kierrätysvaatimus 40x', 'Rajattu pelivalikoima'],
    license: 'Malta MGA',
    established: '2025',
    minDeposit: '15€',
    withdrawalTime: '5 min',
    paymentMethods: ['Trustly', 'Zimpler', 'Brite'],
    gameProviders: ['NetEnt', 'Pragmatic Play', 'Red Tiger', 'Big Time Gaming'],
    customerSupport: ['Live chat 24/7', 'Sähköposti'],
    author: 'Kasinolista.fi',
    datePublished: '2025-11-20',
    dateModified: '2026-01-06',
  },
  'uusi-kasino-3': {
    slug: 'uusi-kasino-3',
    name: 'Nordic Kasino',
    rating: 4.7,
    ratingCount: 28,
    bonus: '100 ilmaiskierrosta ilman talletusta',
    bonusValue: 'Ilmainen',
    description:
      'Nordic Kasino tarjoaa ainutlaatuisen cashback-bonuksen ja laajan live-kasinon. Täydellinen valinta pohjoismaisille pelaajille.',
    pros: [
      'Ilmaiskierrokset ilman talletusta',
      'Cashback-bonus',
      'Laaja live-kasino',
      'Pohjoismaisille pelaajille',
    ],
    cons: ['Curacao-lisenssi', 'Hitaammat kotiutukset 1-2 päivää'],
    license: 'Curacao',
    established: '2025',
    minDeposit: '10€',
    withdrawalTime: '1-2 päivää',
    paymentMethods: ['Visa', 'Skrill', 'Neteller', 'Bitcoin', 'Ethereum'],
    gameProviders: ['BGaming', 'Hacksaw', 'Nolimit City', 'Push Gaming'],
    customerSupport: ['Live chat', 'Sähköposti', 'Puhelin'],
    author: 'Kasinolista.fi',
    datePublished: '2025-10-01',
    dateModified: '2026-01-06',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const casino = casinoReviews[slug];

  if (!casino) {
    return {
      title: 'Kasino ei löytynyt',
    };
  }

  return {
    title: `${casino.name} Arvostelu | Kasinolista.fi`,
    description: casino.description,
    alternates: {
      canonical: `${siteUrl}/arvostelut/${slug}`,
    },
    openGraph: {
      title: `${casino.name} Arvostelu | Kasinolista.fi`,
      description: casino.description,
      url: `${siteUrl}/arvostelut/${slug}`,
      locale: 'fi_FI',
      type: 'article',
    },
  };
}

export function generateStaticParams() {
  return Object.keys(casinoReviews).map((slug) => ({ slug }));
}

export default async function CasinoReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const casino = casinoReviews[slug];

  if (!casino) {
    notFound();
  }

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${casino.name} Arvostelu`,
    reviewBody: casino.description,
    author: {
      '@type': 'Organization',
      name: casino.author,
    },
    datePublished: casino.datePublished,
    dateModified: casino.dateModified,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: casino.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      '@type': 'Casino',
      name: casino.name,
      description: casino.description,
    },
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
        name: 'Arvostelut',
        item: `${siteUrl}/arvostelut`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: casino.name,
        item: `${siteUrl}/arvostelut/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
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
            <Link href="/uudet-kasinot" className="hover:text-amber-400">
              Kasinot
            </Link>
            <span>/</span>
            <span className="text-white">{casino.name}</span>
          </nav>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-400 text-xs">
                  {casino.license}
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-400 text-xs">
                  Est. {casino.established}
                </span>
              </div>

              <h1 className="mb-4 font-bold text-3xl text-white md:text-4xl lg:text-5xl">
                {casino.name} Arvostelu
              </h1>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-2xl text-amber-400">{casino.rating}</span>
                  <span className="text-slate-400">/ 5</span>
                </div>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">{casino.ratingCount} arvostelua</span>
              </div>

              <p className="text-lg text-slate-400">{casino.description}</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 text-center">
                <div className="mb-2 font-bold text-3xl text-amber-400">{casino.bonusValue}</div>
                <div className="text-slate-300">{casino.bonus}</div>
              </div>

              <a
                href={`https://example.com/go/${casino.slug}`}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-4 font-semibold text-white transition-colors hover:from-amber-600 hover:to-orange-600"
              >
                <ExternalLink className="h-5 w-5" />
                Pelaa nyt
              </a>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Min. talletus</span>
                  <span className="text-white">{casino.minDeposit}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Kotiutusaika</span>
                  <span className="text-white">{casino.withdrawalTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Lisenssi</span>
                  <span className="text-emerald-400">{casino.license}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="bg-slate-950 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/30 bg-slate-900 p-6">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-emerald-400 text-xl">
                <Check className="h-5 w-5" />
                Hyvät puolet
              </h2>
              <ul className="space-y-3">
                {casino.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-slate-300">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-red-500/30 bg-slate-900 p-6">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-red-400 text-xl">
                <X className="h-5 w-5" />
                Huonot puolet
              </h2>
              <ul className="space-y-3">
                {casino.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-slate-300">
                    <X className="mt-1 h-4 w-4 flex-shrink-0 text-red-400" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-bold text-2xl text-white">Kasinon tiedot</h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg text-white">
                  <CreditCard className="h-5 w-5 text-amber-400" />
                  Maksutavat
                </h3>
                <div className="flex flex-wrap gap-2">
                  {casino.paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="rounded-full bg-slate-800 px-3 py-1 text-slate-300 text-sm"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg text-white">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Pelintarjoajat
                </h3>
                <div className="flex flex-wrap gap-2">
                  {casino.gameProviders.map((provider) => (
                    <span
                      key={provider}
                      className="rounded-full bg-slate-800 px-3 py-1 text-slate-300 text-sm"
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg text-white">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Asiakaspalvelu
                </h3>
                <div className="flex flex-wrap gap-2">
                  {casino.customerSupport.map((support) => (
                    <span
                      key={support}
                      className="rounded-full bg-slate-800 px-3 py-1 text-slate-300 text-sm"
                    >
                      {support}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
