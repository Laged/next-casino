import { defineField, defineType } from 'sanity';

export const bonus = defineType({
  name: 'bonus',
  title: 'Bonus',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Bonuksen nimi',
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
      name: 'type',
      title: 'Bonustyyppi',
      type: 'string',
      options: {
        list: [
          { title: 'Tervetuliabonus', value: 'welcome' },
          { title: 'Talletusbonus', value: 'deposit' },
          { title: 'Ilmaiskierrokset', value: 'freespins' },
          { title: 'Cashback', value: 'cashback' },
          { title: 'Ei talletusta', value: 'no-deposit' },
          { title: 'VIP-bonus', value: 'vip' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Bonuksen arvo',
      type: 'string',
      description: 'Esim. "100%" tai "500€"',
    }),
    defineField({
      name: 'maxAmount',
      title: 'Maksimisumma',
      type: 'string',
      description: 'Esim. "500€"',
    }),
    defineField({
      name: 'wageringRequirement',
      title: 'Kierrätysvaatimus',
      type: 'number',
      description: 'Esim. 35 (kertaa bonuksen määrä)',
    }),
    defineField({
      name: 'minDeposit',
      title: 'Minimitalletus',
      type: 'string',
      description: 'Esim. "10€"',
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
      description: 'Jos vaaditaan bonuskoodi',
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
      description: 'Bonuksen tärkeimmät ehdot',
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
      name: 'expiresAt',
      title: 'Vanhenee',
      type: 'datetime',
      description: 'Jätä tyhjäksi jos ei vanhene',
    }),
    defineField({
      name: 'order',
      title: 'Järjestys',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      casino: 'casino.name',
      type: 'type',
      isActive: 'isActive',
    },
    prepare({ title, casino, type, isActive }) {
      const typeLabels: Record<string, string> = {
        welcome: 'Tervetuliabonus',
        deposit: 'Talletusbonus',
        freespins: 'Ilmaiskierrokset',
        cashback: 'Cashback',
        'no-deposit': 'Ei talletusta',
        vip: 'VIP-bonus',
      };
      return {
        title,
        subtitle: `${casino || 'Ei kasinoa'} • ${typeLabels[type] || type} ${isActive ? '' : '(ei aktiivinen)'}`,
      };
    },
  },
});
