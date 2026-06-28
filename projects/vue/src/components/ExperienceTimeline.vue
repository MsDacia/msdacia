<template>
	<div class="experience-timeline">
		<div class="timeline-header">
			<UIHeading
				:heading="2"
				centered
			>
				{{ content.resume.experiences.title }}
			</UIHeading>

			<p class="timeline-subtitle">My professional journey in front-end development</p>
		</div>

		<div class="timeline">
			<div
				v-for="job in content.resume.experiences.job"
				:key="job.id"
				class="timeline-item"
				:class="{ 'expanded': expandedJob === job.id }"
			>
				<div class="timeline-marker" />

				<UIAccordion
					class="job-card"
					title=""
					:expanded="expandedJob === job.id"
					@update:expanded="(open: boolean) => (expandedJob = open ? job.id : null)"
				>
					<template #titleFlare>
						<div class="job-header">
							<div class="job-title-section">
								<h3 class="job-title">{{ job.title }}</h3>

								<div class="company-info">
									<h4 class="company-name">{{ job.company }}</h4>
									<span class="job-location">{{ job.location }}</span>
								</div>
							</div>

							<div class="job-meta">
								<span class="job-date">{{ job.date }}</span>
							</div>
						</div>
					</template>

					<div class="job-content">
						<div class="responsibilities">
							<h5>Key Responsibilities &amp; Achievements:</h5>

							<ul class="responsibility-list">
								<li
									v-for="(point, index) in job.points"
									:key="index"
									class="responsibility-item"
									v-html="point"
								/>
							</ul>
						</div>
					</div>
				</UIAccordion>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UIAccordion, UIHeading } from 'ui-components'
import contentData from '../data/static.en-us.json'

// Reactive data using Composition API (Vue 3 way!)
const content = ref(contentData)
const expandedJob = ref<number | null>(null)

// Methods using Composition API
const toggleJob = (jobId: number) => {
	expandedJob.value = expandedJob.value === jobId ? null : jobId
}

// Expose properties for testing
defineExpose({
	content,
	expandedJob,
	toggleJob,
})
</script>

<style lang="scss" scoped>
.experience-timeline {
	margin: 0 auto;
	max-width: 900px;
	padding: 2rem;

	.timeline-header {
		margin-bottom: 3rem;
		text-align: center;

		.timeline-subtitle {
			color: var(--color-heading);
			font-size: 1.1rem;
			margin: 0;
		}
	}

	.timeline {
		position: relative;

		// Timeline vertical line
		&::before {
			background: linear-gradient(180deg, #42b883 0%, #369870 100%);
			border-radius: 2px;
			bottom: 0;
			content: '';
			left: 30px;
			position: absolute;
			top: 0;
			width: 3px;

			@media (max-width: 768px) {
				left: 20px;
			}
		}
	}

	.timeline-item {
		margin-bottom: 2rem;
		padding-left: 80px;
		position: relative;

		@media (max-width: 768px) {
			padding-left: 60px;
		}

		.timeline-marker {
			background: var(--color-text-secondary);
			border-radius: 50%;
			border: 4px solid var(--color-border);
			box-shadow: 0 2px 10px rgba(66, 184, 131, 0.3);
			height: 24px;
			left: 18px;
			position: absolute;
			top: 24px;
			width: 24px;
			z-index: 2;

			@media (max-width: 768px) {
				height: 20px;
				left: 8px;
				width: 20px;
			}
		}

		.job-header {
			align-items: flex-start;
			display: flex;
			gap: 1rem;
			justify-content: space-between;
			width: 100%;

			@media (max-width: 768px) {
				flex-direction: column;
				gap: 1rem;
			}

			.job-title-section {
				flex: 1;
				text-align: left;

				.job-title {
					color: var(--color-text);
					font-size: 1.3rem;
					font-weight: 600;
					line-height: 1.3;
					margin: 0 0 0.5rem 0;
				}

				.company-info {
					display: flex;
					flex-direction: column;
					gap: 0.25rem;

					.company-name {
						color: var(--color-text-secondary);
						font-size: 1.1rem;
						font-weight: 500;
						margin: 0;
					}

					.job-location {
						color: var(--color-text);
						font-size: 0.9rem;
						font-style: italic;
					}
				}
			}

			.job-meta {
				align-items: center;
				display: flex;
				gap: 1rem;

				.job-date {
					color: var(--color-text);
					font-size: 0.9rem;
					font-weight: 500;
					white-space: nowrap;
				}
			}
		}

		.job-content {
			.responsibilities {
				h5 {
					color: var(--color-heading);
					font-size: 1rem;
					font-weight: 600;
					margin: 0 0 1rem 0;
				}

				.responsibility-list {
					list-style: none;
					margin: 0;
					padding: 0;

					.responsibility-item {
						border-bottom: 1px solid var(--color-border);
						color: var(--color-text);
						line-height: 1.6;
						padding: 0.5rem 0 0.5rem 1.5rem;
						position: relative;

						&:last-child {
							border-bottom: none;
						}

						&::before {
							color: var(--color-text-secondary);
							content: '▸';
							font-weight: bold;
							left: 0;
							position: absolute;
							top: 0.5rem;
						}

						&:hover {
							background: rgba(66, 184, 131, 0.02);
							border-radius: 4px;
						}
					}
				}
			}
		}
	}
}

// Enhanced responsive design
@media (max-width: 768px) {
	.experience-timeline {
		padding: 1rem;

		.timeline-header {
			margin-bottom: 2rem;

			.timeline-subtitle {
				font-size: 1rem;
			}
		}
	}
}
</style>
