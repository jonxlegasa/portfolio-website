<script lang="ts">
	type Step = {
		title: string;
		description: string;
	};

	export let steps: Step[] = []; // Array of Step objects
</script>

<section class="p-10 items-center justify-center">
	<ul class="steps">
		{#each steps as step, index}
			<li class={`step ${index <= steps.length ? 'step-neutral dark:step-primary' : ''}`}>
				<div class="step-title dark:text-white text-2xl">{step.title}</div>
				<div class="step-description dark:text-white">{step.description}</div>
			</li>
		{/each}
	</ul>
</section>
