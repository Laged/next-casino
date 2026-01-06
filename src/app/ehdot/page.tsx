import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

export const metadata: Metadata = {
  title: 'Käyttöehdot',
  description: 'Kasinolista.fi käyttöehdot ja palvelun säännöt.',
  alternates: {
    canonical: `${siteUrl}/ehdot`,
  },
};

export default function EhdotPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="bg-slate-950 py-16">
        <div className="container mx-auto px-4">
          <nav className="mb-6 flex items-center gap-2 text-slate-400 text-sm">
            <Link href="/" className="hover:text-amber-400">
              Etusivu
            </Link>
            <span>/</span>
            <span className="text-white">Käyttöehdot</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="mb-8 font-bold text-3xl text-white md:text-4xl">Käyttöehdot</h1>

            <div className="prose prose-invert prose-slate max-w-none">
              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">1. Yleistä</h2>
              <p className="mb-4 text-slate-400">
                Nämä käyttöehdot koskevat Kasinolista.fi-sivuston käyttöä. Käyttämällä sivustoa
                hyväksyt nämä ehdot.
              </p>

              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">2. Sisältö</h2>
              <p className="mb-4 text-slate-400">
                Sivustomme tarjoaa tietoa nettikasinoista vertailutarkoituksessa. Emme ole vastuussa
                kasinoiden toiminnasta tai tarjouksista.
              </p>

              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">3. Ikäraja</h2>
              <p className="mb-4 text-slate-400">
                Rahapelaaminen on sallittua vain 18 vuotta täyttäneille. Pelaa vastuullisesti.
              </p>

              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">4. Affiliate-linkit</h2>
              <p className="mb-4 text-slate-400">
                Sivustomme sisältää affiliate-linkkejä. Saatamme saada korvausta, kun klikkaat
                linkkejämme ja rekisteröidyt kasinolle.
              </p>

              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">
                5. Vastuullinen pelaaminen
              </h2>
              <p className="mb-4 text-slate-400">
                Rohkaisemme vastuulliseen pelaamiseen. Jos sinulla on ongelmia pelaamisen kanssa,
                ota yhteyttä Peluuriin: 0800 100 101.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
