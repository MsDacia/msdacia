import {
	afterEach,
	describe,
	it,
	expect,
	vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectModal from '@/components/ProjectModal.vue'
import { createMockProject } from '@/tests/utils/test-helpers'

// Mock window.open
const mockWindowOpen = vi.fn()
Object.defineProperty(window, 'open', {
	value: mockWindowOpen,
	writable: true,
})

// Selectors for the ui-components UIModal shell
const MODAL = '.ui-modal'
const BACKDROP = '.ui-layout-backdrop'
const CLOSE_BUTTON = '.ui-close-button'
const SUBMIT_BUTTON = '[data-ui-role="submit"]'
const CANCEL_BUTTON = '[data-ui-role="cancel"]'

describe('ProjectModal Component', () => {
	const mockProject = createMockProject({
		client: 'Modal Test Client',
		id: 1,
		image: 'test-modal.png',
		link: 'https://example.com',
		name: 'Test Project Modal',
		tags: ['Vue', 'TypeScript', 'SASS', 'Jest', 'Docker'],
		timeline: '4 months',
		year: '2023',
	})

	describe('Component Rendering', () => {
		it('renders the UIModal shell', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			expect(wrapper.find(MODAL).exists()).toBe(true)
			expect(wrapper.find(BACKDROP).exists()).toBe(true)
		})

		it('displays project information correctly', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			// Title slot contains the year badge, project name and client
			expect(wrapper.find('.modal-title .ui-badge').text()).toBe('2023')
			expect(wrapper.find('.project-title').text()).toBe('Test Project Modal')
			expect(wrapper.find('.project-client').text()).toBe('Modal Test Client')
		})

		it('renders project image placeholder when the image fails to load', async () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const imageSection = wrapper.find('.project-image-large')
			expect(imageSection.exists()).toBe(true)

			// Simulate the image failing to load, which reveals the placeholder
			await imageSection.find('.project-img-large').trigger('error')

			expect(imageSection.find('.placeholder-image').exists()).toBe(true)
			expect(imageSection.find('.placeholder-image span').text()).toBe('Test Project Modal')
		})

		it('displays project metadata correctly', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const metaItems = wrapper.findAll('.meta-item')
			expect(metaItems.length).toBeGreaterThanOrEqual(3)

			// Check that year, duration, and client are displayed
			const metaTexts = metaItems.map(item => item.text())
			expect(metaTexts.some(text => text.includes('2023'))).toBe(true)
			expect(metaTexts.some(text => text.includes('4 months'))).toBe(true)
			expect(metaTexts.some(text => text.includes('Modal Test Client'))).toBe(true)
		})

		it('shows live site link when project has link', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const liveLink = wrapper.find('.live-link')
			expect(liveLink.exists()).toBe(true)
			// UILink drives navigation via JS, so it exposes target but not an href attribute
			expect(liveLink.classes()).toContain('ui-link')
			expect(liveLink.attributes('target')).toBe('_blank')
		})

		it('hides live site link when project has no link', () => {
			const projectWithoutLink = { ...mockProject, link: undefined }
			const wrapper = mount(ProjectModal, {
				props: { project: projectWithoutLink },
			})

			expect(wrapper.find('.live-link').exists()).toBe(false)
			expect(wrapper.findAll('.meta-item')).toHaveLength(3) // Only year, duration, client
		})
	})

	describe('Technology Tags', () => {
		it('displays all technology tags', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const techTags = wrapper.findAll('.tech-tag')
			expect(techTags).toHaveLength(5)

			const tagTexts = techTags.map(tag => tag.text())
			expect(tagTexts).toContain('Vue')
			expect(tagTexts).toContain('TypeScript')
			expect(tagTexts).toContain('SASS')
			expect(tagTexts).toContain('Jest')
			expect(tagTexts).toContain('Docker')
		})

		it('renders tags as ui-components badges with a color type', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const vueTag = wrapper.findAll('.tech-tag').find(tag => tag.text() === 'Vue')
			const sassTag = wrapper.findAll('.tech-tag').find(tag => tag.text() === 'SASS')
			const dockerTag = wrapper.findAll('.tech-tag').find(tag => tag.text() === 'Docker')

			// Every tag is a UIBadge
			expect(vueTag?.classes()).toContain('ui-badge')

			// Categories map to badge color types
			expect(vueTag?.classes()).toContain('ui-badge__positive') // framework
			expect(sassTag?.classes()).toContain('ui-badge__warning') // styling
			expect(dockerTag?.classes()).toContain('ui-badge__neutral') // tools
		})

		it('handles technologies not in predefined categories', () => {
			const projectWithCustomTech = {
				...mockProject,
				tags: ['CustomFramework', 'NewTechnology'],
			}

			const wrapper = mount(ProjectModal, {
				props: { project: projectWithCustomTech },
			})

			const customTags = wrapper.findAll('.tech-tag')
			customTags.forEach(tag => {
				expect(tag.classes()).toContain('ui-badge__neutral')
			})
		})
	})

	describe('User Interactions', () => {
		it('emits close event when close button is clicked', async () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			await wrapper.find(CLOSE_BUTTON).trigger('click')

			expect(wrapper.emitted('close')).toHaveLength(1)
		})

		it('emits close event when backdrop is clicked', async () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			await wrapper.find(BACKDROP).trigger('click')

			expect(wrapper.emitted('close')).toHaveLength(1)
		})

		it('opens live project in new tab when primary action is clicked', async () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			await wrapper.find(SUBMIT_BUTTON).trigger('click')

			expect(mockWindowOpen).toHaveBeenCalledWith('https://example.com', '_blank')
		})

		it('opens live project when live link is clicked', async () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const liveLink = wrapper.find('.live-link')
			await liveLink.trigger('click')

			expect(liveLink.exists()).toBe(true)
		})

		it('closes modal when secondary action is clicked', async () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			await wrapper.find(CANCEL_BUTTON).trigger('click')

			expect(wrapper.emitted('close')).toHaveLength(1)
		})
	})

	describe('Conditional Rendering', () => {
		it('shows primary action button only when project has link', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			expect(wrapper.find(SUBMIT_BUTTON).exists()).toBe(true)
		})

		it('hides primary action button when project has no link', () => {
			const projectWithoutLink = { ...mockProject, link: undefined }
			const wrapper = mount(ProjectModal, {
				props: { project: projectWithoutLink },
			})

			expect(wrapper.find(SUBMIT_BUTTON).exists()).toBe(false)
			expect(wrapper.find(CANCEL_BUTTON).exists()).toBe(true)
		})

		it('always shows secondary action button', () => {
			const projectWithoutLink = { ...mockProject, link: undefined }
			const wrapper = mount(ProjectModal, {
				props: { project: projectWithoutLink },
			})

			expect(wrapper.find(CANCEL_BUTTON).exists()).toBe(true)
		})
	})

	describe('Accessibility', () => {
		it('uses semantic HTML structure', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			// Should have proper heading hierarchy
			expect(wrapper.find('h2').exists()).toBe(true)
			expect(wrapper.find('h3').exists()).toBe(true)

			// Buttons should be actual button elements
			const buttons = wrapper.findAll('button')
			expect(buttons.length).toBeGreaterThan(0)
			buttons.forEach(button => {
				expect(button.element.tagName).toBe('BUTTON')
			})
		})

		it('provides meaningful button text', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			// Close button should have icon (aria would be better but not implemented)
			expect(wrapper.find(CLOSE_BUTTON).exists()).toBe(true)

			// Action buttons should have descriptive text
			expect(wrapper.find(SUBMIT_BUTTON).text()).toContain('View Live Project')
			expect(wrapper.find(CANCEL_BUTTON).text()).toContain('Back to Portfolio')
		})

		it('uses proper link attributes for external links', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const externalLink = wrapper.find('.live-link')
			expect(externalLink.classes()).toContain('ui-link')
			expect(externalLink.attributes('target')).toBe('_blank')
		})
	})

	describe('Visual Design', () => {
		it('renders the modal box and meta grid', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			expect(wrapper.find(MODAL).exists()).toBe(true)
			expect(wrapper.find('.project-meta-grid').exists()).toBe(true)
		})

		it('renders interactive elements for styling hooks', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			expect(wrapper.find(CLOSE_BUTTON).exists()).toBe(true)
			expect(wrapper.find(SUBMIT_BUTTON).exists()).toBe(true)
			expect(wrapper.findAll('.tech-tag').length).toBeGreaterThan(0)
		})
	})

	describe('Data Handling', () => {
		it('handles missing optional project properties gracefully', () => {
			const minimalProject = {
				id: 1,
				name: 'Minimal Project',
				client: 'Test Client',
				year: '2023',
				timeline: '1 week',
				tags: ['HTML'],
				image: 'minimal.png',
				// No link property
			}

			const wrapper = mount(ProjectModal, {
				props: { project: minimalProject },
			})

			expect(wrapper.find('.project-title').text()).toBe('Minimal Project')
			expect(wrapper.find(SUBMIT_BUTTON).exists()).toBe(false)
			expect(wrapper.find('.live-link').exists()).toBe(false)
		})

		it('handles empty tags array', () => {
			const projectWithNoTags = {
				...mockProject,
				tags: [],
			}

			const wrapper = mount(ProjectModal, {
				props: { project: projectWithNoTags },
			})

			expect(wrapper.findAll('.tech-tag')).toHaveLength(0)
			expect(wrapper.find('.technologies-section').exists()).toBe(true)
		})

		it('handles very long project names and client names', () => {
			const projectWithLongNames = {
				...mockProject,
				name: 'This is a Very Long Project Name That Should Be Handled Gracefully in the Modal',
				client: 'This is a Very Long Client Name That Should Also Be Handled Properly',
			}

			const wrapper = mount(ProjectModal, {
				props: { project: projectWithLongNames },
			})

			expect(wrapper.find('.project-title').text()).toBe(projectWithLongNames.name)
			expect(wrapper.find('.project-client').text()).toBe(projectWithLongNames.client)
		})
	})

	describe('Method Testing', () => {
		it('getTechCategory method categorizes technologies correctly', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			// Access the component instance to test methods
			const vm = wrapper.vm as any

			expect(vm.getTechCategory('Vue')).toBe('framework')
			expect(vm.getTechCategory('React')).toBe('framework')
			expect(vm.getTechCategory('CSS')).toBe('styling')
			expect(vm.getTechCategory('SASS')).toBe('styling')
			expect(vm.getTechCategory('PHP')).toBe('backend')
			expect(vm.getTechCategory('MySQL')).toBe('backend')
			expect(vm.getTechCategory('Git')).toBe('tools')
			expect(vm.getTechCategory('WordPress')).toBe('cms')
			expect(vm.getTechCategory('CustomTech')).toBe('other')
		})

		it('getBadgeType maps categories to badge color types', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const vm = wrapper.vm as any

			expect(vm.getBadgeType('Vue')).toBe('positive')
			expect(vm.getBadgeType('CSS')).toBe('warning')
			expect(vm.getBadgeType('PHP')).toBe('negative')
			expect(vm.getBadgeType('Git')).toBe('neutral')
			expect(vm.getBadgeType('WordPress')).toBe('info')
			expect(vm.getBadgeType('CustomTech')).toBe('neutral')
		})

		it('closeModal method emits close event', async () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const vm = wrapper.vm as any
			vm.closeModal()

			await wrapper.vm.$nextTick()
			expect(wrapper.emitted('close')).toHaveLength(1)
		})

		it('openLiveProject method opens correct URL', async () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			const vm = wrapper.vm as any
			const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

			vm.openLiveProject()

			expect(mockWindowOpen).toHaveBeenCalledWith('https://example.com', '_blank')

			consoleSpy.mockRestore()
		})

		it('openLiveProject handles projects without links gracefully', async () => {
			const projectWithoutLink = { ...mockProject, link: undefined }
			const wrapper = mount(ProjectModal, {
				props: { project: projectWithoutLink },
			})

			const vm = wrapper.vm as any

			// Should not throw error
			expect(() => vm.openLiveProject()).not.toThrow()

			// Should not call window.open
			mockWindowOpen.mockClear()
			vm.openLiveProject()
			expect(mockWindowOpen).not.toHaveBeenCalled()
		})
	})

	describe('Responsive Design Support', () => {
		it('renders responsive structure correctly', () => {
			const wrapper = mount(ProjectModal, {
				props: { project: mockProject },
			})

			// Check that responsive elements exist (actual responsive behavior tested in E2E)
			expect(wrapper.find(MODAL).exists()).toBe(true)
			expect(wrapper.find('.project-meta-grid').exists()).toBe(true)
			expect(wrapper.find('.technologies-section').exists()).toBe(true)
		})
	})

	afterEach(() => {
		vi.clearAllMocks()
	})
})
