import { defineField, defineType } from 'sanity';

export const casino = defineType({
  name: 'casino',
  title: 'Kasino',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Kasinon nimi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-tunniste',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Arvosana',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(5),
    }),
    defineField({
      name: 'bonus',
      title: 'Bonuskuvaus',
      type: 'string',
      description: 'Esim. "100% bonus + 200 ilmaiskierrosta"',
    }),
    defineField({
      name: 'bonusValue',
      title: 'Bonuksen arvo',
      type: 'string',
      description: 'Esim. "500€" tai "Ilmainen"',
    }),
    defineField({
      name: 'features',
      title: 'Ominaisuudet',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Esim. "Nopeat kotiutukset", "Suomenkielinen tuki"',
    }),
    defineField({
      name: 'license',
      title: 'Lisenssi',
      type: 'string',
      options: {
        list: [
          { title: 'Malta MGA', value: 'MGA' },
          { title: 'Malta Gaming Authority', value: 'Malta MGA' },
          { title: 'Curacao', value: 'Curacao' },
          { title: 'UK Gambling Commission', value: 'UKGC' },
          { title: 'Gibraltar', value: 'Gibraltar' },
        ],
      },
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Maksutavat',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'minDeposit',
      title: 'Minimitalletus',
      type: 'string',
      description: 'Esim. "10€"',
    }),
    defineField({
      name: 'withdrawalTime',
      title: 'Kotiutusaika',
      type: 'string',
      description: 'Esim. "0-24h" tai "5 min"',
    }),
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate-linkki',
      type: 'url',
      description: 'Kasinon affiliate-linkki',
    }),
    defineField({
      name: 'isNew',
      title: 'Uusi kasino',
      type: 'boolean',
      description: 'Näytetäänkö "Uusi" -merkintä',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Suositeltu',
      type: 'boolean',
      description: 'Näytetäänkö etusivulla',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Järjestys',
      type: 'number',
      description: 'Pienempi numero = korkeampi sijoitus',
    }),
    defineField({
      name: 'review',
      title: 'Arvostelu',
      type: 'object',
      fields: [
        defineField({
          name: 'summary',
          title: 'Yhteenveto',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'content',
          title: 'Arvostelun sisältö',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normaali', value: 'normal' },
                { title: 'Otsikko 2', value: 'h2' },
                { title: 'Otsikko 3', value: 'h3' },
                { title: 'Lainaus', value: 'blockquote' },
              ],
              marks: {
                decorators: [
                  { title: 'Lihavoitu', value: 'strong' },
                  { title: 'Kursivoitu', value: 'em' },
                ],
              },
            },
          ],
        }),
        defineField({
          name: 'pros',
          title: 'Plussat',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'cons',
          title: 'Miinukset',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO-asetukset',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta-otsikko',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta-kuvaus',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      rating: 'rating',
      isNew: 'isNew',
      media: 'logo',
    },
    prepare({ title, rating, isNew, media }) {
      return {
        title,
        subtitle: `${rating}/5 ${isNew ? '• Uusi' : ''}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Järjestys',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Arvosana (korkein ensin)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
});
