import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Types
interface CasinoReview {
  id: string;
  slug: string;
  name: string;
  rating: number;
  bonusTitle: string;
  bonusDescription: string;
  bonusTerms: string;
  wageringRequirement: number;
  minDeposit: number;
  maxBonus: number;
  features: string[];
  pros: string[];
  cons: string[];
  payoutSpeed: string;
  licenses: string[];
  paymentMethods: string[];
  gameProviders: string[];
  customerSupport: {
    livechat: boolean;
    email: boolean;
    phone: boolean;
    hours: string;
  };
  sections: {
    overview: string;
    bonuses: string;
    games: string;
    payments: string;
    support: string;
    verdict: string;
  };
  lastUpdated: string;
  affiliateUrl: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock data fetching - replace with actual API calls
async function getCasinoReview(slug: string): Promise<CasinoReview | null> {
  // TODO: Fetch from CMS/API
  const mockReviews: Record<string, CasinoReview> = {
    'kasino-yksi': {
      id: '1',
      slug: 'kasino-yksi',
      name: 'Kasino Yksi',
      rating: 4.8,
      bonusTitle: '100% bonus + 200 ilmaiskierrosta',
      bonusDescription:
        'Tervetuliaisbonuksen arvo on jopa 500 EUR. Saat myos 200 ilmaiskierrosta suosikkislotteihin.',
      bonusTerms: 'Bonus on lunastettava 30 paivan sisalla. Kierratysvaatimus 35x.',
      wageringRequirement: 35,
      minDeposit: 10,
      maxBonus: 500,
      features: [
        'Nopeat kotiutukset',
        'Suomalainen tuki',
        'Laaja pelivalikoima',
        'Mobiilioptimoitu',
      ],
      pros: [
        'Erinomainen asiakaspalvelu suomeksi',
        'Nopeat kotiutukset 1-24 tunnissa',
        'Yli 2000 pelivalikoimassa',
        'Turvallinen MGA-lisenssi',
        'Hyva mobiilikokemus',
      ],
      cons: ['Kierratysvaatimus voisi olla matalampi', 'Rajoitettu live-kasino tarjonta'],
      payoutSpeed: '1-24 tuntia',
      licenses: ['MGA', 'UKGC'],
      paymentMethods: ['Visa', 'Mastercard', 'Trustly', 'Skrill', 'Neteller', 'Paysafecard'],
      gameProviders: ['NetEnt', 'Microgaming', "Play'n GO", 'Evolution', 'Pragmatic Play'],
      customerSupport: {
        livechat: true,
        email: true,
        phone: false,
        hours: '24/7',
      },
      sections: {
        overview:
          'Kasino Yksi on yksi Suomen suosituimmista nettikasinoista. Se tarjoaa laajan pelivalikoiman, erinomaiset bonukset ja nopean asiakaspalvelun. Kasino on toiminut alalla vuodesta 2018 ja kerännyt suuren määrän uskollisia pelaajia.',
        bonuses:
          'Tervetuliaisbonuksena saat 100% bonuksen ensimmäiseen talletukseesi aina 500 euroon asti. Lisäksi saat 200 ilmaiskierrosta, jotka jaetaan 20 kierrosta päivässä 10 päivän ajan. Kierrätysvaatimus on 35-kertainen, mikä on alan keskitasoa.',
        games:
          'Pelivalikoimasta löytyy yli 2000 peliä parhailtä pelintoimittajilta. Kolikkopelit, pöytäpelit ja live-kasino ovat kaikki edustettuina. Suosituimpia pelejä ovat Starburst, Book of Dead ja Mega Moolah.',
        payments:
          'Kasino tukee laajaa valikoimaa maksutapoja. Talletukset ovat välittömiä ja kotiutukset käsitellään 1-24 tunnissa. Minimikotiutus on 20 euroa.',
        support:
          'Asiakaspalvelu on tavoitettavissa 24/7 live-chatin kautta. Suomenkielinen tuki on saatavilla arkisin klo 10-22. Vastausajat ovat erinomaiset.',
        verdict:
          'Kasino Yksi on erinomainen valinta niin aloittelijoille kuin kokeneille pelaajille. Laaja pelivalikoima, nopeat kotiutukset ja laadukas asiakaspalvelu tekevät siitä yhden parhaista vaihtoehdoista Suomen markkinoilla.',
      },
      lastUpdated: '2025-01-05',
      affiliateUrl: 'https://example.com/affiliate/kasino-yksi',
    },
  };

  return mockReviews[slug] || null;
}

async function getAllCasinoSlugs(): Promise<string[]> {
  // TODO: Fetch from CMS/API
  return ['kasino-yksi', 'kasino-kaksi', 'kasino-kolme'];
}

// Generate static params
export async function generateStaticParams() {
  const slugs = await getAllCasinoSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const casino = await getCasinoReview(slug);

  if (!casino) {
    return {
      title: 'Kasinoa ei löytynyt',
    };
  }

  return {
    title: `${casino.name} Arvostelu 2025 | Bonus: ${casino.bonusTitle}`,
    description: `Lue ${casino.name} arvostelu. ${casino.bonusTitle}. Arvosana: ${casino.rating}/5. ${casino.features.slice(0, 3).join(', ')}.`,
    openGraph: {
      title: `${casino.name} Arvostelu 2025`,
      description: `${casino.bonusTitle}. Arvosana: ${casino.rating}/5.`,
    },
  };
}

// Star rating component
function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 font-bold">{rating.toFixed(1)}/5</span>
    </div>
  );
}

// Rating bar component
function RatingBar({ label, value, max = 5 }: { label: string; value: number; max?: number }) {
  const percentage = (value / max) * 100;

  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-sm text-muted-foreground">{label}</span>
      <div className="h-2 flex-1 rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
      <span className="w-8 text-sm font-medium">{value}</span>
    </div>
  );
}

