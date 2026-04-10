import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what lets_prompt_AI is, how the prompts are curated, and why the library is organized for practical everyday use.",
};

export default function AboutPage() {
  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/75">About</p>
        <h1 className="mt-4 text-5xl text-slate-950 sm:text-6xl">A prompt library built around useful real-world tasks.</h1>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          lets_prompt_AI is a public-facing website for people who want practical prompts without sorting through noisy,
          generic collections. Every prompt is curated around a real use case and written to be easy to understand,
          copy, and adapt.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">What the project is for</p>
          <h2 className="mt-4 text-3xl text-slate-950">Useful prompts first, complexity later.</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              The goal is simple: help people find a prompt they need, understand what it is for, and copy it quickly.
            </p>
            <p>
              The prompts are organized by everyday categories like work, productivity, personal life, travel, and
              finance instead of developer-only workflows.
            </p>
            <p>
              Content is stored in local structured files so the library stays easy to update without a heavy admin
              system.
            </p>
          </div>
        </div>

        <div className="ink-panel rounded-[2rem] p-6 text-white sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-200/80">Curated approach</p>
          <h2 className="mt-4 text-3xl text-white">How prompts are chosen</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <p>Prompts are selected for clarity, practical use, and fast adaptation by non-technical users.</p>
            <p>Each one is paired with a short description, a “when to use this” explanation, and an easy copy path.</p>
            <p>The structure is designed to scale later into a larger prompt library without changing the user flow.</p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Clear categories",
            text: "Users can browse by context instead of guessing the exact words to search.",
          },
          {
            title: "Polished detail pages",
            text: "The full prompt, usage guidance, tags, and copy button stay in one clean place.",
          },
          {
            title: "Easy to maintain",
            text: "New prompts can be added by editing a local content file rather than building an admin panel too early.",
          },
        ].map((item) => (
          <div key={item.title} className="glass-panel rounded-[2rem] p-6">
            <h3 className="text-2xl text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
