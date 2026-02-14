<script lang="ts">
  import Tag from '$lib/components/Tag.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Posts tagged "{data.tag}" — Jon's Portfolio</title>
</svelte:head>

<div class="min-h-screen bg-primary-bg p-8 text-white">
  <div class="mx-auto max-w-3xl">
    <a href="/thoughts" class="text-secondary-accent hover:underline">&larr; All posts</a>

    <h1 class="mb-8 mt-4 text-4xl font-bold">
      Posts tagged <span class="text-primary-accent">"{data.tag}"</span>
    </h1>

    {#if data.posts.length === 0}
      <p class="text-gray-400">No posts found with this tag.</p>
    {:else}
      <div class="space-y-8">
        {#each data.posts as post}
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
                <Tag {tag} mode="link" href="/thoughts/tag/{tag}" />
              {/each}
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</div>
