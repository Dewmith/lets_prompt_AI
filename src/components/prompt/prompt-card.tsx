import Link from "next/link";
import { formatPromptDate } from "@/lib/format";
import type { Prompt } from "@/types/prompt";
import { CategoryBadge } from "./category-badge";
import { CopyButton } from "./copy-button";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-white hover:shadow-[0_32px_90px_rgba(15,23,42,0.14)]">
      <div className="flex items-start justify-between gap-4">
        <CategoryBadge category={prompt.category} />
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          {formatPromptDate(prompt.createdAt)}
        </p>
      </div>

      <div className="mt-5 flex-1">
        <Link href={`/prompts/${prompt.id}`} className="block">
          <h3 className="text-2xl leading-tight text-slate-950 transition group-hover:text-teal-800">{prompt.title}</h3>
        </Link>
        <p className="mt-3 text-sm leading-7 text-slate-600">{prompt.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Link
          href={`/prompts/${prompt.id}`}
          className="inline-flex items-center text-sm font-semibold text-slate-900 transition hover:text-teal-800"
        >
          View details
        </Link>
        <CopyButton value={prompt.prompt} label="Copy" className="px-3 py-1.5 text-xs" />
      </div>
    </article>
  );
}

