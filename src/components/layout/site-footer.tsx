import Link from "next/link";

const footerLinks = [
  { href: "/prompts", label: "Browse prompts" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70">
      <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.5fr_1fr]">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/70">lets_prompt_AI</p>
          <h2 className="mt-3 text-3xl text-slate-950">Curated prompts that are actually useful in everyday life.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Browse practical prompts for work, writing, learning, life admin, and more. Everything is stored in local
            content files so the library stays easy to maintain as it grows.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-1">
          <div>
            <p className="text-sm font-semibold text-slate-950">Navigate</p>
            <div className="mt-4 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-600 transition hover:text-slate-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950">Use it well</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Start with the browse page, open a prompt that matches your situation, then copy and adapt it to your own
              context.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

