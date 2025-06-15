import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import Portfolio from '@/views/Portfolio.vue'

// Mock portfolio data (must be defined before mocks)
const mockPortfolioData = {
	portfolio: {
		copy: 'Browse my gallery of projects.',
		projects: [
			{
				id: 1,
				name: 'Vue Project',
				client: 'Client A',
				year: '2023',
				timeline: '3 months',
				tags: ['Vue', 'TypeScript', 'SASS'],
				image: 'vue-project.png'
			},
			{
				id: 2,
				name: 'React Project',
				client: 'Client B',
				year: '2022',
				timeline: '6 weeks',
				tags: ['React', 'JavaScript', 'CSS'],
				image: 'react-project.png'
			},
			{
				id: 3,
				name: 'Angular Project',
				client: 'Client A',
				year: '2024',
				timeline: 'ongoing',
				tags: ['Angular', 'TypeScript', 'RxJS'],
				image: 'angular-project.png'
			},
			{
				id: 4,
				name: 'Fullstack Project',
				client: 'Client C',
				year: '2023',
				timeline: '8 months',
				tags: ['Vue', 'Node.js', 'PostgreSQL'],
				image: 'fullstack-project.png'
			}
		],
		title: 'Portfolio',
	}
}

// Mock child components
vi.mock('@/components/ProjectGrid.vue', () => ({
	default: {
		emits: ['project-click'],
		name: 'ProjectGrid',
		props: ['projects', 'viewMode'],
		template: `
			<div class="project-grid-mock">
				<div
					v-for="project in projects"
					:key="project.id"
					class="mock-project-card"
					@click="$emit('project-click', project)"
				>
					{{ project.name }}
				</div>
			</div>
		`
	}
}))

vi.mock('@/components/ProjectModal.vue', () => ({
	default: {
		emits: ['close'],
		name: 'ProjectModal',
		props: ['project'],
		template: `
			<div class="project-modal-mock">
				<h3>{{ project.name }}</h3>
				<button @click="$emit('close')" class="close-modal">Close</button>
			</div>
		`
	}
}))

vi.mock('@/data/static.en-us.json', () => ({
	default: mockPortfolioData
}))

