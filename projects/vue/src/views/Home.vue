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
	padding: $size-32;

	.hero-section {
		max-width: 800px;
		text-align: center;

		.hero-title {
			color: var(--color-heading);
			font-size: $size-56;
			font-weight: $weight-bold;
			margin-bottom: $size-16;

			@include max-width(tablet) {
				font-size: $size-40;
			}
		}

		.hero-subtitle {
			color: var(--color-heading);
			font-size: 1.2rem;
			line-height: 1.6;
			margin-bottom: $size-32;

			em {
				color: var(--color-text-secondary);
				font-style: italic;
			}
		}

		.tagline {
			color: var(--color-text-secondary);
			font-size: $size-32;
			font-weight: $weight-light;
			margin-bottom: $size-48;

			@include max-width(tablet) {
				font-size: $size-24;
			}
		}

		.quick-links {
			display: flex;
			flex-wrap: wrap;
			gap: $size-16;
			justify-content: center;

			.cta-button {
				background: var(--color-text-secondary);
				border-radius: $size-8;
				color: white;
				font-weight: $weight-medium;
				padding: $size-16 $size-32;
				text-decoration: none;
				transition: all 0.3s ease;

				&:hover {
					background: #369870;
					box-shadow: 0 $size-4 $size-12 rgba(66, 184, 131, 0.3);
					transform: translateY(-2px);
				}

				&.secondary {
					background: transparent;
					border: $size-2 solid var(--color-text-secondary);
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
