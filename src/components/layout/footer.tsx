'use client';

import { Award, ExternalLink, Gamepad2, Lock, Mail, Shield } from 'lucide-react';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Kasinot',
    links: [
      { label: 'Uudet Kasinot', href: '/uudet-kasinot' },
      { label: 'Bonukset', href: '/bonukset' },
      { label: 'Ilmaiskierrokset', href: '/ilmaiskierrokset' },
    ],
  },
  {
    title: 'Arvostelut',
    links: [
      { label: 'Kasino Yksi', href: '/arvostelut/kasino-yksi' },
      { label: 'Kasino Kaksi', href: '/arvostelut/kasino-kaksi' },
      { label: 'Kasino Kolme', href: '/arvostelut/kasino-kolme' },
    ],
  },
];

const trustBadges = [
  {
    icon: <Shield className="h-6 w-6" />,
    label: 'Lisensioidut kasinot',
  },
  {
    icon: <Award className="h-6 w-6" />,
    label: 'Asiantuntija-arvostelut',
  },
  {
    icon: <Lock className="h-6 w-6" />,
    label: 'Turvallinen pelaaminen',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-slate-800 border-t bg-slate-950">
      {/* Trust Badges Section */}
      <div className="border-slate-800 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 text-slate-400">
                <span className="text-amber-500">{badge.icon}</span>
                <span className="font-medium text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-white text-xl">
                Kasino<span className="text-amber-500">lista</span>
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-slate-400 text-sm">
              Suomen luotetuin nettikasinovertailu. Autamme suomalaisia pelaajia löytämään
              turvalliset ja laadukkaat nettikasinot vuodesta 2020 lähtien.
            </p>

            {/* License Info */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-500/30 bg-slate-800 px-3 py-1 text-emerald-400 text-xs">
                MGA-lisenssit
              </span>
              <span className="rounded-full border border-blue-500/30 bg-slate-800 px-3 py-1 text-blue-400 text-xs">
                Malta
              </span>
              <span className="rounded-full border border-purple-500/30 bg-slate-800 px-3 py-1 text-purple-400 text-xs">
                Curacao
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 font-semibold text-sm text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm transition-colors hover:text-amber-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 border-slate-800 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-1 font-semibold text-lg text-white">Tilaa uutiskirjeemme</h3>
              <p className="text-slate-400 text-sm">
                Saat parhaat bonustarjoukset suoraan sähköpostiisi.
              </p>
            </div>
            <form className="flex w-full gap-2 md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Mail className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="Sähköpostiosoitteesi"
                  className="h-11 w-full rounded-lg border border-slate-700 bg-slate-800 pr-4 pl-10 text-white placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button
                type="submit"
                className="h-11 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 font-semibold text-white transition-colors hover:from-amber-600 hover:to-orange-600"
              >
                Tilaa
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Responsible Gambling Section */}
      <div className="border-slate-800 border-t bg-slate-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500 font-bold text-lg text-red-500">
                18+
              </span>
              <a
                href="https://www.peluuri.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 text-sm hover:text-amber-400"
              >
                <ExternalLink className="h-3 w-3" />
                Peluuri.fi
              </a>
              <span className="rounded bg-slate-800 px-3 py-1 text-slate-400 text-xs">
                Vastuullinen pelaaminen
              </span>
              <span className="rounded bg-slate-800 px-3 py-1 text-slate-400 text-xs">
                Pelaa vastuullisesti
              </span>
            </div>
            <p className="max-w-md text-center text-slate-500 text-xs md:text-right">
              Pelaaminen voi aiheuttaa riippuvuutta. Pelaa vastuullisesti. Apua ongelmapelaamiseen
              saat Peluurista: 0800 100 101.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-slate-800 border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-slate-500 text-sm md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>&copy; {currentYear} Kasinolista.fi. Kaikki oikeudet pidätetään.</span>
              <Link href="/tietosuoja" className="transition-colors hover:text-amber-400">
                Tietosuojaseloste
              </Link>
              <Link href="/ehdot" className="transition-colors hover:text-amber-400">
                Käyttöehdot
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-center text-slate-600 text-xs md:text-left">
            Rahapelaaminen voi aiheuttaa riippuvuutta. Pelaa vastuullisesti. Kasinolista.fi on
            riippumaton vertailusivusto. Saatamme saada korvausta, kun klikkaat sivustollamme olevia
            linkkejä. Tämä ei vaikuta arvosteluihimme, jotka ovat rehellisiä ja puolueettomia.
            Tarkista aina bonusten käyttöehdot. Kaikki listatut kasinot ovat lisensioituja ja
            säädeltyjä (MGA, Malta, Curacao). Vain 18+ vuotiaille.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
