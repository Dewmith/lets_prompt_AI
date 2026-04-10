"use client";

import { useEffect, useRef, useState } from "react";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

type CopyState = "idle" | "copied" | "error";

export function CopyButton({ value, label = "Copy prompt", className = "" }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("error");
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setState("idle");
    }, 2200);
  }

  const text =
    state === "copied" ? "Copied" : state === "error" ? "Try again" : label;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white ${className}`}
    >
      {text}
    </button>
  );
}

