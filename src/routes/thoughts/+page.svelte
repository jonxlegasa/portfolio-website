<script lang="ts">
  import Tag from '$lib/components/Tag.svelte';
  import TagFilter from '$lib/components/TagFilter.svelte';

  let { data } = $props();

  let selectedTags = $state(new Set<string>());

  function toggleTag(tag: string) {
    const next = new Set(selectedTags);
    if (next.has(tag)) {
      next.delete(tag);
    } else {
      next.add(tag);
    }
    selectedTags = next;
  }

  let filteredPosts = $derived(
    selectedTags.size === 0
      ? data.posts
      : data.posts.filter((post) => post.tags.some((t: string) => selectedTags.has(t)))
  );
</script>

<svelte:head>
  <title>Thoughts — Jon's Portfolio</title>
  <meta name="description" content="Thoughts on math, CS, AI/ML, and full-stack development." />
</svelte:head>

<div class="min-h-screen bg-primary-bg p-8 text-white">
  <div class="mx-auto max-w-3xl">
    <h1 class="mb-8 text-4xl font-bold">Thoughts</h1>

    <TagFilter tags={data.tags} bind:selectedTags />

    <div class="space-y-8">
      {#each filteredPosts as post}
        <article class="rounded-lg bg-secondary-bg p-6">
          <a href="/thoughts/{post.slug}" class="group">
            <h2 class="text-2xl font-bold group-hover:text-primary-accent">{post.title}</h2>
          </a>
          <div class="mt-2 text-sm text-gray-400">
            <span>{post.date}</span>
            <span class="mx-2">·</span>
            <span>{post.author}</span>
          </div>
          <p class="mt-3 text-gray-300">{post.description}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            {#each post.tags as tag}
              <Tag {tag} mode="button" onclick={() => toggleTag(tag)} />
            {/each}
          </div>
        </article>
      {:else}
        <div class="flex flex-col items-center justify-center py-20 text-center">
          <span class="text-6xl">😕</span>
          <h2 class="mt-6 text-3xl font-bold text-primary-text">WHERE'S THE POSTS???</h2>
          <p class="mt-3 text-lg text-dimmed-text">Oops, something seems wrong. Check back soon!</p>
        </div>
      {/each}
    </div>
  </div>
</div>
