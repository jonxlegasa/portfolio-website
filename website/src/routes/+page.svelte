<script lang="ts">
	import { onMount } from 'svelte';

	const interests = [
		'AI/ML.',
		'Full-stack development.',
		'Physics.',
		'Mathematics.',
		'Svelte.',
		'Cryptography and Cybersecurity.',
		'Algorithm design and data structures.',
		'History, politics, and philosophy.',
		'Game development and interactive simulations.',
		'Building AI-driven social engineering games.',
		'Managing Minecraft servers.',
		'PDEs and dynamical systems.'
	];

	let currentInterest = '';
	let currentIndex = 0;
	let charIndex = 0;
	const typingSpeed = 100; // in ms per character
	const pauseDuration = 1000; // in ms after finishing a word

	function typeInterest() {
		const word = interests[currentIndex];
		if (charIndex < word.length) {
			currentInterest += word[charIndex];
			charIndex++;
			setTimeout(typeInterest, typingSpeed);
		} else {
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
		<div class="text-center">
			<div class="relative mx-auto h-64 w-64">
				<img
					src="profile-img.jpg"
					alt="Jon's Profile Picture"
					class="h-full w-full rounded-full border-4 object-cover shadow-lg"
				/>
			</div>
		</div>

		<div class="mx-auto text-center md:text-left">
			<h1 class="text-5xl font-bold">Hi, my name is Jon Xabier Legasa!</h1>
			<p class="mt-4 text-2xl font-light">
				I am a mathematics major, computer science minor, and full-stack developer passionate about
				AI/ML, dynamical systems, and full-stack apps. I specialize in Golang, Python, and Svelte,
				building multi-agent applications and web-based AI tools. When I’m not coding, I’m on the
				soccer field as a goalkeeper or exploring history and philosophy.
			</p>
			<p class="mt-6 text-xl">
				I am interested in <span class="font-extrabold">{currentInterest}</span><span class="cursor"
					>|</span
				>
			</p>

			<div class="mx-auto inline-flex space-x-5">
				<a href="https://github.com/jonxlegasa" class="mt-6 text-xl underline">Github</a>
				<a href="https://www.linkedin.com/in/jon-legasa-615986253/" class="mt-6 text-xl underline"
					>LinkedIn</a
				>
				<a href="https://x.com/jonxlegasa/" class="mt-6 text-xl underline">Twitter</a>
			</div>
		</div>
	</div>
</div>

<style>
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
