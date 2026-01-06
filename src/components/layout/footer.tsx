'use client';

import { Award, Gamepad2, Mail, Shield, Lock, ExternalLink } from 'lucide-react';
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
    icon: <Shield className="w-6 h-6" />,
    label: 'Lisensioidut kasinot',
  },
  {
    icon: <Award className="w-6 h-6" />,
    label: 'Asiantuntija-arvostelut',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    label: 'Turvallinen pelaaminen',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Trust Badges Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 text-slate-400">
                <span className="text-amber-500">{badge.icon}</span>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Kasino<span className="text-amber-500">lista</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Suomen luotetuin nettikasinovertailu. Autamme suomalaisia pelaajia löytämään
              turvalliset ja laadukkaat nettikasinot vuodesta 2020 lähtien.
            </p>

            {/* License Info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs px-3 py-1 bg-slate-800 text-emerald-400 rounded-full border border-emerald-500/30">
                MGA-lisenssit
              </span>
              <span className="text-xs px-3 py-1 bg-slate-800 text-blue-400 rounded-full border border-blue-500/30">
                Malta
              </span>
              <span className="text-xs px-3 py-1 bg-slate-800 text-purple-400 rounded-full border border-purple-500/30">
                Curacao
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
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
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Tilaa uutiskirjeemme
              </h3>
              <p className="text-sm text-slate-400">
                Saat parhaat bonustarjoukset suoraan sähköpostiisi.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-64">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="Sähköpostiosoitteesi"
                  className="w-full h-11 pl-10 pr-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
              >
                Tilaa
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Responsible Gambling Section */}
      <div className="border-t border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-lg font-bold text-red-500 border-2 border-red-500 rounded-full w-8 h-8 flex items-center justify-center">
                18+
              </span>
              <a
                href="https://www.peluuri.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-slate-400 hover:text-amber-400"
              >
                <ExternalLink className="w-3 h-3" />
                Peluuri.fi
              </a>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-400 rounded">
                Vastuullinen pelaaminen
              </span>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-400 rounded">
                Pelaa vastuullisesti
              </span>
            </div>
            <p className="text-xs text-slate-500 text-center md:text-right max-w-md">
              Pelaaminen voi aiheuttaa riippuvuutta. Pelaa vastuullisesti. Apua ongelmapelaamiseen
              saat Peluurista: 0800 100 101.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>&copy; {currentYear} Kasinolista.fi. Kaikki oikeudet pidätetään.</span>
              <Link href="/tietosuoja" className="hover:text-amber-400 transition-colors">
                Tietosuojaseloste
              </Link>
              <Link href="/ehdot" className="hover:text-amber-400 transition-colors">
                Käyttöehdot
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-xs text-slate-600 text-center md:text-left">
            Rahapelaaminen voi aiheuttaa riippuvuutta. Pelaa vastuullisesti. Kasinolista.fi on
            riippumaton vertailusivusto. Saatamme saada korvausta, kun klikkaat sivustollamme
            olevia linkkejä. Tämä ei vaikuta arvosteluihimme, jotka ovat rehellisiä ja
            puolueettomia. Tarkista aina bonusten käyttöehdot. Kaikki listatut kasinot ovat
            lisensioituja ja säädeltyjä (MGA, Malta, Curacao). Vain 18+ vuotiaille.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