export default async function CasinoReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const casino = await getCasinoReview(slug);

  if (!casino) {
    notFound();
  }

  const tableOfContents = [
    { id: 'overview', label: 'Yleiskatsaus' },
    { id: 'bonuses', label: 'Bonukset' },
    { id: 'games', label: 'Pelit' },
    { id: 'payments', label: 'Maksutavat' },
    { id: 'support', label: 'Asiakaspalvelu' },
    { id: 'verdict', label: 'Yhteenveto' },
  ];

  return (
    <div className="py-8">
      {/* Breadcrumbs */}
      <div className="container mb-6">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Etusivu
          </Link>
          <span className="mx-2">/</span>
          <Link href="/uudet-kasinot" className="hover:text-primary">
            Kasinot
          </Link>
          <span className="mx-2">/</span>
          <span>{casino.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mb-12">
        <div className="rounded-lg border bg-card p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Casino Info */}
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-20 w-32 rounded-lg bg-muted" />
                <div>
                  <h1 className="text-3xl font-bold">{casino.name}</h1>
                  <StarRating rating={casino.rating} size="lg" />
                </div>
              </div>

              {/* Features */}
              <div className="mb-6 flex flex-wrap gap-2">
                {casino.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Min. talletus</p>
                  <p className="font-bold">{casino.minDeposit} EUR</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Kotiutus</p>
                  <p className="font-bold">{casino.payoutSpeed}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Kierratys</p>
                  <p className="font-bold">{casino.wageringRequirement}x</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Lisenssit</p>
                  <p className="font-bold">{casino.licenses.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Bonus Box */}
            <div className="lg:w-80">
              <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
                <p className="mb-2 text-sm font-medium opacity-90">Tervetuliaisbonus</p>
                <p className="mb-2 text-2xl font-bold">{casino.bonusTitle}</p>
                <p className="mb-4 text-sm opacity-90">{casino.bonusDescription}</p>
                <a
                  href={casino.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-md bg-white px-4 py-3 text-center font-medium text-primary shadow transition-transform hover:scale-105"
                >
                  Lunasta bonus
                </a>
                <p className="mt-3 text-xs opacity-75">
                  18+ | Pelaa vastuullisesti | {casino.bonusTerms}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-64 lg:shrink-0">
            <div className="sticky top-24 rounded-lg border bg-card p-4">
              <h2 className="mb-4 font-semibold">Sisallysluettelo</h2>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 space-y-12">
            {/* Pros & Cons */}
            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
                <h2 className="mb-4 flex items-center gap-2 font-bold text-green-700 dark:text-green-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Plussat
                </h2>
                <ul className="space-y-2">
                  {casino.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
                <h2 className="mb-4 flex items-center gap-2 font-bold text-red-700 dark:text-red-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Miinukset
                </h2>
                <ul className="space-y-2">
                  {casino.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold">Yleiskatsaus</h2>
              <p className="text-muted-foreground">{casino.sections.overview}</p>
            </section>

            {/* Bonuses */}
            <section id="bonuses" className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold">Bonukset ja tarjoukset</h2>
              <p className="mb-6 text-muted-foreground">{casino.sections.bonuses}</p>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 font-semibold">Bonuksen tiedot</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Maksimi bonus</p>
                    <p className="font-bold">{casino.maxBonus} EUR</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kierratysvaatimus</p>
                    <p className="font-bold">{casino.wageringRequirement}x</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Minimi talletus</p>
                    <p className="font-bold">{casino.minDeposit} EUR</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ilmaiskierrokset</p>
                    <p className="font-bold">200 kpl</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Games */}
            <section id="games" className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold">Pelit ja pelintoimittajat</h2>
              <p className="mb-6 text-muted-foreground">{casino.sections.games}</p>
              <div className="flex flex-wrap gap-2">
                {casino.gameProviders.map((provider) => (
                  <span key={provider} className="rounded-md border bg-card px-3 py-1 text-sm">
                    {provider}
                  </span>
                ))}
              </div>
            </section>

            {/* Payments */}
            <section id="payments" className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold">Maksutavat</h2>
              <p className="mb-6 text-muted-foreground">{casino.sections.payments}</p>
              <div className="flex flex-wrap gap-2">
                {casino.paymentMethods.map((method) => (
                  <span key={method} className="rounded-md border bg-card px-3 py-1 text-sm">
                    {method}
                  </span>
                ))}
              </div>
            </section>

            {/* Support */}
            <section id="support" className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold">Asiakaspalvelu</h2>
              <p className="mb-6 text-muted-foreground">{casino.sections.support}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${casino.customerSupport.livechat ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">{casino.customerSupport.hours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${casino.customerSupport.email ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Sahkoposti</p>
                    <p className="text-sm text-muted-foreground">
                      {casino.customerSupport.email ? 'Saatavilla' : 'Ei saatavilla'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${casino.customerSupport.phone ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Puhelin</p>
                    <p className="text-sm text-muted-foreground">
                      {casino.customerSupport.phone ? 'Saatavilla' : 'Ei saatavilla'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Verdict */}
            <section id="verdict" className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold">Yhteenveto</h2>
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {casino.rating}
                  </div>
                  <div>
                    <p className="font-bold">Kokonaisarvosana</p>
                    <StarRating rating={casino.rating} />
                  </div>
                </div>
                <p className="text-muted-foreground">{casino.sections.verdict}</p>
                <div className="mt-6">
                  <a
                    href={casino.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    Siirry kasinolle
                  </a>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <p className="text-sm text-muted-foreground">
              Arvostelu paivitetty: {new Date(casino.lastUpdated).toLocaleDateString('fi-FI')}
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
