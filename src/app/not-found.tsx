import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell py-24 text-center sm:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/75">Not Found</p>
      <h1 className="mt-4 text-5xl text-slate-950 sm:text-6xl">That prompt page does not exist.</h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
        The link may be outdated, or the prompt may have moved. You can jump back into the full library below.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/prompts"
          className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Browse prompts
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}

