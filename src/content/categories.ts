import type { CategoryDefinition, PromptCategory } from "@/types/prompt";

export const categoryDefinitions: CategoryDefinition[] = [
  {
    name: "Productivity",
    slug: "productivity",
    description: "Prompt sets for planning days, clearing task overload, and staying focused without overthinking.",
    spotlight: "Make busy days feel organized in minutes.",
    monogram: "PR",
    cardClassName:
      "from-teal-500/18 via-cyan-500/10 to-white/0 border-teal-500/20 text-teal-950",
  },
  {
    name: "Work",
    slug: "work",
    description: "Clearer communication for meetings, updates, follow-ups, and day-to-day professional tasks.",
    spotlight: "Move work forward with cleaner communication.",
    monogram: "WK",
    cardClassName:
      "from-sky-500/18 via-blue-500/10 to-white/0 border-sky-500/20 text-sky-950",
  },
  {
    name: "Writing",
    slug: "writing",
    description: "Prompts that help turn rough thoughts into sharper drafts, messages, and content people will actually read.",
    spotlight: "Go from rough idea to polished message.",
    monogram: "WR",
    cardClassName:
      "from-amber-500/18 via-rose-400/10 to-white/0 border-amber-500/20 text-amber-950",
  },
  {
    name: "Learning",
    slug: "learning",
    description: "Study, explain, and break down hard topics in a way that feels practical instead of overwhelming.",
    spotlight: "Learn faster with prompts that teach clearly.",
    monogram: "LR",
    cardClassName:
      "from-lime-500/18 via-emerald-500/10 to-white/0 border-lime-500/20 text-lime-950",
  },
  {
    name: "Coding",
    slug: "coding",
    description: "Useful coding prompts for debugging, understanding unfamiliar code, and thinking through implementation steps.",
    spotlight: "Turn technical confusion into a plan.",
    monogram: "CD",
    cardClassName:
      "from-slate-500/18 via-cyan-500/10 to-white/0 border-slate-500/20 text-slate-950",
  },
  {
    name: "Business",
    slug: "business",
    description: "Prompt templates for offers, positioning, customer messaging, and practical business thinking.",
    spotlight: "Sharpen offers, decisions, and customer language.",
    monogram: "BS",
    cardClassName:
      "from-orange-500/18 via-yellow-500/10 to-white/0 border-orange-500/20 text-orange-950",
  },
  {
    name: "Social Media",
    slug: "social-media",
    description: "Repurpose ideas into posts, hooks, and content angles that feel useful instead of generic.",
    spotlight: "Create posts that sound like you, faster.",
    monogram: "SM",
    cardClassName:
      "from-pink-500/18 via-orange-500/10 to-white/0 border-pink-500/20 text-pink-950",
  },
  {
    name: "Personal Life",
    slug: "personal-life",
    description: "Prompts for everyday decisions, conversations, routines, and keeping life a little lighter.",
    spotlight: "Use AI for daily life, not just work.",
    monogram: "PL",
    cardClassName:
      "from-emerald-500/18 via-teal-500/10 to-white/0 border-emerald-500/20 text-emerald-950",
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Plan quicker trips, smarter packing lists, and itineraries that match real time and budget limits.",
    spotlight: "Plan travel with less tab chaos.",
    monogram: "TR",
    cardClassName:
      "from-cyan-500/18 via-blue-500/10 to-white/0 border-cyan-500/20 text-cyan-950",
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Practical prompts for budgeting, reviewing spending, and simplifying everyday money choices.",
    spotlight: "Get clearer about money with simpler questions.",
    monogram: "FN",
    cardClassName:
      "from-emerald-600/18 via-lime-500/10 to-white/0 border-emerald-600/20 text-emerald-950",
  },
];

const categoryMap = new Map<PromptCategory, CategoryDefinition>(
  categoryDefinitions.map((category) => [category.name, category]),
);

const slugMap = new Map<string, CategoryDefinition>(
  categoryDefinitions.map((category) => [category.slug, category]),
);

export function getCategoryDefinition(name: PromptCategory): CategoryDefinition {
  const category = categoryMap.get(name);

  if (!category) {
    throw new Error(`Unknown category: ${name}`);
  }

  return category;
}

export function getCategoryDefinitionBySlug(slug: string): CategoryDefinition | undefined {
  return slugMap.get(slug);
}

