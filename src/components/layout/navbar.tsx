'use client';

import { cn } from '@/lib/utils';
import { Gamepad2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navigationItems: NavItem[] = [
  { label: 'Uudet Kasinot', href: '/uudet-kasinot' },
  { label: 'Bonukset', href: '/bonukset' },
  { label: 'Ilmaiskierrokset', href: '/ilmaiskierrokset' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-slate-800 border-b bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-white text-xl">
              Kasino<span className="text-amber-500">lista</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-4 py-2 font-medium text-slate-300 text-sm transition-colors hover:bg-slate-800 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/uudet-kasinot"
              className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 font-semibold text-sm text-white transition-colors hover:from-amber-600 hover:to-orange-600"
            >
              Löydä kasino
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Valikko"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-slate-800 border-t py-4 lg:hidden">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 font-medium text-slate-300 text-sm hover:bg-slate-800 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Link
                  href="/uudet-kasinot"
                  className="block w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-center font-semibold text-sm text-white transition-colors hover:from-amber-600 hover:to-orange-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Löydä kasino
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
