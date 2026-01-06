import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y4ivm10z';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Need write token
});

const casinos = [
  {
    _type: 'casino',
    name: 'Sanity Casino 1',
    slug: { _type: 'slug', current: 'sanity-casino-1' },
    rating: 4.9,
    bonus: '200% bonus + 200 ilmaiskierrosta',
    bonusValue: '500€',
    features: ['Sanity CMS', 'Nopeat kotiutukset', 'Suomenkielinen tuki'],
    license: 'MGA',
    paymentMethods: ['Trustly', 'Visa', 'MasterCard'],
    minDeposit: '10€',
    withdrawalTime: '0-24h',
    affiliateLink: 'https://example.com/sanity-casino-1',
    isNew: true,
    isFeatured: true,
    order: 1,
    review: {
      summary: 'Sanity Casino 1 on erinomainen valinta suomalaisille pelaajille.',
      pros: ['Nopeat kotiutukset', 'Hyvä bonus', 'Suomenkielinen tuki'],
      cons: ['Rajattu pelitarjonta'],
    },
    seo: {
      metaTitle: 'Sanity Casino 1 Arvostelu 2026',
      metaDescription: 'Lue Sanity Casino 1 arvostelu. Testasimme kasinon bonukset ja pelit.',
    },
  },
  {
    _type: 'casino',
    name: 'Sanity Casino 2',
    slug: { _type: 'slug', current: 'sanity-casino-2' },
    rating: 4.7,
    bonus: '100% bonus ensitalletukseen',
    bonusValue: '300€',
    features: ['Pikakasino', 'Ei rekisteröintiä', 'VIP-ohjelma'],
    license: 'Malta MGA',
    paymentMethods: ['Trustly', 'Zimpler', 'Brite'],
    minDeposit: '20€',
    withdrawalTime: '5 min',
    affiliateLink: 'https://example.com/sanity-casino-2',
    isNew: true,
    isFeatured: true,
    order: 2,
    review: {
      summary: 'Sanity Casino 2 on erinomainen pikakasino.',
      pros: ['Pikakasino', 'Ei rekisteröintiä', 'VIP-ohjelma'],
      cons: ['Ei bonuskoodia'],
    },
    seo: {
      metaTitle: 'Sanity Casino 2 Arvostelu 2026',
      metaDescription: 'Lue Sanity Casino 2 arvostelu.',
    },
  },
  {
    _type: 'casino',
    name: 'Sanity Casino 3',
    slug: { _type: 'slug', current: 'sanity-casino-3' },
    rating: 4.5,
    bonus: '50 ilmaiskierrosta ilman talletusta',
    bonusValue: 'Ilmainen',
    features: ['Uusi kasino', 'Cashback-bonus', 'Live kasino'],
    license: 'Curacao',
    paymentMethods: ['Visa', 'Skrill', 'Neteller'],
    minDeposit: '10€',
    withdrawalTime: '1-2 päivää',
    affiliateLink: 'https://example.com/sanity-casino-3',
    isNew: false,
    isFeatured: true,
    order: 3,
    review: {
      summary: 'Sanity Casino 3 tarjoaa ilmaiskierroksia.',
      pros: ['Ilmaiskierrokset', 'Cashback', 'Live kasino'],
      cons: ['Curacao-lisenssi'],
    },
    seo: {
      metaTitle: 'Sanity Casino 3 Arvostelu 2026',
      metaDescription: 'Lue Sanity Casino 3 arvostelu.',
    },
  },
];

const categories = [
  {
    _type: 'category',
    title: 'Uudet Kasinot',
    slug: { _type: 'slug', current: 'uudet-kasinot' },
    description: 'Tuoreimmat nettikasinot 2026',
    icon: 'star',
    showInNav: true,
    order: 1,
  },
  {
    _type: 'category',
    title: 'Bonukset',
    slug: { _type: 'slug', current: 'bonukset' },
    description: 'Parhaat tervetuliaistarjoukset',
    icon: 'gift',
    showInNav: true,
    order: 2,
  },
  {
    _type: 'category',
    title: 'Ilmaiskierrokset',
    slug: { _type: 'slug', current: 'ilmaiskierrokset' },
    description: 'Ilmaiset pyöräytykset ilman talletusta',
    icon: 'zap',
    showInNav: true,
    order: 3,
  },
  {
    _type: 'category',
    title: 'Pikakasinot',
    slug: { _type: 'slug', current: 'pikakasinot' },
    description: 'Pay N Play kasinot suomalaisille',
    icon: 'clock',
    showInNav: true,
    order: 4,
  },
];

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  title: 'Kasinolista.fi',
  description: 'Parhaat nettikasinot suomalaisille pelaajille',
  heroTitle: 'Parhaat Nettikasinot Suomalaisille 2026',
  heroSubtitle:
    'Vertaile luotettavat nettikasinot ja löydä parhaat bonukset. Kaikki kasinot on testattu ja arvioitu suomalaisten pelaajien näkökulmasta.',
  stats: {
    casinos: 100,
    bonuses: 50,
    yearsExperience: 5,
  },
  footer: {
    copyrightText: '© 2026 Kasinolista.fi. Kaikki oikeudet pidätetään.',
    disclaimerText: 'Pelaaminen on tarkoitettu ainoastaan täysi-ikäisille. Pelaa vastuullisesti.',
    showAgeRestriction: true,
    showGamblingWarning: true,
  },
};

async function seed() {
  console.log('🌱 Seeding Sanity with test data...\n');

  // Create site settings
  console.log('📝 Creating site settings...');
  try {
    await client.createOrReplace(siteSettings);
    console.log('   ✓ Site settings created');
  } catch (error) {
    console.log('   ✗ Site settings error:', (error as Error).message);
  }

  // Create categories
  console.log('\n📁 Creating categories...');
  for (const category of categories) {
    try {
      await client.create(category);
      console.log(`   ✓ Created: ${category.title}`);
    } catch (error) {
      console.log(`   ✗ ${category.title} error:`, (error as Error).message);
    }
  }

  // Create casinos
  console.log('\n🎰 Creating casinos...');
  for (const casino of casinos) {
    try {
      await client.create(casino);
      console.log(`   ✓ Created: ${casino.name}`);
    } catch (error) {
      console.log(`   ✗ ${casino.name} error:`, (error as Error).message);
    }
  }

  console.log('\n✅ Seeding complete!');
  console.log('\nVisit http://localhost:3000/studio to see your content');
}

seed().catch(console.error);
