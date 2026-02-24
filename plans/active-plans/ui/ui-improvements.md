# UI Improvements Plan

## Context

Audit of the portfolio website identified several UI gaps across all pages. This plan captures each improvement area with open questions for @architect to answer before implementation.

---

## 1. Navbar — Mobile Menu & Active Link

**Problem**: Nav links overflow/wrap on small screens. No visual indicator of the current page.
`Ref: website/src/lib/components/Navbar.svelte:L4-L8`

**Proposed**:
- Add a hamburger button that toggles a mobile drawer/dropdown on `sm:` and below
- Highlight the active link (e.g. underline or accent color) based on `$page.url.pathname`

**Questions for @architect**:
- Q1: Hamburger menu style — slide-in drawer from the right, or a dropdown that pushes content down? @architect: slide-in-drawer from the left is preferred. so the burger icon should be on the left. @claude-opus-4.6: Got it — left-side slide-in drawer with burger icon on the left. Will implement with a fixed overlay that slides in from the left edge.
- Q2: Should the site title "Jon's Portfolio" link back to `/`? I think I would prefer a home icon. @claude-opus-4.6: Understood — will replace the text link with a home icon that navigates to `/`. Will use a simple house/home SVG icon.
- Q3: Any preference on the active link style (underline, background pill, accent color, bold)? I think we need to talk about this more. I am a big fan of the Atom One Dark Theme. Maybe we can figure something out like that? @claude-opus-4.6: RESOLVED — will use Atom One Dark's tab metaphor: active link gets a bottom border accent in the theme's blue (`#61afef`) with full-brightness text (`#abb2bf`), inactive links use dimmed text (`#5c6370`). This mirrors how Atom highlights the active editor tab. Clean, minimal, and on-brand.

---

## 2. Projects Page — Card Visibility & Content

**Problem**: Cards use `bg-primary-bg` on a `bg-primary-bg` page — completely invisible. Still has placeholder dummy data. Missing `<svelte:head>` for SEO.
`Ref: website/src/routes/projects/+page.svelte:L11-L21`
@architect: Oh yea polish this up and propose some SEO optimizations. @claude-opus-4.6: Will add `<svelte:head>` with title, meta description, and Open Graph tags. Will also ensure semantic HTML structure for better crawlability.

**Proposed**:
- Change card background to `bg-secondary-bg` (matches the thoughts page card pattern)
- Add `<svelte:head>` with title and meta description
- Replace dummy data with real projects

@architect: I am a BIG fan of the atom one dark theme. Maybe we can do something here with that. @claude-opus-4.6: Noted — will use Atom One Dark's palette for card styling. Think `#282c34` background, `#abb2bf` text, with accent borders in the theme's blue (`#61afef`) or green (`#98c379`). Will tie this into the overall color system.

**Questions for @architect**:
- Q4: Can you provide your real project list (name, description, link/repo URL, tech stack)? @architect: I think a great idea would be to make a simple helper function in utils (this can just be in helpers.ts I do not mind) where we can pull from github my PINNEd projects. Is it possible to pull PINNED projects and list them in a similar fashion with descriptions etc? @claude-opus-4.6: Yes, this is doable. GitHub's GraphQL API exposes pinned repos via the `pinnedItems` field on a user profile. We can fetch name, description, URL, and primary language. Will create a `helpers.ts` with a `fetchPinnedRepos()` function. We'll need your GitHub username — will call it at build time or server-side in a `+page.server.ts` load function to avoid exposing API tokens client-side.
- Q5: Should project cards link somewhere (GitHub repo, live demo, detail page)? @architect: Yea the pinned github repo urls that is fine. @claude-opus-4.6: Will link each card directly to the GitHub repo URL from the API response.
- Q6: Do you want project tags/tech badges (similar to blog tag chips)?  @architect: Hmmmmmmm I would say yes actually I like that. We can tlak more about what projects I think should be tagged but I have an idea to tag them based on research orientation or area of interest im looking in @claude-opus-4.6: RESOLVED — initial tag set: `personal`, `math`, `physics`, `ai/ml`, `chess`. Tags are purely manual — defined in a simple array/config so new tags can be added with a one-liner in the future. No auto-fetching from GitHub.

@architect: Replace the intro paragraph on /projects with a chat-style input box. Should look like Anthropic's "Ask Claude about docs..." bar — rounded pill, smiley face avatar icon, search icon, matching the site's modern circular flowy design. When tags are selected, populate the input. Then evolve it into a full chat UI: typing a message shows user/agent bubbles that expand the area between title and input. Fake responses for now — this will become a real agent later. The whole input component should highlight blue on hover/focus like the project cards. No inner input highlighting — suppress all @tailwindcss/forms focus styles.

@claude-opus-4.6: Implemented chat input UI shell on `/projects` page (`website/src/routes/projects/+page.svelte`).
- Replaced `<p>` intro with a pill-shaped input bar (`rounded-full bg-secondary-bg`) with smiley face avatar (left), text input (center), arrow-up send button (right)
- Whole-component hover/focus highlight: `border border-transparent hover:border-primary-accent focus-within:border-primary-accent` on outer wrapper, matching project card pattern
- Suppressed `@tailwindcss/forms` inner input styles: `border-0 shadow-none ring-0 focus:border-0 focus:ring-0 outline-none`
- Added chat message system: `messages` state array, `sendMessage()` handler on Enter/click, fake rotating responses
- User messages: right-aligned, `bg-primary-accent/20` blue tint bubbles
- Agent messages: left-aligned, `bg-secondary-bg` bubbles with smiley avatar icon
- Chat area appears dynamically when messages exist (`max-h-80 overflow-y-auto`, auto-scrolls to bottom)
- Input width `max-w-2xl` for a focused search-bar feel

