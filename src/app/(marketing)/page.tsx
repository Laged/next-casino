import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Parhaat Nettikasinot 2026 | Luotettavat Kasinoarvostelut',
  description:
    'Loyda Suomen parhaat nettikasinot vuonna 2026. Vertaile bonuksia, lue arvosteluja ja valitse sinulle sopiva kasino. Luotettavat arvostelut ammattilaisilta.',
  openGraph: {
    title: 'Parhaat Nettikasinot 2026 | Luotettavat Kasinoarvostelut',
    description:
      'Loyda Suomen parhaat nettikasinot vuonna 2026. Vertaile bonuksia ja lue arvosteluja.',
    type: 'website',
  },
};

// Types for casino data
interface FeaturedCasino {
  id: string;
  name: string;
  slug: string;
  rating: number;
  bonusTitle: string;
  bonusDescription: string;
  features: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  casinoCount: number;
}

// Mock data fetching - replace with actual API calls
async function getFeaturedCasinos(): Promise<FeaturedCasino[]> {
  // TODO: Fetch from CMS/API
  return [
    {
      id: '1',
      name: 'Kasino Yksi',
      slug: 'kasino-yksi',
      rating: 4.8,
      bonusTitle: '100% bonus + 200 ilmaiskierrosta',
      bonusDescription: 'Uusille pelaajille ensimmaiseen talletukseen',
      features: ['Nopeat kotiutukset', 'Suomalainen tuki', 'Laaja pelivalikoima'],
    },
    {
      id: '2',
      name: 'Kasino Kaksi',
      slug: 'kasino-kaksi',
      rating: 4.6,
      bonusTitle: '200% bonus 500 euroon asti',
      bonusDescription: 'Tervetuliaisbonukset kolmeen talletukseen',
      features: ['Pay N Play', 'Ei rekisteroitymista', 'Valittomat nostot'],
    },
    {
      id: '3',
      name: 'Kasino Kolme',
      slug: 'kasino-kolme',
      rating: 4.5,
      bonusTitle: '50 ilmaiskierrosta ilman talletusta',
      bonusDescription: 'Aloita pelaaminen heti ilman talletusta',
      features: ['Ilmaiset kierrokset', 'Matala kierratys', 'Mobiilioptimoidut'],
    },
  ];
}

async function getCategories(): Promise<Category[]> {
  // TODO: Fetch from CMS/API
  return [
    {
      id: '1',
      name: 'Uudet Kasinot',
      slug: 'uudet-kasinot',
      description: 'Tuoreimmat nettikasinot Suomen markkinoilla',
      casinoCount: 25,
    },
    {
      id: '2',
      name: 'Bonukset',
      slug: 'bonukset',
      description: 'Parhaat kasinobonukset ja tarjoukset',
      casinoCount: 50,
    },
    {
      id: '3',
      name: 'Ilmaiskierrokset',
      slug: 'ilmaiskierrokset',
      description: 'Ilmaiset pyoraytykset suosikkipeleihin',
      casinoCount: 40,
    },
    {
      id: '4',
      name: 'Pikakotiutus',
      slug: 'pikakotiutus',
      description: 'Kasinot nopeilla kotiutuksilla',
      casinoCount: 30,
    },
  ];
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default async function HomePage() {
  const [featuredCasinos, categories] = await Promise.all([getFeaturedCasinos(), getCategories()]);

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Parhaat Nettikasinot 2026
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Loyda luotettavat nettikasinot asiantuntija-arvostelujemme avulla. Vertaile bonuksia,
            lue pelaajien kokemuksia ja aloita pelaaminen turvallisesti.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/uudet-kasinot"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Selaa kasinoita
            </Link>
            <Link
              href="/bonukset"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Katso bonukset
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Casinos Section */}
      <section className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Suositellut Kasinot</h2>
          <p className="mt-2 text-muted-foreground">
            Kayttajien suosikit ja asiantuntijoiden valinnat
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCasinos.map((casino) => (
            <article
              key={casino.id}
              className="group rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{casino.name}</h3>
                <StarRating rating={casino.rating} />
              </div>
              <div className="mb-4 rounded-md bg-primary/10 p-4">
                <p className="font-semibold text-primary">{casino.bonusTitle}</p>
                <p className="text-sm text-muted-foreground">{casino.bonusDescription}</p>
              </div>
              <ul className="mb-4 space-y-2">
                {casino.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <svg
                      className="h-4 w-4 text-green-500"
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
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/arvostelut/${casino.slug}`}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Lue arvostelu
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Selaa kategorioittain</h2>
          <p className="mt-2 text-muted-foreground">Loyda juuri sinulle sopivat nettikasinot</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <h3 className="font-semibold group-hover:text-primary">{category.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{category.casinoCount} kasinoa</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="container">
        <div className="rounded-lg bg-muted/50 p-8 text-center">
          <h2 className="text-2xl font-bold">Miksi luottaa meihin?</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Riippumattomat arvostelut</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Kaikki arvostelumme ovat rehellisia ja puolueettomia
              </p>
            </div>
            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Turvalliset kasinot</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Suosittelemme vain lisensoituja ja turvallisia kasinoita
              </p>
            </div>
            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Ajan tasalla</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Paivitamme tiedot ja bonukset saannollisesti
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
