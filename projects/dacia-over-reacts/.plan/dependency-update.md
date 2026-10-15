# Dependency update — dacia-over-reacts (August 2026)

Update every dependency to latest **except the React 18 family**, then supersede the
9 open Dependabot PRs. Baseline before starting: 79 tests / 15 files green, build OK,
`npm audit` = 20 vulnerabilities (1 critical Vitest RCE).

Status: **complete**. Final state is 79/79 unit + 21/21 e2e green, `tsc` clean,
lint clean, build clean, `npm audit` down to 2 high (see "Accepted risk" below).

## Hard constraints discovered

These are not preferences — they cap what "latest" can mean:

1. **TypeScript cannot go to 7.0.2.** `@typescript-eslint@8.66.0` (the current
   `latest`; no v9 exists yet) declares `typescript: ">=4.8.4 <6.1.0"`. Highest
   compatible stable is **6.0.3**. Going to TS 7 would break linting entirely.
2. **`eslint-plugin-unicorn@73` requires `eslint >=10.4`** — so unicorn 73 forces
   the ESLint 10 major. They move together or not at all.
3. ~~ESLint 10 removes the deprecated core formatting rules.~~ **Wrong.** See step 3.
4. **`postcss-preset-env@11` is ESM-only** (`type: module`, `.mjs` export only) but
   `postcss.config.js` is CommonJS `require()`. Config must become ESM.
5. **`@testing-library/react@16` moved `@testing-library/dom` to a peer dependency** —
   it must be added explicitly to devDependencies.
6. **React held at 18.2.0** per decision: `react`, `react-dom`, `@types/react`,
   `@types/react-dom` stay. `react-redux@9` is still safe (peer allows `^18 || ^19`).

## Steps

### 1. package.json version bumps

Pin exact (no `^`/`~`), keep alphabetical. Hold the React 4. Add `@testing-library/dom`.
**Done.**

### 2. Regenerate lockfile

Delete `node_modules` + `package-lock.json`, fresh `npm install`. This is what actually
makes the Dependabot lockfile conflicts moot. **Done** — clean install, no peer conflicts.

### 3. Config migrations

- `postcss.config.js` → `postcss.config.mjs` (ESM). **Done.**
- `eslint.config.mjs`: **no change needed.** Constraint 3 above was wrong — ESLint 10.8
  still ships the deprecated core formatting rules. Verified via `eslint --print-config`:
  `key-spacing`, `keyword-spacing`, `max-len`, `no-extra-parens`, `no-extra-semi`,
  `no-multi-spaces`, `no-trailing-spaces`, `sort-vars` and
  `@typescript-eslint/sort-type-constituents` all still resolve to active severity 2.
- `tsconfig.json` / `tsconfig.node.json`: TS 6.0 hard-errors on deprecated options.
  Dropped `baseUrl` (it had no `paths`, and no `@/` import exists in src or tests) and
  moved `moduleResolution` `Node` → `bundler`, which is correct for Vite anyway.

### 4. Verify — nothing is done until all of these are green

- `npx tsc --noEmit` (no `type-check` script exists in this project) — **pass**
- `npm run lint` — **pass**, no source files changed by `--fix`
- `npm run test` — **79/79 pass**
- `npm run build` — **pass**
- `npm run e2e` — **21/21 pass** (needed `npx playwright install chromium` for 1.62)

### 5. Supersede the Dependabot PRs

Close #8, #11, #13, #14, #15, #16, #17, #18, #19 with a comment pointing at this branch.
All 9 target `projects/dacia-over-reacts` and are branched off a stale master whose
`package.json` still had `semantic-ui-css` and `vite 4.4.9`.

## Rejected: `"type": "module"`

Vitest 4 warns that `vitest.config.ts` uses ESM syntax while loaded as CommonJS, and
suggests `"type": "module"`. Tried it — unit tests and build stayed green, but it
**broke the entire e2e suite**: Playwright loads `tests/e2e/*.spec.ts` through Node's
ESM loader, and those specs do `import content from '../../src/media/json/static.en-us.json'`,
which under ESM requires an explicit `with { type: 'json' }` attribute. "No tests found."
Stale committed `src/**/dist/*.js` files using `require()` would break under it too.

The warning is cosmetic and concerns a *future* Vite major, so it is not worth a real
regression. Reverted. Revisit only alongside migrating the JSON imports.

**Update (2026-10-15): done.** Added `"type": "module"` together with
`with { type: 'json' }` on every JSON import in `src/` and `tests/`. The stale `dist/*.js`
files are gone. Unit 79/79, build, lint, tsc, and e2e 21/21 all pass, and the Vite
`configLoader: 'native'` warning is gone.

## Accepted risk: react-router 7.18.2

`npm audit` still reports 2 high, both from one advisory: GHSA-qwww-vcr4-c8h2, RSC-mode
CSRF bypass, affecting `react-router` `7.12.0 - 8.2.0`. There is **no fixed release** —
8.x is unpublished and 7.18.2 is the latest.

Downgrading to 7.11.0 (the only non-affected line) was tried and is **strictly worse**:
it trades this one RSC-only advisory for **14** advisories spanning `6.0.0 - 7.17.0`,
including XSS via `<Link>`/`useNavigate`, open redirects, DoS and an RCE — all of which
hit ordinary SPA usage. This app is a Vite SPA and does not use RSC mode, so the
remaining advisory is not reachable. Staying on 7.18.2.

## Version targets

| Package | From | To | Note |
| --- | --- | --- | --- |
| typescript | 5.8.2 | 6.0.3 | capped by typescript-eslint |
| vite | 5.4.2 | 8.2.1 | major x3, now rolldown-based |
| vitest | 1.1.3 | 4.1.10 | fixes critical RCE |
| @vitejs/plugin-react | 4.3.1 | 6.0.5 | requires vite ^8 |
| eslint | 9.39.4 | 10.8.0 | |
| @eslint/js | 9.39.4 | 10.0.1 | |
| eslint-plugin-unicorn | 64.0.0 | 73.0.0 | forces eslint 10 |
| @reduxjs/toolkit | 1.9.7 | 2.12.0 | brings redux 5 |
| react-redux | 8.1.2 | 9.3.0 | needs redux ^5 |
| @testing-library/react | 14.0.0 | 16.3.2 | new peer: /dom |
| @testing-library/jest-dom | 6.3.0 | 7.0.0 | |
| jsdom | 28.1.0 | 30.0.1 | |
| postcss-preset-env | 9.6.0 | 11.3.2 | ESM-only |
| cssnano | 6.1.2 | 8.0.4 | |
| @playwright/test | 1.50.1 | 1.62.1 | needs browser reinstall |
| react-router-dom | 7.0.2 | 7.18.2 | see "Accepted risk" |
| react, react-dom | 18.2.0 | **held** | per decision |
| @types/react, @types/react-dom | 18.x | **held** | per decision |
