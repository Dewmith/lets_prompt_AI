# lets_prompt_AI

`lets_prompt_AI` is a polished public prompt library built with Next.js, TypeScript, and Tailwind CSS. It is designed for normal end users who want to quickly browse, search, filter, open, and copy useful AI prompts for everyday life.

## Features

- Landing page with a premium hero, visible search, featured categories, and featured prompts
- Browse page with search, category filters, and sort controls
- Prompt detail pages with full prompt text, usage guidance, tags, related prompts, and one-click copy
- Categories index plus dedicated category pages
- About page explaining the project and curation approach
- Local JSON content system for easy prompt updates
- Static generation for detail pages, categories, sitemap, and robots where appropriate

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Local JSON content in `src/content/prompts.json`

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

## Editing Prompts

The main prompt library lives in:

`src/content/prompts.json`

Each prompt uses this shape:

```json
{
  "id": "example-id",
  "title": "Prompt title",
  "category": "Productivity",
  "description": "Short card description",
  "tags": ["tag one", "tag two"],
  "prompt": "Full prompt text",
  "whenToUse": "When this prompt is useful",
  "exampleUse": "Optional example usage",
  "featured": true,
  "createdAt": "2026-04-10"
}
```

Category metadata like descriptions, slugs, and visual styling lives in:

`src/content/categories.ts`

## Project Structure

```text
lets_prompt_AI/
├─ package.json
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
├─ eslint.config.mjs
├─ src/
│  ├─ app/
│  │  ├─ about/page.tsx
│  │  ├─ categories/
│  │  │  ├─ [slug]/page.tsx
│  │  │  └─ page.tsx
│  │  ├─ prompts/
│  │  │  ├─ [id]/page.tsx
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ icon.svg
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  ├─ robots.ts
│  │  └─ sitemap.ts
│  ├─ components/
│  │  ├─ browse/prompt-browser.tsx
│  │  ├─ layout/
│  │  │  ├─ site-footer.tsx
│  │  │  └─ site-header.tsx
│  │  ├─ prompt/
│  │  │  ├─ category-badge.tsx
│  │  │  ├─ copy-button.tsx
│  │  │  └─ prompt-card.tsx
│  │  ├─ category-card.tsx
│  │  └─ section-heading.tsx
│  ├─ content/
│  │  ├─ categories.ts
│  │  └─ prompts.json
│  ├─ lib/
│  │  ├─ format.ts
│  │  ├─ prompts.ts
│  │  └─ site.ts
│  └─ types/
│     └─ prompt.ts
└─ public/
```

## Notes

- Update `src/lib/site.ts` with your real production URL before deployment.
- The prompt detail and category routes are statically generated from the local content.
- The browse page stays flexible for search and filtering while the content itself remains simple to maintain.
