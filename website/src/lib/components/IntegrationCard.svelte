<script lang="ts">
	export let name: string;
	export let description: string;
	export let iconSrc: string;
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
	<div class="p-4">
		<div class="flex justify-between items-start mb-4">
			<div class="flex items-center space-x-4">
				<div class="flex-shrink-0">
					<img
						src={iconSrc}
						alt={name}
						class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 p-2"
					/>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
				</div>
			</div>
			<p
				class="btn btn-outline btn-success text-md font-medium bg-transparent text-green-500 border border-green-500 rounded transition-colors duration-200 ml-2 pointer-events-none"
			>
				Connected
			</p>
		</div>
		<div class="mt-4 flex justify-start">
			<form class="space-y-6 my-4" method="POST" action="?/googleCalendarAuth">
				<button type="submit" class="btn bg-black text-white">Connect app</button>
			</form>
		</div>
	</div>
</div>
