<script>
  import { page } from '$app/stores';

  let drawerOpen = $state(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/thoughts', label: 'Thoughts' },
    { href: '/projects', label: 'Projects' },
  ];

  function isActive(pathname, href) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  function closeDrawer() {
    drawerOpen = false;
  }
</script>

<nav class="bg-secondary-bg p-4 text-dimmed-text">
  <div class="container mx-auto flex items-center justify-between">
    <!-- Hamburger button (mobile only, left side) -->
    <button
      class="text-primary-text sm:hidden"
      onclick={() => drawerOpen = !drawerOpen}
      aria-label="Toggle menu"
      aria-expanded={drawerOpen}
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {#if drawerOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        {/if}
      </svg>
    </button>

    <a href="/" class="text-primary-text transition-colors hover:text-primary-accent" aria-label="Home">
      <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    </a>

    <!-- Desktop links -->
    <div class="hidden space-x-6 text-lg font-bold sm:flex">
      {#each links as { href, label }}
        <a
          {href}
          class="border-b-2 pb-1 transition-colors {isActive($page.url.pathname, href)
            ? 'border-primary-accent text-primary-text'
            : 'border-transparent hover:text-primary-text'}"
        >
          {label}
        </a>
      {/each}
    </div>

    <!-- Spacer for mobile to balance layout -->
    <div class="w-6 sm:hidden"></div>
  </div>
</nav>

<!-- Mobile drawer overlay -->
{#if drawerOpen}
  <!-- Backdrop -->
  <button
    class="fixed inset-0 z-40 bg-black/50"
    onclick={closeDrawer}
    aria-label="Close menu"
  ></button>

  <!-- Drawer -->
  <div class="fixed inset-y-0 left-0 z-50 w-64 bg-surface p-6 shadow-lg">
    <div class="mb-8 flex items-center justify-between">
      <span class="text-lg font-bold text-primary-text">Menu</span>
      <button
        class="text-dimmed-text hover:text-primary-text"
        onclick={closeDrawer}
        aria-label="Close menu"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col space-y-4 text-lg font-bold">
      {#each links as { href, label }}
        <a
          {href}
          class="border-l-2 pl-3 transition-colors {isActive($page.url.pathname, href)
            ? 'border-primary-accent text-primary-text'
            : 'border-transparent text-dimmed-text hover:text-primary-text'}"
          onclick={closeDrawer}
        >
          {label}
        </a>
      {/each}
    </div>
  </div>
{/if}
