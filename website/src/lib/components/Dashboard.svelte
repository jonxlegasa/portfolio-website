<script lang="ts">
	// Sample data for the cards
	const cards = [
		{
			title: 'Google Calendar',
			description:
				'Connect your agent to your Google Calendar to manage events, meetings, deadlines, etc.',
			buttonText: 'Connect'
		},
		{
			title: 'Canvas LMS',
			description:
				'Connet your agent to your Canvas classes to manage assignments, announcments, etc.',
			buttonText: 'Connect'
		}
	];
</script>

<div
	class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
	style="background-color: #070F2B;"
>
	{#each cards as card}
		<div class="card w-full bg-base-100 shadow-xl" style="background-color: #1B1A55;">
			<div class="card-body">
				<h2 class="card-title text-white text-lg">{card.title}</h2>
				<p class="text-gray-300">{card.description}</p>
				<div class="card-actions justify-end mt-4">
					<button class="btn btn-primary">{card.buttonText}</button>
				</div>
			</div>
		</div>
	{/each}
</div>
