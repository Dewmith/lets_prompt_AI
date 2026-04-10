const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repository = process.env.GITHUB_REPOSITORY;
const repositoryName = repository?.split("/")[1] ?? "";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserOrOrgSite = repositoryName.endsWith(".github.io");
const derivedBasePath =
  isGitHubPages && repositoryName && !isUserOrOrgSite ? `/${repositoryName}` : "";
const derivedSiteUrl =
  repositoryOwner && repositoryName
    ? `https://${repositoryOwner}.github.io${isUserOrOrgSite ? "" : `/${repositoryName}`}`
    : "https://lets-prompt-ai.example.com";

export const siteConfig = {
  name: "lets_prompt_AI",
  shortName: "lets_prompt_AI",
  description:
    "A curated prompt library for everyday life. Browse, search, and copy useful AI prompts for work, writing, learning, travel, and more.",
  basePath: derivedBasePath,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? derivedSiteUrl,
};