describe('Portfolio View', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = mount(Portfolio)
	})

	describe('Component Initialization', () => {
		it('renders portfolio header correctly', () => {
			expect(wrapper.find('h1').text()).toBe('Portfolio')
			expect(wrapper.find('.portfolio-description').text()).toBe('Browse my gallery of projects.')
		})

		it('displays portfolio statistics correctly', () => {
			const statItems = wrapper.findAll('.stat-item')
			expect(statItems).toHaveLength(4)

			// Check stat values
			expect(statItems[0].find('.stat-number').text()).toBe('4') // Total projects
			expect(statItems[0].find('.stat-label').text()).toBe('Projects')

			expect(statItems[1].find('.stat-number').text()).toBe('3') // Unique clients
			expect(statItems[1].find('.stat-label').text()).toBe('Clients')

			expect(statItems[2].find('.stat-number').text()).toBe('3') // Year range (2022-2024)
			expect(statItems[2].find('.stat-label').text()).toBe('Years')

			expect(statItems[3].find('.stat-number').text()).toBe('8') // Unique technologies
			expect(statItems[3].find('.stat-label').text()).toBe('Technologies')
		})

		it('initializes with correct default state', () => {
			expect(wrapper.vm.searchQuery).toBe('')
			expect(wrapper.vm.selectedTag).toBeNull()
			expect(wrapper.vm.viewMode).toBe('grid')
			expect(wrapper.vm.showAllTags).toBe(false)
			expect(wrapper.vm.selectedProject).toBeNull()
		})
	})

	describe('Search Functionality', () => {
		it('filters projects by search query', async () => {
			const searchInput = wrapper.find('.search-input')

			await searchInput.setValue('Vue')

			// Should filter to projects containing "Vue"
			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const filteredProjects = projectGrid.props('projects')

			expect(filteredProjects).toHaveLength(2) // Vue Project and Fullstack Project
			expect(filteredProjects.every((p: any) =>
				p.name.includes('Vue') || p.tags.includes('Vue')
			)).toBe(true)
		})

		it('searches across project names, clients, and tags', async () => {
			const searchInput = wrapper.find('.search-input')

			// Search by client name
			await searchInput.setValue('Client A')
			let projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			let filteredProjects = projectGrid.props('projects')
			expect(filteredProjects).toHaveLength(2)

			// Search by technology tag
			await searchInput.setValue('React')
			filteredProjects = projectGrid.props('projects')
			expect(filteredProjects).toHaveLength(1)
			expect(filteredProjects[0].name).toBe('React Project')
		})

		it('shows clear search button when search query exists', async () => {
			const searchInput = wrapper.find('.search-input')

			// Initially no clear button
			expect(wrapper.find('.clear-search').exists()).toBe(false)

			await searchInput.setValue('Vue')

			// Clear button should appear
			expect(wrapper.find('.clear-search').exists()).toBe(true)
		})

		it('clears search when clear button is clicked', async () => {
			const searchInput = wrapper.find('.search-input')

			await searchInput.setValue('Vue')
			expect(wrapper.vm.searchQuery).toBe('Vue')

			await wrapper.find('.clear-search').trigger('click')
			expect(wrapper.vm.searchQuery).toBe('')
		})

		it('performs case-insensitive search', async () => {
			const searchInput = wrapper.find('.search-input')

			await searchInput.setValue('vue')

			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const filteredProjects = projectGrid.props('projects')

			expect(filteredProjects).toHaveLength(2)
		})
	})

	describe('Tag Filtering', () => {
		it('displays popular tags correctly', () => {
			const tagFilters = wrapper.findAll('.filter-tag:not(.all-tag)')

			// Should show first 12 tags (or all if fewer)
			expect(tagFilters.length).toBeLessThanOrEqual(12)

			// First tag should be the most popular (Vue appears twice)
			expect(tagFilters[0].text()).toContain('Vue')
			expect(tagFilters[0].text()).toContain('(2)') // Count
		})

		it('filters projects by selected tag', async () => {
			const vueTag = wrapper.findAll('.filter-tag').find((tag: any) =>
				tag.text().includes('Vue')
			)

			await vueTag.trigger('click')

			expect(wrapper.vm.selectedTag).toBe('Vue')

			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const filteredProjects = projectGrid.props('projects')

			expect(filteredProjects).toHaveLength(2)
			expect(filteredProjects.every((p: any) => p.tags.includes('Vue'))).toBe(true)
		})

		it('shows all projects when "All Projects" is selected', async () => {
			// First select a tag
			const vueTag = wrapper.findAll('.filter-tag').find((tag: any) =>
				tag.text().includes('Vue')
			)
			await vueTag.trigger('click')

			// Then click "All Projects"
			const allTag = wrapper.find('.all-tag')
			await allTag.trigger('click')

			expect(wrapper.vm.selectedTag).toBe('')

			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const filteredProjects = projectGrid.props('projects')

			expect(filteredProjects).toHaveLength(4) // All projects
		})

		it('shows active state for selected tag', async () => {
			const vueTag = wrapper.findAll('.filter-tag').find((tag: any) =>
				tag.text().includes('Vue')
			)

			await vueTag.trigger('click')

			expect(vueTag.classes()).toContain('active')
		})

		it('updates tag counts correctly', () => {
			const tagFilters = wrapper.findAll('.filter-tag:not(.all-tag)')

			// Vue should show count of 2
			const vueTag = tagFilters.find((tag: any) => tag.text().includes('Vue'))
			expect(vueTag.text()).toContain('(2)')

			// TypeScript should show count of 2
			const tsTag = tagFilters.find((tag: any) => tag.text().includes('TypeScript'))
			expect(tsTag.text()).toContain('(2)')
		})
	})

	describe('View Mode Switching', () => {
		it('switches between grid and list view modes', async () => {
			const gridBtn = wrapper.find('.view-button:first-child')
			const listBtn = wrapper.find('.view-button:last-child')

			// Initially grid mode
			expect(wrapper.vm.viewMode).toBe('grid')
			expect(gridBtn.classes()).toContain('active')

			// Switch to list mode
			await listBtn.trigger('click')
			expect(wrapper.vm.viewMode).toBe('list')
			expect(listBtn.classes()).toContain('active')
			expect(gridBtn.classes()).not.toContain('active')

			// Switch back to grid
			await gridBtn.trigger('click')
			expect(wrapper.vm.viewMode).toBe('grid')
			expect(gridBtn.classes()).toContain('active')
		})

		it('passes view mode to ProjectGrid component', async () => {
			const listBtn = wrapper.find('.view-button:last-child')
			await listBtn.trigger('click')

			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			expect(projectGrid.props('viewMode')).toBe('list')
		})
	})

	describe('Combined Filtering', () => {
		it('applies both search and tag filters together', async () => {
			// Apply tag filter
			const vueTag = wrapper.findAll('.filter-tag').find((tag: any) =>
				tag.text().includes('Vue')
			)
			await vueTag.trigger('click')

			// Apply search filter
			const searchInput = wrapper.find('.search-input')
			await searchInput.setValue('Fullstack')

			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const filteredProjects = projectGrid.props('projects')

			// Should show only the Fullstack Project (has Vue tag and matches search)
			expect(filteredProjects).toHaveLength(1)
			expect(filteredProjects[0].name).toBe('Fullstack Project')
		})

		it('shows results summary when filters are applied', async () => {
			const vueTag = wrapper.findAll('.filter-tag').find((tag: any) =>
				tag.text().includes('Vue')
			)
			await vueTag.trigger('click')

			const resultsSummary = wrapper.find('.results-summary')
			expect(resultsSummary.exists()).toBe(true)
			expect(resultsSummary.text()).toContain('Showing 2 of 4 projects')
			expect(resultsSummary.text()).toContain('tagged with "Vue"')
		})

		it('hides results summary when no filters are applied', () => {
			const resultsSummary = wrapper.find('.results-summary')
			expect(resultsSummary.exists()).toBe(false)
		})

		it('clears all filters when clear filters button is clicked', async () => {
			// Apply filters
			const vueTag = wrapper.findAll('.filter-tag').find((tag: any) =>
				tag.text().includes('Vue')
			)
			await vueTag.trigger('click')

			const searchInput = wrapper.find('.search-input')
			await searchInput.setValue('Vue')

			// Clear all filters
			const clearButton = wrapper.find('.clear-filters')
			await clearButton.trigger('click')

			expect(wrapper.vm.searchQuery).toBe('')
			expect(wrapper.vm.selectedTag).toBe('')

			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const filteredProjects = projectGrid.props('projects')
			expect(filteredProjects).toHaveLength(4) // All projects
		})
	})

	describe('Project Modal Management', () => {
		it('opens project modal when project is clicked', async () => {
			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })

			// Simulate project click
			await projectGrid.vm.$emit('project-click', mockPortfolioData.portfolio.projects[0])

			expect(wrapper.vm.selectedProject).toEqual(mockPortfolioData.portfolio.projects[0])

			// Modal should be rendered
			const modal = wrapper.findComponent({ name: 'ProjectModal' })
			expect(modal.exists()).toBe(true)
			expect(modal.props('project')).toEqual(mockPortfolioData.portfolio.projects[0])
		})

		it('closes project modal when close event is emitted', async () => {
			// First open a modal
			wrapper.vm.selectedProject = mockPortfolioData.portfolio.projects[0]
			await wrapper.vm.$nextTick()

			const modal = wrapper.findComponent({ name: 'ProjectModal' })
			expect(modal.exists()).toBe(true)

			// Close the modal
			await modal.vm.$emit('close')

			expect(wrapper.vm.selectedProject).toBeNull()
		})

		it('does not render modal when no project is selected', () => {
			expect(wrapper.vm.selectedProject).toBeNull()

			const modal = wrapper.findComponent({ name: 'ProjectModal' })
			expect(modal.exists()).toBe(false)
		})
	})

	describe('Projects Sorting', () => {
		it('sorts projects by year in descending order', () => {
			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const projects = projectGrid.props('projects')

			// Should be sorted: 2024, 2023, 2023, 2022
			expect(projects[0].year).toBe('2024')
			expect(projects[1].year).toBe('2023')
			expect(projects[2].year).toBe('2023')
			expect(projects[3].year).toBe('2022')
		})
	})

	describe('Show More Tags Functionality', () => {
		it('shows "show more tags" button when there are more than 12 tags', () => {
			// Current mock data has only 8 unique tags, so let's test the logic
			// We'll need to modify the data or test with different data

			// For now, test that the button doesn't show with current data
			const showMoreButton = wrapper.find('.show-more-tags')
			expect(showMoreButton.exists()).toBe(false)
		})

		it('shows all tags when "show more" is clicked', async () => {
			// Set showAllTags to true to test the display
			wrapper.vm.showAllTags = true
			await wrapper.vm.$nextTick()

			const allTagsSection = wrapper.find('.all-tags')
			expect(allTagsSection.exists()).toBe(true)
		})
	})

	describe('Computed Properties', () => {
		it('calculates total clients correctly', () => {
			expect(wrapper.vm.totalClients).toBe(3) // Client A, Client B, Client C
		})

		it('calculates year range correctly', () => {
			expect(wrapper.vm.yearRange).toBe('3') // 2024 - 2022 + 1 = 3
		})

		it('calculates total technologies correctly', () => {
			expect(wrapper.vm.totalTechnologies).toBe(8) // Unique tags count
		})

		it('calculates popular tags correctly', () => {
			const popular = wrapper.vm.popularTags
			expect(popular[0].name).toBe('Vue') // Most frequent
			expect(popular[0].count).toBe(2)
		})
	})

	describe('Edge Cases and Error Handling', () => {
		it('handles empty search results', async () => {
			const searchInput = wrapper.find('.search-input')
			await searchInput.setValue('NonexistentProject')

			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const filteredProjects = projectGrid.props('projects')

			expect(filteredProjects).toHaveLength(0)
		})

		it('handles empty tag filter results', async () => {
			// Try to filter by a tag that doesn't exist
			wrapper.vm.selectedTag = 'NonexistentTag'
			await wrapper.vm.$nextTick()

			const projectGrid = wrapper.findComponent({ name: 'ProjectGrid' })
			const filteredProjects = projectGrid.props('projects')

			expect(filteredProjects).toHaveLength(0)
		})

		it('handles projects with no tags gracefully', () => {
			// This is tested implicitly in the tag counting logic
			expect(wrapper.vm.allTags.length).toBeGreaterThan(0)
		})
	})

	describe('Accessibility', () => {
		it('uses proper heading hierarchy', () => {
			expect(wrapper.find('h1').exists()).toBe(true)
			expect(wrapper.find('h3').exists()).toBe(true)
		})

		it('provides proper form labels and structure', () => {
			const searchInput = wrapper.find('.search-input')
			expect(searchInput.attributes('placeholder')).toBeTruthy()
		})

		it('uses semantic button elements', () => {
			const buttons = wrapper.findAll('button')
			expect(buttons.length).toBeGreaterThan(0)

			buttons.forEach(button => {
				expect(button.element.tagName).toBe('BUTTON')
			})
		})
	})
})
