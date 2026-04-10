import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/prompts", label: "Browse" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-[color:rgba(247,242,233,0.82)] backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold tracking-[0.2em] text-white">
            LP
          </span>
          <span className="text-sm font-semibold tracking-[0.22em] text-slate-950">lets_prompt_AI</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/prompts"
            className="inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Explore prompts
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-slate-300">
            Menu
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.75rem)] w-56 rounded-3xl border border-white/60 bg-white/95 p-3 shadow-[0_24px_90px_rgba(15,23,42,0.14)]">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/prompts"
                className="mt-2 rounded-2xl bg-slate-950 px-3 py-2 text-center text-sm font-medium text-white"
              >
                Explore prompts
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}

