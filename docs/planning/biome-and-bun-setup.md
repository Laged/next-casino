# Biome & Bun Setup Plan

## Project Context

**Project**: Finnish Casino Recommendation Website (Kasinolista)
**Current**: npm + ESLint + Next.js 16.1.1
**Goal**: Migrate to Bun + Biome for faster development and stricter linting that Claude Code can leverage

---

## Why This Migration?

### Bun Benefits (Package Manager)
- **11-30x faster** package installation vs npm
- Creates `bun.lockb` (binary lockfile) for speed
- Full npm compatibility
- Native TypeScript support
- Vercel auto-detects bun.lockb and uses bun install

### Biome Benefits (Linter + Formatter)
- **10-40x faster** than ESLint + Prettier
- Single tool for linting AND formatting
- Zero config needed for TypeScript
- Built-in import sorting
- Strict rules help Claude Code catch issues early
- LSP support for real-time feedback

### Next.js 16 Changes
- `next lint` command removed
- `next build` no longer runs linting automatically
- Must use ESLint or Biome directly via scripts

---

## Current State

### package.json (Before)
```json
{
  "scripts": {
    "lint": "next lint",  // REMOVED in Next.js 16
    ...
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.3",
    "eslint": "^9.39.2",
    "eslint-config-next": "^16.1.1",
    ...
  }
}
```

---

## Migration Plan

### Phase 1: Install Bun

```bash
# Install Bun globally (if not installed)
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version

# Remove npm artifacts
rm -rf node_modules package-lock.json

# Install dependencies with Bun
bun install
```

**Result**: Creates `bun.lockb` file, ~11x faster installs

---

### Phase 2: Install Biome

```bash
# Install Biome
bun add -D @biomejs/biome

# Initialize Biome configuration
bunx @biomejs/biome init

# Remove ESLint (no longer needed)
bun remove eslint eslint-config-next @eslint/eslintrc
```

---

### Phase 3: Configure Biome

