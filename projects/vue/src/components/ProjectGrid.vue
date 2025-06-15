<template>
	<div class="project-grid" :class="`view-${viewMode}`">
		<div
			v-for="project in projects"
			:key="project.id"
			class="project-card"
			@click="$emit('project-click', project)"
		>
			<div class="project-image">
				<div class="placeholder-image">
					<i class="fas fa-image" />
					<span>{{ project.name }}</span>
				</div>

				<div class="project-year">{{ project.year }}</div>
				<div class="project-timeline">{{ project.timeline }}</div>
			</div>

			<div class="project-content">
				<div class="project-header">
					<h3 class="project-title">{{ project.name }}</h3>
					<p class="project-client">{{ project.client }}</p>
				</div>

				<div class="project-tags">
					<span
						v-for="tag in project.tags.slice(0, viewMode === 'grid' ? 4 : 8)"
						:key="tag"
						class="tag"
					>
						{{ tag }}
					</span>

					<span
						v-if="project.tags.length > (viewMode === 'grid' ? 4 : 8)"
						class="tag more-tags"
					>
						+{{ project.tags.length - (viewMode === 'grid' ? 4 : 8) }} more
					</span>
				</div>

				<div class="project-footer">
					<div class="project-meta">
						<span class="meta-item">
							<i class="fas fa-calendar" />
							{{ project.year }}
						</span>

						<span class="meta-item">
							<i class="fas fa-clock" />
							{{ project.timeline }}
						</span>

						<span v-if="project.link" class="meta-item">
							<i class="fas fa-external-link-alt" />
							Live Site
						</span>
					</div>

					<button class="view-details">
						View Details
						<i class="fas fa-arrow-right" />
					</button>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div v-if="projects.length === 0" class="empty-state">
			<i class="fas fa-search" />
			<h3>No projects found</h3>
			<p>Try adjusting your search criteria or filters.</p>
		</div>
	</div>
</template>

<script setup lang="ts">
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

defineProps<Props>()
defineEmits<{
	'project-click': [project: Project]
}>()
</script>

<style lang="scss" scoped>
.project-grid {
	display: grid;
	gap: 2rem;

	&.view-grid {
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}

	&.view-list {
		gap: 1rem;
		grid-template-columns: 1fr;

		.project-card {
			display: flex;
			flex-direction: row;
			height: auto;

			@media (max-width: 768px) {
				flex-direction: column;
			}

			.project-image {
				flex-shrink: 0;
				height: 150px;
				width: 200px;

				@media (max-width: 768px) {
					height: 200px;
					width: 100%;
				}
			}

			.project-content {
				flex: 1;
				padding: 1.5rem;
			}
		}
	}

	.project-card {
		background: var(--color-background);
		border-radius: 12px;
		border: 1px solid var(--color-border);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: all 0.3s ease;

		&:hover {
			border-color: var(--color-text-secondary);
			box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
			transform: translateY(-4px);

			.view-details {
				background: #369870;
				transform: translateX(4px);
			}
		}

		.project-image {
			align-items: center;
			background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
			display: flex;
			height: 200px;
			justify-content: center;
			position: relative;

			.placeholder-image {
				color: #6c757d;
				text-align: center;

				i {
					display: block;
					font-size: 3rem;
					margin-bottom: 0.5rem;
				}

				span {
					font-size: 0.9rem;
					font-weight: 500;
				}
			}

			.project-year {
				background: var(--color-text-secondary);
				border-radius: 20px;
				color: var(--color-text);
				font-size: 0.9rem;
				font-weight: 600;
				left: 1rem;
				padding: 0.5rem 1rem;
				position: absolute;
				top: 1rem;
			}

			.project-timeline {
				backdrop-filter: blur(10px);
				background: var(--color-background);
				border-radius: 20px;
				color: var(--color-text);
				font-size: 0.8rem;
				font-weight: 500;
				padding: 0.5rem 1rem;
				position: absolute;
				right: 1rem;
				top: 1rem;
			}
		}

		.project-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			padding: 1.5rem;

			.project-header {
				margin-bottom: 1rem;

				.project-title {
					color: var(--color-heading);
					font-size: 1.2rem;
					font-weight: 600;
					line-height: 1.3;
					margin: 0 0 0.5rem 0;
				}

				.project-client {
					color: var(--color-text-secondary);
					font-size: 1rem;
					font-weight: 500;
					margin: 0;
				}
			}

			.project-tags {
				display: flex;
				flex-wrap: wrap;
				gap: 0.5rem;
				margin-bottom: 1rem;

				.tag {
					background: var(--color-background);
					border-radius: 12px;
					border: 1px solid var(--color-border);
					color: var(--color-text);
					font-size: 0.8rem;
					font-weight: 500;
					padding: 0.25rem 0.75rem;

					&.more-tags {
						background: var(--color-text-secondary);
						border-color: var(--color-text-secondary);
						color: white;
					}
				}
			}

			.project-footer {
				align-items: center;
				display: flex;
				gap: 1rem;
				justify-content: space-between;
				margin-top: auto;

				@media (max-width: 480px) {
					align-items: stretch;
					flex-direction: column;
				}

				.project-meta {
					display: flex;
					flex-wrap: wrap;
					gap: 1rem;

					@media (max-width: 480px) {
						justify-content: center;
					}

					.meta-item {
						align-items: center;
						color: var(--color-text);
						display: flex;
						font-size: 0.8rem;
						gap: 0.25rem;

						i {
							color: var(--color-text-secondary);
						}
					}
				}

				.view-details {
					align-items: center;
					background: var(--color-text-secondary);
					border-radius: 6px;
					border: none;
					color: white;
					cursor: pointer;
					display: flex;
					font-size: 0.9rem;
					font-weight: 500;
					gap: 0.5rem;
					padding: 0.5rem 1rem;
					transition: all 0.3s ease;
					white-space: nowrap;

					&:hover {
						background: #369870;
					}
				}
			}
		}
	}

	.empty-state {
		color: var(--color-text);
		grid-column: 1 / -1;
		padding: 4rem 2rem;
		text-align: center;

		i {
			color: var(--color-text);
			font-size: 4rem;
			margin-bottom: 1rem;
		}

		h3 {
			color: var(--color-heading);
			margin-bottom: 0.5rem;
		}

		p {
			margin: 0;
			font-size: 1rem;
		}
	}
}
</style>
