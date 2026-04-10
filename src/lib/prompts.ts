import { categoryDefinitions, getCategoryDefinition, getCategoryDefinitionBySlug } from "@/content/categories";
import promptsData from "@/content/prompts.json";
import type { CategoryWithCount, Prompt, PromptCategory } from "@/types/prompt";

const prompts = [...(promptsData as Prompt[])].sort(
  (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
);

export function getAllPrompts(): Prompt[] {
  return prompts;
}

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((prompt) => prompt.id === id);
}

export function getFeaturedPrompts(limit = 6): Prompt[] {
  return prompts.filter((prompt) => prompt.featured).slice(0, limit);
}

export function getPromptsByCategory(category: PromptCategory): Prompt[] {
  return prompts.filter((prompt) => prompt.category === category);
}

export function getCategoriesWithCounts(): CategoryWithCount[] {
  return categoryDefinitions.map((category) => ({
    ...category,
    count: prompts.filter((prompt) => prompt.category === category.name).length,
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

export function getRelatedPrompts(prompt: Prompt, limit = 3): Prompt[] {
  return prompts
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
  return prompts.length;
}

export function getNewestPrompt(): Prompt | undefined {
  return prompts[0];
}

export function getCategoryNameFromSlug(slug: string): PromptCategory | undefined {
  return getCategoryDefinitionBySlug(slug)?.name;
}

export function getCategoryMeta(category: PromptCategory) {
  return getCategoryDefinition(category);
}
