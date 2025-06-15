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
	padding: 0 1rem;

	.about-intro {
		background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
		border-radius: 16px;
		margin-bottom: 3rem;
		padding: 2rem;

		@media (max-width: 768px) {
			padding: 1.5rem;
		}

		h1 {
			color: #2c3e50;
			font-size: 3rem;
			font-weight: 700;
			margin-bottom: 2rem;
			text-align: center;

			@media (max-width: 768px) {
				font-size: 2.2rem;
			}
		}

		.about-sections {
			display: grid;
			gap: 2rem;

			@media (min-width: 768px) {
				grid-template-columns: 1fr;
			}

			.about-section {
				background: white;
				border-left: 4px solid #42b883;
				border-radius: 12px;
				box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
				padding: 1.5rem;

				h3 {
					color: #42b883;
					font-size: 1.3rem;
					font-weight: 600;
					margin-bottom: 1rem;
				}

				p {
					color: #495057;
					font-size: 1rem;
					line-height: 1.7;
					margin: 0;

					:deep(strong) {
						color: #2c3e50;
						font-weight: 700;
					}

					:deep(a) {
						color: #42b883;
						text-decoration: none;
						font-weight: 500;

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
