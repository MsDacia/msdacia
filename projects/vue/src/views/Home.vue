<template>
	<div class="home">
		<div class="hero-section">
			<h1 class="hero-title">{{ content.common.global.title }}</h1>
			<p class="hero-subtitle">{{ content.common.global.copy }} <em>{{ content.common.global.copy2 }}</em></p>
			<h2 class="tagline">{{ content.common.global.tagline }}</h2>

			<div class="quick-links">
				<router-link to="/about" class="cta-button">Learn About Me</router-link>
				<router-link to="/portfolio" class="cta-button secondary">View Portfolio</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import contentData from '../data/static.en-us.json'

const content = ref(contentData)

// Expose properties for testing
defineExpose({
	content,
})
</script>

<style lang="scss" scoped>
.home {
	align-items: center;
	display: flex;
	justify-content: center;
	min-height: 80vh;
	padding: 2rem;

	.hero-section {
		max-width: 800px;
		text-align: center;

		.hero-title {
			color: var(--color-heading);
			font-size: 3.5rem;
			font-weight: bold;
			margin-bottom: 1rem;

			@media (max-width: 768px) {
				font-size: 2.5rem;
			}
		}

		.hero-subtitle {
			color: var(--color-heading);
			font-size: 1.2rem;
			line-height: 1.6;
			margin-bottom: 2rem;

			em {
				color: var(--color-text-secondary);
				font-style: italic;
			}
		}

		.tagline {
			color: var(--color-text-secondary);
			font-size: 2rem;
			font-weight: 300;
			margin-bottom: 3rem;

			@media (max-width: 768px) {
				font-size: 1.5rem;
			}
		}

		.quick-links {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: center;

			.cta-button {
				background: var(--color-text-secondary);
				border-radius: 8px;
				color: white;
				font-weight: 500;
				padding: 1rem 2rem;
				text-decoration: none;
				transition: all 0.3s ease;

				&:hover {
					background: #369870;
					box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
					transform: translateY(-2px);
				}

				&.secondary {
					background: transparent;
					border: 2px solid var(--color-text-secondary);
					color: var(--color-text-secondary);

					&:hover {
						background: var(--color-text-secondary);
						color: white;
					}
				}
			}
		}
	}
}
</style>
