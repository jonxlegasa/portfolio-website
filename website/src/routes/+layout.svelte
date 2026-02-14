<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<svelte:head>
  <title>Jon's Portfolio</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</svelte:head>

<Navbar />
{@render children()}
