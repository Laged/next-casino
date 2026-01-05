import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ISR configuration - revalidate every 10 minutes
export const revalidate = 600;

// Types
interface Article {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: ArticleSection[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  relatedArticles: RelatedArticle[];
}

interface ArticleSection {
  type: 'heading' | 'paragraph' | 'list' | 'tip' | 'warning';
  content: string;
  items?: string[];
}

interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock data fetching - replace with actual API calls
async function getArticle(slug: string): Promise<Article | null> {
  // TODO: Fetch from CMS/API
  const mockArticles: Record<string, Article> = {
    'paras-kasino-opas': {
      id: '1',
      slug: 'paras-kasino-opas',
      title: 'Parhaan nettikasinon valinta - Täydellinen opas 2025',
      metaTitle: 'Parhaan Nettikasinon Valinta | Opas 2025',
      metaDescription: 'Opi valitsemaan paras nettikasino tarpeidesi mukaan. Käymme läpi tärkeimmät kriteerit: lisenssit, bonukset, pelitarjonta ja maksutavat.',
      excerpt: 'Nettikasinoiden maailma voi tuntua sekavalta. Tässä oppaassa käymme läpi, miten löydät juuri sinulle sopivan kasinon.',
      content: [
        {
          type: 'paragraph',
          content: 'Nettikasinoiden määrä kasvaa jatkuvasti, ja oikean valinnan tekeminen voi tuntua haastavalta. Tässä kattavassa oppaassa käymme läpi kaikki tärkeimmät kriteerit, joiden avulla löydät juuri sinulle sopivan kasinon.',
        },
        {
          type: 'heading',
          content: 'Miksi kasinon valinta on tärkeää?',
        },
        {
          type: 'paragraph',
          content: 'Oikean kasinon valinta vaikuttaa koko pelikokemukseesi. Luotettava kasino takaa turvalliset maksut, reilut pelit ja nopeat kotiutukset. Huono valinta voi johtaa ongelmiin voittojen nostamisessa tai jopa rahojen menettämiseen.',
        },
        {
          type: 'heading',
          content: 'Tärkeimmät valintakriteerit',
        },
        {
          type: 'list',
          content: 'Kasinon valinnassa kannattaa kiinnittää huomiota seuraaviin asioihin:',
          items: [
            'Lisenssi ja turvallisuus - Varmista, että kasinolla on luotettava lisenssi (MGA, UKGC)',
            'Bonustarjoukset - Vertaile tervetuliaisbonuksia ja kierrätysvaatimuksia',
            'Pelitarjonta - Tarkista, että suosikkipelisi löytyvät valikoimasta',
            'Maksutavat - Varmista, että käyttämäsi maksutavat ovat tuettuina',
            'Asiakaspalvelu - Suomenkielinen tuki on iso plussa',
            'Kotiutusnopeus - Nopeat kotiutukset ovat merkki luotettavasta kasinosta',
          ],
        },
        {
          type: 'tip',
          content: 'Lue aina bonusehdot huolellisesti ennen talletuksen tekemistä. Kierrätysvaatimukset ja aikarajat vaihtelevat suuresti kasinoiden välillä.',
        },
        {
          type: 'heading',
          content: 'Lisenssit ja turvallisuus',
        },
        {
          type: 'paragraph',
          content: 'Luotettavan kasinon tärkein tunnusmerkki on voimassa oleva pelilisenssi. Suomalaisille pelaajille parhaita lisenssejä ovat Maltan peliviranomaisen (MGA) ja Iso-Britannian pelikomission (UKGC) myöntämät lisenssit. Nämä viranomaiset valvovat kasinoiden toimintaa tiukasti.',
        },
        {
          type: 'warning',
          content: 'Älä koskaan pelaa kasinolla, jolla ei ole voimassa olevaa pelilisenssiä. Lisensoimattomat kasinot eivät takaa reilua peliä tai voittojen maksua.',
        },
        {
          type: 'heading',
          content: 'Bonusten vertailu',
        },
        {
          type: 'paragraph',
          content: 'Tervetuliaisbonukset ovat yksi tärkeimmistä valintakriteereistä. Tyypillinen bonus on 100% ensitalletuksesta, mutta määrät ja ehdot vaihtelevat suuresti. Kiinnitä huomiota erityisesti kierrätysvaatimuksiin - mitä matalampi vaatimus, sitä parempi.',
        },
        {
          type: 'heading',
          content: 'Yhteenveto',
        },
        {
          type: 'paragraph',
          content: 'Parhaan kasinon löytäminen vaatii hieman tutkimista, mutta se kannattaa. Keskity luotettavuuteen, bonusehtoihin ja pelitarjontaan. Lue arvosteluja ja pelaajien kokemuksia ennen päätöksen tekemistä.',
        },
      ],
      author: {
        name: 'Mika Kasinoasiantuntija',
        avatar: '/images/authors/mika.jpg',
        bio: 'Mika on nettikasinoiden asiantuntija yli 10 vuoden kokemuksella alalta.',
      },
      publishedAt: '2025-01-01',
      updatedAt: '2025-01-05',
      readingTime: 8,
      category: 'Oppaat',
      tags: ['kasinot', 'oppaat', 'aloittelijat', 'bonukset'],
      relatedArticles: [
        {
          slug: 'bonusten-kierratysvaatimukset',
          title: 'Bonusten kierrätysvaatimukset selitettynä',
          excerpt: 'Mitä kierrätysvaatimukset tarkoittavat ja miten ne vaikuttavat bonuksen arvoon.',
        },
        {
          slug: 'turvallinen-pelaaminen',
          title: 'Turvallisen pelaamisen periaatteet',
          excerpt: 'Opi pelaamaan vastuullisesti ja tunnistamaan ongelmapelaamisen merkit.',
        },
      ],
    },
  };

  return mockArticles[slug] || null;
}

async function getAllArticleSlugs(): Promise<string[]> {
  // TODO: Fetch from CMS/API
  return ['paras-kasino-opas', 'bonusten-kierratysvaatimukset', 'turvallinen-pelaaminen'];
}

// Generate static params
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Artikkelia ei löytynyt',
    };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
    },
  };
}

