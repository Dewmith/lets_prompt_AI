import type { MetadataRoute } from "next";
import { getAllPrompts, getCategoriesWithCounts } from "@/lib/prompts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries: MetadataRoute.Sitemap = ["", "/prompts", "/categories", "/about"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const promptEntries: MetadataRoute.Sitemap = getAllPrompts().map((prompt) => ({
    url: `${siteConfig.url}/prompts/${prompt.id}`,
    lastModified: new Date(prompt.createdAt),
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const categoryEntries: MetadataRoute.Sitemap = getCategoriesWithCounts().map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...baseEntries, ...categoryEntries, ...promptEntries];
}

