# Blog System Analysis — CMSaasStarter

> Source project: `/home/archimedes/code/blaise/api-platform/CMSaasStarter`
> Analysis date: 2026-02-12

---

## 1. Architecture Overview

The blog is a **fully static, file-based system** — no database, no markdown processor, no CMS admin panel. Blog posts are plain Svelte components with inline HTML, and metadata is a hand-maintained TypeScript array.

| Aspect              | Implementation                                                  |
| ------------------- | --------------------------------------------------------------- |
| Content storage     | Svelte component files (`.svelte`), not markdown                |
| Metadata            | Hand-maintained TS array in `posts.ts`                          |
| Routing             | SvelteKit file-based routing under `(posts)/[slug]/`            |
| Database            | None — Supabase tables are `profiles`, `stripe_customers`, `contact_requests` only |
| Markdown support    | None — no mdsvex, marked, or remark in dependencies             |
| Prerendering        | All blog routes are statically prerendered (`export const prerender = true`) |
| Search              | Fuse.js index built at compile time via custom Vite plugin      |
| RSS                 | Server endpoint generating RSS 2.0 XML from `posts.ts`         |

---

## 2. Directory Structure

```
src/routes/(marketing)/blog/
├── posts.ts                          # Central registry of all posts (metadata + types)
├── +layout.ts                        # `export const prerender = true`
├── +page.svelte                      # Blog index / listing page
├── rss.xml/
│   └── +server.ts                    # RSS 2.0 feed generator
└── (posts)/
    ├── +layout.svelte                # Post wrapper (SEO, JSON-LD, 404 guard)
    ├── example_blog_post/
    │   └── +page.svelte              # Post content (raw HTML)
    ├── awesome_post/
    │   └── +page.svelte
    └── how_we_built_our_41kb_saas_website/
        └── +page.svelte
```

---

## 3. How to Create a New Blog Post

Two manual steps are required:

### Step 1 — Create the content file

Add a new directory and `+page.svelte` under `src/routes/(marketing)/blog/(posts)/`:

```
src/routes/(marketing)/blog/(posts)/your_slug/+page.svelte
```

The file is pure HTML/Svelte markup. Tailwind's `@tailwindcss/typography` prose classes are applied automatically by the parent layout.

### Step 2 — Register in `posts.ts`

Add an entry to the `blogPosts` array in `src/routes/(marketing)/blog/posts.ts`:

```ts
{
  title: "Your Post Title",
  description: "A short description for cards and SEO",
  link: "/blog/your_slug",
  date: "2026-02-12",    // YYYY-MM-DD format
}
```

Both steps are required. Missing either one causes a build failure or 404.

---

## 4. Key Files in Detail

### 4.1 `posts.ts` — Post Registry & Types

- Defines `BlogPost` type: `{ link, date, title, description, parsedDate? }`
- Defines `blogInfo`: `{ name, description }` for the blog as a whole
- Exports `sortedBlogPosts` sorted newest-first by parsed date
- Date parsing is manual: splits string on `-` and constructs `new Date(year, month-1, day)`

### 4.2 `+page.svelte` (Blog Index)

- Imports `sortedBlogPosts` and `blogInfo`
- Renders all posts in card layout with title, formatted date, and description
- Links to RSS feed icon at `/blog/rss.xml`
- No pagination — renders every post

### 4.3 `(posts)/+layout.svelte` — Post Layout

- Matches current URL against `sortedBlogPosts` to find current post
- Throws SvelteKit 404 error if post URL is not registered in `posts.ts`
- Generates SEO metadata:
  - `<title>` and `<meta description>`
  - Open Graph tags (`og:title`, `og:description`, `og:site_name`, `og:url`)
  - Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
  - Schema.org JSON-LD (`BlogPosting` with `headline`, `datePublished`, `dateModified`)
- Image meta tags (`og:image`, `twitter:image`) are commented out as placeholders
- Wraps post content in `<article class="prose">` for typography styling
- Uses `{@render children?.()}` (Svelte 5 snippet pattern) for content injection

### 4.4 `rss.xml/+server.ts` — RSS Feed

- Generates RSS 2.0 XML from `sortedBlogPosts`
- XML-encodes all content
- Sets `Cache-Control: max-age=0, s-maxage=3600` (1-hour server cache)
- Includes Atom namespace for self-referencing link

### 4.5 Individual Post Files

- Pure HTML/Svelte markup (no frontmatter, no markdown)
- Support standard HTML: `<p>`, `<h3>`, `<blockquote>`, `<pre><code>`, `<ul>/<li>`, `<a>`
- Styled via Tailwind Typography's `.prose` class from the parent layout

---

## 5. Search Integration

A custom Vite plugin (`vite-build-search-index` in `vite.config.ts`) runs post-build:

1. Reads all prerendered HTML from `.svelte-kit/output/prerendered/pages`
2. Converts HTML to plaintext using `html-to-text` + `jsdom`
3. Builds a Fuse.js search index (weighted: title 3x, description 2x, body 1x)
4. Writes index to `.svelte-kit/output/client/search/api.json`

Blog posts are automatically included in the site-wide search at `/search`.

---

## 6. Related Configuration

### `src/config.ts`

```ts
export const WebsiteName: string = "SaaS Starter"
export const WebsiteBaseUrl: string = "https://saasstarter.work"
```

Used by post layout for `og:site_name`.

### `svelte.config.js`

- `adapter-auto` with no special blog preprocessing
- No mdsvex or markdown config

### Sitemap

- `super-sitemap` package at `/sitemap.xml`
- Automatically includes all routes (blog posts get indexed)

---

## 7. Limitations & Gaps

| # | Limitation | Impact |
|---|-----------|--------|
| 1 | **No markdown support** | Authors must write HTML. Higher barrier for non-developers. |
| 2 | **Dual registration required** | Forgetting either `posts.ts` entry or content file causes build failure / 404. |
| 3 | **No post images** | No `og:image`, no hero images, no image convention per post. |
| 4 | **No categories or tags** | `BlogPost` type has no taxonomy fields. No filtering on index page. |
| 5 | **No draft status** | Every entry in `posts.ts` is live. No way to preview unpublished posts. |
| 6 | **No pagination** | Index renders all posts in one list. Won't scale past ~20-30 posts. |
| 7 | **Fragile date parsing** | Manual string splitting instead of `new Date()` or a library. |
| 8 | **Build-time only** | Changing any post requires a full rebuild and redeploy. |
| 9 | **No author field** | `BlogPost` type has no author. No multi-author support. |
| 10 | **No reading time** | No word count or estimated reading time. |

---

## 8. Dependencies (Blog-Relevant)

From `package.json`:

| Package | Version | Role |
|---------|---------|------|
| `@tailwindcss/typography` | ^0.5.13 | Prose styling for post content |
| `fuse.js` | ^7.0.0 | Client-side full-text search |
| `html-to-text` | ^9.0.5 | HTML-to-plaintext for search indexing |
| `jsdom` | ^24.1.1 | DOM manipulation during search index build |
| `glob` | ^10.4.5 | File globbing for build-time index |
| `super-sitemap` | — | Automatic sitemap generation |

No markdown processors (mdsvex, marked, remark, rehype) are present.
