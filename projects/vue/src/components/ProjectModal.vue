<template>
	<div class="modal-overlay" @click="closeModal">
		<div class="modal-content" @click.stop>
			<div class="modal-header">
				<div class="project-year-badge">{{ project.year }}</div>

				<button @click="closeModal" class="close-button">
					<i class="fas fa-times" />
				</button>
			</div>

			<div class="modal-body">
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
							<i class="fas fa-image" />
							<span>{{ project.name }}</span>
						</div>

						<div class="project-timeline-badge">{{ project.timeline }}</div>
					</div>
				</div>

				<div class="project-details">
					<div class="project-header">
						<h2 class="project-title">{{ project.name }}</h2>
						<p class="project-client">{{ project.client }}</p>
					</div>

					<div class="project-meta-grid">
						<div class="meta-item">
							<i class="fas fa-calendar" />
							<span class="meta-label">Year</span>
							<span class="meta-value">{{ project.year }}</span>
						</div>

						<div class="meta-item">
							<i class="fas fa-clock" />
							<span class="meta-label">Duration</span>
							<span class="meta-value">{{ project.timeline }}</span>
						</div>

						<div class="meta-item">
							<i class="fas fa-building" />
							<span class="meta-label">Client</span>
							<span class="meta-value">{{ project.client }}</span>
						</div>

						<div v-if="project.link" class="meta-item">
							<i class="fas fa-external-link-alt" />
							<span class="meta-label">Live Site</span>
							<a
								:href="project.link"
								target="_blank"
								class="meta-value live-link"
								@click="handleLiveClick"
							>
								Visit Project
								<i class="fas fa-external-link-alt" />
							</a>
						</div>
					</div>

					<div class="technologies-section">
						<h3>Technologies & Skills</h3>
						<div class="technology-tags">
							<span
								v-for="tag in project.tags"
								:key="tag"
								class="tech-tag"
								:class="getTechCategory(tag)"
							>
								{{ tag }}
							</span>
						</div>
					</div>

					<div class="project-actions">
						<button v-if="project.link" @click="openLiveProject" class="action-button primary">
							<i class="fas fa-external-link-alt" />
							View Live Project
						</button>

						<button @click="closeModal" class="action-button secondary">
							<i class="fas fa-arrow-left" />
							Back to Portfolio
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

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
</script>

<style lang="scss" scoped>
.modal-overlay {
	align-items: center;
	backdrop-filter: blur(4px);
	background: rgba(0, 0, 0, 0.7);
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	padding: 2rem;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 2000;

	@media (max-width: 768px) {
		align-items: flex-start;
		overflow-y: auto;
		padding: 1rem;
	}
}

.modal-content {
	animation: modalSlideIn 0.3s ease-out;
	background: var(--color-background);
	border-radius: 16px;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	max-height: 90vh;
	max-width: 900px;
	overflow-y: auto;
	width: 100%;

	@media (max-width: 768px) {
		margin-bottom: 2rem;
		margin-top: 2rem;
	}
}

.modal-header {
	align-items: center;
	border-bottom: 1px solid var(--color-border);
	display: flex;
	justify-content: space-between;
	padding: 1.5rem 2rem;

	@media (max-width: 768px) {
		padding: 1rem 1.5rem;
	}

	.project-year-badge {
		background: var(--color-text-secondary);
		border-radius: 20px;
		color: white;
		font-size: 1rem;
		font-weight: 600;
		padding: 0.5rem 1rem;
	}

	.close-button {
		align-items: center;
		background: var(--color-background);
		border-radius: 50%;
		border: none;
		cursor: pointer;
		display: flex;
		height: 40px;
		justify-content: center;
		transition: all 0.3s ease;
		width: 40px;

		&:hover {
			transform: scale(1.1);
		}

		i {
			color: var(--color-text);
			font-size: 1.2rem;
		}
	}
}

.modal-body {
	padding: 2rem;

	@media (max-width: 768px) {
		padding: 1.5rem;
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

			i {
				font-size: 4rem;
				margin-bottom: 1rem;
				display: block;

				@media (max-width: 768px) {
					font-size: 3rem;
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
			backdrop-filter: blur(10px);
			background: var(--color-background);
			border-radius: 20px;
			color: var(--color-text);
			font-weight: 500;
			padding: 0.5rem 1rem;
			position: absolute;
			right: 1rem;
			top: 1rem;
		}
	}
}

.project-details {
	.project-header {
		margin-bottom: 2rem;

		.project-title {
			color: var(--color-text);
			font-size: 2rem;
			font-weight: 700;
			line-height: 1.3;
			margin: 0 0 0.5rem 0;

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

			i {
				color: var(--color-text-secondary);
				font-size: 1.2rem;
			}

			.meta-label {
				color: var(--color-text);
				font-size: 0.8rem;
				font-weight: 500;
				letter-spacing: 0.5px;
				text-transform: uppercase;
			}

			.meta-value {
				color:var(--color-text);
				font-weight: 600;

				&.live-link {
					align-items: center;
					color: var(--color-text-secondary);
					display: flex;
					gap: 0.5rem;
					text-decoration: none;
					transition: color 0.3s ease;

					&:hover {
						color: #369870;
					}
				}
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

			.tech-tag {
				border-radius: 20px;
				border: 2px solid;
				font-size: 0.9rem;
				font-weight: 500;
				padding: 0.5rem 1rem;
				transition: all 0.3s ease;

				&.framework {
					background: rgba(66, 184, 131, 0.1);
					border-color: var(--color-text-secondary);
					color: var(--color-text-secondary);
				}

				&.styling {
					background: rgba(255, 193, 7, 0.1);
					border-color: #ffc107;
					color: #ffc107;
				}

				&.backend {
					background: rgba(220, 53, 69, 0.1);
					border-color: #dc3545;
					color: #dc3545;
				}

				&.tools {
					background: rgba(108, 117, 125, 0.1);
					border-color: #6c757d;
					color: #6c757d;
				}

				&.cms {
					background: rgba(13, 110, 253, 0.1);
					border-color: #0d6efd;
					color: #0d6efd;
				}

				&.other {
					background: rgba(111, 66, 193, 0.1);
					border-color: #6f42c1;
					color: #6f42c1;
				}

				&:hover {
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
					transform: translateY(-2px);
				}
			}
		}
	}

	.project-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;

		@media (max-width: 480px) {
			flex-direction: column;
		}

		.action-button {
			align-items: center;
			border-radius: 8px;
			border: none;
			cursor: pointer;
			display: flex;
			font-weight: 600;
			gap: 0.5rem;
			padding: 0.75rem 1.5rem;
			text-decoration: none;
			transition: all 0.3s ease;

			&.primary {
				background: var(--color-text-secondary);
				color: white;

				&:hover {
					background: #369870;
					transform: translateY(-2px);
				}
			}

			&.secondary {
				background: #f8f9fa;
				border: 2px solid #dee2e6;
				color: #495057;

				&:hover {
					background: #e9ecef;
					border-color: #adb5bd;
				}
			}
		}
	}
}

@keyframes modalSlideIn {
	from {
		opacity: 0;
		transform: translateY(50px) scale(0.9);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}
</style>
