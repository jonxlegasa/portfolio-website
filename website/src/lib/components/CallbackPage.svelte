<script lang="ts">
	export let funny_message: string;
	export let dots: string;
	// TODO: For now, I am going to create a redirect component that I can just call whenever I need to redirect the user for oauth2
</script>

<div class="flex items-center justify-center min-h-screen bg-white">
	<h1 class="text-4xl font-bold text-gray-900">
		Redirecting<span>{dots}</span>
	</h1>

	<h2 class="text-2xl">{funny_message}</h2>
</div>
