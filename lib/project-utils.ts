export const NAV_TAG_SLUGS = [
  { name: "All", slug: null },
  { name: "Popular", slug: "popular" },
  { name: "Full-Stack", slug: "full-stack" },
  { name: "Frontend", slug: "frontend" },
  { name: "Backend", slug: "backend" },
  { name: "Mobile", slug: "mobile" },
  { name: "AI/ML", slug: "ai-ml" },
] as const;

const TAG_SLUG_TO_NAME: Record<string, string> = {
  "full-stack": "Full-Stack",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  "ai-ml": "AI/ML",
};

export function tagSlugToFilterName(
  slug: string | undefined,
): string | undefined {
  if (!slug || slug === "popular") return undefined;
  return TAG_SLUG_TO_NAME[slug];
}

export function isPopularFilter(slug: string | undefined): boolean {
  return slug === "popular";
}

export function formatGithubStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return count.toString();
}

export async function fetchGithubStars(githubUrl: string): Promise<number> {
  try {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/);
    if (!match) return 0;

    const owner = match[1];
    const repo = match[2].replace(/\.git$/, "");
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) return 0;

    const data = (await response.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}

export function buildTagHref(
  tagSlug: string | null,
  searchQuery?: string,
): string {
  const params = new URLSearchParams();
  if (tagSlug) params.set("tag", tagSlug);
  if (searchQuery?.trim()) params.set("q", searchQuery.trim());
  const query = params.toString();
  return query ? `/?${query}` : "/";
}
