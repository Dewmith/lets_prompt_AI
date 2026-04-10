import type { Metadata } from "next";
import { PromptBrowser } from "@/components/browse/prompt-browser";
import { getAllPrompts, getCategoriesWithCounts, getCategoryNameFromSlug } from "@/lib/prompts";

type SearchParams = Promise<{
  query?: string | string[];
  category?: string | string[];
  sort?: string | string[];
}>;

export const metadata: Metadata = {
  title: "Browse Prompts",
  description: "Browse, search, filter, and copy curated AI prompts for work, writing, learning, travel, finance, and more.",
};

export default async function PromptsPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialQuery =
    typeof resolvedSearchParams.query === "string" ? resolvedSearchParams.query : "";
  const categorySlug =
    typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const initialCategory = categorySlug ? getCategoryNameFromSlug(categorySlug) : undefined;
  const initialSort =
    typeof resolvedSearchParams.sort === "string" &&
    ["featured", "newest", "title"].includes(resolvedSearchParams.sort)
      ? (resolvedSearchParams.sort as "featured" | "newest" | "title")
      : "featured";

  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/75">Browse Prompts</p>
        <h1 className="mt-4 text-5xl text-slate-950 sm:text-6xl">Search the full prompt library.</h1>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          Filter by category, search by title or tags, and open any card for the full prompt, usage guidance, and
          one-click copy.
        </p>
      </div>

      <div className="mt-12">
        <PromptBrowser
          prompts={getAllPrompts()}
          categories={getCategoriesWithCounts()}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
          initialSort={initialSort}
        />
      </div>
    </section>
  );
}

