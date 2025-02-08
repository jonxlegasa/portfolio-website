<script lang="ts">
	export let error_message: string | undefined;
	export let funny_message: string;
	export let signature: string;

	// TODO: There might be a new error template, but I kinda like this one for now.
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
	<div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
		<h1 class="text-3xl font-bold text-gray-800 mb-4">
			{funny_message} &#128586
		</h1>
		<p class="text-lg text-gray-600 mb-8">{error_message}</p>
		<p class="text-md text-gray-500 italic">{signature}</p>
	</div>
</div>