Create `biome.json` in project root:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": [
      "node_modules",
      ".next",
      "out",
      "build",
      "coverage",
      "playwright-report",
      "test-results",
      "*.min.js"
    ]
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineEnding": "lf",
    "lineWidth": 100,
    "attributePosition": "auto"
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noBannedTypes": "error",
        "noExtraBooleanCast": "error",
        "noMultipleSpacesInRegularExpressionLiterals": "error",
        "noUselessCatch": "error",
        "noUselessTypeConstraint": "error",
        "noWith": "error"
      },
      "correctness": {
        "noConstAssign": "error",
        "noConstantCondition": "warn",
        "noEmptyCharacterClassInRegex": "error",
        "noEmptyPattern": "error",
        "noGlobalObjectCalls": "error",
        "noInnerDeclarations": "error",
        "noInvalidConstructorSuper": "error",
        "noNewSymbol": "error",
        "noNonoctalDecimalEscape": "error",
        "noPrecisionLoss": "error",
        "noSelfAssign": "error",
        "noSetterReturn": "error",
        "noSwitchDeclarations": "error",
        "noUndeclaredVariables": "error",
        "noUnreachable": "error",
        "noUnreachableSuper": "error",
        "noUnsafeFinally": "error",
        "noUnsafeOptionalChaining": "error",
        "noUnusedLabels": "error",
        "noUnusedPrivateClassMembers": "error",
        "noUnusedVariables": "warn",
        "useArrayLiterals": "error",
        "useExhaustiveDependencies": "warn",
        "useHookAtTopLevel": "error",
        "useIsNan": "error",
        "useValidForDirection": "error",
        "useYield": "error"
      },
      "security": {
        "noDangerouslySetInnerHtml": "warn",
        "noGlobalEval": "error"
      },
      "style": {
        "noNamespace": "error",
        "noNegationElse": "warn",
        "useAsConstAssertion": "error",
        "useBlockStatements": "error",
        "useCollapsedElseIf": "error",
        "useConsistentArrayType": {
          "level": "error",
          "options": {
            "syntax": "shorthand"
          }
        },
        "useConst": "error",
        "useExportType": "error",
        "useImportType": "error",
        "useShorthandFunctionType": "error",
        "useSingleVarDeclarator": "error"
      },
      "suspicious": {
        "noAssignInExpressions": "error",
        "noAsyncPromiseExecutor": "error",
        "noCatchAssign": "error",
        "noClassAssign": "error",
        "noCompareNegZero": "error",
        "noConfusingLabels": "error",
        "noControlCharactersInRegex": "error",
        "noDebugger": "error",
        "noDoubleEquals": "error",
        "noDuplicateCase": "error",
        "noDuplicateClassMembers": "error",
        "noDuplicateJsxProps": "error",
        "noDuplicateObjectKeys": "error",
        "noDuplicateParameters": "error",
        "noEmptyBlockStatements": "warn",
        "noExplicitAny": "warn",
        "noFallthroughSwitchClause": "error",
        "noFunctionAssign": "error",
        "noGlobalAssign": "error",
        "noImportAssign": "error",
        "noMisleadingCharacterClass": "error",
        "noMisleadingInstantiator": "error",
        "noPrototypeBuiltins": "error",
        "noRedeclare": "error",
        "noShadowRestrictedNames": "error",
        "noUnsafeDeclarationMerging": "error",
        "noUnsafeNegation": "error",
        "useAwait": "warn",
        "useGetterReturn": "error",
        "useValidTypeof": "error"
      },
      "a11y": {
        "noAccessKey": "error",
        "noAriaUnsupportedElements": "error",
        "noBlankTarget": "error",
        "noDistractingElements": "error",
        "noHeaderScope": "error",
        "noInteractiveElementToNoninteractiveRole": "error",
        "noNoninteractiveElementToInteractiveRole": "error",
        "noNoninteractiveTabindex": "error",
        "noPositiveTabindex": "error",
        "noRedundantAlt": "error",
        "noRedundantRoles": "error",
        "useAltText": "error",
        "useAnchorContent": "error",
        "useAriaActivedescendantWithTabindex": "error",
        "useAriaPropsForRole": "error",
        "useButtonType": "error",
        "useHeadingContent": "error",
        "useHtmlLang": "error",
        "useIframeTitle": "error",
        "useKeyWithClickEvents": "error",
        "useKeyWithMouseEvents": "error",
        "useMediaCaption": "error",
        "useValidAnchor": "error",
        "useValidAriaProps": "error",
        "useValidAriaRole": "error",
        "useValidAriaValues": "error"
      }
    }
  },
  "javascript": {
    "formatter": {
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "trailingCommas": "es5",
      "semicolons": "always",
      "arrowParentheses": "always",
      "bracketSpacing": true,
      "bracketSameLine": false,
      "quoteStyle": "single",
      "attributePosition": "auto"
    },
    "globals": [
      "React"
    ]
  },
  "overrides": [
    {
      "include": ["*.config.ts", "*.config.js", "*.config.mjs"],
      "linter": {
        "rules": {
          "style": {
            "noDefaultExport": "off"
          }
        }
      }
    },
    {
      "include": ["src/app/**/*.tsx", "src/app/**/*.ts"],
      "linter": {
        "rules": {
          "style": {
            "noDefaultExport": "off"
          }
        }
      }
    },
    {
      "include": ["tests/**/*.ts", "tests/**/*.tsx"],
      "linter": {
        "rules": {
          "suspicious": {
            "noExplicitAny": "off"
          }
        }
      }
    }
  ]
}
```

---

### Phase 4: Update package.json

```json
{
  "name": "next-casino",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "typecheck": "tsc --noEmit",
    "check": "biome check --write . && tsc --noEmit",
    "test": "bun run playwright test",
    "test:smoke": "bun run playwright test tests/smoke/",
    "test:pages": "bun run playwright test tests/e2e/pages/",
    "test:components": "bun run playwright test tests/e2e/components/",
    "test:seo": "bun run playwright test tests/e2e/seo/",
    "test:ui": "bun run playwright test --ui",
    "test:headed": "bun run playwright test --headed",
    "test:debug": "bun run playwright test --debug",
    "test:report": "bun run playwright show-report",
    "ci": "biome ci . && tsc --noEmit && bun run test"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@tailwindcss/postcss": "^4.1.18",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^2.0.0",
    "next": "^16.1.1",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "tailwind-merge": "^3.4.0",
    "zod": "^4.3.5"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.11.0",
    "@biomejs/biome": "^1.9.4",
    "@playwright/test": "^1.57.0",
    "@types/bun": "^1.2.19",
    "@types/node": "^25.0.3",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "autoprefixer": "^10.4.23",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.18",
    "typescript": "^5.9.3"
  }
}
```

---

### Phase 5: VS Code Integration

Create/update `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "biomejs.biome"
  ]
}
```

---

## Claude Code Commands

### Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `bun install` |
| Add package | `bun add <package>` |
| Add dev dependency | `bun add -D <package>` |
| Remove package | `bun remove <package>` |
| Run dev server | `bun run dev` |
| Build | `bun run build` |
| Lint check | `bun run lint` |
| Lint + fix | `bun run lint:fix` |
| Format | `bun run format` |
| Type check | `bun run typecheck` |
| Full check (lint + types) | `bun run check` |
| Run tests | `bun run test` |
| CI validation | `bun run ci` |

### Biome CLI Direct Commands

```bash
# Check for errors (no fix)
bunx biome check .

