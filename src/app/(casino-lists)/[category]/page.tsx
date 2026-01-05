import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ISR configuration - revalidate every 10 minutes
export const revalidate = 600;

// Types
interface CategoryData {
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
}

interface Casino {
  id: string;
  name: string;
  slug: string;
  rating: number;
  bonusTitle: string;
  bonusDescription: string;
  features: string[];
  pros: string[];
  cons: string[];
  minDeposit: number;
  payoutSpeed: string;
  licenses: string[];
}

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

// Category configuration
const categoryConfig: Record<string, CategoryData> = {
  'uudet-kasinot': {
    slug: 'uudet-kasinot',
    name: 'Uudet Kasinot',
    description: 'Tuoreimmat nettikasinot Suomen markkinoilla',
    metaTitle: 'Uudet Nettikasinot 2025 | Tuoreimmat Kasinot',
    metaDescription: 'Loyda uusimmat nettikasinot 2025. Listaamme kaikki uudet kasinot ensimmaisten joukossa. Tuoreet bonukset ja arvostelut.',
    heroTitle: 'Uudet Nettikasinot 2025',
    heroDescription: 'Listaamme kaikki uudet nettikasinot heti kun ne lanseerataan. Loyda tuoreimmat bonukset ja pelipaikat.',
  },
  'bonukset': {
    slug: 'bonukset',
    name: 'Bonukset',
    description: 'Parhaat kasinobonukset',
    metaTitle: 'Parhaat Kasinobonukset 2025 | Tervetuliaisbonukset',
    metaDescription: 'Vertaile parhaat kasinobonukset 2025. Tervetuliaisbonukset, reload-bonukset ja cashback-tarjoukset yhteen paikkaan koottuna.',
    heroTitle: 'Parhaat Kasinobonukset 2025',
    heroDescription: 'Kokoamme parhaat kasinobonukset yhteen paikkaan. Vertaile kierratysvaatimuksia ja valitse sinulle sopiva bonus.',
  },
  'ilmaiskierrokset': {
    slug: 'ilmaiskierrokset',
    name: 'Ilmaiskierrokset',
    description: 'Ilmaiset pyoraytykset',
    metaTitle: 'Ilmaiskierrokset 2025 | Parhaat Ilmaiskierrostarjoukset',
    metaDescription: 'Hae parhaat ilmaiskierrokset nettikasinoille. Ilmaiset pyoraytykset ilman talletusta ja talletuksen kanssa.',
    heroTitle: 'Parhaat Ilmaiskierrokset 2025',
    heroDescription: 'Loyda parhaat ilmaiskierrostarjoukset. Mukana ilmaiset kierrokset ilman talletusta ja tervetuliaistarjoukset.',
  },
  'pikakotiutus': {
    slug: 'pikakotiutus',
    name: 'Pikakotiutus Kasinot',
    description: 'Nopeat kotiutukset',
    metaTitle: 'Pikakotiutus Kasinot 2025 | Nopeat Nostot',
    metaDescription: 'Loyda kasinot nopeimmilla kotiutuksilla. Pikakotiutus jopa muutamassa minuutissa. Vertaile nostoajat.',
    heroTitle: 'Pikakotiutus Kasinot',
    heroDescription: 'Etsitkö nopeita kotiutuksia? Listaamme kasinot, joissa voitot ovat tililläsi minuuteissa.',
  },
  'pay-n-play': {
    slug: 'pay-n-play',
    name: 'Pay N Play Kasinot',
    description: 'Kasinot ilman rekisteroitymista',
    metaTitle: 'Pay N Play Kasinot 2025 | Pelaa Ilman Rekisteroitymista',
    metaDescription: 'Pay N Play kasinot mahdollistavat pelaamisen ilman rekisteroitymista. Nopea tunnistautuminen pankkitunnuksilla.',
    heroTitle: 'Pay N Play Kasinot',
    heroDescription: 'Pelaa heti ilman rekisteroitymista! Pay N Play -kasinoilla tunnistaudut pankkitunnuksilla ja pelaat välittömästi.',
  },
};

// Mock data fetching functions - replace with actual API calls
async function getCategoryData(slug: string): Promise<CategoryData | null> {
  return categoryConfig[slug] || null;
}

