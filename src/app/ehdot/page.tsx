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

      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400">
              Etusivu
            </Link>
            <span>/</span>
            <span className="text-white">Käyttöehdot</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Käyttöehdot</h1>

            <div className="prose prose-invert prose-slate max-w-none">
              <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Yleistä</h2>
              <p className="text-slate-400 mb-4">
                Nämä käyttöehdot koskevat Kasinolista.fi-sivuston käyttöä. Käyttämällä sivustoa
                hyväksyt nämä ehdot.
              </p>

              <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Sisältö</h2>
              <p className="text-slate-400 mb-4">
                Sivustomme tarjoaa tietoa nettikasinoista vertailutarkoituksessa. Emme ole vastuussa
                kasinoiden toiminnasta tai tarjouksista.
              </p>

              <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Ikäraja</h2>
              <p className="text-slate-400 mb-4">
                Rahapelaaminen on sallittua vain 18 vuotta täyttäneille. Pelaa vastuullisesti.
              </p>

              <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Affiliate-linkit</h2>
              <p className="text-slate-400 mb-4">
                Sivustomme sisältää affiliate-linkkejä. Saatamme saada korvausta, kun klikkaat
                linkkejämme ja rekisteröidyt kasinolle.
              </p>

              <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                5. Vastuullinen pelaaminen
              </h2>
              <p className="text-slate-400 mb-4">
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