# Check and auto-fix
bunx biome check --write .

# Format only
bunx biome format --write .

# Lint only
bunx biome lint .

# Check specific file
bunx biome check src/app/page.tsx

# Check with verbose output
bunx biome check --verbose .

# CI mode (strict, exits on error)
bunx biome ci .
```

---

## Migration Checklist

### Phase 1: Bun Setup
- [ ] Install Bun globally
- [ ] Remove `node_modules` and `package-lock.json`
- [ ] Run `bun install`
- [ ] Verify `bun.lockb` created
- [ ] Test: `bun run dev` works

### Phase 2: Biome Setup
- [ ] Install `@biomejs/biome`
- [ ] Remove ESLint packages
- [ ] Create `biome.json`
- [ ] Update `package.json` scripts

### Phase 3: VS Code Setup
- [ ] Install Biome extension
- [ ] Create/update `.vscode/settings.json`
- [ ] Create `.vscode/extensions.json`
- [ ] Verify format-on-save works

### Phase 4: Verification
- [ ] Run `bun run lint` - no errors
- [ ] Run `bun run typecheck` - no errors
- [ ] Run `bun run build` - succeeds
- [ ] Run `bun run test` - passes

### Phase 5: CI/CD Update
- [ ] Update GitHub Actions to use Bun
- [ ] Add `bun run ci` to pipeline

---

## GitHub Actions Update

Create/update `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Lint & Format Check
        run: bunx biome ci .

      - name: Type Check
        run: bun run typecheck

      - name: Build
        run: bun run build

  test:
    runs-on: ubuntu-latest
    needs: check
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Install Playwright Browsers
        run: bunx playwright install --with-deps

      - name: Run tests
        run: bun run test

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Vercel Deployment

Vercel automatically detects `bun.lockb` and uses Bun. No configuration needed.

If manual override required, add to `vercel.json`:

```json
{
  "installCommand": "bun install",
  "buildCommand": "bun run build"
}
```

---

## Biome vs ESLint Rule Mapping

| ESLint Rule | Biome Equivalent |
|-------------|------------------|
| `@typescript-eslint/no-unused-vars` | `correctness/noUnusedVariables` |
| `@typescript-eslint/no-explicit-any` | `suspicious/noExplicitAny` |
| `react-hooks/exhaustive-deps` | `correctness/useExhaustiveDependencies` |
| `react-hooks/rules-of-hooks` | `correctness/useHookAtTopLevel` |
| `jsx-a11y/*` | `a11y/*` (comprehensive) |
| `no-console` | Not enforced (intentional) |
| `prefer-const` | `style/useConst` |
| `eqeqeq` | `suspicious/noDoubleEquals` |

---

## Troubleshooting

### "Cannot find module" after migration

```bash
# Clear Bun cache and reinstall
bun pm cache rm
rm -rf node_modules bun.lockb
bun install
```

### Biome conflicts with existing formatting

```bash
# Run format to fix all files
bun run format
```

### VS Code not recognizing Biome

1. Reload VS Code
2. Ensure Biome extension installed
3. Check `.vscode/settings.json` configuration

### Playwright tests fail with Bun

Playwright currently runs on Node.js, not Bun runtime. Use:
```bash
bun run playwright test  # Uses Node.js for Playwright
```

---

## References

- [Bun + Next.js Guide](https://bun.com/docs/guides/ecosystem/nextjs)
- [Biome Documentation](https://biomejs.dev/)
- [How to use Biome with Next.js](https://www.timsanteford.com/posts/how-to-use-biome-with-next-js-for-linting-and-formatting/)
- [Biome vs ESLint 2025](https://medium.com/@harryespant/biome-vs-eslint-the-ultimate-2025-showdown-for-javascript-developers-speed-features-and-3e5130be4a3c)
- [Migrating to BiomeJS](https://blog.appsignal.com/2025/05/07/migrating-a-javascript-project-from-prettier-and-eslint-to-biomejs.html)
- [Bun Package Manager Comparison 2025](https://benjamincrozat.com/bun-package-manager)

---

*Plan created: January 2026*
*Tools: Bun 1.x + Biome 1.9.x*
*Framework: Next.js 16.1.1*
