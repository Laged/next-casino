import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'kasinolista',
  title: 'Kasinolista.fi - Sisällönhallinta',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Sisältö')
          .items([
            S.listItem()
              .title('Kasinot')
              .child(
                S.list()
                  .title('Kasinot')
                  .items([
                    S.listItem()
                      .title('Kaikki kasinot')
                      .child(S.documentTypeList('casino').title('Kaikki kasinot')),
                    S.listItem()
                      .title('Uudet kasinot')
                      .child(
                        S.documentList()
                          .title('Uudet kasinot')
                          .filter('_type == "casino" && isNew == true')
                      ),
                  ])
              ),
            S.listItem().title('Bonukset').child(S.documentTypeList('bonus').title('Bonukset')),
            S.listItem()
              .title('Ilmaiskierrokset')
              .child(S.documentTypeList('freeSpins').title('Ilmaiskierrokset')),
            S.divider(),
            S.listItem()
              .title('Kategoriat')
              .child(S.documentTypeList('category').title('Kategoriat')),
            S.listItem().title('Sivut').child(S.documentTypeList('page').title('Sivut')),
            S.divider(),
            S.listItem()
              .title('Asetukset')
              .child(S.documentTypeList('siteSettings').title('Asetukset')),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
});
