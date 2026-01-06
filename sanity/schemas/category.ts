import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Kategoria',
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
      name: 'description',
      title: 'Kuvaus',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Ikoni',
      type: 'string',
      description: 'Lucide-ikonin nimi (esim. "star", "gift", "zap")',
      options: {
        list: [
          { title: 'Tähti (Star)', value: 'star' },
          { title: 'Lahja (Gift)', value: 'gift' },
          { title: 'Salama (Zap)', value: 'zap' },
          { title: 'Kello (Clock)', value: 'clock' },
          { title: 'Kilpi (Shield)', value: 'shield' },
          { title: 'Luottokortti (CreditCard)', value: 'credit-card' },
          { title: 'Kolikko (Coins)', value: 'coins' },
          { title: 'Trophy', value: 'trophy' },
          { title: 'Sydän (Heart)', value: 'heart' },
          { title: 'Kruunu (Crown)', value: 'crown' },
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Sisältö',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normaali', value: 'normal' },
            { title: 'Otsikko 2', value: 'h2' },
            { title: 'Otsikko 3', value: 'h3' },
          ],
        },
      ],
    }),
    defineField({
      name: 'casinos',
      title: 'Kasinot',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'casino' }] }],
      description: 'Valitse kasinot tähän kategoriaan',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Kuva',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Järjestys',
      type: 'number',
      description: 'Näyttöjärjestys navigaatiossa',
    }),
    defineField({
      name: 'showInNav',
      title: 'Näytä navigaatiossa',
      type: 'boolean',
      initialValue: true,
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
      title: 'title',
      casinoCount: 'casinos.length',
      media: 'featuredImage',
    },
    prepare({ title, casinoCount, media }) {
      return {
        title,
        subtitle: `${casinoCount || 0} kasinoa`,
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
  ],
});
