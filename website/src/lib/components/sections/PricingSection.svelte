<script lang="ts">
	import PricingCard from '../../components/PricingCard.svelte';
	import { calculateYearlyPrice, calculateMonthlyPrice } from '../../utils/calculations';

	type Card = {
		title: string;
		price: number;
		description: string;
		features: Array<string>;
	};

	let isYearly: boolean = false;

	export let cards: Card[] = [];
	const originalPrices: Record<string, number> = {};

	// Store the original prices to ensure accurate conversions
	$: {
		cards.forEach((card) => {
			if (!(card.title in originalPrices)) {
				originalPrices[card.title] = card.price;
			}
		});
	}

	function showYearlyPricing() {
		isYearly = true;
		cards = cards.map((card) => ({
			...card,
			price: calculateYearlyPrice(originalPrices[card.title])
		}));
	}

	function showMonthlyPricing() {
		isYearly = false;
		cards = cards.map((card) => ({
			...card,
			price: originalPrices[card.title] // Reset to original monthly price
		}));
	}
</script>

<section class="flex flex-col items-center justify-center w-full p-5">
	<div class="w-full flex justify-center gap-6 mb-8">
		<button class="btn bg-white dark:bg-accent-dark outline-none" on:click={showMonthlyPricing}>
			Monthly
		</button>
		<button class="btn bg-white dark:bg-accent-dark outline-none" on:click={showYearlyPricing}>
			Yearly
		</button>
	</div>

	<div class="flex flex-wrap justify-center gap-4 max-w-screen-lg">
		{#each cards as card}
			<div class="flex-1 p-4 min-w-[300px] max-w-[400px]">
				<PricingCard
					title={card.title}
					price={card.price}
					description={card.description}
					features={card.features}
					{isYearly}
				/>
			</div>
		{/each}
	</div>
</section>
