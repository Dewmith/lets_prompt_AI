"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { pluralize } from "@/lib/format";
import type { CategoryWithCount, PromptCategory, PromptSummary } from "@/types/prompt";
import { PromptCard } from "@/components/prompt/prompt-card";

type SortMode = "featured" | "newest" | "title";
type BrowserUrlState = {
  query: string;
  category: PromptCategory | undefined;
  sort: SortMode;
};

interface PromptBrowserProps {
  prompts: PromptSummary[];
  categories: CategoryWithCount[];
  initialQuery?: string;
  initialCategory?: PromptCategory;
  initialSort?: SortMode;
  hideCategoryFilters?: boolean;
  syncWithUrl?: boolean;
}

function sortPrompts(prompts: PromptSummary[], sortMode: SortMode) {
  const nextPrompts = [...prompts];

  if (sortMode === "title") {
    return nextPrompts.sort((left, right) => left.title.localeCompare(right.title));
  }

  if (sortMode === "featured") {
    return nextPrompts.sort((left, right) => {
      if (right.featured === left.featured) {
        return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
      }

      return Number(right.featured) - Number(left.featured);
    });
  }

  return nextPrompts.sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

function isSortMode(value: string | null): value is SortMode {
  return value === "featured" || value === "newest" || value === "title";
}

export function PromptBrowser({
  prompts,
  categories,
  initialQuery = "",
  initialCategory,
  initialSort = "featured",
  hideCategoryFilters = false,
  syncWithUrl = false,
}: PromptBrowserProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getCategoryFromSlug = (slug: string | null): PromptCategory | undefined =>
    categories.find((category) => category.slug === slug)?.name;

  const getSlugFromCategory = (categoryName: PromptCategory | undefined): string | undefined =>
    categories.find((category) => category.name === categoryName)?.slug;

  const getUrlState = (): BrowserUrlState => {
    if (!syncWithUrl) {
      return {
        query: initialQuery,
        category: initialCategory,
        sort: initialSort,
      };
    }

    const sortFromUrl = searchParams.get("sort");

    return {
      query: searchParams.get("query") ?? initialQuery,
      category: getCategoryFromSlug(searchParams.get("category")) ?? initialCategory,
      sort: isSortMode(sortFromUrl) ? sortFromUrl : initialSort,
    };
  };

  const [query, setQuery] = useState(() => getUrlState().query);
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | undefined>(
    () => getUrlState().category,
  );
  const [sortMode, setSortMode] = useState<SortMode>(() => getUrlState().sort);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  function syncStateToUrl(nextState: {
    query: string;
    category: PromptCategory | undefined;
    sort: SortMode;
  }) {
    if (!syncWithUrl) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextState.query.trim()) {
      nextParams.set("query", nextState.query.trim());
    } else {
      nextParams.delete("query");
    }

    const categorySlug = getSlugFromCategory(nextState.category);
    if (categorySlug) {
      nextParams.set("category", categorySlug);
    } else {
      nextParams.delete("category");
    }

    if (nextState.sort !== "featured") {
      nextParams.set("sort", nextState.sort);
    } else {
      nextParams.delete("sort");
    }

    const nextQueryString = nextParams.toString();
    const nextUrl = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    syncStateToUrl({
      query: nextQuery,
      category: selectedCategory,
      sort: sortMode,
    });
  }

  function updateCategory(nextCategory: PromptCategory | undefined) {
    setSelectedCategory(nextCategory);
    syncStateToUrl({
      query,
      category: nextCategory,
      sort: sortMode,
    });
  }

  function updateSort(nextSort: SortMode) {
    setSortMode(nextSort);
    syncStateToUrl({
      query,
      category: selectedCategory,
      sort: nextSort,
    });
  }

  const filteredPrompts = sortPrompts(
    prompts.filter((prompt) => {
      const matchesCategory = !selectedCategory || prompt.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [prompt.title, prompt.description, prompt.tags.join(" ")].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    }),
    sortMode,
  );

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Search prompts</span>
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search by title, description, or tag"
              className="h-14 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Sort</span>
            <select
              value={sortMode}
              onChange={(event) =>
                startTransition(() => updateSort(event.target.value as SortMode))
              }
              className="h-14 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            >
              <option value="featured">Featured first</option>
              <option value="newest">Newest</option>
              <option value="title">A to Z</option>
            </select>
          </label>
        </div>

        {!hideCategoryFilters ? (
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => startTransition(() => updateCategory(undefined))}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                !selectedCategory
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300 hover:text-slate-950"
              }`}
            >
              All categories
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => startTransition(() => updateCategory(category.name))}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category.name
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300 hover:text-slate-950"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Results</p>
          <h3 className="mt-2 text-2xl text-slate-950">
            {filteredPrompts.length} {pluralize(filteredPrompts.length, "prompt", "prompts")}
          </h3>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-600">
          Search by need, scan the descriptions, then open the one that fits and copy it in a single click.
        </p>
      </div>

      {filteredPrompts.length ? (
        <div className="prompt-grid grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-[2rem] px-6 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">No matches</p>
          <h3 className="mt-3 text-3xl text-slate-950">Try a different keyword or clear the filter.</h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
            Searching works across prompt titles, descriptions, and tags. Broader terms usually surface more useful
            results.
          </p>
        </div>
      )}
    </div>
  );
}
