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

      <section className="bg-slate-950 py-16">
        <div className="container mx-auto px-4">
          <nav className="mb-6 flex items-center gap-2 text-slate-400 text-sm">
            <Link href="/" className="hover:text-amber-400">
              Etusivu
            </Link>
            <span>/</span>
            <span className="text-white">Tietosuojaseloste</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="mb-8 font-bold text-3xl text-white md:text-4xl">Tietosuojaseloste</h1>

            <div className="prose prose-invert prose-slate max-w-none">
              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">1. Rekisterinpitäjä</h2>
              <p className="mb-4 text-slate-400">
                Kasinolista.fi
                <br />
                Sähköposti: info@kasinolista.fi
              </p>

              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">2. Kerättävät tiedot</h2>
              <p className="mb-4 text-slate-400">
                Keräämme sivuston käyttöön liittyviä tietoja, kuten evästeisiin perustuvaa
                analytiikkadataa sekä uutiskirjeen tilaajien sähköpostiosoitteita.
              </p>

              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">
                3. Tietojen käyttötarkoitus
              </h2>
              <p className="mb-4 text-slate-400">
                Käytämme tietoja sivuston kehittämiseen, käyttökokemuksen parantamiseen ja
                markkinointiviestintään.
              </p>

              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">4. Evästeet</h2>
              <p className="mb-4 text-slate-400">
                Sivustomme käyttää evästeitä. Voit hallita evästeaseuksia selaimen asetuksista.
              </p>

              <h2 className="mt-8 mb-4 font-semibold text-white text-xl">5. Oikeutesi</h2>
              <p className="mb-4 text-slate-400">
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
