# Blog System Implementation Plan

## Context

The portfolio website (`website/`) is a minimal SvelteKit 5 site with no blog. The user wants a markdown-powered blog with **tags/categories** and an **author field**, based on the reference architecture analyzed in `plans/active-plans/blog-system-analysis.md`. The key improvement: **mdsvex for markdown support** and **`import.meta.glob` for automatic post discovery** (eliminating the dual-registration problem from the reference).

## Decisions

- **Route**: `/blog`
- **Site URL**: `http://localhost` placeholder (update later)
- **Markdown**: mdsvex preprocessor (`.md` files with YAML frontmatter)
- **Post storage**: `src/posts/*.md` (outside routes, discovered via `import.meta.glob`)
- **No separate registry**: frontmatter IS the metadata — no `posts.ts` array to maintain
- **Skipping** (per user): draft status, pagination, reading time, post images, date parsing improvements

## Implementation Steps

### 1. Install mdsvex

```bash
cd website && bun add -D mdsvex
```

### 2. Modify `svelte.config.js`

Add mdsvex preprocessor and `.md` extension:
- `extensions: ['.svelte', '.md']`
- `preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })]`

### 3. Modify `tailwind.config.ts`

Add `.md` to content paths: `'./src/**/*.{html,js,svelte,ts,md}'`

### 4. Create `src/lib/types.ts`

```ts
export type BlogPost = {
  title: string;
  description: string;
  date: string;       // YYYY-MM-DD
  author: string;
  tags: string[];
  slug: string;       // derived from filename
};
```

### 5. Create `src/lib/config.ts`

Site-wide constants for SEO/RSS: `name`, `url`, `blog.name`, `blog.description`.

### 6. Create `src/lib/posts.ts`

Core utility — uses `import.meta.glob('/src/posts/*.md', { eager: true })` to discover posts. Exports:
- `getPosts()` — all posts sorted newest-first
- `getPostBySlug(slug)` — single post with component + metadata
- `getPostsByTag(tag)` — filtered by tag
- `getAllTags()` — unique sorted tag list

### 7. Create `src/posts/hello-world.md`

Example post with frontmatter (title, description, date, author, tags) and markdown body.

### 8. Create blog routes

| File | Purpose |
|------|---------|
| `src/routes/blog/+page.server.ts` | Load all posts + tags for index |
| `src/routes/blog/+page.svelte` | Blog index — post cards + tag chips |
| `src/routes/blog/[slug]/+page.ts` | Load single post by slug (dynamic import) |
| `src/routes/blog/[slug]/+page.svelte` | Post renderer — prose styling, SEO (OG, Twitter, JSON-LD) |
| `src/routes/blog/tag/[tag]/+page.server.ts` | Load posts filtered by tag |
| `src/routes/blog/tag/[tag]/+page.svelte` | Tag filter page |
| `src/routes/blog/rss.xml/+server.ts` | RSS 2.0 feed with `<category>` and `<author>` |

### 9. Modify `src/lib/components/Navbar.svelte`

Add `/blog` link (and other existing routes) to the currently-empty nav links div.

## File Summary

| # | File | Action |
|---|------|--------|
| 1 | `svelte.config.js` | MODIFY |
| 2 | `tailwind.config.ts` | MODIFY |
| 3 | `src/lib/types.ts` | CREATE |
| 4 | `src/lib/config.ts` | CREATE |
| 5 | `src/lib/posts.ts` | CREATE |
| 6 | `src/posts/hello-world.md` | CREATE |
| 7 | `src/routes/blog/+page.server.ts` | CREATE |
| 8 | `src/routes/blog/+page.svelte` | CREATE |
| 9 | `src/routes/blog/[slug]/+page.ts` | CREATE |
| 10 | `src/routes/blog/[slug]/+page.svelte` | CREATE |
| 11 | `src/routes/blog/tag/[tag]/+page.server.ts` | CREATE |
| 12 | `src/routes/blog/tag/[tag]/+page.svelte` | CREATE |
| 13 | `src/routes/blog/rss.xml/+server.ts` | CREATE |
| 14 | `src/lib/components/Navbar.svelte` | MODIFY |

**Total: 11 new files, 3 modified**

## Verification

1. `bun run dev` — dev server starts without errors
2. `bun run check` — TypeScript/Svelte checks pass
3. `/blog` — shows hello-world post card with title, date, author, description, tags
4. `/blog/hello-world` — renders markdown as prose, correct `<head>` SEO tags
5. `/blog/tag/svelte` — shows only posts with that tag
6. `/blog/rss.xml` — valid RSS XML with `<category>` and `<author>`
7. `/blog/nonexistent` — returns 404
8. `bun run build` — production build succeeds
9. Add a second `.md` file to `src/posts/` — appears on index automatically

## Pitfalls to Watch

- **Svelte 5 component rendering**: `<data.content />` for mdsvex output — test this, fall back to alternatives if needed
- **`prose-invert`**: site is dark-themed (`bg-primary-bg: #26282B`), must use `prose-invert` for readable text
- **mdsvex code highlighting**: default Prism.js may need a CSS theme import for syntax colors
