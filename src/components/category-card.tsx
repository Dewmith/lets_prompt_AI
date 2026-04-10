import Link from "next/link";
import { pluralize } from "@/lib/format";
import type { CategoryWithCount } from "@/types/prompt";

interface CategoryCardProps {
  category: CategoryWithCount;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group relative overflow-hidden rounded-[2rem] border bg-gradient-to-br p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_90px_rgba(15,23,42,0.14)] ${category.cardClassName}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold tracking-[0.2em] text-white">
          {category.monogram}
        </span>
        <span className="rounded-full border border-slate-950/10 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
          {category.count} {pluralize(category.count, "prompt", "prompts")}
        </span>
      </div>

      <div className="mt-14">
        <h3 className="text-2xl text-slate-950">{category.name}</h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-slate-700">{category.description}</p>
        <p className="mt-6 text-sm font-semibold text-slate-950">{category.spotlight}</p>
      </div>
    </Link>
  );
}

