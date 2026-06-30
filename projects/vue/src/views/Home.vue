<template>
	<div class="home" data-test="home">
		<div class="hero-section" data-test="hero-section">
			<UIHeading
				class="hero-title"
				data-test="hero-title"
				:heading="1"
				centered
			>
				{{ content.common.global.title }}
			</UIHeading>

			<p class="hero-subtitle" data-test="hero-subtitle">
				{{ content.common.global.copy }} <em>{{ content.common.global.copy2 }}</em>
			</p>

			<UIHeading
				class="tagline"
				data-test="tagline"
				:heading="2"
				centered
			>
				{{ content.common.global.tagline }}
			</UIHeading>

			<div class="quick-links" data-test="quick-links">
				<router-link to="/about" class="cta-button" data-test="cta-button">Learn About Me</router-link>
				<router-link to="/portfolio" class="cta-button secondary" data-test="cta-button">View Portfolio</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UIHeading } from 'ui-components'
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
			margin-bottom: $size-16;

			:deep([data-ui-role='title']) {
				color: var(--color-heading);
				font-size: $size-56;
				font-weight: $weight-bold;

				@include max-width(tablet) {
					font-size: $size-40;
				}
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
			margin-bottom: $size-48;

			:deep([data-ui-role='title']) {
				color: var(--color-text-secondary);
				font-size: $size-32;
				font-weight: $weight-light;

				@include max-width(tablet) {
					font-size: $size-24;
				}
			}
		}

		.quick-links {
			display: flex;
			flex-wrap: wrap;
			gap: $size-16;
			justify-content: center;

			.cta-button {
				background: #999;
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
