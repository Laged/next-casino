import { defineField, defineType } from 'sanity';

export const freeSpins = defineType({
  name: 'freeSpins',
  title: 'Ilmaiskierrokset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Otsikko',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-tunniste',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'casino',
      title: 'Kasino',
      type: 'reference',
      to: [{ type: 'casino' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spinsCount',
      title: 'Kierrosten määrä',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'spinValue',
      title: 'Kierroksen arvo',
      type: 'string',
      description: 'Esim. "0.10€"',
    }),
    defineField({
      name: 'requiresDeposit',
      title: 'Vaatii talletuksen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'minDeposit',
      title: 'Minimitalletus',
      type: 'string',
      description: 'Jos vaatii talletuksen',
    }),
    defineField({
      name: 'game',
      title: 'Peli',
      type: 'string',
      description: 'Mihin peliin kierrokset myönnetään',
    }),
    defineField({
      name: 'gameProvider',
      title: 'Pelivalmistaja',
      type: 'string',
    }),
    defineField({
      name: 'wageringRequirement',
      title: 'Kierrätysvaatimus',
      type: 'number',
      description: 'Esim. 35 (kertaa voittojen määrä)',
    }),
    defineField({
      name: 'maxWinnings',
      title: 'Maksimivoitot',
      type: 'string',
      description: 'Esim. "100€"',
    }),
    defineField({
      name: 'validDays',
      title: 'Voimassaoloaika (päiviä)',
      type: 'number',
    }),
    defineField({
      name: 'bonusCode',
      title: 'Bonuskoodi',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Kuvaus',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'terms',
      title: 'Ehdot',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isActive',
      title: 'Aktiivinen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Suositeltu',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Järjestys',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      spinsCount: 'spinsCount',
      casino: 'casino.name',
      requiresDeposit: 'requiresDeposit',
      isActive: 'isActive',
    },
    prepare({ spinsCount, casino, requiresDeposit, isActive }) {
      return {
        title: `${spinsCount} ilmaiskierrosta`,
        subtitle: `${casino || 'Ei kasinoa'} • ${requiresDeposit ? 'Talletus' : 'Ilman talletusta'} ${isActive ? '' : '(ei aktiivinen)'}`,
      };
    },
  },
});
