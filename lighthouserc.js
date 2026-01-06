module.exports = {
  ci: {
    collect: {
      startServerCommand: 'bun run start',
      startServerReadyPattern: 'Ready in',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/uudet-kasinot',
        'http://localhost:3000/bonukset',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        // Emulate a typical desktop environment
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
    assert: {
      // Performance budgets - fail CI if these thresholds are not met
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
      },
    },
    upload: {
      // Upload to temporary public storage (free, 7 day retention)
      target: 'temporary-public-storage',
    },
  },
};
