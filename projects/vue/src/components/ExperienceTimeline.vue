<template>
	<div class="experience-timeline">
		<div class="timeline-header">
			<h2>{{ content.resume.experiences.title }}</h2>

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

				<div class="job-card" @click="toggleJob(job.id)">
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
							<i
								class="fas fa-chevron-down expand-icon"
								:class="{ 'rotated': expandedJob === job.id }"
							 />
						</div>
					</div>

					<div class="job-content" v-show="expandedJob === job.id">
						<div class="responsibilities">
							<h5>Key Responsibilities & Achievements:</h5>

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
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

		h2 {
			color: var(--color-heading);
			font-size: 2.5rem;
			font-weight: 600;
			margin-bottom: 0.5rem;
		}

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

		.job-card {
			background: var(--color-background);
			border-radius: 12px;
			border: 1px solid var(--color-border);
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
			cursor: pointer;
			overflow: hidden;
			transition: all 0.3s ease;

			&:hover {
				border-color: var(--color-text-secondary);
				box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
				transform: translateY(-2px);
			}

			.job-header {
				align-items: flex-start;
				border-bottom: 1px solid var(--color-border);
				display: flex;
				justify-content: space-between;
				padding: 1.5rem;

				@media (max-width: 768px) {
					flex-direction: column;
					gap: 1rem;
				}

				.job-title-section {
					flex: 1;

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

					@media (max-width: 768px) {
						justify-content: space-between;
						width: 100%;
					}

					.job-date {
						color: var(--color-text);
						font-size: 0.9rem;
						font-weight: 500;
						white-space: nowrap;
					}

					.expand-icon {
						color: var(--color-text-secondary);
						font-size: 1rem;
						transition: transform 0.3s ease;

						&.rotated {
							transform: rotate(180deg);
						}
					}
				}
			}

			.job-content {
				animation: slideDown 0.3s ease-out;
				padding: 0 1.5rem 1.5rem;

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

		&.expanded .job-card {
			border-color: var(--color-text-secondary);
			box-shadow: 0 8px 30px rgba(66, 184, 131, 0.15);
		}
	}
}

@keyframes slideDown {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

// Enhanced responsive design
@media (max-width: 768px) {
	.experience-timeline {
		padding: 1rem;

		.timeline-header {
			margin-bottom: 2rem;

			h2 {
				font-size: 2rem;
			}

			.timeline-subtitle {
				font-size: 1rem;
			}
		}

		.timeline-item .job-card .job-header {
			padding: 1rem;

			.job-title-section .job-title {
				font-size: 1.1rem;
			}
		}

		.timeline-item .job-card .job-content {
			padding: 0 1rem 1rem;
		}
	}
}
</style>
