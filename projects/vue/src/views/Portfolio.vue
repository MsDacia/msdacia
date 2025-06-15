<template>
	<div class="modern-portfolio">
		<!-- Portfolio Header -->
		<div class="portfolio-header">
			<h1>{{ content.portfolio.title }}</h1>
			<p class="portfolio-description" v-html="content.portfolio.copy"></p>

			<!-- Portfolio Stats -->
			<div class="portfolio-stats">
				<div class="stat-item">
					<span class="stat-number">{{ totalProjects }}</span>
					<span class="stat-label">Projects</span>
				</div>

				<div class="stat-item">
					<span class="stat-number">{{ totalClients }}</span>
					<span class="stat-label">Clients</span>
				</div>

				<div class="stat-item">
					<span class="stat-number">{{ yearRange }}</span>
					<span class="stat-label">Years</span>
				</div>

				<div class="stat-item">
					<span class="stat-number">{{ totalTechnologies }}</span>
					<span class="stat-label">Technologies</span>
				</div>
			</div>
		</div>

		<!-- Search and Filter Controls -->
		<div class="controls-section">
			<div class="search-controls">
				<div class="search-box">
					<i class="fas fa-search" />
					<input
						v-model="searchQuery"
						type="text"
						placeholder="Search projects, clients, or technologies..."
						class="search-input"
					>
					<button
						v-if="searchQuery"
						@click="clearSearch"
						class="clear-search"
					>
						<i class="fas fa-times" />
					</button>
				</div>

				<div class="view-controls">
					<button
						@click="viewMode = 'grid'"
						:class="{ active: viewMode === 'grid' }"
						class="view-button"
					>
						<i class="fas fa-th" /> Grid
					</button>

					<button
						@click="viewMode = 'list'"
						:class="{ active: viewMode === 'list' }"
						class="view-button"
					>
						<i class="fas fa-list" /> List
					</button>
				</div>
			</div>

			<!-- Technology Filter Tags -->
			<div class="filter-section">
				<h3>Filter by Technology:</h3>
				<div class="tag-filters">
					<button
						@click="selectedTag = ''"
						:class="{ active: selectedTag === '' }"
						class="filter-tag all-tag"
					>
						All Projects ({{ totalProjects }})
					</button>

					<button
						v-for="tag in popularTags"
						:key="tag.name"
						@click="selectedTag = tag.name"
						:class="{ active: selectedTag === tag.name }"
						class="filter-tag"
					>
						{{ tag.name }} ({{ tag.count }})
					</button>
				</div>

				<button
					v-if="!showAllTags && allTags.length > 12"
					@click="showAllTags = true"
					class="show-more-tags"
				>
					Show {{ allTags.length - 12 }} more technologies...
				</button>

				<div v-if="showAllTags" class="all-tags">
					<button
						v-for="tag in allTags.slice(12)"
						:key="tag.name"
						@click="selectedTag = tag.name"
						:class="{ active: selectedTag === tag.name }"
						class="filter-tag"
					>
						{{ tag.name }} ({{ tag.count }})
					</button>
				</div>
			</div>
		</div>

		<!-- Results Summary -->
		<div class="results-summary" v-if="filteredProjects.length !== totalProjects">
			<p>
				Showing {{ filteredProjects.length }} of {{ totalProjects }} projects
				<span v-if="selectedTag"> tagged with "{{ selectedTag }}"</span>
				<span v-if="searchQuery"> matching "{{ searchQuery }}"</span>
			</p>

			<button @click="clearFilters" class="clear-filters">
				<i class="fas fa-times" /> Clear Filters
			</button>
		</div>

		<!-- Project Grid/List -->
		<div class="projects-container">
			<ProjectGrid
				:projects="filteredProjects"
				:view-mode="viewMode"
				@project-click="openProjectModal"
			/>
		</div>

		<!-- Project Detail Modal -->
		<ProjectModal
			v-if="selectedProject"
			:project="selectedProject"
			@close="closeProjectModal"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import ProjectModal from '../components/ProjectModal.vue'
import contentData from '../data/static.en-us.json'

// Reactive data
const content = ref(contentData)
const searchQuery = ref('')
const selectedTag = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const showAllTags = ref(false)
const selectedProject = ref<any>(null)

// Computed properties
const totalProjects = computed(() => content.value.portfolio.projects.length)

const totalClients = computed(() => {
	const clients = new Set(content.value.portfolio.projects.map(p => p.client))
	return clients.size
})

const yearRange = computed(() => {
	const years = content.value.portfolio.projects.map(p => parseInt(p.year))
	const minYear = Math.min(...years)
	const maxYear = Math.max(...years)
	return `${maxYear - minYear + 1}`
})

const allTags = computed(() => {
	const tagMap = new Map<string, number>()

	content.value.portfolio.projects.forEach(project => {
		project.tags.forEach(tag => {
			tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
		})
	})

	return Array.from(tagMap.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count)
})

const popularTags = computed(() => allTags.value.slice(0, 12))

const totalTechnologies = computed(() => allTags.value.length)

