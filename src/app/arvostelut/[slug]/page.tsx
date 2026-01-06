import type { Metadata } from 'next';
import { Star, Shield, Clock, CreditCard, Check, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

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
    dateModified: '2025-01-06',
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
    gameProviders: ['NetEnt', 'Microgaming', 'Play\'n GO', 'Evolution'],
    customerSupport: ['Live chat', 'Sähköposti'],
    author: 'Kasinolista.fi',
    datePublished: '2024-01-15',
    dateModified: '2025-01-06',
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
    dateModified: '2025-01-06',
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
    dateModified: '2025-01-06',
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
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
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

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                  {casino.license}
                </span>
                <span className="text-xs px-3 py-1 bg-slate-800 text-slate-400 rounded-full">
                  Est. {casino.established}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {casino.name} Arvostelu
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  <span className="text-2xl font-bold text-amber-400">{casino.rating}</span>
                  <span className="text-slate-400">/ 5</span>
                </div>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">{casino.ratingCount} arvostelua</span>
              </div>

              <p className="text-lg text-slate-400">{casino.description}</p>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-amber-400 mb-2">{casino.bonusValue}</div>
                <div className="text-slate-300">{casino.bonus}</div>
              </div>

              <a
                href={`https://example.com/go/${casino.slug}`}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
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
      <section className="py-12 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-xl border border-emerald-500/30 p-6">
              <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" />
                Hyvät puolet
              </h2>
              <ul className="space-y-3">
                {casino.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 rounded-xl border border-red-500/30 p-6">
              <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <X className="w-5 h-5" />
                Huonot puolet
              </h2>
              <ul className="space-y-3">
                {casino.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-slate-300">
                    <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Kasinon tiedot</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  Maksutavat
                </h3>
                <div className="flex flex-wrap gap-2">
                  {casino.paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="text-sm px-3 py-1 bg-slate-800 text-slate-300 rounded-full"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Pelintarjoajat
                </h3>
                <div className="flex flex-wrap gap-2">
                  {casino.gameProviders.map((provider) => (
                    <span
                      key={provider}
                      className="text-sm px-3 py-1 bg-slate-800 text-slate-300 rounded-full"
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Asiakaspalvelu
                </h3>
                <div className="flex flex-wrap gap-2">
                  {casino.customerSupport.map((support) => (
                    <span
                      key={support}
                      className="text-sm px-3 py-1 bg-slate-800 text-slate-300 rounded-full"
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
