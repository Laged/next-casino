import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tietosuojaseloste',
  description:
    'Lue tietosuojaselosteemme ja opi, miten kasittelemme henkilotietojasi. Sitoudumme suojaamaan yksityisyyttasi.',
  openGraph: {
    title: 'Tietosuojaseloste | Nettikasinot',
    description: 'Tietosuojaseloste ja henkilotietojen kasittelykayatannot.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface Section {
  id: string;
  title: string;
  content: string[];
}

const privacySections: Section[] = [
  {
    id: 'yleista',
    title: '1. Yleista',
    content: [
      'Tama tietosuojaseloste kuvaa, miten keramme, kaytamme ja suojaamme henkilotietojasi kun kaytat verkkopalveluamme.',
      'Noudatamme EU:n yleista tietosuoja-asetusta (GDPR) seka Suomen tietosuojalakia.',
      'Rekisterinpitajana toimii Nettikasinot-verkkopalvelu.',
    ],
  },
  {
    id: 'keratyt-tiedot',
    title: '2. Keratyt tiedot',
    content: [
      'Keramme seuraavia tietoja: IP-osoite, selaimen tyyppi, kayttojarjestelma, vierailuaika ja selatut sivut.',
      'Evasteiden avulla keramme tietoja kayttokokemuksen parantamiseksi ja kavajaliikenteen analysoimiseksi.',
      'Emme kera arkaluonteisia henkilotietoja kuten terveystietoja tai uskonnollista vakaumusta koskevia tietoja.',
    ],
  },
  {
    id: 'tietojen-kaytto',
    title: '3. Tietojen kaytto',
    content: [
      'Kaytamme kerattya tietoja palvelun parantamiseen ja personointiin.',
      'Analysoimme kayttajaliikennetta ymmarataksemme paremmin kayttajiemme tarpeita.',
      'Voimme kayttaa tietoja markkinointitarkoituksiin vain erillisella suostumuksellasi.',
    ],
  },
  {
    id: 'evasteet',
    title: '4. Evasteet',
    content: [
      'Kaytamme valttamattomia evasteita palvelun toiminnan varmistamiseksi.',
      'Analytiikkaevasteita kaytamme kayttajaliikenteen seurantaan ja palvelun kehittamiseen.',
      'Voit hallita evasteasetuksia selaimen asetuksista tai evastebannerin kautta.',
    ],
  },
  {
    id: 'kolmannet-osapuolet',
    title: '5. Kolmannet osapuolet',
    content: [
      'Kaytamme kolmannen osapuolen palveluja kuten Google Analytics kayttajaliikenteen analysointiin.',
      'Affiliate-linkkien kautta voimme jakaa rajoitettuja tietoja yhteistyokumppaneillemme.',
      'Emme myy henkilotietojasi kolmansille osapuolille.',
    ],
  },
  {
    id: 'tietoturva',
    title: '6. Tietoturva',
    content: [
      'Kaytamme SSL-salausta kaiken tietoliikenteen suojaamiseksi.',
      'Tietoja sailytetaan suojatuilla palvelimilla EU:n alueella.',
      'Paasya henkilotietoihin on rajoitettu vain valttamattomalle henkilokunnalle.',
    ],
  },
  {
    id: 'oikeutesi',
    title: '7. Oikeutesi',
    content: [
      'Sinulla on oikeus pyytaa paasy itseasi koskeviin tietoihin.',
      'Voit pyytaa tietojesi oikaisemista, poistamista tai kasittelyn rajoittamista.',
      'Sinulla on oikeus vastustaa tietojesi kasittelya ja siirtaa tietosi toiseen palveluun.',
      'Voit perua antamasi suostumukset milloin tahansa.',
    ],
  },
  {
    id: 'yhteydenotto',
    title: '8. Yhteydenotto',
    content: [
      'Tietosuojaan liittyvissa kysymyksissa ota yhteytta: tietosuoja@nettikasinot.fi',
      'Voit myos kayttaa yhteydenottolomakettamme.',
      'Vastaamme tiedusteluihin 30 paivan kuluessa.',
    ],
  },
  {
    id: 'muutokset',
    title: '9. Selosteen muutokset',
    content: [
      'Pidatamme oikeuden paivittaa tata tietosuojaselostetta.',
      'Merkittavista muutoksista ilmoitamme verkkosivuillamme.',
      'Tama seloste on paivitetty viimeksi: Tammikuu 2026.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12">
          <h1 className="font-bold text-4xl tracking-tight">Tietosuojaseloste</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tama tietosuojaseloste kuvaa, miten kasittelemme henkilotietojasi. Yksityisyytesi on
            meille tarkeaa.
          </p>
          <p className="mt-2 text-muted-foreground text-sm">Paivitetty viimeksi: Tammikuu 2026</p>
        </header>

        {/* Table of Contents */}
        <nav className="mb-12 rounded-lg border bg-card p-6">
          <h2 className="mb-4 font-semibold">Sisallysluettelo</h2>
          <ul className="space-y-2">
            {privacySections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-muted-foreground text-sm hover:text-primary hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Sections */}
        <div className="space-y-12">
          {privacySections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="mb-4 font-bold text-2xl">{section.title}</h2>
              <div className="space-y-4">
                {section.content.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 rounded-lg bg-muted/50 p-8 text-center">
          <h2 className="font-bold text-xl">Kysyttavaa tietosuojasta?</h2>
          <p className="mt-2 text-muted-foreground">
            Olemme mielellaan avuksi kaikissa tietosuojaan liittyvissa kysymyksissa.
          </p>
          <a
            href="/ota-yhteytta"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90"
          >
            Ota yhteytta
          </a>
        </div>
      </div>
    </div>
  );
}