const filteredProjects = computed(() => {
	let projects = content.value.portfolio.projects

	// Filter by selected tag
	if (selectedTag.value) {
		projects = projects.filter(project =>
			project.tags.includes(selectedTag.value)
		)
	}

	// Filter by search query
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase()
		projects = projects.filter(project =>
			project.name.toLowerCase().includes(query) ||
			project.client.toLowerCase().includes(query) ||
			project.tags.some(tag => tag.toLowerCase().includes(query))
		)
	}

	// Sort by year (newest first)
	return projects.sort((a, b) => parseInt(b.year) - parseInt(a.year))
})

// Methods
const clearSearch = () => {
	searchQuery.value = ''
}

const clearFilters = () => {
	searchQuery.value = ''
	selectedTag.value = ''
}

const openProjectModal = (project: any) => {
	selectedProject.value = project
}

const closeProjectModal = () => {
	selectedProject.value = null
}
</script>

<style lang="scss" scoped>
.modern-portfolio {
	margin: 0 auto;
	max-width: 1400px;
	padding: 2rem;

	@media (max-width: 768px) {
		padding: 1rem;
	}
}

.portfolio-header {
	margin-bottom: 3rem;
	text-align: center;

	h1 {
		color: var(--color-heading);
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;

		@media (max-width: 768px) {
			font-size: 2.2rem;
		}
	}

	.portfolio-description {
		color: var(--color-text);
		font-size: 1.1rem;
		line-height: 1.6;
		margin: 0 auto 2rem;
		max-width: 800px;

		:deep(a) {
			color: var(--color-text-secondary);
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.portfolio-stats {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		margin: 0 auto;
		max-width: 600px;

		.stat-item {
			background: var(--color-background);
			border-radius: 12px;
			border: 1px solid var(--color-border);
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
			padding: 1rem;

			.stat-number {
				color: var(--color-text-secondary);
				display: block;
				font-size: 2rem;
				font-weight: 700;
				margin-bottom: 0.25rem;
			}

			.stat-label {
				color: var(--color-text);
				font-size: 0.9rem;
				font-weight: 500;
			}
		}
	}
}

.controls-section {
	background: var(--color-background);
	border-radius: 16px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	margin-bottom: 2rem;
	padding: 2rem;

	.search-controls {
		align-items: center;
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;

		@media (max-width: 768px) {
			flex-direction: column;
		}

		.search-box {
			flex: 1;
			position: relative;

			i.fa-search {
				color: var(--color-text);
				left: 1rem;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}

			.search-input {
				background: var(--color-background);
				color: var(--color-text);
				border-radius: 8px;
				border: 2px solid var(--color-border);
				font-size: 1rem;
				padding: 0.75rem 1rem 0.75rem 2.5rem;
				transition: border-color 0.3s ease;
				width: 100%;

				&:focus {
					border-color: var(--color-text-secondary);
					outline: none;
				}
			}

			.clear-search {
				background: none;
				border: none;
				color: var(--color-text);
				cursor: pointer;
				padding: 0.5rem;
				position: absolute;
				right: 0.5rem;
				top: 50%;
				transform: translateY(-50%);

				&:hover {
					color: var(--color-text-secondary);
				}
			}
		}

		.view-controls {
			display: flex;
			gap: 0.5rem;

			.view-button {
				background: var(--color-background);
				border-radius: 8px;
				border: 2px solid var(--color-border);
				color: var(--color-text);
				cursor: pointer;
				font-size: 0.9rem;
				padding: 0.75rem 1rem;
				transition: all 0.3s ease;

				&:hover {
					border-color: var(--color-text-secondary);
					color: var(--color-text-secondary);
				}

				&.active {
					background: var(--color-text-secondary);
					border-color: var(--color-text-secondary);
					color: var(--color-text);
				}
			}
		}
	}

	.filter-section {
		h3 {
			color: var(--color-text);
			font-size: 1.1rem;
			margin-bottom: 1rem;
		}

		.tag-filters {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			margin-bottom: 1rem;

			.filter-tag {
				background: var(--color-background);
				border-radius: 20px;
				border: 1px solid var(--color-border);
				color: var(--color-text);
				cursor: pointer;
				font-size: 0.9rem;
				padding: 0.5rem 1rem;
				transition: all 0.3s ease;

				&:hover {
					border-color: var(--color-text-secondary);
					color: var(--color-text-secondary);
				}

				&.active {
					background: var(--color-text-secondary);
					border-color: var(--color-text-secondary);
					color: white;
				}

				&.all-tag {
					border-color: var(--color-text-secondary);
					color: var(--color-text-secondary);
					font-weight: 600;

					&.active {
						background: var(--color-text-secondary);
						color: var(--color-text);
					}
				}
			}
		}

		.show-more-tags {
			background: none;
			border: none;
			color: var(--color-text-secondary);
			cursor: pointer;
			font-size: 0.9rem;
			text-decoration: underline;

			&:hover {
				color: #369870;
			}
		}

		.all-tags {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			margin-top: 1rem;
		}
	}
}

.results-summary {
	align-items: center;
	background: var(--color-background);
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
	padding: 1rem;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 1rem;
	}

	p {
		color: var(--color-text);
		font-size: 0.9rem;
		margin: 0;
	}

	.clear-filters {
		background: #dc3545;
		border-radius: 6px;
		border: none;
		color: var(--color-text);
		cursor: pointer;
		font-size: 0.9rem;
		padding: 0.5rem 1rem;
		transition: background 0.3s ease;

		&:hover {
			background: #c82333;
		}
	}
}

.projects-container {
	min-height: 400px;
}
</style>
