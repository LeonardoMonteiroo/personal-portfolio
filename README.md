# Leonardo Monteiro — portfolio

Personal site of Leonardo Monteiro, Full Stack Developer & Tech Lead.
Live at <https://leonardomonteiroo.github.io/personal-portfolio/> (English) and `/pt/` (Portuguese).

The site is built as a "career observability" dashboard: headline numbers as stat panels,
the career as a distributed trace with a time-range picker, case studies as runbooks and the
long-form bio as log lines.

## Stack

- [Astro](https://astro.build) with TypeScript, static output, no UI framework on the client
- Vanilla TypeScript islands for the trace, command palette (⌘K / Ctrl+K), theme and count-ups
- Self-hosted Inter and JetBrains Mono (`@fontsource-variable`)
- Vitest for unit tests, Playwright + axe for end-to-end, SEO and accessibility tests
- GitHub Actions deploying to GitHub Pages, with a daily rebuild for GitHub repository data

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at `http://localhost:4321/personal-portfolio/` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves `dist/` |
| `npm run check` | Type-checks `.astro` and `.ts` files |
| `npm test` | Unit tests (trace math, formatters, "every number comes from the résumé") |
| `npm run test:e2e` | Playwright against the production build: SEO tags, links, interactions, axe in both themes, desktop and mobile |
| `npm run sync:career` | Copies `pt/resume.json` and `en/resume.json` from the sibling `career` repo into `src/data/` |
| `npm run og` | Regenerates the Open Graph images, favicon and touch icon |

## Where content lives

- `src/data/resume.{en,pt}.json`: the résumé (JSON Resume). Do not edit here; edit the `career` repo and run `npm run sync:career`.
- `src/data/cases.ts`: the four case studies, in both languages.
- `src/data/projects.ts`: public repositories shown in Projects; live metadata comes from the GitHub API at build time.
- `src/i18n/ui.ts`: interface copy, SEO titles and descriptions, headline stats, and `site.showAvailability` (the "open to opportunities" badge).
- `public/cv/`: résumé PDFs linked from the site.

## Deploy

Pushing to `main` runs type-check, unit tests, build and end-to-end tests, then deploys to
GitHub Pages. In the repository settings, Pages must use **GitHub Actions** as its source.