// Content renderer component
function ArticleContent({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading':
            return (
              <h2 key={index} className="mt-8 text-2xl font-bold">
                {section.content}
              </h2>
            );
          case 'paragraph':
            return (
              <p key={index} className="mt-4 text-muted-foreground">
                {section.content}
              </p>
            );
          case 'list':
            return (
              <div key={index} className="mt-4">
                <p className="text-muted-foreground">{section.content}</p>
                <ul className="mt-2 space-y-2">
                  {section.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                      <svg className="mt-1 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case 'tip':
            return (
              <div key={index} className="mt-6 rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-950">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-semibold text-green-700 dark:text-green-400">Vinkki</span>
                </div>
                <p className="mt-2 text-green-800 dark:text-green-300">{section.content}</p>
              </div>
            );
          case 'warning':
            return (
              <div key={index} className="mt-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-semibold text-yellow-700 dark:text-yellow-400">Varoitus</span>
                </div>
                <p className="mt-2 text-yellow-800 dark:text-yellow-300">{section.content}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-8">
      {/* Breadcrumbs */}
      <div className="container mb-6">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Etusivu</Link>
          <span className="mx-2">/</span>
          <Link href="/oppaat" className="hover:text-primary">{article.category}</Link>
          <span className="mx-2">/</span>
          <span className="truncate">{article.title}</span>
        </nav>
      </div>

      <div className="container">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main Content */}
          <article className="flex-1">
            {/* Header */}
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {article.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {article.readingTime} min lukuaika
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {article.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {article.excerpt}
              </p>

              {/* Author & Date */}
              <div className="mt-6 flex items-center gap-4 border-y py-4">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Julkaistu {new Date(article.publishedAt).toLocaleDateString('fi-FI')}
                    {article.updatedAt !== article.publishedAt && (
                      <> | Päivitetty {new Date(article.updatedAt).toLocaleDateString('fi-FI')}</>
                    )}
                  </p>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <ArticleContent sections={article.content} />

            {/* Tags */}
            <div className="mt-8 border-t pt-6">
              <h3 className="mb-3 text-sm font-semibold">Aiheet</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tagi/${tag}`}
                    className="rounded-md border bg-card px-3 py-1 text-sm hover:bg-accent"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 rounded-lg border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 shrink-0 rounded-full bg-muted" />
                <div>
                  <h3 className="font-bold">Tietoa kirjoittajasta</h3>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{article.author.bio}</p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 lg:shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Related Articles */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-4 font-bold">Aiheeseen liittyvat</h2>
                <div className="space-y-4">
                  {article.relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/artikkelit/${related.slug}`}
                      className="block rounded-md p-3 transition-colors hover:bg-muted"
                    >
                      <h3 className="font-medium leading-tight">{related.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {related.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
                <h2 className="font-bold">Loyda paras kasino</h2>
                <p className="mt-2 text-sm opacity-90">
                  Vertaile arvostelemamme kasinot ja valitse sinulle sopiva.
                </p>
                <Link
                  href="/uudet-kasinot"
                  className="mt-4 inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-primary shadow transition-transform hover:scale-105"
                >
                  Selaa kasinoita
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
