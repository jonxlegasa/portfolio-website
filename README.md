# Jon's Portfolio

Personal portfolio & blog built with SvelteKit 5, Tailwind CSS, & mdsvex.

## Tech Stack

- **Framework**: SvelteKit 5 + TypeScript
- **Styling**: Tailwind CSS (Atom One Dark theme)
- **Blog**: mdsvex (Markdown in Svelte)
- **Deployment**: Vercel (`@sveltejs/adapter-vercel`)
- **Package Manager**: bun

## Pages

| Route | Description |
|---|---|
| `/` | Home — intro & typing animation |
| `/projects` | GitHub repos with language & tag badges |
| `/thoughts` | Blog listing with tag filtering |
| `/thoughts/[slug]` | Individual blog post |
| `/thoughts/tag/[tag]` | Posts filtered by tag |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Environment Variables

A `GITHUB_TOKEN` (classic, with `read:user` scope) is required to fetch GitHub repos on the projects page. Create a `.env` file:

```
GITHUB_TOKEN=ghp_...
```

## License

MIT
