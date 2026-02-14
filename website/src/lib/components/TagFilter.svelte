<script lang="ts">
  import Tag from '$lib/components/Tag.svelte';

  interface TagFilterProps {
    tags: string[];
    selectedTags?: Set<string>;
  }

  let { tags, selectedTags = $bindable(new Set<string>()) }: TagFilterProps = $props();

  function toggleTag(tag: string) {
    const next = new Set(selectedTags);
    if (next.has(tag)) {
      next.delete(tag);
    } else {
      next.add(tag);
    }
    selectedTags = next;
  }
</script>

{#if tags.length > 0}
  <div class="mb-8 flex flex-wrap gap-2">
    {#each tags as tag}
      <Tag {tag} size="md" mode="button" onclick={() => toggleTag(tag)} selected={selectedTags.has(tag)} />
    {/each}
    {#if selectedTags.size > 0}
      <button
        onclick={() => selectedTags = new Set()}
        class="rounded-full bg-surface px-3 py-1 text-sm text-dimmed-text hover:text-primary-text"
      >
        clear
      </button>
    {/if}
  </div>
{/if}
