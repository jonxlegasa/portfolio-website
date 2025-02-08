<script lang="ts">
	// You could extend this with active link styling using SvelteKit's $page store if needed.
</script>

<nav class="bg-secondary-bg p-4 text-white shadow">
	<div class="container mx-auto flex items-center justify-between">
		<!-- Logo or Site Title -->
		<div class="text-2xl font-bold">Jon's Portfolio</div>
		<!-- Navigation Links -->
		<div class="flex space-x-6 text-lg">
			<a href="/" class="transition-colors hover:text-primary-accent">Home</a>
			<a href="/projects" class="transition-colors hover:text-primary-accent">Projects</a>
			<a href="/tutoring" class="transition-colors hover:text-primary-accent">Tutoring</a>
		</div>
	</div>
</nav>
