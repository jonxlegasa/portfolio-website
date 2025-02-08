<script lang="ts">
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';

	// pricing card variables
	export let title: string;
	export let price: number;
	export let description: string;
	export let features: Array<string>;
	export let isYearly: boolean;
</script>

<section>
	<div class="card bg-white dark:bg-gray-800 w-full shadow-xl m-2 transition-colors duration-200">
		<div class="card-body w-auto">
			<h1 class="card-title text-2xl text-gray-900 dark:text-white">{title}</h1>
			<h1 class="card-title text-2xl text-gray-900 dark:text-white">
				{#if isYearly}
					${price}/<span class="font-light text-gray-400 dark:text-gray-300 text-base"
						>year</span
					>
				{:else}
					${price}/<span class="font-light text-gray-400 dark:text-gray-300 text-base"
						>month</span
					>
				{/if}
			</h1>

			<p class="text-gray-600 dark:text-gray-300">{description}</p>
			{#each features as feature}
				<div class="flex items-center p-2">
					<span class="w-5 mr-2 text-green-500 dark:text-green-400">
						<FaCheck />
					</span>
					<span class="text-gray-700 dark:text-gray-200">
						{feature}
					</span>
				</div>
			{/each}
			<div class="card-actions justify-end">
				<button
					class="w-full btn dark:bg-accent-dark hover:bg-gray-300 bg-accent dark:hover:bg-gray-600 text-white dark:text-white transition-colors duration-200"
				>
					Choose plan
				</button>
			</div>
		</div>
	</div>
</section>
