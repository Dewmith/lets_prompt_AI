import type { Metadata } from "next";
import { Suspense } from "react";
import { PromptBrowser } from "@/components/browse/prompt-browser";
import { getAllPrompts, getCategoriesWithCounts } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Browse Prompts",
  description: "Browse, search, filter, and copy curated AI prompts for work, writing, learning, travel, finance, and more.",
};

export default function PromptsPage() {
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
        <Suspense fallback={<div className="glass-panel rounded-[2rem] p-8 text-sm text-slate-600">Loading prompt library...</div>}>
          <PromptBrowser
            prompts={getAllPrompts()}
            categories={getCategoriesWithCounts()}
            syncWithUrl
          />
        </Suspense>
      </div>
    </section>
  );
}
