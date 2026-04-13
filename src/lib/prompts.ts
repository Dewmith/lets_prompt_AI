import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categoryDefinitions, getCategoryDefinition, getCategoryDefinitionBySlug } from "@/content/categories";
import type { CategoryWithCount, Prompt, PromptCategory, PromptSummary } from "@/types/prompt";
import { promptCategories } from "@/types/prompt";

interface PromptFrontmatter {
  title?: unknown;
  category?: unknown;
  description?: unknown;
  tags?: unknown;
  whenToUse?: unknown;
  exampleUse?: unknown;
  featured?: unknown;
  createdAt?: unknown;
}

const promptsDirectory = path.join(process.cwd(), "src", "content", "prompts");
const categorySet = new Set<string>(promptCategories);

function assertString(value: unknown, field: string, id: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Prompt "${id}" is missing a valid ${field}.`);
  }

  return value;
}

function assertCategory(value: unknown, id: string): PromptCategory {
  const category = assertString(value, "category", id);

  if (!categorySet.has(category)) {
    throw new Error(`Prompt "${id}" uses an unknown category: ${category}`);
  }

  return category as PromptCategory;
}

function assertTags(value: unknown, id: string): string[] {
  if (!Array.isArray(value) || !value.every((tag) => typeof tag === "string" && tag.trim())) {
    throw new Error(`Prompt "${id}" is missing a valid tags array.`);
  }

  return value;
}

function readPromptFile(filename: string): Prompt {
  const id = filename.replace(/\.md$/, "");
  const filePath = path.join(promptsDirectory, filename);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as PromptFrontmatter;

  return {
    id,
    title: assertString(frontmatter.title, "title", id),
    category: assertCategory(frontmatter.category, id),
    description: assertString(frontmatter.description, "description", id),
    tags: assertTags(frontmatter.tags, id),
    prompt: content.trim(),
    whenToUse: assertString(frontmatter.whenToUse, "whenToUse", id),
    exampleUse: typeof frontmatter.exampleUse === "string" ? frontmatter.exampleUse : undefined,
    featured: frontmatter.featured === true,
    createdAt: assertString(frontmatter.createdAt, "createdAt", id),
  };
}

function toPromptSummary(prompt: Prompt): PromptSummary {
  return {
    id: prompt.id,
    title: prompt.title,
    category: prompt.category,
    description: prompt.description,
    tags: prompt.tags,
    featured: prompt.featured,
    createdAt: prompt.createdAt,
  };
}

const prompts = fs
  .readdirSync(promptsDirectory)
  .filter((filename) => filename.endsWith(".md"))
  .map(readPromptFile)
  .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

const promptSummaries = prompts.map(toPromptSummary);

export function getAllPrompts(): PromptSummary[] {
  return promptSummaries;
}

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((prompt) => prompt.id === id);
}

export function getFeaturedPrompts(limit = 6): PromptSummary[] {
  return promptSummaries.filter((prompt) => prompt.featured).slice(0, limit);
}

export function getPromptsByCategory(category: PromptCategory): PromptSummary[] {
  return promptSummaries.filter((prompt) => prompt.category === category);
}

export function getCategoriesWithCounts(): CategoryWithCount[] {
  return categoryDefinitions.map((category) => ({
    ...category,
    count: promptSummaries.filter((prompt) => prompt.category === category.name).length,
  }));
}

export function getCategoryStatsBySlug(slug: string): CategoryWithCount | undefined {
  const category = getCategoryDefinitionBySlug(slug);

  if (!category) {
    return undefined;
  }

  return {
    ...category,
    count: getPromptsByCategory(category.name).length,
  };
}

export function getRelatedPrompts(prompt: Prompt, limit = 3): PromptSummary[] {
  return promptSummaries
    .filter((candidate) => candidate.id !== prompt.id)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => prompt.tags.includes(tag)).length;
      const sameCategory = candidate.category === prompt.category ? 2 : 0;

      return {
        prompt: candidate,
        score: sharedTags + sameCategory,
      };
    })
    .sort((left, right) => {
      if (right.score === left.score) {
        return new Date(right.prompt.createdAt).getTime() - new Date(left.prompt.createdAt).getTime();
      }

      return right.score - left.score;
    })
    .slice(0, limit)
    .map((entry) => entry.prompt);
}

export function getPromptCount(): number {
  return promptSummaries.length;
}

export function getNewestPrompt(): PromptSummary | undefined {
  return promptSummaries[0];
}

export function getCategoryNameFromSlug(slug: string): PromptCategory | undefined {
  return getCategoryDefinitionBySlug(slug)?.name;
}

export function getCategoryMeta(category: PromptCategory) {
  return getCategoryDefinition(category);
}
