<script>
  import { page } from '$app/stores';
</script>

<div class="flex min-h-screen items-center justify-center bg-primary-bg px-6 text-center">
  <div>
    <span class="text-8xl font-bold text-primary-accent">{$page.status}</span>
    <h1 class="mt-6 text-4xl font-bold text-primary-text">OOPS! We'll be right back.</h1>
    <p class="mt-4 text-lg text-dimmed-text">
      {$page.error?.message ?? 'Something went wrong.'}
    </p>
    <a
      href="/"
      class="mt-8 inline-block rounded-lg bg-secondary-bg px-6 py-3 text-primary-accent transition-colors hover:bg-surface"
    >
      Go home
    </a>
  </div>
</div>
