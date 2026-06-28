<template>
	<div class="project-grid" :class="`view-${viewMode}`">
		<UICard
			v-for="project in projects"
			:key="project.id"
			class="project-card"
			:data-testid="`project-${project.id}`"
			@click="$emit('project-click', project)"
		>
			<div class="project-image">
				<!-- Show image if it exists and loads successfully -->
				<img
					v-if="!imageErrors[project.id] && project.image"
					:src="getImageUrl(project.image)"
					:alt="project.name"
					class="project-img"
					@error="() => handleImageError(project.id)"
					@load="() => handleImageLoad(project.id)"
				/>

				<!-- Show placeholder if no image or image failed to load -->
				<div
					v-if="imageErrors[project.id] || !project.image"
					class="placeholder-image"
				>
					<UIIcon icon="SVGImage" />
					<span>{{ project.name }}</span>
				</div>

				<div class="project-overlay">
					<UIBadge class="project-year" :text="project.year" type="neutral" />
					<UIBadge class="project-timeline" :text="project.timeline" type="positive" />
				</div>
			</div>

			<div class="project-content">
				<div class="project-header">
					<h3 class="project-title">{{ project.name }}</h3>
					<p class="project-client">{{ project.client }}</p>
				</div>

				<div class="project-tags">
					<UIBadge
						v-for="tag in visibleTags(project)"
						:key="tag"
						class="tag"
						:text="tag"
					/>

					<UIBadge
						v-if="hiddenTagCount(project) > 0"
						class="tag more-tags"
						:text="`+${hiddenTagCount(project)} more`"
						type="positive"
					/>
				</div>

				<div class="project-footer">
					<div class="project-meta">
						<span class="meta-item">
							<UIIcon icon="SVGCalendar" />
							{{ project.year }}
						</span>

						<span class="meta-item">
							<UIIcon icon="SVGClock" />
							{{ project.timeline }}
						</span>

						<span v-if="project.link" class="meta-item">
							<UIIcon icon="SVGLink" />
							Live Site
						</span>
					</div>

					<UIButton
						class="view-details"
						text="View Details"
						icon-right="SVGArrowRight"
					/>
				</div>
			</div>
		</UICard>

		<!-- Empty State -->
		<UIEmptyState
			v-if="projects.length === 0"
			class="empty-state"
			icon="SVGSearch"
			alignment="center"
			text="No projects found"
		/>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { UIBadge, UIButton, UICard, UIEmptyState, UIIcon } from 'ui-components'

interface Project {
	client: string
	id: number
	image: string
	link?: string
	name: string
	tags: string[]
	timeline: string
	year: string
}

interface Props {
	projects: Project[]
	viewMode: 'grid' | 'list'
}

const props = defineProps<Props>()
defineEmits<{
	'project-click': [project: Project]
}>()

// Track image loading errors for each project
const imageErrors = reactive<Record<number, boolean>>({})

// How many tags to show before collapsing the rest into a "+n more" badge
const tagLimit = () => (props.viewMode === 'grid' ? 4 : 8)

const visibleTags = (project: Project) => project.tags.slice(0, tagLimit())

const hiddenTagCount = (project: Project) => Math.max(0, project.tags.length - tagLimit())

// Function to get image URL
const getImageUrl = (imageName: string) => {
	try {
		return new URL(`../assets/images/projects/${imageName}`, import.meta.url).href
	} catch (error) {
		console.warn(`Image not found: ${imageName}`, error)
		return ''
	}
}

// Handle image loading errors
const handleImageError = (projectId: number) => {
	imageErrors[projectId] = true
}

// Handle successful image loading
const handleImageLoad = (projectId: number) => {
	imageErrors[projectId] = false
}
</script>

<style lang="scss" scoped>
.project-grid {
	display: grid;
	gap: $size-32;

	&.view-grid {
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

		@include max-width(tablet) {
			grid-template-columns: 1fr;
		}
	}

	&.view-list {
		gap: $size-16;
		grid-template-columns: 1fr;

		.project-card {
			:deep(.ui-card__content) {
				display: flex;
				flex-direction: row;

				@include max-width(tablet) {
					flex-direction: column;
				}
			}

			.project-image {
				flex-shrink: 0;
				height: 150px;
				width: 200px;

				@include max-width(tablet) {
					height: 200px;
					width: 100%;
				}
			}

			.project-content {
				flex: 1;
			}
		}
	}

	.project-card {
		cursor: pointer;
		overflow: hidden;

		:deep(.ui-card__content) {
			padding: 0;
		}

		.project-image {
			height: 200px;
			overflow: hidden;
			position: relative;

			.project-img {
				height: 100%;
				object-fit: cover;
				transition: transform 0.3s ease;
				width: 100%;
			}

			.placeholder-image {
				align-items: center;
				background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
				color: #6c757d;
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: center;
				text-align: center;
				width: 100%;

				[data-ui="icon"] {
					display: block;
					height: $size-48;
					margin-bottom: $size-8;
					width: $size-48;
				}

				span {
					font-size: 0.9rem;
					font-weight: $weight-medium;
					max-width: 90%;
					word-wrap: break-word;
				}
			}

			.project-overlay {
				align-items: flex-start;
				bottom: 0;
				display: flex;
				justify-content: space-between;
				left: 0;
				padding: $size-16;
				pointer-events: none;
				position: absolute;
				right: 0;
				top: 0;
			}
		}

		.project-content {
			display: flex;
			flex-direction: column;
			padding: $size-24;

			.project-header {
				margin-bottom: $size-16;

				.project-title {
					color: var(--color-heading);
					font-size: 1.2rem;
					font-weight: $weight-semibold;
					line-height: 1.3;
					margin: 0 0 $size-8 0;
				}

				.project-client {
					color: var(--color-text-secondary);
					font-size: $size-16;
					font-weight: $weight-medium;
					margin: 0;
				}
			}

			.project-tags {
				display: flex;
				flex-wrap: wrap;
				gap: $size-8;
				margin-bottom: $size-16;
			}

			.project-footer {
				align-items: center;
				display: flex;
				gap: $size-16;
				justify-content: space-between;
				margin-top: auto;

				@include max-width(mobile) {
					align-items: stretch;
					flex-direction: column;
				}

				.project-meta {
					display: flex;
					flex-wrap: wrap;
					gap: $size-16;

					@include max-width(mobile) {
						justify-content: center;
					}

					.meta-item {
						align-items: center;
						color: var(--color-text);
						display: flex;
						font-size: 0.8rem;
						gap: $size-4;

						[data-ui="icon"] {
							color: var(--color-text-secondary);
						}
					}
				}
			}
		}
	}

	.empty-state {
		grid-column: 1 / -1;
	}
}
</style>
