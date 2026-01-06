import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kasinolista.fi';

export const metadata: Metadata = {
  title: 'Tietosuojaseloste',
  description: 'Kasinolista.fi tietosuojaseloste ja henkilötietojen käsittely.',
  alternates: {
    canonical: `${siteUrl}/tietosuoja`,
  },
};

export default function TietosuojaPage() {
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
            <span className="text-white">Tietosuojaseloste</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Tietosuojaseloste</h1>

            <div className="prose prose-invert prose-slate max-w-none">
              <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Rekisterinpitäjä</h2>
              <p className="text-slate-400 mb-4">
                Kasinolista.fi
                <br />
                Sähköposti: info@kasinolista.fi
              </p>

              <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Kerättävät tiedot</h2>
              <p className="text-slate-400 mb-4">
                Keräämme sivuston käyttöön liittyviä tietoja, kuten evästeisiin perustuvaa
                analytiikkadataa sekä uutiskirjeen tilaajien sähköpostiosoitteita.
              </p>

              <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                3. Tietojen käyttötarkoitus
              </h2>
              <p className="text-slate-400 mb-4">
                Käytämme tietoja sivuston kehittämiseen, käyttökokemuksen parantamiseen ja
                markkinointiviestintään.
              </p>

              <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Evästeet</h2>
              <p className="text-slate-400 mb-4">
                Sivustomme käyttää evästeitä. Voit hallita evästeaseuksia selaimen asetuksista.
              </p>

              <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Oikeutesi</h2>
              <p className="text-slate-400 mb-4">
                Sinulla on oikeus tarkistaa, oikaista ja poistaa henkilötietosi. Ota yhteyttä
                info@kasinolista.fi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
