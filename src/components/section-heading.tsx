import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <div
      className={`flex flex-col gap-4 ${align === "left" ? "md:flex-row md:items-end md:justify-between md:gap-8" : ""}`}
    >
      <div className={alignment}>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/75">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-3xl text-slate-950 sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-base leading-7 text-slate-600">{description}</p> : null}
      </div>
      {action ? <div className={align === "center" ? "mx-auto" : "shrink-0"}>{action}</div> : null}
    </div>
  );
}

