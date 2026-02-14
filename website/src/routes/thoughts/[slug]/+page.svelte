<script lang="ts">
  import { siteConfig } from '$lib/config';
  import Tag from '$lib/components/Tag.svelte';

  let { data } = $props();

  const postUrl = `${siteConfig.url}/thoughts/${data.post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.post.title,
    description: data.post.description,
    datePublished: data.post.date,
    author: {
      '@type': 'Person',
      name: data.post.author
    },
    url: postUrl
  };
</script>

<svelte:head>
  <title>{data.post.title} — {siteConfig.blog.name}</title>
  <meta name="description" content={data.post.description} />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.description} />
  <meta property="og:url" content={postUrl} />
  <meta property="article:published_time" content={data.post.date} />
  <meta property="article:author" content={data.post.author} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.description} />

  <!-- JSON-LD -->
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="min-h-screen bg-primary-bg p-8 text-white">
  <div class="mx-auto max-w-3xl">
    <a href="/thoughts" class="text-secondary-accent hover:underline">&larr; Back to thoughts</a>

    <article class="mt-6">
      <h1 class="text-4xl font-bold">{data.post.title}</h1>
      <div class="mt-3 text-sm text-gray-400">
        <span>{data.post.date}</span>
        <span class="mx-2">·</span>
        <span>{data.post.author}</span>
      </div>
      <div class="mt-2 flex flex-wrap gap-2">
        {#each data.post.tags as tag}
          <Tag {tag} mode="link" href="/thoughts/tag/{tag}" />
        {/each}
      </div>

      <div class="prose prose-invert mt-8 max-w-none">
        <data.content />
      </div>
    </article>
  </div>
</div>
