import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { HeroBackground } from '@/components/ui/hero-background';
import { GradientText, NoiseOverlay, TiltCard } from '@/components/ui/reactbits';
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

// Casino data type
interface Casino {
  id: string;
  name: string;
  rating: number;
  bonus: string;
  bonusValue: string;
  features: string[];
  license: string;
  paymentMethods: string[];
  minDeposit: string;
  withdrawalTime: string;
  href: string;
}

// Featured casinos data
const featuredCasinos: Casino[] = [
  {
    id: 'kasino-1',
    name: 'Kasino Yksi',
    rating: 4.8,
    bonus: '100% bonus + 200 ilmaiskierrosta',
    bonusValue: '500€',
    features: ['Nopeat kotiutukset', 'Suomenkielinen tuki', 'MGA-lisenssi'],
    license: 'MGA',
    paymentMethods: ['Trustly', 'Visa', 'MasterCard'],
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
    paymentMethods: ['Trustly', 'Zimpler', 'Brite'],
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
    paymentMethods: ['Visa', 'Skrill', 'Neteller'],
    minDeposit: '10€',
    withdrawalTime: '1-2 päivää',
    href: '/arvostelut/kasino-kolme',
  },
];

// Category data
const categories = [
  {
    title: 'Uudet Kasinot',
    description: 'Tuoreimmat nettikasinot 2025',
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

function CasinoCard({ casino }: { casino: Casino }) {
  return (
    <TiltCard
      as="article"
      shine
      className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-colors"
    >
      <div data-testid="casino-card" className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{casino.name}</h3>
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

        <div className="flex flex-wrap gap-2 mb-4 max-h-[4.5rem] overflow-hidden">
          {casino.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-full whitespace-nowrap"
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
          <MagneticButton
            as="a"
            href={`https://example.com/go/${casino.id}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg text-center hover:from-amber-600 hover:to-orange-600 transition-colors"
          >
            Pelaa nyt
          </MagneticButton>
          <Link
            href={casino.href}
            className="px-4 py-3 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            Arvostelu
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section with Aurora Background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 py-16 md:py-24">
        {/* Canvas backgrounds (client-only) */}
        <HeroBackground />

        <NoiseOverlay className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-6">
                <Shield className="w-4 h-4" />
                <span>Luotettavat ja lisensioidut kasinot</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                <BlurText
                  text="Parhaat Nettikasinot Suomalaisille 2026"
                  delay={100}
                  animateBy="words"
                />
              </h1>

              <p className="text-lg text-slate-400 mb-8">
                Vertaile luotettavat nettikasinot ja löydä parhaat bonukset. Kaikki kasinot on
                testattu ja arvioitu suomalaisten pelaajien näkökulmasta.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="/uudet-kasinot"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors glow-amber"
                >
                  Selaa kasinoita
                </MagneticButton>
                <Link
                  href="/bonukset"
                  className="px-6 py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Katso bonukset
                </Link>
              </div>
            </div>
          </div>
        </NoiseOverlay>
      </section>

      {/* Featured Casinos */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Suositellut Kasinot</h2>
            <p className="text-slate-400">Toimituksemme valitsemat parhaat nettikasinot</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCasinos.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/uudet-kasinot"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              Näytä kaikki kasinot →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Selaa Kategorioittain</h2>
            <p className="text-slate-400">Löydä juuri sinulle sopiva kasino</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all tilt-card"
                >
                  <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{category.description}</p>
                  <span className="text-xs text-amber-400">{category.count} kasinoa →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section with CountUp */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 border border-slate-700 noise-overlay">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Miksi luottaa <GradientText>Kasinolista.fi</GradientText>
                  -sivustoon?
                </h2>
                <p className="text-slate-400 mb-6">
                  Olemme suomalainen kasinovertailusivusto, joka on erikoistunut arvioimaan
                  nettikasinoita suomalaisten pelaajien näkökulmasta. Kaikki arvostelut ovat
                  rehellisiä ja puolueettomia.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-300">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span>Vain lisensoidut ja turvalliset kasinot</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Puolueettomat arvostelut asiantuntijoilta</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span>Päivitetyt bonustiedot reaaliajassa</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-6 text-center pulse-subtle">
                  <div className="text-3xl font-bold text-amber-400 mb-2">
                    <CountUp to={100} duration={1.5} suffix="+" />
                  </div>
                  <div className="text-sm text-slate-400">Arvosteltua kasinoa</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 text-center pulse-subtle">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    <CountUp to={50} duration={1.5} suffix="+" />
                  </div>
                  <div className="text-sm text-slate-400">Bonustarjousta</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 text-center pulse-subtle">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    <CountUp to={5} duration={1.5} suffix="+" />
                  </div>
                  <div className="text-sm text-slate-400">Vuotta kokemusta</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 text-center pulse-subtle">
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-sm text-slate-400">Päivitetty sisältö</div>
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