async function getCasinosByCategory(categorySlug: string): Promise<Casino[]> {
  // TODO: Fetch from CMS/API based on category
  const mockCasinos: Casino[] = [
    {
      id: '1',
      name: 'Kasino Yksi',
      slug: 'kasino-yksi',
      rating: 4.8,
      bonusTitle: '100% bonus + 200 ilmaiskierrosta',
      bonusDescription: 'Ensimmaiseen talletukseen 500 euroon asti',
      features: ['Nopeat kotiutukset', 'Suomalainen tuki', 'Laaja pelivalikoima'],
      pros: ['Erinomainen asiakaspalvelu', 'Nopeat nostot'],
      cons: ['Rajattu pelitarjonta joillekin maille'],
      minDeposit: 10,
      payoutSpeed: '1-24 tuntia',
      licenses: ['MGA', 'UKGC'],
    },
    {
      id: '2',
      name: 'Kasino Kaksi',
      slug: 'kasino-kaksi',
      rating: 4.6,
      bonusTitle: '200% bonus 500 euroon asti',
      bonusDescription: 'Tervetuliaisbonukset kolmeen talletukseen',
      features: ['Pay N Play', 'Ei rekisteroitymista', 'Valittomat nostot'],
      pros: ['Ei rekisteroitymista', 'Nopea aloitus'],
      cons: ['Pienempi pelitarjonta'],
      minDeposit: 20,
      payoutSpeed: '0-5 minuuttia',
      licenses: ['MGA'],
    },
    {
      id: '3',
      name: 'Kasino Kolme',
      slug: 'kasino-kolme',
      rating: 4.5,
      bonusTitle: '50 ilmaiskierrosta ilman talletusta',
      bonusDescription: 'Aloita pelaaminen heti ilman talletusta',
      features: ['Ilmaiset kierrokset', 'Matala kierratys', 'Mobiilioptimoidut'],
      pros: ['Ei talletusta tarvita', 'Matalat kierratysvaatimukset'],
      cons: ['Rajoitettu nostomaara'],
      minDeposit: 0,
      payoutSpeed: '24-48 tuntia',
      licenses: ['MGA', 'Curacao'],
    },
  ];

  return mockCasinos;
}

// Generate static params for known categories
export async function generateStaticParams() {
  return Object.keys(categoryConfig).map((category) => ({
    category,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = await getCategoryData(category);

  if (!categoryData) {
    return {
      title: 'Kategoriaa ei loytynyt',
    };
  }

  return {
    title: categoryData.metaTitle,
    description: categoryData.metaDescription,
    openGraph: {
      title: categoryData.metaTitle,
      description: categoryData.metaDescription,
    },
  };
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
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

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = await getCategoryData(category);

  if (!categoryData) {
    notFound();
  }

  const casinos = await getCasinosByCategory(category);

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="container mb-12">
        <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Etusivu</Link>
            <span className="mx-2">/</span>
            <span>{categoryData.name}</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {categoryData.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {categoryData.heroDescription}
          </p>
        </div>
      </section>

      {/* Casino List */}
      <section className="container">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            {casinos.length} kasinoa loydetty
          </p>
          <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="rating">Arvosanan mukaan</option>
            <option value="newest">Uusimmat ensin</option>
            <option value="bonus">Bonuksen mukaan</option>
          </select>
        </div>

        <div className="space-y-6">
          {casinos.map((casino, index) => (
            <article
              key={casino.id}
              className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                {/* Rank & Logo */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="h-16 w-24 rounded-md bg-muted" />
                </div>

                {/* Casino Info */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h2 className="text-xl font-bold">{casino.name}</h2>
                    <StarRating rating={casino.rating} />
                  </div>

                  {/* Features */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {casino.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Quick Info */}
                  <div className="grid gap-4 text-sm sm:grid-cols-3">
                    <div>
                      <span className="text-muted-foreground">Min. talletus:</span>
                      <span className="ml-2 font-medium">{casino.minDeposit} EUR</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Kotiutusnopeus:</span>
                      <span className="ml-2 font-medium">{casino.payoutSpeed}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lisenssit:</span>
                      <span className="ml-2 font-medium">{casino.licenses.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Bonus & CTA */}
                <div className="rounded-lg bg-primary/10 p-4 lg:w-64">
                  <p className="font-semibold text-primary">{casino.bonusTitle}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{casino.bonusDescription}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Kasinolle
                    </a>
                    <Link
                      href={`/arvostelut/${casino.slug}`}
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      Lue arvostelu
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="mt-6 grid gap-4 border-t pt-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-green-600">Plussat</h3>
                  <ul className="space-y-1">
                    {casino.pros.map((pro) => (
                      <li key={pro} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-red-600">Miinukset</h3>
                  <ul className="space-y-1">
                    {casino.cons.map((con) => (
                      <li key={con} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="container mt-16">
        <div className="prose prose-gray mx-auto max-w-3xl">
          <h2>{categoryData.name} - Opas</h2>
          <p>
            {categoryData.description}. Olemme koonneet talle sivulle parhaat vaihtoehdot
            ja arvostelleet jokaisen huolellisesti.
          </p>
          <h3>Miten valitsemme kasinot?</h3>
          <p>
            Arvostelemme jokaisen kasinon tarkasti ennen kuin lisaamme sen listallemme.
            Testaamme bonukset, pelitarjonnan, asiakaspalvelun ja kotiutusnopeudet.
          </p>
        </div>
      </section>
    </div>
  );
}
