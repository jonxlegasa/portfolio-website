<script lang="ts">
	// Dummy data for projects (replace with API data when available)
	const projects = [
		{ name: 'Project One', description: 'Description of project one.' },
		{ name: 'Project Two', description: 'Description of project two.' },
		{ name: 'Project Three', description: 'Description of project three.' }
		// Add more projects as needed
	];
</script>

<div class="min-h-screen bg-primary-bg p-8 text-white">
	<h1 class="mb-8 text-center text-5xl font-bold">Projects</h1>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
		{#each projects as project (project.name)}
			<div class="rounded-lg bg-primary-bg p-6 shadow-lg transition-shadow hover:shadow-2xl">
				<h2 class="mb-2 text-2xl font-semibold">{project.name}</h2>
				<p>{project.description}</p>
			</div>
		{/each}
	</div>
</div>
