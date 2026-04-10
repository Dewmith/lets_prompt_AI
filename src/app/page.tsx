import Link from "next/link";
import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/section-heading";
import { PromptCard } from "@/components/prompt/prompt-card";
import { formatPromptDate } from "@/lib/format";
import { getCategoriesWithCounts, getFeaturedPrompts, getNewestPrompt, getPromptCount } from "@/lib/prompts";

export default function HomePage() {
  const categories = getCategoriesWithCounts();
  const featuredCategories = categories.slice(0, 6);
  const featuredPrompts = getFeaturedPrompts(6);
  const heroPrompts = featuredPrompts.slice(0, 3);
  const newestPrompt = getNewestPrompt();
  const promptCount = getPromptCount();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--hero)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,153,139,0.32),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.16),transparent_28%)]" />
        <div className="page-shell relative grid min-h-[calc(100svh-82px)] items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-200/80">Curated prompt library</p>
            <h1 className="mt-5 text-5xl leading-none sm:text-6xl lg:text-7xl">
              Useful AI prompts for real life, ready to copy in seconds.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              lets_prompt_AI helps normal users browse, search, and copy practical prompts for work, writing, learning,
              planning, travel, money, and more.
            </p>

            <form
              action="/prompts"
              className="mt-8 grid gap-3 rounded-[2rem] border border-white/12 bg-white/6 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.18)] backdrop-blur sm:grid-cols-[1fr_auto]"
            >
              <input
                type="search"
                name="query"
                placeholder="Search prompts for emails, planning, budgeting, travel..."
                className="h-14 rounded-[1.25rem] border border-white/12 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-teal-300"
              />
              <button
                type="submit"
                className="h-14 rounded-[1.25rem] bg-white px-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-50"
              >
                Browse prompts
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/16"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-3xl text-white">{promptCount}+</p>
                <p className="mt-2 text-sm text-slate-300">Curated prompts across everyday use cases.</p>
              </div>
              <div>
                <p className="text-3xl text-white">{categories.length}</p>
                <p className="mt-2 text-sm text-slate-300">Organized categories for faster discovery.</p>
              </div>
              <div>
                <p className="text-3xl text-white">{newestPrompt ? formatPromptDate(newestPrompt.createdAt) : "Now"}</p>
                <p className="mt-2 text-sm text-slate-300">Freshly updated library content.</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[460px]">
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-white/6 backdrop-blur-sm" />
            <div className="absolute inset-x-10 top-8 h-32 rounded-full bg-teal-300/18 blur-[90px]" />
            <div className="relative flex h-full flex-col justify-center gap-5 p-6 sm:p-8">
              {heroPrompts.map((prompt, index) => (
                <article
                  key={prompt.id}
                  className={`ink-panel relative rounded-[2rem] p-6 text-white transition duration-500 ${
                    index === 0
                      ? "translate-x-0 rotate-[-2deg]"
                      : index === 1
                        ? "translate-x-8 rotate-[3deg]"
                        : "translate-x-2 rotate-[-1deg]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-100">
                      {prompt.category}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {prompt.featured ? "Featured" : "Curated"}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl text-white">{prompt.title}</h2>
                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">{prompt.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {prompt.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/70 bg-white/60">
        <div className="page-shell grid gap-8 py-10 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-slate-950">Browse fast</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">Search, filter by category, and sort prompts without clutter.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Understand quickly</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">Every prompt includes a plain-language description and when-to-use guidance.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Copy instantly</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">Open any prompt and copy the full text in one click on desktop or mobile.</p>
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading
          eyebrow="How It Works"
          title="A cleaner way to find the right prompt"
          description="Instead of scrolling through generic lists, you can jump straight to the situation you are in, open the prompt, and adapt it to your own context."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Start with a need",
              text: "Search for the outcome you want, like planning a week, writing an email, or building a budget review.",
            },
            {
              step: "02",
              title: "Pick a prompt that fits",
              text: "Each card tells you what the prompt is for, what category it belongs to, and which tags describe it best.",
            },
            {
              step: "03",
              title: "Copy and customize",
              text: "Open the detail page, copy the full prompt, and replace the placeholders with your own details.",
            },
          ].map((item) => (
            <div key={item.step} className="glass-panel rounded-[2rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/70">{item.step}</p>
              <h3 className="mt-4 text-2xl text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-6">
        <SectionHeading
          eyebrow="Categories"
          title="Browse by the kind of help you need"
          description="Every category is built around real-world use cases so you can find a prompt faster without guessing which wording to search."
          action={
            <Link
              href="/categories"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300"
            >
              View all categories
            </Link>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading
          eyebrow="Featured Prompts"
          title="A quick way to see what the library feels like"
          description="These are strong starting points if you are new to prompt libraries and want something useful immediately."
          action={
            <Link
              href="/prompts"
              className="inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Browse all prompts
            </Link>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>

      <section className="page-shell pb-20">
        <div className="ink-panel overflow-hidden rounded-[2.5rem] px-6 py-12 text-white sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-200/80">Ready to explore</p>
          <h2 className="mt-4 max-w-2xl text-4xl text-white sm:text-5xl">Find the prompt you need and skip the blank page.</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Start with browse if you want the full library, or jump into categories if you already know the kind of help you want.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/prompts"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-50"
            >
              Browse prompts
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
            >
              About the project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
