import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Sivu',
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
      name: 'content',
      title: 'Sisältö',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normaali', value: 'normal' },
            { title: 'Otsikko 1', value: 'h1' },
            { title: 'Otsikko 2', value: 'h2' },
            { title: 'Otsikko 3', value: 'h3' },
            { title: 'Otsikko 4', value: 'h4' },
            { title: 'Lainaus', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Lihavoitu', value: 'strong' },
              { title: 'Kursivoitu', value: 'em' },
              { title: 'Alleviivaus', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Linkki',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Avaa uudessa välilehdessä',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
          lists: [
            { title: 'Luettelo', value: 'bullet' },
            { title: 'Numeroitu', value: 'number' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Vaihtoehtoinen teksti',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Kuvateksti',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Pääkuva',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'showInFooter',
      title: 'Näytä footerissa',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Järjestys',
      type: 'number',
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
        defineField({
          name: 'noIndex',
          title: 'Piilota hakukoneilta',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'featuredImage',
    },
    prepare({ title, slug, media }) {
      return {
        title,
        subtitle: slug ? `/${slug}` : 'Ei URL-tunnistetta',
        media,
      };
    },
  },
});
