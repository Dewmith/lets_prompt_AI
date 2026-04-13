# lets_prompt_AI

`lets_prompt_AI` is a polished public prompt library built with Next.js, TypeScript, and Tailwind CSS. It is designed for normal end users who want to quickly browse, search, filter, open, and copy useful AI prompts for everyday life.

Live website:

`https://dewmith.github.io/lets_prompt_AI/`

## Features

- Landing page with a premium hero, visible search, featured categories, and featured prompts
- Browse page with search, category filters, and sort controls
- Prompt detail pages with full prompt text, usage guidance, tags, related prompts, and one-click copy
- Categories index plus dedicated category pages
- About page explaining the project and curation approach
- Markdown-based prompt content that is safe for long prompt bodies
- Static export for GitHub Pages

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Markdown prompt files with YAML frontmatter in `src/content/prompts/`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm run lint
```

## Deploy To GitHub Pages

This repo includes a GitHub Pages workflow in:

`.github/workflows/deploy-pages.yml`

Current deployed site:

`https://dewmith.github.io/lets_prompt_AI/`

How it works:

- builds the app as a static export with `output: "export"`
- uploads the generated `out/` folder to GitHub Pages
- uses Node 24 in the workflow
- automatically applies the correct repo base path for project Pages deployments

To deploy:

1. Push this repo to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` or run the workflow manually.

If the live site shows the README instead of the app, GitHub Pages is likely serving the repository branch instead of the GitHub Actions artifact. Recheck `Settings -> Pages -> Source`.

## Editing Prompts

The prompt library lives in:

`src/content/prompts/`

Each prompt is one `.md` file. The file name becomes the prompt URL id, so `portrait-image-enhancer.md` becomes:

`/prompts/portrait-image-enhancer/`

Use this format:

```md
---
title: "Prompt title"
category: "Productivity"
description: "Short card description"
tags: ["tag one", "tag two"]
whenToUse: "When this prompt is useful"
exampleUse: "Optional example usage"
featured: true
createdAt: "2026-04-10"
---

Paste the full prompt body here.

Long prompts are safe here. You can use quotes, blank lines, colons, camera settings, and negative instructions without escaping JSON strings.
```

Category metadata like descriptions, slugs, and visual styling lives in:

`src/content/categories.ts`

To add a new prompt:

1. Create a new `.md` file in `src/content/prompts/`.
2. Add the frontmatter block at the top.
3. Paste the full prompt body below the frontmatter.
4. Commit and push.

The static site will rebuild on GitHub Pages automatically.

## Project Structure

```text
lets_prompt_AI/
|-- package.json
|-- next.config.ts
|-- postcss.config.mjs
|-- tsconfig.json
|-- eslint.config.mjs
|-- .github/
|   `-- workflows/deploy-pages.yml
|-- src/
|   |-- app/
|   |   |-- about/page.tsx
|   |   |-- categories/
|   |   |   |-- [slug]/page.tsx
|   |   |   `-- page.tsx
|   |   |-- prompts/
|   |   |   |-- [id]/page.tsx
|   |   |   `-- page.tsx
|   |   |-- globals.css
|   |   |-- icon.svg
|   |   |-- layout.tsx
|   |   |-- not-found.tsx
|   |   |-- page.tsx
|   |   |-- robots.ts
|   |   `-- sitemap.ts
|   |-- components/
|   |   |-- browse/prompt-browser.tsx
|   |   |-- layout/
|   |   |   |-- site-footer.tsx
|   |   |   `-- site-header.tsx
|   |   |-- prompt/
|   |   |   |-- category-badge.tsx
|   |   |   |-- copy-button.tsx
|   |   |   `-- prompt-card.tsx
|   |   |-- category-card.tsx
|   |   `-- section-heading.tsx
|   |-- content/
|   |   |-- categories.ts
|   |   `-- prompts/
|   |       `-- *.md
|   |-- lib/
|   |   |-- format.ts
|   |   |-- prompts.ts
|   |   `-- site.ts
|   `-- types/
|       `-- prompt.ts
`-- public/
```

## Notes

- `src/lib/site.ts` automatically derives the GitHub Pages URL during CI, but you can still override it with `NEXT_PUBLIC_SITE_URL` if needed.
- Prompt detail and category routes are statically generated from the local Markdown content.
- List pages use prompt summaries only, so very long prompt bodies stay on prompt detail pages instead of being embedded everywhere.
