# AGENTS.md — global conventions

Personal, framework-agnostic instructions for AI coding tools, applied across all
my projects. This is the **canonical** copy: it is symlinked to `~/AGENTS.md` and
`~/CLAUDE.md`, and synced into individual project repos. A project's own
`AGENTS.md` **adds to** these rules — it does not replace them.

## Core Technologies

- **Backend**: Node
- **Frontend**: Vite, Vue or React, TypeScript
- **Styling**: SCSS/Sass with custom helper classes
- **Database**: Firebase or SQL Lite
- **Testing**: Vitest (JavaScript), vue-test-utils, Playwright

## Essential Commands

### Development

```bash
npm start                    # Start Vite development server
```

### Testing

```bash
npm run test                 # Run all unit tests
npm run test nameOfTest      # Run specific test
npm run coverage             # Generate coverage report
npm run test:watch           # Watch mode
```

### Code Quality

```bash
# Linting
npm run lint                   # Run all linters (code + styles)
npm run type-check             # TypeScript type checking
```

### Build & Deployment

```bash
npm run build                  # Build production assets with type checking
npm run build-only             # Build without type checking
npm run deploy                 # Deploys project to hosting server
```

## Strict Execution Constraints (Anti-Skimming)

- **No Skimming:** You must perform a full, line-by-line analysis of all provided files. Do not summarize, truncate, or skim the code.
- **No Assumptions:** You are strictly forbidden from making assumptions about the contents of unread functions or classes.
- **No Placeholders:** When referencing code to build context, do not use lazy placeholders like `// ...` or `[Code continues here]`. Treat all code as the critical path.
- **Sequential Processing:** If provided with multiple files, analyze them one at a time. Do not move on to the next file until you have fully mapped the inputs, outputs, and dependencies of the current one.

## Global Coding Conventions (apply to EVERY project)

- **Indent with tabs, not spaces.** Use tabs for indentation in all code — JS/JSX/TS, SCSS/CSS, JSON, HTML, shell, etc. Exceptions only where tabs are invalid or structurally meaningful: **YAML** (spaces required), **Markdown** (nested lists / code-block indentation are structural), and **generated/vendored files** (e.g. `package-lock.json` — leave as the tool manages them). When creating a new file, indent with tabs from the very first line.
- **Pin dependency versions exactly.** When adding or updating an npm dependency, write the exact installed version with no range prefix — no `^`, no `~` (e.g. `"react": "19.2.6"`, not `"^19.2.6"`). This keeps installs reproducible. Don't "helpfully" add carets, and don't widen existing exact pins back into ranges.

### JavaScript/TypeScript

- **Avoid using `any` type** - always use specific types when the type is known or can be inferred
- Strict TypeScript typing
- Component-based SCSS organization
- Follow ESLint configuration rules
- Run test and lint after every edit
- Alphabetize properties, variables, computed properties, methods, etc.
- Use `async/await` with `try/catch/finally` for API calls
- Use template literals instead of string concatenation
- Remove `console.log` statements; use `console.error` for errors
- Try not to use abbreviations, for example, use `buttons` rather than `btn`, use `background` rather than `bg`, etc.
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) where applicable
- Avoid `innerHTML`; if HTML content is required, sanitize with DOMPurify using `ALLOWED_TAGS`/`ALLOWED_ATTR` constants

### CSS/Styling

- **Always use SCSS** for all styling needs
- Use shorthand CSS properties and put all properties in alphabetical order
- **Always reference SCSS variables from `**/_variables.scss`** for colors, sizes, spacing, and other design tokens
- **Use hexadecimal color values** instead of RGB/RGBA when possible (e.g., `#FFFFFF` instead of `rgb(255, 255, 255)`)
- **Use helper classes from `@ui-components/_helpers.scss`**
- **Use/reference mixin functions from `@ui-components/_mixins.scss`**
- Organize styles in component-specific SCSS files
- Follow BEM naming conventions where appropriate
- Use SCSS variables and mixins for consistency

## Testing Conventions and Instructions

- **Test setup**: Global test configuration in `tests/setup.ts`
- Window APIs (`location`, `history`, `open`, `scrollTo`) are mocked
- Use `mount` only, never `shallowMount`
- Target elements with `data-test` attributes, not class names or IDs
- Avoid `any` types; avoid magic numbers (use constants instead; add `// eslint-disable no-magic-numbers` if unavoidable)
- Arrays and objects must be in alphabetical order
- Fix all test and type errors; add or update tests for every change

### JavaScript tests

- Use Vitest, place test files next to source files with `.spec.ts/x` or `.test.js/x` (depending on project setup) extension
- Make sure any arrays and objects are listed in alphabetical order
- Avoid using `any` when adding types to elements
- Use data-ui attribute when targeting elements in the specs; try to avoid using class names and IDs
- Follow the patterns already established in the application
- Fix any test or type errors until the whole suite is green
- Add or update tests for the code you change, even if nobody asked

## Git Commits

- Use conventional commit messages
- Ensure all linters pass before pushing
