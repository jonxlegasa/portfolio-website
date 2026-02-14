# Chatbot UI Component

## Purpose

A reusable chat interface component for the portfolio website. Currently implemented inline on `/projects`, this document captures the design so it can be extracted into a standalone Svelte component and reused on other pages (e.g. a general "Ask Jon" assistant, a blog search, etc.).

## Current Implementation

`website/src/routes/projects/+page.svelte` — inline, not yet extracted.

## Visual Design

### Input Bar
- Pill-shaped: `rounded-full bg-secondary-bg`
- Whole-component highlight on hover/focus: `border border-transparent hover:border-primary-accent focus-within:border-primary-accent`
- Inner input has all default browser/forms-plugin styling suppressed: `border-0 shadow-none ring-0 focus:border-0 focus:ring-0 outline-none`
- Left icon: smiley face SVG (agent avatar) in `text-primary-accent`
- Right icon: arrow-up send button in `text-dimmed-text`, highlights to `text-primary-accent` on hover
- Width: `max-w-2xl mx-auto`
- Placeholder: configurable (currently "Ask me about my projects...")

### Chat Area
- Appears above the input bar only when messages exist
- Scrollable container: `max-h-80 overflow-y-auto`
- Auto-scrolls to bottom on new messages

### Message Bubbles
- **User messages**: right-aligned, `bg-primary-accent/20` tint, `rounded-2xl rounded-br-sm`, `max-w-[75%]`
- **Agent messages**: left-aligned, `bg-secondary-bg`, `rounded-2xl rounded-bl-sm`, `max-w-[75%]`, preceded by the smiley avatar icon

### Theme Integration
- All colors use the Atom One Dark palette defined in `website/tailwind.config.ts`
- Matches the project card interaction pattern (transparent border -> accent border on hover)

## Data Model

```typescript
interface ChatMessage {
  role: 'user' | 'agent';
  text: string;
}
```

## Behavior

### Input
- Enter key sends the message (Shift+Enter does nothing special yet)
- Send button (arrow-up) also triggers send
- Empty messages are ignored

### Message Flow (current: fake)
- User message is pushed to `messages` array
- Input is cleared
- A fake response is selected from a rotating pool and pushed after `tick()`
- Chat area scrolls to bottom

### External Input Population
- Other UI elements (e.g. tag filter) can populate `userInput` reactively
- On `/projects`, selecting language tags fills the input with "Show me projects using X & Y"

## Future: Extraction as Component

When ready to extract, the component should accept these props:

```typescript
interface ChatBoxProps {
  placeholder?: string;       // Input placeholder text
  avatarIcon?: Snippet;       // Custom avatar SVG (default: smiley face)
  onSend: (text: string) => Promise<string> | string;  // Handler that returns agent response
}
```

### Extraction Checklist
- [ ] Create `website/src/lib/components/ChatBox.svelte`
- [ ] Move chat state (`messages`, `userInput`, `chatArea`) into component
- [ ] Accept `onSend` callback prop — caller provides the response logic (fake, API, AI agent, etc.)
- [ ] Accept optional `placeholder` and `avatarIcon` props
- [ ] Expose `populateInput(text: string)` for external input population (tag filters, etc.)
- [ ] Replace inline implementation on `/projects` with `<ChatBox />`

## Future: Real Agent Integration

The `onSend` callback is the integration point. When a real agent backend exists:
- Replace the fake response pool with an API call
- Add typing indicator (three dots animation in an agent bubble)
- Add streaming support (append characters to the agent bubble as they arrive)
- Connect to project data so the agent can answer questions about repos
