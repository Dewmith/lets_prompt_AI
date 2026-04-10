export const promptCategories = [
  "Productivity",
  "Work",
  "Writing",
  "Learning",
  "Coding",
  "Business",
  "Social Media",
  "Personal Life",
  "Travel",
  "Finance",
] as const;

export type PromptCategory = (typeof promptCategories)[number];

export interface Prompt {
  id: string;
  title: string;
  category: PromptCategory;
  description: string;
  tags: string[];
  prompt: string;
  whenToUse: string;
  exampleUse?: string;
  featured: boolean;
  createdAt: string;
}

export interface CategoryDefinition {
  name: PromptCategory;
  slug: string;
  description: string;
  spotlight: string;
  monogram: string;
  cardClassName: string;
}

export interface CategoryWithCount extends CategoryDefinition {
  count: number;
}

