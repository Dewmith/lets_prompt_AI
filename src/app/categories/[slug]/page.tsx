import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PromptBrowser } from "@/components/browse/prompt-browser";
import { getCategoriesWithCounts, getCategoryStatsBySlug, getPromptsByCategory } from "@/lib/prompts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getCategoriesWithCounts().map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryStatsBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Prompts`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const category = getCategoryStatsBySlug(slug);

  if (!category) {
    notFound();
  }

  const prompts = getPromptsByCategory(category.name);

  return (
    <section className="page-shell py-16 sm:py-20">
      <div className={`overflow-hidden rounded-[2.5rem] border bg-gradient-to-br p-8 sm:p-10 ${category.cardClassName}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-700/70">Category</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-5xl text-slate-950 sm:text-6xl">{category.name}</h1>
            <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{category.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-slate-950/10 bg-white/55 px-4 py-2 text-sm font-semibold text-slate-900">
              {category.count} prompts
            </span>
            <Link
              href="/prompts"
              className="inline-flex items-center rounded-full border border-slate-950/10 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
            >
              Browse all prompts
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <PromptBrowser prompts={prompts} categories={getCategoriesWithCounts()} hideCategoryFilters initialSort="featured" />
      </div>
    </section>
  );
}

