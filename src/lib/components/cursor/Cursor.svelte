<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// --- constants ---
	const COLOR = '#abb2bf';
	const BALL_R = 5;
	const GLOW_R = 12;
	const GLOW_ALPHA = 0.25;
	const TRAIL_LEN = 16;
	const TRAIL_MAX_WIDTH = 3;
	const TRAIL_MIN_WIDTH = 0.5;
	const TRAIL_MAX_ALPHA = 0.5;
	const LERP = 0.15;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		// --- safeguard: reduced motion ---
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		// --- safeguard: touch-only devices ---
		if (!window.matchMedia('(pointer: fine)').matches) return;

		const ctx = canvas.getContext('2d')!;
		const dpr = window.devicePixelRatio || 1;

		// --- ring buffer for trail (x, y pairs) ---
		const buf = new Float64Array(TRAIL_LEN * 2);
		let head = 0;
		let trailCount = 0;

		// --- state ---
		let mouseX = 0;
		let mouseY = 0;
		let ballX = 0;
		let ballY = 0;
		let hasMoved = false;
		let inViewport = true;
		let rafId = 0;

		// --- canvas sizing ---
		function resize() {
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}
		resize();
		window.addEventListener('resize', resize);

		// --- hide system cursor ---
		document.documentElement.classList.add('custom-cursor');

		// --- mouse tracking ---
		function onMouseMove(e: MouseEvent) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			if (!hasMoved) {
				ballX = mouseX;
				ballY = mouseY;
				hasMoved = true;
			}
		}

		function onMouseEnter() {
			inViewport = true;
		}

		function onMouseLeave() {
			inViewport = false;
		}

		document.addEventListener('mousemove', onMouseMove);
		document.documentElement.addEventListener('mouseenter', onMouseEnter);
		document.documentElement.addEventListener('mouseleave', onMouseLeave);

		// --- visibility pausing ---
		function onVisibility() {
			if (document.hidden) {
				cancelAnimationFrame(rafId);
			} else {
				rafId = requestAnimationFrame(frame);
			}
		}
		document.addEventListener('visibilitychange', onVisibility);

		// --- frame loop ---
		function frame() {
			rafId = requestAnimationFrame(frame);

			if (!hasMoved || !inViewport) {
				ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
				return;
			}

			// lerp ball toward mouse
			ballX += (mouseX - ballX) * LERP;
			ballY += (mouseY - ballY) * LERP;

			// push into ring buffer
			const idx = head * 2;
			buf[idx] = ballX;
			buf[idx + 1] = ballY;
			head = (head + 1) % TRAIL_LEN;
			if (trailCount < TRAIL_LEN) trailCount++;

			// clear
			ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

			// draw trail
			if (trailCount > 1) {
				for (let i = 1; i < trailCount; i++) {
					const t = i / trailCount; // 0 = oldest, 1 = newest
					const curIdx = ((head - trailCount + i + TRAIL_LEN) % TRAIL_LEN) * 2;
					const prevIdx = ((head - trailCount + i - 1 + TRAIL_LEN) % TRAIL_LEN) * 2;

					const x0 = buf[prevIdx];
					const y0 = buf[prevIdx + 1];
					const x1 = buf[curIdx];
					const y1 = buf[curIdx + 1];

					ctx.beginPath();
					ctx.moveTo(x0, y0);
					ctx.lineTo(x1, y1);
					ctx.strokeStyle = `rgba(171,178,191,${t * TRAIL_MAX_ALPHA})`;
					ctx.lineWidth = TRAIL_MIN_WIDTH + t * (TRAIL_MAX_WIDTH - TRAIL_MIN_WIDTH);
					ctx.lineCap = 'round';
					ctx.stroke();
				}
			}

			// draw glow
			const glow = ctx.createRadialGradient(ballX, ballY, 0, ballX, ballY, GLOW_R);
			glow.addColorStop(0, `rgba(171,178,191,${GLOW_ALPHA})`);
			glow.addColorStop(1, 'rgba(171,178,191,0)');
			ctx.beginPath();
			ctx.arc(ballX, ballY, GLOW_R, 0, Math.PI * 2);
			ctx.fillStyle = glow;
			ctx.fill();

			// draw ball
			ctx.beginPath();
			ctx.arc(ballX, ballY, BALL_R, 0, Math.PI * 2);
			ctx.fillStyle = COLOR;
			ctx.fill();
		}

		rafId = requestAnimationFrame(frame);

		// --- cleanup ---
		return () => {
			cancelAnimationFrame(rafId);
			document.documentElement.classList.remove('custom-cursor');
			document.removeEventListener('mousemove', onMouseMove);
			document.documentElement.removeEventListener('mouseenter', onMouseEnter);
			document.documentElement.removeEventListener('mouseleave', onMouseLeave);
			document.removeEventListener('visibilitychange', onVisibility);
			window.removeEventListener('resize', resize);
		};
	});
</script>

{#if browser}
	<canvas
		bind:this={canvas}
		style="position:fixed;top:0;left:0;z-index:9999;pointer-events:none;"
	></canvas>
{/if}

<style>
	:global(html.custom-cursor),
	:global(html.custom-cursor *) {
		cursor: none !important;
	}
</style>
