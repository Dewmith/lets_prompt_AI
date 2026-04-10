import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { getCategoriesWithCounts } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse lets_prompt_AI by category, from productivity and work to travel, finance, and personal life.",
};

export default function CategoriesPage() {
  const categories = getCategoriesWithCounts();

  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/75">Categories</p>
        <h1 className="mt-4 text-5xl text-slate-950 sm:text-6xl">Browse prompts by the job they do for you.</h1>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          Each category groups prompts around real-world tasks so it is easier to find something useful quickly, even if
          you are not sure what exact prompt to search for yet.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}

