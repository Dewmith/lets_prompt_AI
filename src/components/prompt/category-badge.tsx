import Link from "next/link";
import { getCategoryDefinition } from "@/content/categories";
import type { PromptCategory } from "@/types/prompt";

interface CategoryBadgeProps {
  category: PromptCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const meta = getCategoryDefinition(category);

  return (
    <Link
      href={`/categories/${meta.slug}`}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
    >
      <span className="text-[10px] text-teal-700">{meta.monogram}</span>
      {category}
    </Link>
  );
}
