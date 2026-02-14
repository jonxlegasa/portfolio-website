<script lang="ts">
	import { onMount } from 'svelte';

	const interests = [
		'artificial intelligence & machine learning.',
		'building full-stack web applications.',
		'the elegance of theoretical physics.',
		'pure & applied mathematics.',
		'frontend frameworks like Svelte.',
		'cryptography, cybersecurity, & privacy.',
		'designing efficient algorithms & data structures.',
		'the intersections of history, politics, & philosophy.',
		'game development & interactive simulations.',
		'building AI-driven social engineering games.',
		'managing & optimizing Minecraft servers.',
		'partial differential equations & dynamical systems.',
		'physics-informed neural networks & scientific computing.',
		'fluid dynamics & computational modeling.',
		'generative AI & autonomous agents.',
	];

	let currentInterest = $state('');
	let index = 0;
	let charPos = 0;
	let isDeleting = false;

	const TYPE_SPEED = 70;
	const DELETE_SPEED = 35;
	const PAUSE_AFTER_TYPE = 1500;
	const PAUSE_AFTER_DELETE = 400;

	function tick() {
		const text = interests[index];

		if (!isDeleting) {
			// Typing forward
			charPos++;
			currentInterest = text.slice(0, charPos);

			if (charPos >= text.length) {
				// Finished typing — pause then start deleting
				isDeleting = true;
				setTimeout(tick, PAUSE_AFTER_TYPE);
				return;
			}
			setTimeout(tick, TYPE_SPEED);
		} else {
			// Backspacing
			charPos--;
			currentInterest = text.slice(0, charPos);

			if (charPos <= 0) {
				// Finished deleting — move to next interest
				isDeleting = false;
				index = (index + 1) % interests.length;
				setTimeout(tick, PAUSE_AFTER_DELETE);
				return;
			}
			setTimeout(tick, DELETE_SPEED);
		}
	}

	onMount(() => {
		tick();
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-primary-bg px-6 py-16 text-white sm:px-12 md:px-20">
	<div class="flex max-w-3xl flex-col items-center gap-6 text-center">
		<div class="h-52 w-52 shrink-0 sm:h-72 sm:w-72 md:h-80 md:w-80">
			<img
				src="profile-img.jpg"
				alt="Jon's Profile Picture"
				class="h-full w-full rounded-full border-4 object-cover shadow-lg"
			/>
		</div>

		<h1 class="text-5xl font-bold sm:text-6xl md:text-7xl">Hi, my name is Jon!</h1>

		<p class="text-xl font-light sm:text-2xl md:text-3xl">
      I am a life-long learner with an insatiable thirst for knowledge. I <i>currently</i> do research on Physics-Informed Neural Networks, fluid dynamics, Generative AI, & agents.
		</p>

		<p class="text-lg sm:text-xl">
			I am interested in <span class="font-extrabold">{currentInterest}</span><span class="cursor"
				>|</span
			>
		</p>

		<div class="flex items-center space-x-6">
			<a href="https://github.com/jonxlegasa" aria-label="GitHub" class="tooltip transition-colors hover:text-secondary-accent" data-tooltip="GitHub">
				<svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
				</svg>
			</a>
			<a href="https://www.linkedin.com/in/jon-legasa-615986253/" aria-label="LinkedIn" class="tooltip transition-colors hover:text-secondary-accent" data-tooltip="LinkedIn">
				<svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
				</svg>
			</a>
			<a href="https://x.com/jonxlegasa/" aria-label="X (Twitter)" class="tooltip transition-colors hover:text-secondary-accent" data-tooltip="X (Twitter)">
				<svg class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
				</svg>
			</a>
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

	.tooltip {
		position: relative;
	}
	.tooltip::after {
		content: attr(data-tooltip);
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		padding: 4px 10px;
		border-radius: 6px;
		background: #21252b;
		color: #abb2bf;
		font-size: 0.75rem;
		font-weight: 500;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s ease;
	}
	.tooltip:hover::after {
		opacity: 1;
	}
</style>
