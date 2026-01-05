#!/usr/bin/env node
/**
 * SEO Status Reporter
 * Provides structured JSON output for Claude Code
 *
 * Usage: node scripts/seo-status.js
 * Or: bun run seo:status
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

async function getSEOStatus() {
  const status = {
    timestamp: new Date().toISOString(),
    overall: 'unknown',
    categories: {
      metaTags: { status: 'pending', score: 0 },
      structuredData: { status: 'pending', score: 0 },
      headings: { status: 'pending', score: 0 },
      technicalSEO: { status: 'pending', score: 0 },
      internalLinks: { status: 'pending', score: 0 },
      finnishEEAT: { status: 'pending', score: 0 },
    },
    criticalIssues: [],
    recommendations: [],
  };

  // Check if test results exist
  const resultsPath = path.join(process.cwd(), 'test-results/results.json');

  if (fs.existsSync(resultsPath)) {
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    // Parse results by category
    const seoResults = results.suites?.filter((s) => s.file?.includes('/seo/')) || [];

    let totalPassed = 0;
    let totalFailed = 0;

    // Map file names to category keys
    const categoryMap = {
      'meta-tags': 'metaTags',
      'structured-data': 'structuredData',
      headings: 'headings',
      technical: 'technicalSEO',
      'internal-links': 'internalLinks',
      'finnish-eeat': 'finnishEEAT',
    };

    for (const suite of seoResults) {
      const fileName = suite.file?.split('/').pop()?.replace('.spec.ts', '');
      const category = categoryMap[fileName];
      const passed = suite.specs?.filter((s) => s.ok).length || 0;
      const failed = suite.specs?.filter((s) => !s.ok).length || 0;

      totalPassed += passed;
      totalFailed += failed;

      if (category && status.categories[category]) {
        status.categories[category] = {
          status: failed === 0 ? 'passing' : 'failing',
          score: passed / (passed + failed) || 0,
          passed,
          failed,
        };

        // Add critical issues
        if (failed > 0) {
          const failedSpecs = suite.specs?.filter((s) => !s.ok) || [];
          for (const spec of failedSpecs) {
            status.criticalIssues.push({
              category: fileName,
              test: spec.title,
              severity:
                fileName === 'meta-tags' || fileName === 'structured-data' ? 'critical' : 'high',
            });
          }
        }
      }
    }

    // Calculate overall score
    const overallScore = totalPassed / (totalPassed + totalFailed) || 0;
    status.overall =
      overallScore >= 0.95
        ? 'excellent'
        : overallScore >= 0.8
          ? 'good'
          : overallScore >= 0.6
            ? 'needs-work'
            : 'critical';
    status.overallScore = overallScore;
  } else {
    status.overall = 'not-tested';
    status.recommendations.push('Run SEO tests: bun run test:seo');
  }

  // Check for missing test files
  const requiredTests = [
    'tests/e2e/seo/meta-tags.spec.ts',
    'tests/e2e/seo/structured-data.spec.ts',
    'tests/e2e/seo/headings.spec.ts',
    'tests/e2e/seo/technical.spec.ts',
    'tests/e2e/seo/internal-links.spec.ts',
    'tests/e2e/seo/finnish-eeat.spec.ts',
  ];

  for (const testFile of requiredTests) {
    const fullPath = path.join(process.cwd(), testFile);
    if (!fs.existsSync(fullPath)) {
      status.recommendations.push(`Missing: ${testFile}`);
    }
  }

  return status;
}

getSEOStatus().then((status) => {
  console.log(JSON.stringify(status, null, 2));
});