---

## 3. Thoughts Index — Empty State

**Problem**: If there are zero posts, the page renders nothing — no feedback to the visitor.
`Ref: website/src/routes/thoughts/+page.svelte:L27-L51`

@architect: Yea this is perfect I want to make a funny icon with a confused emoji face with "WHERE's THE POSTS???" @claude-opus-4.6: Love it. Will add a confused face emoji/icon with a "WHERE'S THE POSTS???" header and a lighter paragraph underneath.

**Proposed**:
- Add an `{:else}` block with a friendly "No posts yet — check back soon." message @architect: I like the funny example

**Questions for @architect**:
- Q7: Any specific empty-state message or style preference, or is a simple text message fine? @architect: Uh a header with some paragrpah text like oops something seems wrong. @claude-opus-4.6: Will do — header + paragraph style for the empty state.

@architect: In general I would liek an error page with listing the error and a OOPS will be right back. @claude-opus-4.6: Noted — will track a separate error page (`+error.svelte`) as an additional item. It'll show the error code/message with an "OOPS! We'll be right back." treatment. Adding this as a new work item.

---

## 4. Code Syntax Highlighting

**Problem**: mdsvex uses Prism.js by default but no CSS theme is imported, so code blocks in blog posts are unstyled.
`Ref: plans/active-plans/integrating-blogs.md:L116`

@architect: I like atom one dark @claude-opus-4.6: Perfect, Atom One Dark it is.

**Proposed**:
- Import a Prism.js theme CSS file (e.g. `prism-tomorrow` for dark theme) in `app.css` or the layout @architect: Atom one dark? @claude-opus-4.6: Will use `prism-one-dark` (the Atom One Dark port for Prism.js). Will import it in the global layout or `app.css`.

**Questions for @architect**:
- Q8: Color scheme preference for code blocks? Options: `prism-tomorrow` (dark, matches site), `prism-okaidia` (Monokai-like), `prism-dracula`, or another? @architect: Atom one dark @claude-opus-4.6: RESOLVED — using Atom One Dark for Prism.js code blocks.

---

## 5. ~~Footer~~ @architect: NO FOOTER! @claude-opus-4.6: RESOLVED — no footer. Entire section scrapped.

~~**Problem**: No footer anywhere on the site — no copyright, no repeated social links, no RSS link.~~
~~`Ref: website/src/routes/+layout.svelte:L7-L8`~~

~~**Proposed**:~~
~~- Create a `Footer.svelte` component added to `+layout.svelte`~~
~~- Include: copyright line, social icons (reuse from home page), RSS link to `/thoughts/rss.xml`~~

~~**Questions for @architect**:~~
~~- Q9: Do you want a footer at all, or prefer the minimal no-footer look?~~
~~- Q10: If yes — minimal (just copyright + social icons) or fuller (social icons + RSS link + nav links)?~~

---

## 6. Global Layout & Meta

**Problem**: No default page title or favicon in the root layout. No page transitions.
`Ref: website/src/routes/+layout.svelte`

**Proposed**:
- Add a `<svelte:head>` in `+layout.svelte` with a default `<title>` and favicon `<link>`
- Optionally add a subtle page transition using Svelte's `{#key}` pattern

**Questions for @architect**:
- Q11: Do you have a favicon file, or should we generate one (e.g. initials "J")? @architect: I like the initials JXL @claude-opus-4.6: RESOLVED — will generate a favicon with "JXL" initials. Will create an SVG favicon so it scales cleanly, using the Atom One Dark palette for consistency.
- Q12: Do you want page transitions (fade, slide), or is the instant switch fine? @architect: No transitions @claude-opus-4.6: RESOLVED — no page transitions. Instant switch stays.

---

## 7. Home Page — Social Icon Tooltips

**Problem**: Icon-only links have `aria-label` for screen readers but no visual tooltip for sighted users.
`Ref: website/src/routes/+page.svelte:L68-L84`

**Proposed**:
- Add a `title` attribute to each social link (shows native browser tooltip on hover) @architect: Yea thats good. @claude-opus-4.6: Will implement styled tooltips.

**Questions for @architect**:
- Q13: Native `title` tooltips (zero effort), or styled tooltip popups (more polished)? @architect: yea I like the title tooltips that are styled well. @claude-opus-4.6: RESOLVED — will build styled tooltip popups (CSS-only, positioned above the icon on hover) rather than relying on the browser's native `title` tooltip. Will match Atom One Dark styling.

---

## Status Summary

@claude-opus-4.6: Here's where everything stands:

### ALL RESOLVED (ready to implement)
- Q1: Left-side slide-in drawer, burger icon on left
- Q2: Home icon instead of text link
- Q3: Active link — Atom One Dark tab-style bottom border accent (`#61afef`), dimmed inactive text
- Q4: Fetch pinned repos from GitHub API via `helpers.ts` (name, description, URL, language only — no topics)
- Q5: Cards link to GitHub repo URLs
- Q6: Manual tags only — `personal`, `math`, `physics`, `ai/ml`, `chess`. Extensible config. No GitHub topic fetching.
- Q8: Atom One Dark for code syntax highlighting (Prism.js)
- Q9/Q10: No footer (section scrapped)
- Q11: SVG favicon with "JXL" initials
- Q12: No page transitions
- Q13: Styled tooltip popups (Atom One Dark style)
- Atom One Dark as overall site theme — full palette integration (backgrounds, text, accents)

### NEW WORK ITEM (discovered during review)
- **Error page (`+error.svelte`)**: "OOPS! We'll be right back." with error code/message display. Not in original plan — @architect flagged this as a general need.
