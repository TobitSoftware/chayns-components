Purpose

A short, practical guide for Copilot/Copilot-like agents working in this repository. Includes how to
build, test and lint, the high-level architecture, and repository-specific conventions that matter
when making edits, running tools, or generating code.

1. Build, test and lint commands

Top-level (monorepo):

- Install deps: npm install
- Build all packages: npm run lerna:build # runs `lerna run build`
- Clean: npm run lerna:clean
- Prepare husky (pre-commit hooks): npm run prepare
- Version (creates typed build step before lerna version): npm run lerna:version
- Storybook (dev): npm run storybook
- Storybook (build): npm run build:storybook

Run per-package (recommended when working on a single package):

- cd packages/<package-folder>
- Build package: npm run build
- Run package tests: npm test (many packages use vitest; if nothing runs, inspect package.json for
  test config)
- Run a single package via lerna: lerna run test --scope @chayns-components/<package-name>

Notes about tests:

- Some packages use Vitest (example: @chayns-components/format). Others only define a test directory
  ("**tests**"). If a package's package.json sets "test": "**tests**" then run
  `cd packages/<pkg> && npm test` to confirm the runner.

Linting and formatting:

- Prettier (auto-format on commit via lint-staged). To run locally:
    - npx prettier --write "packages/\*_/_.{ts,tsx,js,jsx,json,md,css,scss}"
- ESLint: there is no top-level lint script; run manually when needed:
    - npx eslint "packages/**/src/**/\*.{ts,tsx}" --fix
- organize-imports-cli is available for import ordering: npx organize-imports-cli
  "packages/**/src/**/\*.{ts,tsx}" --write

2. High-level architecture

- Monorepo managed with Lerna; packages live under packages/\*.
- Each package typically follows this layout: src/ (TSX/TS), stories/, docs/, lib/ (build output),
  package.json.
- Build outputs: lib/cjs and lib/esm plus lib/types (d.ts files). Prepublish only builds artifacts.
- Shared toolchain: TypeScript + Babel (with babel-plugin-react-compiler), Storybook for component
  previews, styled-components for styling.
- CI / release flow: preversion builds types and artifacts; lerna:version is used for releases.
- AI usage files: many packages include AGENTS.md for AI assistant guidance. These are important
  when using sub-agents or automated documentation scripts.

3. Key conventions and patterns (repo-specific)

- React Compiler (babel-plugin-react-compiler) in annotation mode: the codebase relies on automatic
  memoization and render optimizations provided by the compiler. Therefore:
    - Do not introduce manual useMemo/useCallback to micro-optimize render paths unless there is a
      real dependency need (e.g., subscriptions). The compiler handles typical memoization patterns.
    - Prefer keeping component code simple and declarative; let the compiler optimize render
      performance.

- Package build scripts:
    - build: composes build:cjs, build:esm and build:types. build:types usually runs tsc to emit
      d.ts files.
    - prepublishOnly ensures published artifacts are built.

- Storybook is the canonical UI playground for components. Use stories/ files for visual checks and
  local development.

- Type/exports conventions:
    - Each package exposes cjs (lib/cjs) and esm (lib/esm) bundles and declares types in
      lib/types/index.d.ts. Respect these when changing exports.

- AGENTS.md and automated usage docs:
    - The repo contains scripts to generate docs and AI usage files (scripts/generate-docs.ts,
      scripts/generate-ai-usage.ts). AGENTS.md files are maintained and committed by the generate
      scripts and updated automatically by commit hooks in the CI scripts.

- Formatting and pre-commit hooks:
    - Prettier + lint-staged are configured at the root; run npm run prepare to install husky.

- Accessibility and cross-package consistency:
    - Shared utilities and hooks live in packages and are consumed by other packages. When changing
      public APIs, update dependent packages or add migration notes in PRs.

4. Useful places to look (quick map)

- Root scripts: package.json (top-level scripts and devDependencies)
- Lerna config: lerna.json
- Package-level config: packages/<pkg>/package.json (scripts, devDeps, test runner)
- Docs: packages/<pkg>/docs/ and root docs/ (DEVELOPMENT.md)
- AI helper files: packages/\*/AGENTS.md (used by internal tooling and sub-agents)
- Scripts: scripts/\* (generate-docs, generate-ai-usage)

5. Common pitfalls for automation agents

- Derived state: many components use derived values (formatted text, parsed numbers). Avoid
  introducing redundant state — compute derived values with useMemo or in render to prevent
  stale/duplicated state and ESLint react-hooks warnings.
- Refs vs state: do not store DOM nodes in state. Use refs (useRef) for elements to avoid ESLint
  immutability rule violations.
- Effects that call setState synchronously: defer state updates (queueMicrotask or setTimeout 0) or
  rely on existing visibility listeners; avoid direct setState inside effect bodies when it can
  cause cascading renders.
- Running async functions inside timer callbacks: wrap async calls in non-async callbacks and use
  void to swallow returned Promises for setTimeout usage.

6. AI / assistant integration notes

- Check for AGENTS.md files inside packages before making changes that affect usage docs; the repo
  has a workflow to update these files automatically.
- There is no CLAUDE.md at the repo root; if an assistant needs to follow Claude/OpenCode
  conventions, consult AGENTS.md files per package.

MCP Servers

Would you like Copilot to configure any MCP servers (Playwright, Storybook, etc.) for this repo? If
yes, specify which (recommended: Storybook/Playwright for UI E2E if you want automated UI testing).
If not, this will be skipped.

Summary

Created a focused Copilot instructions file with build/test/lint commands, the monorepo
architecture, and repo-specific conventions (React Compiler, AGENTS.md usage, build & publish flow).
Would you like adjustments, or should coverage be expanded for package-level examples or CI/release
details?
