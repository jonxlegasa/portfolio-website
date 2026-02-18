<script lang="ts">
  import { getTagColor } from '$lib/helpers';

  interface TagProps {
    tag: string;
    size?: 'sm' | 'md';
    mode?: 'static' | 'link' | 'button';
    href?: string;
    onclick?: () => void;
    selected?: boolean;
  }

  let { tag, size = 'sm', mode = 'static', href, onclick, selected }: TagProps = $props();

  let sizeClasses = $derived(size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs');

  let selectedClasses = $derived(
    mode === 'button' && selected !== undefined
      ? selected
        ? 'opacity-100 ring-2 ring-white/30'
        : 'opacity-50'
      : 'hover:opacity-80'
  );
</script>

{#if mode === 'link'}
  <a
    {href}
    class="rounded-full {sizeClasses} {getTagColor(tag)} hover:opacity-80"
  >
    {tag}
  </a>
{:else if mode === 'button'}
  <button
    {onclick}
    class="rounded-full transition-opacity {sizeClasses} {getTagColor(tag)} {selectedClasses}"
  >
    {tag}
  </button>
{:else}
  <span class="rounded-full {sizeClasses} {getTagColor(tag)}">
    {tag}
  </span>
{/if}
