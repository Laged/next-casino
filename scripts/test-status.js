#!/usr/bin/env node
/**
 * Test Status Reporter
 * Provides structured output for Claude Code to parse
 *
 * Usage: bun run test:status
 * Output: JSON with test results and coverage summary
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

async function getTestStatus() {
  const status = {
    timestamp: new Date().toISOString(),
    overall: 'unknown',
    tests: {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    },
    categories: {},
    lastRun: null,
    recommendations: [],
  };

  // Check if test results exist
  const resultsPath = path.join(process.cwd(), 'test-results', 'results.json');

  if (fs.existsSync(resultsPath)) {
    try {
      const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

      status.lastRun = results.stats?.startTime || null;
      status.tests.total = results.stats?.expected || 0;
      status.tests.passed = results.stats?.expected - (results.stats?.unexpected || 0);
      status.tests.failed = results.stats?.unexpected || 0;
      status.tests.skipped = results.stats?.skipped || 0;

      // Calculate overall status
      if (status.tests.failed > 0) {
        status.overall = 'failing';
      } else if (status.tests.passed === status.tests.total) {
        status.overall = 'passing';
      } else {
        status.overall = 'partial';
      }

      // Group by category
      if (results.suites) {
        for (const suite of results.suites) {
          const category = suite.file?.split('/')[2] || 'unknown';
          if (!status.categories[category]) {
            status.categories[category] = { passed: 0, failed: 0 };
          }
          // Count specs
          for (const spec of suite.specs || []) {
            if (spec.ok) {
              status.categories[category].passed++;
            } else {
              status.categories[category].failed++;
            }
          }
        }
      }
    } catch (e) {
      status.overall = 'error';
      status.recommendations.push(`Failed to parse test results: ${e.message}`);
    }
  } else {
    status.overall = 'no-results';
    status.recommendations.push('Run tests first: bun run test');
  }

  // Check test file coverage
  const testFiles = {
    smoke: fs.existsSync('tests/smoke/smoke.spec.ts'),
    pages: fs.existsSync('tests/e2e/pages/home.spec.ts'),
    components: fs.existsSync('tests/e2e/components/navbar.spec.ts'),
    seo: fs.existsSync('tests/e2e/seo/metadata.spec.ts'),
    a11y: fs.existsSync('tests/e2e/accessibility/a11y.spec.ts'),
  };

  status.coverage = testFiles;

  // Add recommendations
  if (!testFiles.smoke) {
    status.recommendations.push('Missing smoke tests - add tests/smoke/smoke.spec.ts');
  }
  if (!testFiles.seo) {
    status.recommendations.push('Missing SEO tests - critical for casino affiliate site');
  }

  return status;
}

// Run and output
getTestStatus().then((status) => {
  console.log(JSON.stringify(status, null, 2));
});
