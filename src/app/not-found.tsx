import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sivua ei loytynyt (404)',
  description: 'Etsimasi sivu ei ole saatavilla. Palaa etusivulle ja jatka selaamista.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold">Sivua ei loytynyt</h2>
        <p className="max-w-md text-muted-foreground">
          Pahoittelut, etsimasi sivu ei ole saatavilla. Se on saatettu poistaa, siirtaa tai osoite
          on kirjoitettu vaarin.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Palaa etusivulle
          </Link>
          <Link
            href="/uudet-kasinot"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Selaa kasinoita
          </Link>
        </div>
      </div>
    </div>
  );
}
