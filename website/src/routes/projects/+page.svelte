<script lang="ts">
  import { getLanguageColor } from '$lib/helpers';
  import { tick } from 'svelte';
  import TagFilter from '$lib/components/TagFilter.svelte';

  let { data } = $props();

  let selectedTags = $state(new Set<string>());

  let filteredRepos = $derived(
    selectedTags.size === 0
      ? data.repos
      : data.repos.filter((repo) => repo.languages.some((l) => selectedTags.has(l)))
  );

  interface ChatMessage {
    role: 'user' | 'agent';
    text: string;
  }

  let messages = $state<ChatMessage[]>([]);
  let userInput = $state('');
  let chatArea: HTMLDivElement;

  const fakeResponses = [
    "I'd love to help you explore Jon's projects! These span AI/ML, physics simulations, web apps, & more.",
    "Great question! Jon has worked on everything from physics-informed neural networks to full-stack web applications.",
    "Let me look into that... Jon's repositories cover a wide range — from computational modeling to generative AI.",
    "Interesting! You might want to check out the pinned repos below — they represent Jon's best work.",
  ];

  async function sendMessage() {
    const text = userInput.trim();
    if (!text) return;

    messages.push({ role: 'user', text });
    userInput = '';

    await tick();

    const response = fakeResponses[messages.filter(m => m.role === 'agent').length % fakeResponses.length];
    messages.push({ role: 'agent', text: response });

    await tick();
    if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
  }

  $effect(() => {
    if (selectedTags.size > 0) {
      userInput = `Show me projects using ${[...selectedTags].join(' & ')}`;
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<svelte:head>
  <title>Projects — Jon's Portfolio</title>
  <meta name="description" content="Pinned GitHub projects by Jon Legasa — math, physics, AI/ML, and more." />
  <meta property="og:title" content="Projects — Jon's Portfolio" />
  <meta property="og:description" content="Pinned GitHub projects by Jon Legasa." />
</svelte:head>

<div class="min-h-screen bg-primary-bg p-8 text-primary-text">
  <h1 class="mb-8 text-center text-5xl font-bold">Projects</h1>

  <div class="mx-auto mb-8 max-w-2xl">
    {#if messages.length > 0}
      <div bind:this={chatArea} class="mb-4 max-h-80 space-y-3 overflow-y-auto px-2">
        {#each messages as msg}
          {#if msg.role === 'user'}
            <div class="flex justify-end">
              <div class="max-w-[75%] rounded-2xl rounded-br-sm bg-primary-accent/20 px-4 py-2 text-sm text-primary-text">
                {msg.text}
              </div>
            </div>
          {:else}
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="mt-1 h-6 w-6 shrink-0 text-primary-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              <div class="max-w-[75%] rounded-2xl rounded-bl-sm bg-secondary-bg px-4 py-2 text-sm text-primary-text">
                {msg.text}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}

    <div class="flex items-center rounded-full border border-transparent bg-secondary-bg px-4 py-3 transition-colors hover:border-primary-accent focus-within:border-primary-accent">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-3 h-6 w-6 shrink-0 text-primary-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
      <input
        type="text"
        placeholder="Ask me about my projects..."
        bind:value={userInput}
        onkeydown={handleKeydown}
        class="w-full border-0 bg-transparent text-primary-text placeholder-dimmed-text/70 shadow-none outline-none ring-0 focus:border-0 focus:ring-0"
      />
      <button onclick={sendMessage} class="ml-3 shrink-0 text-dimmed-text transition-colors hover:text-primary-accent" aria-label="Send message">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
        </svg>
      </button>
    </div>
  </div>

  <div class="mx-auto max-w-5xl">
    <TagFilter tags={data.tags} bind:selectedTags />
  </div>

  {#if data.repos.length > 0}
    <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each filteredRepos as repo (repo.name)}
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          class="group rounded-lg border border-transparent bg-secondary-bg p-6 transition-colors hover:border-primary-accent"
        >
          <h2 class="mb-2 text-xl font-bold text-primary-text group-hover:text-primary-accent">
            {repo.name}
          </h2>
          <p class="text-sm text-dimmed-text">{repo.description ?? 'No description.'}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            {#each repo.languages as lang}
              <span class="rounded-full px-2 py-0.5 text-xs {getLanguageColor(lang)}">
                {lang}
              </span>
            {/each}
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center py-20 text-center">
      <span class="text-6xl">🔧</span>
      <h2 class="mt-6 text-3xl font-bold text-primary-text">Projects loading...</h2>
      <p class="mt-3 text-lg text-dimmed-text">
        Set <code class="rounded bg-surface px-1">GITHUB_TOKEN</code> to fetch pinned repos from GitHub.
      </p>
    </div>
  {/if}
</div>
