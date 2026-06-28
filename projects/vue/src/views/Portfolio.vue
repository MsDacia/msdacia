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
					<UIIcon icon="SVGSearch" />
					<input
						v-model="searchQuery"
						type="text"
						placeholder="Search projects, clients, or technologies..."
						class="search-input"
					>
					<UIButton
						v-if="searchQuery"
						button-style="text"
						class="clear-search"
						@click="clearSearch"
					>
						<UIIcon icon="SVGClose" />
					</UIButton>
				</div>

				<div class="view-controls">
					<UIButton
						button-style="text"
						:class="{ active: viewMode === 'grid' }"
						class="view-button"
						@click="viewMode = 'grid'"
					>
						<UIIcon icon="SVGLayout" /> Grid
					</UIButton>

					<UIButton
						button-style="text"
						:class="{ active: viewMode === 'list' }"
						class="view-button"
						@click="viewMode = 'list'"
					>
						<UIIcon icon="SVGList" /> List
					</UIButton>
				</div>
			</div>

			<!-- Technology Filter Tags -->
			<div class="filter-section">
				<h3>Filter by Technology:</h3>
				<div class="tag-filters">
					<UIButton
						button-style="text"
						:class="{ active: selectedTag === '' }"
						class="filter-tag all-tag"
						@click="selectedTag = ''"
					>
						All Projects ({{ totalProjects }})
					</UIButton>

					<UIButton
						v-for="tag in popularTags"
						:key="tag.name"
						button-style="text"
						:class="{ active: selectedTag === tag.name }"
						class="filter-tag"
						@click="selectedTag = tag.name"
					>
						{{ tag.name }} ({{ tag.count }})
					</UIButton>
				</div>

				<UIButton
					v-if="!showAllTags && allTags.length > 12"
					button-style="text"
					class="show-more-tags"
					@click="showAllTags = true"
				>
					Show {{ allTags.length - 12 }} more technologies...
				</UIButton>

				<div v-if="showAllTags" class="all-tags">
					<UIButton
						v-for="tag in allTags.slice(12)"
						:key="tag.name"
						button-style="text"
						:class="{ active: selectedTag === tag.name }"
						class="filter-tag"
						@click="selectedTag = tag.name"
					>
						{{ tag.name }} ({{ tag.count }})
					</UIButton>
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

			<UIButton button-style="text" class="clear-filters" @click="clearFilters">
				<UIIcon icon="SVGClose" /> Clear Filters
			</UIButton>
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
import { UIButton, UIIcon } from 'ui-components'
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
			project.tags.includes(selectedTag.value),
		)
	}

	// Filter by search query
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase()
		projects = projects.filter(project =>
			project.name.toLowerCase().includes(query) ||
			project.client.toLowerCase().includes(query) ||
			project.tags.some(tag => tag.toLowerCase().includes(query)),
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
	max-width: $width-x-large-desktop;
	padding: $size-32;

	@include max-width(tablet) {
		padding: $size-16;
	}
}

.portfolio-header {
	margin-bottom: $size-48;
	text-align: center;

	h1 {
		color: var(--color-heading);
		font-size: $size-48;
		font-weight: $weight-bold;
		margin-bottom: $size-16;

		@include max-width(tablet) {
			font-size: 2.2rem;
		}
	}

	.portfolio-description {
		color: var(--color-text);
		font-size: 1.1rem;
		line-height: 1.6;
		margin: 0 auto $size-32;
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
		gap: $size-16;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		margin: 0 auto;
		max-width: 600px;

		.stat-item {
			background: var(--color-background);
			border-radius: $size-12;
			border: 1px solid var(--color-border);
			box-shadow: 0 $size-2 $size-10 rgba(0, 0, 0, 0.05);
			padding: $size-16;

			.stat-number {
				color: var(--color-text-secondary);
				display: block;
				font-size: $size-32;
				font-weight: $weight-bold;
				margin-bottom: $size-4;
			}

			.stat-label {
				color: var(--color-text);
				font-size: 0.9rem;
				font-weight: $weight-medium;
			}
		}
	}
}

.controls-section {
	background: var(--color-background);
	border-radius: $size-16;
	box-shadow: 0 $size-4 $size-20 rgba(0, 0, 0, 0.08);
	margin-bottom: $size-32;
	padding: $size-32;

	.search-controls {
		align-items: center;
		display: flex;
		gap: $size-16;
		margin-bottom: $size-32;

		@include max-width(tablet) {
			flex-direction: column;
		}

		.search-box {
			flex: 1;
			position: relative;

			> [data-ui="icon"] {
				color: var(--color-text);
				left: $size-16;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}

			.search-input {
				background: var(--color-background);
				color: var(--color-text);
				border-radius: $size-8;
				border: $size-2 solid var(--color-border);
				font-size: $size-16;
				padding: $size-12 $size-16 $size-12 $size-40;
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
				padding: $size-8;
				position: absolute;
				right: $size-8;
				top: 50%;
				transform: translateY(-50%);

				&:hover {
					color: var(--color-text-secondary);
				}
			}
		}

		.view-controls {
			display: flex;
			gap: $size-8;

			.view-button {
				background: var(--color-background);
				border-radius: $size-8;
				border: $size-2 solid var(--color-border);
				color: var(--color-text);
				cursor: pointer;
				font-size: 0.9rem;
				padding: $size-12 $size-16;
				transition: all 0.3s ease;

				&:hover {
					border-color: var(--color-text-secondary);
					color: #000;
				}

				&.active {
					background: var(--color-text-secondary);
					border-color: var(--color-text-secondary);
					color: #000;
				}
			}
		}
	}

	.filter-section {
		h3 {
			color: var(--color-text);
			font-size: 1.1rem;
			margin-bottom: $size-16;
		}

		.tag-filters {
			display: flex;
			flex-wrap: wrap;
			gap: $size-8;
			margin-bottom: $size-16;

			.filter-tag {
				background: var(--color-background);
				border-radius: 20px;
				border: 1px solid var(--color-border);
				color: var(--color-text);
				cursor: pointer;
				font-size: 0.9rem;
				padding: $size-8 $size-16;
				transition: all 0.3s ease;

				&:hover {
					border-color: var(--color-text-secondary);
					color: #000;
				}

				&.active {
					background: var(--color-text-secondary);
					border-color: var(--color-text-secondary);
				}

				&.all-tag {
					border-color: var(--color-text-secondary);
					color: var(--color-text-secondary);
					font-weight: $weight-semibold;

					&.active {
						background: var(--color-text-secondary);
						color: #000;
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
			gap: $size-8;
			margin-top: $size-16;
		}
	}
}

.results-summary {
	align-items: center;
	background: var(--color-background);
	border-radius: $size-8;
	display: flex;
	justify-content: space-between;
	margin-bottom: $size-32;
	padding: $size-16;

	@include max-width(tablet) {
		flex-direction: column;
		gap: $size-16;
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
		padding: $size-8 $size-16;
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
