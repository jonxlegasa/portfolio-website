import type { KnownTag } from '$lib/types';

const GITHUB_USERNAME = 'jonxlegasa';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  languages: string[];
}

/** @deprecated Use Repo instead */
export type PinnedRepo = Repo;

const PINNED_REPOS_QUERY = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

// --- Manual project tags ---
// Add new tags here in types.ts. Add repo-to-tag mappings in PROJECT_TAGS below.

export const TAG_COLORS: Record<KnownTag, string> = {
  'personal': 'bg-accent-yellow/15 text-accent-yellow',
  'math': 'bg-accent-red/15 text-accent-red',
  'physics': 'bg-accent-purple/15 text-accent-purple',
  'ai/ml': 'bg-secondary-accent/15 text-secondary-accent',
  'chess': 'bg-accent-orange/15 text-accent-orange',
};

// Map repo names to tags. Add a line to tag a new project.
export const PROJECT_TAGS: Record<string, KnownTag[]> = {
  // Example: 'my-repo-name': ['ai/ml', 'physics'],
};

export function getTagsForRepo(repoName: string): KnownTag[] {
  return PROJECT_TAGS[repoName] ?? [];
}

// --- Language colors for project cards ---
// Maps GitHub primaryLanguage to Tailwind classes. Add more as needed.
const LANGUAGE_COLORS: Record<string, string> = {
  'python': 'bg-secondary-accent/15 text-secondary-accent',
  'javascript': 'bg-accent-yellow/15 text-accent-yellow',
  'typescript': 'bg-primary-accent/15 text-primary-accent',
  'rust': 'bg-accent-orange/15 text-accent-orange',
  'go': 'bg-[#00ADD8]/15 text-[#00ADD8]',
  'c': 'bg-dimmed-text/15 text-dimmed-text',
  'c++': 'bg-accent-red/15 text-accent-red',
  'java': 'bg-accent-orange/15 text-accent-orange',
  'svelte': 'bg-accent-red/15 text-accent-red',
  'html': 'bg-accent-orange/15 text-accent-orange',
  'css': 'bg-accent-purple/15 text-accent-purple',
  'shell': 'bg-secondary-accent/15 text-secondary-accent',
  'julia': 'bg-accent-purple/15 text-accent-purple',
  'jupyter notebook': 'bg-accent-orange/15 text-accent-orange',
};

const DEFAULT_LANGUAGE_COLOR = 'bg-dimmed-text/10 text-dimmed-text';

export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language.toLowerCase()] ?? DEFAULT_LANGUAGE_COLOR;
}

const DEFAULT_TAG_COLOR = 'bg-secondary-bg text-primary-text';

export function getTagColor(tag: string): string {
  const lower = tag.toLowerCase() as KnownTag;
  return TAG_COLORS[lower] ?? LANGUAGE_COLORS[lower] ?? DEFAULT_TAG_COLOR;
}

const ALL_REPOS_QUERY = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          name
          description
          url
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
            }
          }
          isFork
        }
      }
    }
  }
`;

export async function fetchAllRepos(token: string): Promise<Repo[]> {
  if (!token) {
    console.warn('GITHUB_TOKEN not set — cannot fetch repos');
    return [];
  }

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: ALL_REPOS_QUERY }),
  });

  if (!res.ok) {
    console.error(`GitHub API error: ${res.status}`);
    return [];
  }

  const json = await res.json();
  const nodes = json.data?.user?.repositories?.nodes ?? [];

  return nodes
    .filter((repo: any) => !repo.isFork)
    .map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      languages: (repo.languages?.nodes ?? []).map((l: any) => l.name),
    }));
}

export async function fetchPinnedRepos(token: string): Promise<PinnedRepo[]> {
  if (!token) {
    console.warn('GITHUB_TOKEN not set — cannot fetch pinned repos');
    return [];
  }

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: PINNED_REPOS_QUERY }),
  });

  if (!res.ok) {
    console.error(`GitHub API error: ${res.status}`);
    return [];
  }

  const json = await res.json();
  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];

  return nodes.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    primaryLanguage: repo.primaryLanguage?.name ?? null,
  }));
}
