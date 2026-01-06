import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ota yhteytta',
  description:
    'Ota meihin yhteytta kysymyksissa, palautteessa tai yhteistyoehdotuksissa. Vastaamme viesteihin mahdollisimman pian.',
  openGraph: {
    title: 'Ota yhteytta | Nettikasinot',
    description: 'Ota meihin yhteytta kysymyksissa tai palautteessa.',
  },
};

interface ContactMethod {
  id: string;
  title: string;
  description: string;
  value: string;
  icon: 'email' | 'chat' | 'faq';
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    title: 'Sahkoposti',
    description: 'Laheta meille viesti ja vastaamme 24 tunnin kuluessa.',
    value: 'info@nettikasinot.fi',
    icon: 'email',
  },
  {
    id: 'feedback',
    title: 'Palaute',
    description: 'Anna palautetta sivustostamme tai arvostelusta.',
    value: 'palaute@nettikasinot.fi',
    icon: 'chat',
  },
  {
    id: 'business',
    title: 'Yhteistyokyselyt',
    description: 'Oletko kiinnostunut yhteistyosta? Ota yhteytta.',
    value: 'yhteistyo@nettikasinot.fi',
    icon: 'email',
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Miten voin ehdottaa kasinoa arvosteltavaksi?',
    answer:
      'Laheta meille sahkopostia osoitteeseen info@nettikasinot.fi kasinon nimella ja verkkosivustolla. Arvioimme kaikki ehdotukset.',
  },
  {
    question: 'Miten arvostelunne tehdaan?',
    answer:
      'Arvostelemme jokaisen kasinon huolellisesti testaamalla niiden palvelut, bonukset, pelitarjonnan ja asiakaspalvelun. Arvosteluprosessimme on lahpinakava ja puolueeton.',
  },
  {
    question: 'Kuinka usein paivitatte tietoja?',
    answer:
      'Paivitamme kasinotietoja ja bonuksia viikottain. Suuremmat paivitykset, kuten uudet arvostelut, julkaistaan kuukausittain.',
  },
  {
    question: 'Voinko luottaa arvostelujuanne?',
    answer:
      'Kylla. Kaikki arvostelumme ovat riippumattomia ja perustuvat omaan testauksemme. Kerromme aina selkeasti, mika sisalto on mainosyhteistyota.',
  },
];

function ContactIcon({ type }: { type: ContactMethod['icon'] }) {
  const icons = {
    email: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    chat: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    faq: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return icons[type];
}

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="font-bold text-4xl tracking-tight">Ota yhteytta</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Kysymyksia, palautetta tai yhteistyoehdotuksia? Olemme taalla auttamassa.
          </p>
        </header>

        {/* Contact Methods */}
        <section className="mb-16">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method) => (
              <div
                key={method.id}
                className="rounded-lg border bg-card p-6 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ContactIcon type={method.icon} />
                </div>
                <h2 className="font-semibold">{method.title}</h2>
                <p className="mt-2 text-muted-foreground text-sm">{method.description}</p>
                <a
                  href={`mailto:${method.value}`}
                  className="mt-4 inline-block font-medium text-primary text-sm hover:underline"
                >
                  {method.value}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="rounded-lg border bg-card p-8">
            <h2 className="mb-6 font-bold text-2xl">Laheta viesti</h2>
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block font-medium text-sm">
                    Nimi *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Etunimi Sukunimi"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-medium text-sm">
                    Sahkoposti *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="sahkoposti@esimerkki.fi"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block font-medium text-sm">
                  Aihe *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Valitse aihe</option>
                  <option value="general">Yleinen kysymys</option>
                  <option value="feedback">Palaute</option>
                  <option value="suggestion">Kasinoehdotus</option>
                  <option value="correction">Korjausehdotus</option>
                  <option value="business">Yhteistyokysely</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-medium text-sm">
                  Viesti *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Kirjoita viestisi tahan..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="privacy" className="text-muted-foreground text-sm">
                  Olen lukenut ja hyvaksyn{' '}
                  <a href="/tietosuojaseloste" className="text-primary hover:underline">
                    tietosuojaselosteen
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90"
              >
                Laheta viesti
              </button>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="mb-6 font-bold text-2xl">Usein kysytyt kysymykset</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group rounded-lg border bg-card">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                  {item.question}
                  <svg
                    className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="border-t px-4 py-3">
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
