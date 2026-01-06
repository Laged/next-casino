import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { HeroBackground } from '@/components/ui/hero-background';
import { GradientText, NoiseOverlay, TiltCard } from '@/components/ui/reactbits';
import { getFeaturedCasinos, getCategories as getSanityCategories } from '@sanity/lib/fetch';
import { Clock, CreditCard, Gift, Shield, Star, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic imports for client components (performance optimization)
const BlurText = dynamic(
  () => import('@/components/ui/reactbits/blur-text').then((mod) => mod.BlurText),
  { ssr: true }
);

const CountUp = dynamic(
  () => import('@/components/ui/reactbits/count-up').then((mod) => mod.CountUp),
  { ssr: true }
);

const MagneticButton = dynamic(
  () => import('@/components/ui/reactbits/magnetic-button').then((mod) => mod.MagneticButton),
  { ssr: true }
);

// Casino data type for display
interface DisplayCasino {
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
  affiliateLink?: string;
}

// Fallback casinos (used when Sanity is empty)
const fallbackCasinos: DisplayCasino[] = [
  {
    id: 'kasino-1',
    name: 'Kasino Yksi',
    rating: 4.8,
    bonus: '100% bonus + 200 ilmaiskierrosta',
    bonusValue: '500€',
    features: ['Nopeat kotiutukset', 'Suomenkielinen tuki', 'MGA-lisenssi'],
    license: 'MGA',
    minDeposit: '10€',
    withdrawalTime: '0-24h',
    href: '/arvostelut/kasino-yksi',
  },
  {
    id: 'kasino-2',
    name: 'Kasino Kaksi',
    rating: 4.7,
    bonus: '200% bonus ensitalletukseen',
    bonusValue: '1000€',
    features: ['Pikakasino', 'Ei rekisteröintiä', 'Verovapaa'],
    license: 'Malta MGA',
    minDeposit: '20€',
    withdrawalTime: '5 min',
    href: '/arvostelut/kasino-kaksi',
  },
  {
    id: 'kasino-3',
    name: 'Kasino Kolme',
    rating: 4.6,
    bonus: '50 ilmaiskierrosta ilman talletusta',
    bonusValue: 'Ilmainen',
    features: ['Uusi kasino', 'Cashback-bonus', 'VIP-ohjelma'],
    license: 'Curacao',
    minDeposit: '10€',
    withdrawalTime: '1-2 päivää',
    href: '/arvostelut/kasino-kolme',
  },
];

// Fallback categories
const fallbackCategories = [
  {
    title: 'Uudet Kasinot',
    description: 'Tuoreimmat nettikasinot 2026',
    href: '/uudet-kasinot',
    icon: Star,
    count: 15,
  },
  {
    title: 'Bonukset',
    description: 'Parhaat tervetuliaistarjoukset',
    href: '/bonukset',
    icon: Gift,
    count: 50,
  },
  {
    title: 'Ilmaiskierrokset',
    description: 'Ilmaiset pyöräytykset ilman talletusta',
    href: '/ilmaiskierrokset',
    icon: Zap,
    count: 30,
  },
  {
    title: 'Pikakasinot',
    description: 'Pay N Play kasinot suomalaisille',
    href: '/pikakasinot',
    icon: Clock,
    count: 25,
  },
];

// Icon mapping for Sanity categories
const iconMap: Record<string, typeof Star> = {
  star: Star,
  gift: Gift,
  zap: Zap,
  clock: Clock,
  shield: Shield,
};

function CasinoCard({ casino }: { casino: DisplayCasino }) {
  return (
    <TiltCard
      as="article"
      shine
      className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-colors hover:border-amber-500/50"
    >
      <div data-testid="casino-card" className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-xl">{casino.name}</h3>
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

        <div className="mb-4 flex max-h-[4.5rem] flex-wrap gap-2 overflow-hidden">
          {casino.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="whitespace-nowrap rounded-full bg-slate-800 px-2 py-1 text-slate-300 text-xs"
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
          <MagneticButton
            as="a"
            href={casino.affiliateLink || `https://example.com/go/${casino.id}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-center font-semibold text-white transition-colors hover:from-amber-600 hover:to-orange-600"
          >
            Pelaa nyt
          </MagneticButton>
          <Link
            href={casino.href}
            className="rounded-lg bg-slate-800 px-4 py-3 font-medium text-slate-300 transition-colors hover:bg-slate-700"
          >
            Arvostelu
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}

export default async function Home() {
  // Fetch from Sanity with fallback
  let casinos: DisplayCasino[] = fallbackCasinos;
  let categories = fallbackCategories;

  try {
    const sanityCasinos = await getFeaturedCasinos();
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
        affiliateLink: c.affiliateLink,
      }));
    }

    const sanityCategories = await getSanityCategories();
    if (sanityCategories && sanityCategories.length > 0) {
      categories = sanityCategories.map((cat) => ({
        title: cat.title,
        description: cat.description || '',
        href: `/${cat.slug}`,
        icon: iconMap[cat.icon || 'star'] || Star,
        count: cat.casinoCount || 0,
      }));
    }
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    // Use fallback data
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section with Aurora Background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 py-16 md:py-24">
        {/* Canvas backgrounds (client-only) */}
        <HeroBackground />

        <NoiseOverlay className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-amber-400 text-sm">
                <Shield className="h-4 w-4" />
                <span>Luotettavat ja lisensioidut kasinot</span>
              </div>

              <h1 className="mb-6 font-bold text-4xl text-white md:text-5xl lg:text-6xl">
                <BlurText
                  text="Parhaat Nettikasinot Suomalaisille 2026"
                  delay={100}
                  animateBy="words"
                />
              </h1>

              <p className="mb-8 text-lg text-slate-400">
                Vertaile luotettavat nettikasinot ja löydä parhaat bonukset. Kaikki kasinot on
                testattu ja arvioitu suomalaisten pelaajien näkökulmasta.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="/uudet-kasinot"
                  className="glow-amber rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:from-amber-600 hover:to-orange-600"
                >
                  Selaa kasinoita
                </MagneticButton>
                <Link
                  href="/bonukset"
                  className="rounded-lg bg-slate-800 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700"
                >
                  Katso bonukset
                </Link>
              </div>
            </div>
          </div>
        </NoiseOverlay>
      </section>

      {/* Featured Casinos */}
      <section className="bg-slate-950 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-white">Suositellut Kasinot</h2>
            <p className="text-slate-400">Toimituksemme valitsemat parhaat nettikasinot</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {casinos.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/uudet-kasinot"
              className="inline-flex items-center gap-2 font-medium text-amber-400 hover:text-amber-300"
            >
              Näytä kaikki kasinot →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-900/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-white">Selaa Kategorioittain</h2>
            <p className="text-slate-400">Löydä juuri sinulle sopiva kasino</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group tilt-card rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-amber-500/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 transition-colors group-hover:bg-amber-500/20">
                    <Icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg text-white">{category.title}</h3>
                  <p className="mb-3 text-slate-400 text-sm">{category.description}</p>
                  <span className="text-amber-400 text-xs">{category.count} kasinoa →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section with CountUp */}
      <section className="bg-slate-950 py-16">
        <div className="container mx-auto px-4">
          <div className="noise-overlay rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 font-bold text-2xl text-white md:text-3xl">
                  Miksi luottaa <GradientText>Kasinolista.fi</GradientText>
                  -sivustoon?
                </h2>
                <p className="mb-6 text-slate-400">
                  Olemme suomalainen kasinovertailusivusto, joka on erikoistunut arvioimaan
                  nettikasinoita suomalaisten pelaajien näkökulmasta. Kaikki arvostelut ovat
                  rehellisiä ja puolueettomia.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-300">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <span>Vain lisensoidut ja turvalliset kasinot</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Star className="h-5 w-5 text-amber-400" />
                    <span>Puolueettomat arvostelut asiantuntijoilta</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <span>Päivitetyt bonustiedot reaaliajassa</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="pulse-subtle rounded-xl bg-slate-800/50 p-6 text-center">
                  <div className="mb-2 font-bold text-3xl text-amber-400">
                    <CountUp to={100} duration={1.5} suffix="+" />
                  </div>
                  <div className="text-slate-400 text-sm">Arvosteltua kasinoa</div>
                </div>
                <div className="pulse-subtle rounded-xl bg-slate-800/50 p-6 text-center">
                  <div className="mb-2 font-bold text-3xl text-emerald-400">
                    <CountUp to={50} duration={1.5} suffix="+" />
                  </div>
                  <div className="text-slate-400 text-sm">Bonustarjousta</div>
                </div>
                <div className="pulse-subtle rounded-xl bg-slate-800/50 p-6 text-center">
                  <div className="mb-2 font-bold text-3xl text-blue-400">
                    <CountUp to={5} duration={1.5} suffix="+" />
                  </div>
                  <div className="text-slate-400 text-sm">Vuotta kokemusta</div>
                </div>
                <div className="pulse-subtle rounded-xl bg-slate-800/50 p-6 text-center">
                  <div className="mb-2 font-bold text-3xl text-purple-400">24/7</div>
                  <div className="text-slate-400 text-sm">Päivitetty sisältö</div>
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
