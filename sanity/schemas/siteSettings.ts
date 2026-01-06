import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Sivuston asetukset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sivuston nimi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Sivuston kuvaus',
      type: 'text',
      rows: 2,
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
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'ogImage',
      title: 'Sosiaalisen median kuva',
      type: 'image',
      description: 'Kuva, jota käytetään sosiaalisessa mediassa jaettaessa',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Etusivun otsikko',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Etusivun alaotsikko',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'trustBadges',
      title: 'Luottamusmerkit',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Ikoni',
              type: 'string',
              options: {
                list: [
                  { title: 'Kilpi', value: 'shield' },
                  { title: 'Tähti', value: 'star' },
                  { title: 'Salama', value: 'zap' },
                  { title: 'Lukko', value: 'lock' },
                  { title: 'Tarkistus', value: 'check' },
                ],
              },
            },
            {
              name: 'text',
              title: 'Teksti',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'text',
              icon: 'icon',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Tilastot',
      type: 'object',
      fields: [
        {
          name: 'casinos',
          title: 'Kasinoiden määrä',
          type: 'number',
        },
        {
          name: 'bonuses',
          title: 'Bonusten määrä',
          type: 'number',
        },
        {
          name: 'yearsExperience',
          title: 'Vuotta kokemusta',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosiaalisen median linkit',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer-asetukset',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Tekijänoikeusteksti',
          type: 'string',
        },
        {
          name: 'disclaimerText',
          title: 'Vastuuvapauslauseke',
          type: 'text',
          rows: 3,
        },
        {
          name: 'showAgeRestriction',
          title: 'Näytä 18+ varoitus',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showGamblingWarning',
          title: 'Näytä peliongelmavaroitus',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytiikka',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Esim. G-XXXXXXXXXX',
        },
        {
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'Esim. GTM-XXXXXXX',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
});
