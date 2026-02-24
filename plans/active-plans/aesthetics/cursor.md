# White Cursor with Trailing Streak

Decorative canvas overlay: a clean white ball replaces the system cursor and leaves
a fading, tapering streak trail as it moves. Styled to match the Atom One Dark palette —
white-on-dark like a terminal cursor moving through code.

## Architecture

### File Structure

```
src/lib/
├── components/cursor/
│   └── Cursor.svelte         — Canvas overlay: white ball + trail + system cursor hiding
└── routes/
    └── +layout.svelte        — Mounts <Cursor /> globally
```

### Drawing

- **Core ball**: Solid `#abb2bf` (primary-text) circle, r=5, at lerp-smoothed position
- **Glow**: Radial gradient (r=12, ~2.5x ball) from `rgba(171,178,191,0.25)` → transparent
  - Subtle, not flashy — just enough to lift the dot off the dark background
- **Trail**: Ring buffer of 16 interpolated positions drawn segment-by-segment
  - Color: `#abb2bf` fading to transparent over the buffer length
  - Oldest: thin (0.5px) + transparent → Newest: thick (3px) + 50% opacity
  - `Float64Array` ring buffer — zero per-frame allocations

### Color Rationale

The cursor uses `primary-text` (`#abb2bf`) rather than pure white (`#fff`) because:
- Pure white is too harsh against the `#282c34` background
- `#abb2bf` is the exact color of text in the editor theme — the cursor looks like it belongs
- The glow uses the same color at reduced alpha, keeping everything monochromatic

### Smooth Following

- `ballX += (mouseX - ballX) * 0.15` each frame (lerp)
- Ball snaps to first known mouse position (no ball at 0,0 on load)

### System Cursor Hiding

- On mount: `document.documentElement.classList.add('custom-cursor')`
- CSS: `:global(html.custom-cursor), :global(html.custom-cursor *) { cursor: none !important }`
- On unmount: class removed, system cursor restored

### Canvas Setup

- `position: fixed; z-index: 9999; pointer-events: none`
- Scaled by `devicePixelRatio` via `setTransform()` for crisp HiDPI rendering
- Resized on `window.resize`

## Performance Safeguards

| Safeguard | Notes |
|-----------|-------|
| `prefers-reduced-motion` — don't mount canvas, restore system cursor | Accessibility first |
| `visibilitychange` pausing — cancel rAF when tab hidden | Save battery |
| Ring buffer (`Float64Array` + head pointer) — no per-frame allocations | GC-free |
| `(pointer: fine)` media query — skip on touch-only devices | No cursor on mobile |
| Skip drawing until first `mousemove` | No phantom ball at origin |
| `mouseenter`/`mouseleave` on `documentElement` — skip draw when mouse outside viewport | Clean edges |

## Session Evolution

@architect: Replace the system cursor with a white ball that leaves a fading streak trail. Should match the Atom One Dark palette — white on dark, like a terminal cursor. Delete the gravitational background plan, it's scrapped.

@claude-opus-4.6: Implemented white cursor overlay.
- `Cursor.svelte`: Canvas-based cursor with lerp-smoothed `#abb2bf` ball (r=5), radial glow (r=12, 25% alpha), and Float64Array ring-buffer trail (16 positions, 0.5→3px width, fading alpha)
- `+layout.svelte`: Mounted `<Cursor />` globally before `<Navbar />`
- System cursor hidden via `html.custom-cursor` CSS class, restored on unmount/reduced-motion
- All 6 performance safeguards implemented: reduced-motion skip, pointer:fine gate, visibility pausing, first-move skip, viewport leave detection, ring buffer (zero GC)
- Build verified clean
