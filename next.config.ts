import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable component caching with 'use cache' directive
  cacheComponents: true,

  // Custom cache profiles for different content types
  cacheLife: {
    // Casino data - updates frequently (bonuses, offers)
    casino: {
      stale: 300, // 5 minutes client cache
      revalidate: 600, // 10 minutes server refresh
      expire: 3600, // 1 hour max stale
    },
    // List pages - moderate update frequency
    lists: {
      stale: 600, // 10 minutes client cache
      revalidate: 1800, // 30 minutes server refresh
      expire: 86400, // 24 hours max stale
    },
    // Static content - rarely changes
    static: {
      stale: 3600, // 1 hour client cache
      revalidate: 86400, // 24 hours server refresh
      expire: 604800, // 7 days max stale
    },
    // Articles - SEO content
    articles: {
      stale: 1800, // 30 minutes client cache
      revalidate: 3600, // 1 hour server refresh
      expire: 86400, // 24 hours max stale
    },
  },

  // React Compiler (requires babel-plugin-react-compiler)
  // Disabled until stable release - enable with: bun add -D babel-plugin-react-compiler
  // reactCompiler: true,

  // Turbopack configuration (now at top level in v16)
  turbopack: {
    // Enable persistent file system cache for faster rebuilds
  },

  // Image optimization (updated defaults for v16)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 14400, // 4 hours (new default in v16)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.kasinolista.fi',
      },
      // Sanity CDN for CMS images
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Experimental features for casino use case
  experimental: {
    // Enable Turbopack file system caching for development
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
