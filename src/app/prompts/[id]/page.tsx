import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBadge } from "@/components/prompt/category-badge";
import { CopyButton } from "@/components/prompt/copy-button";
import { PromptCard } from "@/components/prompt/prompt-card";
import { formatPromptDate } from "@/lib/format";
import { getAllPrompts, getPromptById, getRelatedPrompts } from "@/lib/prompts";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return getAllPrompts().map((prompt) => ({
    id: prompt.id,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const prompt = getPromptById(id);

  if (!prompt) {
    return {
      title: "Prompt Not Found",
    };
  }

  return {
    title: prompt.title,
    description: prompt.description,
  };
}

export default async function PromptDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const prompt = getPromptById(id);

  if (!prompt) {
    notFound();
  }

  const relatedPrompts = getRelatedPrompts(prompt, 3);

  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-slate-950">
            Home
          </Link>
          <span>/</span>
          <Link href="/prompts" className="transition hover:text-slate-950">
            Prompts
          </Link>
          <span>/</span>
          <span className="text-slate-700">{prompt.title}</span>
        </div>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <CategoryBadge category={prompt.category} />
            <h1 className="mt-5 text-5xl text-slate-950 sm:text-6xl">{prompt.title}</h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{prompt.description}</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <CopyButton
              value={prompt.prompt}
              label="Copy prompt"
              className="bg-slate-950 px-5 py-3 text-white hover:bg-slate-800 hover:text-white"
            />
            <p className="text-sm text-slate-500">Added {formatPromptDate(prompt.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="glass-panel rounded-[2.25rem] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl text-slate-950">Full prompt</h2>
            <CopyButton value={prompt.prompt} label="Copy" className="px-4 py-2 text-xs" />
          </div>
          <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-[1.75rem] bg-slate-950 px-5 py-6 font-[inherit] text-sm leading-7 text-slate-100">
            {prompt.prompt}
          </pre>
        </div>

        <div className="space-y-6">
          <aside className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">When to use this</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{prompt.whenToUse}</p>
          </aside>

          {prompt.exampleUse ? (
            <aside className="glass-panel rounded-[2rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Example use</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{prompt.exampleUse}</p>
            </aside>
          ) : null}

          <aside className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/75">Related prompts</p>
            <h2 className="mt-3 text-4xl text-slate-950">Keep exploring</h2>
          </div>
          <Link
            href="/prompts"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            Back to browse
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedPrompts.map((relatedPrompt) => (
            <PromptCard key={relatedPrompt.id} prompt={relatedPrompt} />
          ))}
        </div>
      </div>
    </section>
  );
}
