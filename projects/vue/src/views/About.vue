<template>
	<div class="about">
		<div class="about-intro">
			<h1>{{ content.about.title }}</h1>

			<div class="about-sections">
				<section class="about-section">
					<h3>{{ content.about.subtitle }}</h3>
					<p v-html="content.about.copy"></p>
				</section>

				<section class="about-section">
					<h3>{{ content.about.subtitle2 }}</h3>
					<p v-html="content.about.copy2"></p>
				</section>

				<section class="about-section">
					<h3>{{ content.about.subtitle3 }}</h3>
					<p v-html="content.about.copy3"></p>
				</section>
			</div>
		</div>

		<!-- Professional Experience Timeline -->
		<ExperienceTimeline />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import contentData from '../data/static.en-us.json'

const content = ref(contentData)
</script>

<style lang="scss" scoped>
.about {
	margin: 0 auto;
	max-width: 1200px;
	padding: 0 $size-16;

	.about-intro {
		background: var(--color-background);
		border-radius: $size-16;
		margin-bottom: $size-48;
		padding: $size-32;

		@include max-width(tablet) {
			padding: $size-24;
		}

		h1 {
			color: var(--color-heading);
			font-size: $size-48;
			font-weight: $weight-bold;
			margin-bottom: $size-32;
			text-align: center;

			@include max-width(tablet) {
				font-size: 2.2rem;
			}
		}

		.about-sections {
			display: grid;
			gap: $size-32;

			@include min-width(tablet) {
				grid-template-columns: 1fr;
			}

			.about-section {
				background: var(--color-background);
				border-left: $size-4 solid var(--color-text-secondary);
				border-radius: $size-12;
				box-shadow: 0 $size-2 $size-10 rgba(0, 0, 0, 0.05);
				padding: $size-24;

				h3 {
					color: var(--color-text-secondary);
					font-size: 1.3rem;
					font-weight: $weight-semibold;
					margin-bottom: $size-16;
				}

				p {
					color: var(--color-text);
					font-size: $size-16;
					line-height: 1.7;
					margin: 0;

					:deep(strong) {
						color: var(--color-text);
						font-weight: $weight-bold;
					}

					:deep(a) {
						color: var(--color-text-secondary);
						text-decoration: none;
						font-weight: $weight-medium;

						&:hover {
							color: #369870;
							text-decoration: underline;
						}
					}
				}
			}
		}
	}
}
</style>
