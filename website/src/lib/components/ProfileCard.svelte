<script lang="ts">
	export let title: string;
	export let description: string;
	export let tags: string[] = [];
</script>

<div class="flex flex-col overflow-hidden rounded-lg bg-secondary-bg shadow md:flex-row">
	<div class="flex-1 p-4">
		<h3 class="text-xl font-bold">{title}</h3>
		<p class="mt-2">{description}</p>
	</div>
	<div class="flex flex-wrap items-center gap-2 p-4">
		{#each tags as tag}
			<span class="rounded-full bg-primary-accent px-3 py-1 text-sm text-black">{tag}</span>
		{/each}
	</div>
</div>
