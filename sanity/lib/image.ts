import createImageUrlBuilder from '@sanity/image-url';

// Sanity image source type
type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source);
}
