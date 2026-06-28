<template>
	<UIModal
		:is-open="true"
		modal-size="large"
		alignment="left-aligned"
		:show-submit-button="!!project.link"
		submit-text="View Live Project"
		cancel-text="Back to Portfolio"
		@submit="openLiveProject"
		@cancel="closeModal"
	>
		<template #title>
			<div class="modal-title">
				<UIBadge :text="project.year" type="neutral" />
				<h2 class="project-title">{{ project.name }}</h2>
				<p class="project-client">{{ project.client }}</p>
			</div>
		</template>

		<div class="project-image-section">
			<div class="project-image-large">
				<!-- Show image if it exists and loads successfully -->
				<img
					v-if="!imageError && project.image"
					:src="getImageUrl(project.image)"
					:alt="project.name"
					class="project-img-large"
					@error="() => handleImageError()"
					@load="() => handleImageLoad()"
				/>

				<!-- Show placeholder if no image or image failed to load -->
				<div
					v-if="imageError || !project.image"
					class="placeholder-image"
				>
					<UIIcon icon="SVGImage" />
					<span>{{ project.name }}</span>
				</div>

				<UIBadge class="project-timeline-badge" :text="project.timeline" type="positive" />
			</div>
		</div>

		<div class="project-details">
			<div class="project-meta-grid">
				<div class="meta-item">
					<UIIcon icon="SVGCalendar" />
					<span class="meta-label">Year</span>
					<span class="meta-value">{{ project.year }}</span>
				</div>

				<div class="meta-item">
					<UIIcon icon="SVGClock" />
					<span class="meta-label">Duration</span>
					<span class="meta-value">{{ project.timeline }}</span>
				</div>

				<div class="meta-item">
					<UIIcon icon="SVGBuilding" />
					<span class="meta-label">Client</span>
					<span class="meta-value">{{ project.client }}</span>
				</div>

				<div v-if="project.link" class="meta-item">
					<UIIcon icon="SVGLink" />
					<span class="meta-label">Live Site</span>
					<UILink
						class="live-link"
						:href="project.link"
						target="_blank"
						text="Visit Project"
						icon-right="SVGLink"
						type="positive"
						@click="handleLiveClick"
					/>
				</div>
			</div>

			<div class="technologies-section">
				<h3>Technologies &amp; Skills</h3>
				<div class="technology-tags">
					<UIBadge
						v-for="tag in project.tags"
						:key="tag"
						class="tech-tag"
						:text="tag"
						:type="getBadgeType(tag)"
					/>
				</div>
			</div>
		</div>
	</UIModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { UIBadge, UIIcon, UILink, UIModal } from 'ui-components'
import type { BadgeType } from 'ui-components'

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
	project: Project
}

const props = defineProps<Props>()

const emit = defineEmits<{
	close: []
}>()

// Track image loading error
const imageError = ref(false)

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
const handleImageError = () => {
	imageError.value = true
}

// Handle successful image loading
const handleImageLoad = () => {
	imageError.value = false
}

// Reset image error when project changes
watch(() => props.project.id, () => {
	imageError.value = false
})

// Methods
const closeModal = () => {
	emit('close')
}

const openLiveProject = () => {
	if (props.project.link) {
		window.open(props.project.link, '_blank')
		handleLiveClick()
	}
}

const handleLiveClick = () => {
	console.log('Live project clicked:', props.project.name)
	// Analytics will be added later
}

const getTechCategory = (tech: string): string => {
	const frameworks = ['Vue', 'React', 'AngularJS', 'jQuery', 'Backbone']
	const styling = ['CSS', 'CSS3', 'SASS', 'LESS', 'Bootstrap', 'Responsive']
	const backend = ['PHP', 'Java', 'Node', 'MySQL', 'APIs', 'API']
	const tools = ['Grunt', 'Gulp', 'Webpack', 'Git', 'GitHub', 'Bitbucket', 'Docker']
	const cms = ['WordPress', 'Drupal', 'Craft CMS', 'Adobe CQ', 'Hybris']

	if (frameworks.some(f => tech.includes(f))) return 'framework'
	if (styling.some(s => tech.includes(s))) return 'styling'
	if (backend.some(b => tech.includes(b))) return 'backend'
	if (tools.some(t => tech.includes(t))) return 'tools'
	if (cms.some(c => tech.includes(c))) return 'cms'

	return 'other'
}

// Map a technology category to a ui-components badge color type
const getBadgeType = (tech: string): BadgeType => {
	const typeByCategory: Record<string, BadgeType> = {
		framework: 'positive',
		styling: 'warning',
		backend: 'negative',
		tools: 'neutral',
		cms: 'info',
		other: 'neutral',
	}

	return typeByCategory[getTechCategory(tech)] ?? 'neutral'
}
</script>

<style lang="scss" scoped>
.modal-title {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.project-title {
		color: var(--color-text);
		font-size: 2rem;
		font-weight: 700;
		line-height: 1.3;
		margin: 0;

		@media (max-width: 768px) {
			font-size: 1.6rem;
		}
	}

	.project-client {
		color: var(--color-text-secondary);
		font-size: 1.2rem;
		font-weight: 600;
		margin: 0;
	}
}

.project-image-section {
	margin-bottom: 2rem;

	.project-image-large {
		align-items: center;
		background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
		border-radius: 12px;
		display: flex;
		height: 300px;
		justify-content: center;
		overflow: hidden;
		position: relative;

		@media (max-width: 768px) {
			height: 200px;
		}

		.project-img-large {
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s ease;
			width: 100%;

			&:hover {
				transform: scale(1.02);
			}
		}

		.placeholder-image {
			color: #6c757d;
			text-align: center;

			[data-ui="icon"] {
				display: block;
				height: 4rem;
				margin-bottom: 1rem;
				width: 4rem;

				@media (max-width: 768px) {
					height: 3rem;
					width: 3rem;
				}
			}

			span {
				font-size: 1.2rem;
				font-weight: 500;

				@media (max-width: 768px) {
					font-size: 1rem;
				}
			}
		}

		.project-timeline-badge {
			position: absolute;
			right: 1rem;
			top: 1rem;
		}
	}
}

.project-details {
	.project-meta-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		margin-bottom: 2rem;

		.meta-item {
			background: var(--color-background);
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding: 1rem;

			[data-ui="icon"] {
				color: var(--color-text-secondary);
				height: 1.2rem;
				width: 1.2rem;
			}

			.meta-label {
				color: var(--color-text);
				font-size: 0.8rem;
				font-weight: 500;
				letter-spacing: 0.5px;
				text-transform: uppercase;
			}

			.meta-value {
				color: var(--color-text);
				font-weight: 600;
			}
		}
	}

	.technologies-section {
		margin-bottom: 2rem;

		h3 {
			color: var(--color-heading);
			font-size: 1.3rem;
			margin-bottom: 1rem;
		}

		.technology-tags {
			display: flex;
			flex-wrap: wrap;
			gap: 0.75rem;
		}
	}
}
</style>
