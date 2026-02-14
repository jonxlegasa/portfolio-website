import type { BlogPost } from './types';

type MdsvexModule = {
  default: ConstructorOfATypedSvelteComponent;
  metadata: Omit<BlogPost, 'slug'>;
};

const modules = import.meta.glob<MdsvexModule>('/src/posts/*.md', { eager: true });

function slugFromPath(path: string): string {
  return path.replace('/src/posts/', '').replace('.md', '');
}

export function getPosts(): BlogPost[] {
  return Object.entries(modules)
    .map(([path, module]) => ({
      ...module.metadata,
      slug: slugFromPath(path)
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): { post: BlogPost; content: MdsvexModule['default'] } | undefined {
  const entry = Object.entries(modules).find(
    ([path]) => slugFromPath(path) === slug
  );
  if (!entry) return undefined;
  const [path, module] = entry;
  return {
    post: { ...module.metadata, slug: slugFromPath(path) },
    content: module.default
  };
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const module of Object.values(modules)) {
    for (const tag of module.metadata.tags) {
      tags.add(tag);
    }
  }
  return [...tags].sort();
}
