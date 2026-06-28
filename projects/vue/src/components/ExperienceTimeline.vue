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
				v-for="job in jobs"
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

							<template v-if="job.groups && job.groups.length">
								<div
									v-for="group in job.groups"
									:key="group.title"
									class="responsibility-group"
								>
									<h6 class="responsibility-group-title">{{ group.title }}</h6>

									<ul class="responsibility-list">
										<li
											v-for="(point, index) in group.points"
											:key="index"
											class="responsibility-item"
											v-html="point"
										/>
									</ul>
								</div>
							</template>

							<ul
								v-else
								class="responsibility-list"
							>
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
import { computed, ref } from 'vue'
import { UIAccordion, UIHeading } from 'ui-components'
import contentData from '../data/static.en-us.json'

interface ExperienceGroup {
	points: string[]
	title: string
}

interface ExperienceJob {
	company: string
	date?: string
	groups?: ExperienceGroup[]
	id: number
	location?: string
	points?: string[]
	title: string
}

// Reactive data using Composition API (Vue 3 way!)
const content = ref(contentData)
const expandedJob = ref<number | null>(null)

// Jobs can list responsibilities flat (points) or grouped (groups); the
// template renders whichever a given role provides.
const jobs = computed(() => content.value.resume.experiences.job as unknown as ExperienceJob[])

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
	padding: $size-32;

	.timeline-header {
		margin-bottom: $size-48;
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

			@include max-width(tablet) {
				left: $size-20;
			}
		}
	}

	.timeline-item {
		margin-bottom: $size-32;
		padding-left: 80px;
		position: relative;

		@include max-width(tablet) {
			padding-left: 60px;
		}

		.timeline-marker {
			background: var(--color-text-secondary);
			border-radius: 50%;
			border: $size-4 solid var(--color-border);
			box-shadow: 0 $size-2 $size-10 rgba(66, 184, 131, 0.3);
			height: $size-24;
			left: $size-18;
			position: absolute;
			top: $size-24;
			width: $size-24;
			z-index: 2;

			@include max-width(tablet) {
				height: $size-20;
				left: $size-8;
				width: $size-20;
			}
		}

		.job-header {
			align-items: flex-start;
			display: flex;
			gap: $size-16;
			justify-content: space-between;
			width: 100%;

			@include max-width(tablet) {
				flex-direction: column;
				gap: $size-16;
			}

			.job-title-section {
				flex: 1;
				text-align: left;

				.job-title {
					color: var(--color-text);
					font-size: 1.3rem;
					font-weight: $weight-semibold;
					line-height: 1.3;
					margin: 0 0 $size-8 0;
				}

				.company-info {
					display: flex;
					flex-direction: column;
					gap: $size-4;

					.company-name {
						color: var(--color-text-secondary);
						font-size: 1.1rem;
						font-weight: $weight-medium;
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
				gap: $size-16;

				.job-date {
					color: var(--color-text);
					font-size: 0.9rem;
					font-weight: $weight-medium;
					white-space: nowrap;
				}
			}
		}

		.job-content {
			.responsibilities {
				h5 {
					color: var(--color-heading);
					font-size: $size-16;
					font-weight: $weight-semibold;
					margin: 0 0 $size-16 0;
				}

				.responsibility-group {
					margin-bottom: $size-16;

					&:last-child {
						margin-bottom: 0;
					}

					.responsibility-group-title {
						color: var(--color-text-secondary);
						font-size: 0.95rem;
						font-weight: $weight-semibold;
						margin: 0 0 $size-4 0;
					}
				}

				.responsibility-list {
					list-style: none;
					margin: 0;
					padding: 0;

					.responsibility-item {
						border-bottom: 1px solid var(--color-border);
						color: var(--color-text);
						line-height: 1.6;
						padding: $size-8 0 $size-8 $size-24;
						position: relative;

						&:last-child {
							border-bottom: none;
						}

						&::before {
							color: var(--color-text-secondary);
							content: '▸';
							font-weight: $weight-bold;
							left: 0;
							position: absolute;
							top: $size-8;
						}

						&:hover {
							background: rgba(66, 184, 131, 0.02);
							border-radius: $size-4;
						}
					}
				}
			}
		}
	}
}

// Enhanced responsive design
@include max-width(tablet) {
	.experience-timeline {
		padding: $size-16;

		.timeline-header {
			margin-bottom: $size-32;

			.timeline-subtitle {
				font-size: $size-16;
			}
		}
	}
}
</style>
