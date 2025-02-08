<script lang="ts">
	import { onMount } from 'svelte';

	// Interest array for the blinking typing effect

	const interests = [
		'AI/ML.',
		'Full-stack development.',
		'Physics.',
		'Mathematics.',
		'Golang and concurrent systems.',
		'WebSockets and real-time systems.',
		'Svelte and SvelteKit.',
		'C++ and low-level programming.',
		'Cryptography and security.',
		'Algorithm design and data structures.',
		'History, politics, and philosophy.',
		'Game development and interactive simulations.',
		'Soccer, especially as a goalkeeper.',
		'Building AI-driven social engineering games.',
		'Organizing Minecraft events and gamified experiences.'
	];

	let currentInterest = '';
	let currentIndex = 0;
	let charIndex = 0;
	const typingSpeed = 150; // in ms per character
	const pauseDuration = 1000; // in ms after finishing a word

	function typeInterest() {
		const word = interests[currentIndex];
		if (charIndex < word.length) {
			currentInterest += word[charIndex];
			charIndex++;
			setTimeout(typeInterest, typingSpeed);
		} else {
			// Wait, then clear and move to next interest
			setTimeout(() => {
				currentInterest = '';
				charIndex = 0;
				currentIndex = (currentIndex + 1) % interests.length;
				typeInterest();
			}, pauseDuration);
		}
	}

	onMount(() => {
		typeInterest();
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-primary-bg p-8 text-white">
	<div class="flex flex-col items-center gap-8 md:flex-row">
		<!-- Circular Avatar -->
		<img
			src="../lib/images/profile-img.jpg"
			alt="Jon's Profile Picture"
			class="h-32 w-32 rounded-full object-cover md:h-40 md:w-40"
		/>

		<!-- Text Section -->
		<div class="text-center md:text-left">
			<h1 class="text-5xl font-bold">Hi, My name is Jon!</h1>
			<p class="mt-4 text-lg font-light">
				I'm a Spanish-Dominican mathematician and developer passionate about AI, machine learning,
				and real-time systems. I specialize in Golang, Python, and Svelte, building multi-agent
				applications and web-based AI tools. When I’m not coding, I’m on the soccer field as a
				goalkeeper or exploring history and philosophy. I'm a Dominican-Basque Mathematics major at
				Baruch College with a passion for machine learning, programming, and creative projects. I
				enjoy exploring low-level hardware projects and screenwriting, and I love experimenting with
				modern tech like Golang and SvelteKit.
			</p>
			<p class="mt-6 text-xl font-light">
				I am interested in <span class="font-mono">{currentInterest}</span><span class="cursor"
					>|</span
				>
			</p>
		</div>
	</div>
</div>

<style>
	/* Optional: a simple blinking cursor effect */
	.cursor {
		display: inline-block;
		width: 1ch;
		background-color: transparent;
		animation: blink 1s steps(2, start) infinite;
	}
	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
