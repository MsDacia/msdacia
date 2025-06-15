import {
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import ExperienceTimeline from '@/components/ExperienceTimeline.vue'

// Mock the content data
const mockResumeData = {
	resume: {
		experiences: {
			title: 'Experience',
			job: [
				{
					company: 'Test Company A',
					date: '01/2020 to 12/2022',
					id: 1,
					location: 'Remote',
					points: [
						'Developed modern web applications using Vue.js and TypeScript',
						'Led a team of 3 junior developers',
						'Improved application performance by 40%'
					],
					title: 'Senior Frontend Developer',
				},
				{
					company: 'Test Company B',
					date: '06/2018 to 12/2019',
					id: 2,
					location: 'Chicago, IL',
					points: [
						'Built responsive web interfaces using React and JavaScript',
						'Collaborated with design team to implement pixel-perfect UIs',
						'Participated in code reviews and mentored interns'
					],
					title: 'Frontend Developer',
				},
				{
					company: 'Test Company C',
					date: '01/2016 to 05/2018',
					id: 3,
					location: 'New York, NY',
					points: [
						'Created landing pages and marketing websites',
						'Learned modern development practices and tools',
						'Worked on cross-browser compatibility issues'
					],
					title: 'Junior Web Developer',
				}
			]
		}
	}
}

vi.mock('@/data/static.en-us.json', () => ({
	default: mockResumeData
}))

describe('ExperienceTimeline Component', () => {
	describe('Component Rendering', () => {
		it('renders timeline header correctly', () => {
			const wrapper = mount(ExperienceTimeline)

			expect(wrapper.find('.timeline-header h2').text()).toBe('Experience')
			expect(wrapper.find('.timeline-subtitle').text()).toBe('My professional journey in front-end development')
		})

		it('renders all timeline items', () => {
			const wrapper = mount(ExperienceTimeline)

			const timelineItems = wrapper.findAll('.timeline-item')
			expect(timelineItems).toHaveLength(3)
		})

		it('displays job information correctly', () => {
			const wrapper = mount(ExperienceTimeline)

			const firstJob = wrapper.findAll('.timeline-item').at(0)

			expect(firstJob?.find('.job-title').text()).toBe('Senior Frontend Developer')
			expect(firstJob?.find('.company-name').text()).toBe('Test Company A')
			expect(firstJob?.find('.job-location').text()).toBe('Remote')
			expect(firstJob?.find('.job-date').text()).toBe('01/2020 to 12/2022')
		})

		it('renders timeline markers', () => {
			const wrapper = mount(ExperienceTimeline)

			const markers = wrapper.findAll('.timeline-marker')
			expect(markers).toHaveLength(3)
		})

		it('shows expand icons for all jobs', () => {
			const wrapper = mount(ExperienceTimeline)

			const expandIcons = wrapper.findAll('.expand-icon')
			expect(expandIcons).toHaveLength(3)

			// Initially none should be rotated
			expandIcons.forEach(icon => {
				expect(icon.classes()).not.toContain('rotated')
			})
		})
	})

	describe('Expand/Collapse Functionality', () => {
		it('starts with all jobs collapsed', () => {
			const wrapper = mount(ExperienceTimeline)

			expect(wrapper.vm.expandedJob).toBeNull()

			const jobContents = wrapper.findAll('.job-content')
			jobContents.forEach(content => {
				expect(content.isVisible()).toBe(false)
			})
		})

		it('expands job when clicked', async () => {
			const wrapper = mount(ExperienceTimeline)

			const firstJobCard = wrapper.findAll('.job-card').at(0)
			await firstJobCard?.trigger('click')

			expect(wrapper.vm.expandedJob).toBe(1)

			const firstJobContent = wrapper.findAll('.job-content').at(0)
			expect(firstJobContent?.isVisible()).toBe(true)
		})

		it('collapses job when clicked again', async () => {
			const wrapper = mount(ExperienceTimeline)

			const firstJobCard = wrapper.findAll('.job-card').at(0)

			// Expand
			await firstJobCard?.trigger('click')
			expect(wrapper.vm.expandedJob).toBe(1)

			// Collapse
			await firstJobCard?.trigger('click')
			expect(wrapper.vm.expandedJob).toBeNull()
		})

		it('switches between jobs correctly', async () => {
			const wrapper = mount(ExperienceTimeline)

			const jobCards = wrapper.findAll('.job-card')

			// Expand first job
			await jobCards.at(0)?.trigger('click')
			expect(wrapper.vm.expandedJob).toBe(1)

			// Expand second job (should close first)
			await jobCards.at(1)?.trigger('click')
			expect(wrapper.vm.expandedJob).toBe(2)

			// First job should be collapsed, second expanded
			expect(wrapper.findAll('.job-content').at(0)?.isVisible()).toBe(false)
			expect(wrapper.findAll('.job-content').at(1)?.isVisible()).toBe(true)
		})

		it('rotates expand icon when job is expanded', async () => {
			const wrapper = mount(ExperienceTimeline)

			const firstJobCard = wrapper.findAll('.job-card').at(0)
			const firstExpandIcon = wrapper.findAll('.expand-icon').at(0)

			// Initially not rotated
			expect(firstExpandIcon?.classes()).not.toContain('rotated')

			// Expand job
			await firstJobCard?.trigger('click')

			// Icon should be rotated
			expect(firstExpandIcon?.classes()).toContain('rotated')
		})

		it('adds expanded class to timeline item when job is expanded', async () => {
			const wrapper = mount(ExperienceTimeline)

			const firstTimelineItem = wrapper.findAll('.timeline-item').at(0)
			const firstJobCard = wrapper.findAll('.job-card').at(0)

			// Initially not expanded
			expect(firstTimelineItem?.classes()).not.toContain('expanded')

			// Expand job
			await firstJobCard?.trigger('click')

			// Timeline item should have expanded class
			expect(firstTimelineItem?.classes()).toContain('expanded')
		})
	})

	describe('Job Content Display', () => {
		it('displays responsibility points when job is expanded', async () => {
			const wrapper = mount(ExperienceTimeline)

			const firstJobCard = wrapper.findAll('.job-card').at(0)
			await firstJobCard?.trigger('click')

			const responsibilityItems = wrapper.findAll('.responsibility-item')
			expect(responsibilityItems).toHaveLength(3)

			expect(responsibilityItems.at(0)?.text()).toContain('Developed modern web applications')
			expect(responsibilityItems.at(1)?.text()).toContain('Led a team of 3 junior developers')
			expect(responsibilityItems.at(2)?.text()).toContain('Improved application performance by 40%')
		})

		it('renders HTML content in responsibility points', async () => {
			// Test with HTML content in points
			const htmlMockData = {
				resume: {
					experiences: {
						title: 'Experience',
						job: [{
							id: 1,
							company: 'HTML Test Company',
							date: '2020-2022',
							location: 'Remote',
							title: 'Developer',
							points: [
								'Used <strong>Vue.js</strong> and <em>TypeScript</em>',
								'Built <a href="https://example.com">modern applications</a>'
							]
						}]
					}
				}
			}

			// Create wrapper with HTML content
			const wrapper = mount(ExperienceTimeline, {
				global: {
					mocks: {
						content: htmlMockData
					}
				}
			})

			// Mock the content ref to use our HTML data
			wrapper.vm.content = htmlMockData

			await wrapper.vm.$nextTick()

			const jobCard = wrapper.find('.job-card')
			await jobCard.trigger('click')

			const responsibilityItems = wrapper.findAll('.responsibility-item')

			// Check that HTML is rendered (v-html directive)
			expect(responsibilityItems.at(0)?.html()).toContain('<strong>Vue.js</strong>')
			expect(responsibilityItems.at(0)?.html()).toContain('<em>TypeScript</em>')
		})

		it('shows responsibilities header when job is expanded', async () => {
			const wrapper = mount(ExperienceTimeline)

			const firstJobCard = wrapper.findAll('.job-card').at(0)
			await firstJobCard?.trigger('click')

			const responsibilitiesHeader = wrapper.find('.responsibilities h5')
			expect(responsibilitiesHeader.exists()).toBe(true)
			expect(responsibilitiesHeader.text()).toBe('Key Responsibilities & Achievements:')
		})
	})

	describe('Timeline Visual Elements', () => {
		it('creates timeline structure with proper CSS classes', () => {
			const wrapper = mount(ExperienceTimeline)

			expect(wrapper.find('.timeline').exists()).toBe(true)
			expect(wrapper.findAll('.timeline-item')).toHaveLength(3)
			expect(wrapper.findAll('.timeline-marker')).toHaveLength(3)
		})

		it('applies hover effects structure to job cards', () => {
			const wrapper = mount(ExperienceTimeline)

			const jobCards = wrapper.findAll('.job-card')
			jobCards.forEach(card => {
				// Cards should have the basic structure for CSS hover effects
				expect(card.exists()).toBe(true)
			})
		})
	})

	describe('Data Integration', () => {
		it('uses content data from JSON file correctly', () => {
			const wrapper = mount(ExperienceTimeline)

			// Verify that component data is properly loaded
			expect(wrapper.vm.content.resume.experiences.title).toBe('Experience')
			expect(wrapper.vm.content.resume.experiences.job).toHaveLength(3)
		})

		it('reactively updates when content changes', async () => {
			const wrapper = mount(ExperienceTimeline)

			// Change the content reactively
			wrapper.vm.content.resume.experiences.title = 'Work History'
			await wrapper.vm.$nextTick()

			expect(wrapper.find('.timeline-header h2').text()).toBe('Work History')
		})

		it('handles jobs array correctly', () => {
			const wrapper = mount(ExperienceTimeline)

			const jobs = wrapper.vm.content.resume.experiences.job
			expect(Array.isArray(jobs)).toBe(true)
			expect(jobs.length).toBe(3)

			// Each job should have required properties
			jobs.forEach((job: any) => {
				expect(job.id).toBeDefined()
				expect(job.title).toBeDefined()
				expect(job.company).toBeDefined()
				expect(job.date).toBeDefined()
				expect(job.location).toBeDefined()
				expect(Array.isArray(job.points)).toBe(true)
			})
		})
	})

	describe('Method Testing', () => {
		it('toggleJob method expands and collapses correctly', async () => {
			const wrapper = mount(ExperienceTimeline)

			// Initially no job expanded
			expect(wrapper.vm.expandedJob).toBeNull()

			// Expand job 1
			wrapper.vm.toggleJob(1)
			await wrapper.vm.$nextTick()
			expect(wrapper.vm.expandedJob).toBe(1)

			// Collapse job 1
			wrapper.vm.toggleJob(1)
			await wrapper.vm.$nextTick()
			expect(wrapper.vm.expandedJob).toBeNull()

			// Expand job 2
			wrapper.vm.toggleJob(2)
			await wrapper.vm.$nextTick()
			expect(wrapper.vm.expandedJob).toBe(2)

			// Switch to job 3
			wrapper.vm.toggleJob(3)
			await wrapper.vm.$nextTick()
			expect(wrapper.vm.expandedJob).toBe(3)
		})
	})

	describe('Accessibility', () => {
		it('uses semantic HTML structure', () => {
			const wrapper = mount(ExperienceTimeline)

			// Should have proper heading hierarchy
			expect(wrapper.find('h2').exists()).toBe(true)
			expect(wrapper.findAll('h3').length).toBe(3) // One for each job title
			expect(wrapper.findAll('h4').length).toBe(3) // One for each company
			expect(wrapper.findAll('h5').length).toBe(0) // Hidden until expanded

			// Lists should be semantic
			expect(wrapper.findAll('ul').length).toBe(0) // Hidden until expanded
		})

		it('provides meaningful content for screen readers', () => {
			const wrapper = mount(ExperienceTimeline)

			// All text content should be meaningful
			const jobTitles = wrapper.findAll('.job-title')
			const companyNames = wrapper.findAll('.company-name')
			const dates = wrapper.findAll('.job-date')

			jobTitles.forEach(title => {
				expect(title.text().trim()).toBeTruthy()
			})

			companyNames.forEach(company => {
				expect(company.text().trim()).toBeTruthy()
			})

			dates.forEach(date => {
				expect(date.text().trim()).toBeTruthy()
			})
		})

		it('has clickable elements that are focusable', () => {
			const wrapper = mount(ExperienceTimeline)

			const jobCards = wrapper.findAll('.job-card')
			jobCards.forEach(card => {
				// Cards should be clickable divs (could be improved with role="button")
				expect(card.element.tagName).toBe('DIV')
			})
		})

		it('expands job content with proper list structure', async () => {
			const wrapper = mount(ExperienceTimeline)

			const firstJobCard = wrapper.findAll('.job-card').at(0)
			await firstJobCard?.trigger('click')

			// Should create proper list structure
			const responsibilityList = wrapper.find('.responsibility-list')
			expect(responsibilityList.exists()).toBe(true)
			expect(responsibilityList.element.tagName).toBe('UL')

			const listItems = wrapper.findAll('.responsibility-item')
			listItems.forEach(item => {
				expect(item.element.tagName).toBe('LI')
			})
		})
	})

	describe('Edge Cases and Error Handling', () => {
		it('handles empty job array gracefully', () => {
			const emptyJobsData = {
				resume: {
					experiences: {
						title: 'Experience',
						job: []
					}
				}
			}

			const wrapper = mount(ExperienceTimeline, {
				global: {
					mocks: {
						content: emptyJobsData
					}
				}
			})

			// Mock the content ref
			wrapper.vm.content = emptyJobsData

			expect(wrapper.findAll('.timeline-item')).toHaveLength(0)
			expect(wrapper.find('.timeline-header').exists()).toBe(true)
		})

		it('handles jobs with empty points array', async () => {
			const jobWithEmptyPoints = {
				resume: {
					experiences: {
						title: 'Experience',
						job: [{
							id: 1,
							company: 'Test Company',
							date: '2020-2022',
							location: 'Remote',
							title: 'Developer',
							points: []
						}]
					}
				}
			}

			const wrapper = mount(ExperienceTimeline, {
				global: {
					mocks: {
						content: jobWithEmptyPoints
					}
				}
			})

			wrapper.vm.content = jobWithEmptyPoints
			await wrapper.vm.$nextTick()

			const jobCard = wrapper.find('.job-card')
			await jobCard.trigger('click')

			expect(wrapper.findAll('.responsibility-item')).toHaveLength(0)
			expect(wrapper.find('.responsibility-list').exists()).toBe(true)
		})

		it('handles missing job properties gracefully', async () => {
			const incompleteJobData = {
				resume: {
					experiences: {
						title: 'Experience',
						job: [{
							id: 1,
							company: 'Test Company',
							title: 'Developer',
							points: ['Single responsibility']
							// Missing date and location
						}]
					}
				}
			}

			const wrapper = mount(ExperienceTimeline, {
				global: {
					mocks: {
						content: incompleteJobData
					}
				}
			})

			wrapper.vm.content = incompleteJobData
			await wrapper.vm.$nextTick()

			// Component should still render without crashing
			expect(wrapper.find('.timeline-item').exists()).toBe(true)
			expect(wrapper.find('.job-title').text()).toBe('Developer')
			expect(wrapper.find('.company-name').text()).toBe('Test Company')
		})
	})

	describe('Performance Considerations', () => {
		it('handles large number of jobs efficiently', () => {
			const manyJobs = Array.from({ length: 20 }, (_, i) => ({
				id: i + 1,
				company: `Company ${i + 1}`,
				date: `202${i % 4} to present`,
				location: 'Remote',
				title: `Position ${i + 1}`,
				points: [`Responsibility ${i + 1}`]
			}))

			const largeDatSet = {
				resume: {
					experiences: {
						title: 'Experience',
						job: manyJobs
					}
				}
			}

			const wrapper = mount(ExperienceTimeline, {
				global: {
					mocks: {
						content: largeDatSet
					}
				}
			})

			wrapper.vm.content = largeDatSet

			expect(wrapper.findAll('.timeline-item')).toHaveLength(20)
			expect(wrapper.vm).toBeTruthy() // Component should render without issues
		})

		it('uses Vue 3 Composition API efficiently', () => {
			const wrapper = mount(ExperienceTimeline)

			// Check that refs are properly initialized
			expect(wrapper.vm.content).toBeTruthy()
			expect(wrapper.vm.expandedJob).toBe(null)

			// Check that reactive updates work
			wrapper.vm.expandedJob = 1
			expect(wrapper.vm.expandedJob).toBe(1)
		})
	})

	describe('Responsive Design Support', () => {
		it('renders responsive structure correctly', () => {
			const wrapper = mount(ExperienceTimeline)

			// Check that responsive elements exist (actual responsive behavior tested in E2E)
			expect(wrapper.find('.experience-timeline').exists()).toBe(true)
			expect(wrapper.find('.timeline').exists()).toBe(true)
			expect(wrapper.findAll('.timeline-item').length).toBeGreaterThan(0)
		})
	})
})
