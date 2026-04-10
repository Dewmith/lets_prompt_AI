import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "lets_prompt_AI | Curated AI prompts for real life",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI prompts",
    "prompt library",
    "prompt collection",
    "everyday AI prompts",
    "writing prompts",
    "work prompts",
    "productivity prompts",
  ],
  openGraph: {
    title: "lets_prompt_AI",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "lets_prompt_AI",
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen overflow-x-clip">
          <div className="pointer-events-none absolute left-1/2 top-[-14rem] -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-teal-400/18 blur-[140px]" />
          <div className="pointer-events-none absolute right-[-8rem] top-[20rem] -z-10 h-[20rem] w-[20rem] rounded-full bg-amber-300/18 blur-[120px]" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
