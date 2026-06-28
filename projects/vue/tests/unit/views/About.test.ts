import {
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import About from '@/views/About.vue'

// Mock the static content data (vi.hoisted so it is available to the hoisted factory)
const mockData = vi.hoisted(() => ({
	about: {
		title: 'WYSIWYG',
		subtitle: 'Foundation',
		copy: '<strong>Foundation</strong> copy.',
		subtitle2: 'Professionally',
		copy2: 'Professional copy.',
		subtitle3: 'Personally',
		copy3: 'Personal copy.',
	},
}))

vi.mock('@/data/static.en-us.json', () => ({
	default: mockData,
}))

// Stub the timeline so the view test stays focused on About's own content
vi.mock('@/components/ExperienceTimeline.vue', () => ({
	default: {
		name: 'ExperienceTimeline',
		template: '<div data-test="experience-timeline">Timeline</div>',
	},
}))

describe('About View', () => {
	describe('Component Rendering', () => {
		it('renders the about container', () => {
			const wrapper = mount(About)
			expect(wrapper.find('[data-test="about"]').exists()).toBe(true)
		})

		it('renders the main title', () => {
			const wrapper = mount(About)
			expect(wrapper.find('h1').text()).toBe('WYSIWYG')
		})

		it('renders all three about sections with their subtitles', () => {
			const wrapper = mount(About)
			const sections = wrapper.findAll('[data-test="about-section"]')

			expect(sections).toHaveLength(3)
			expect(sections[0].find('h3').text()).toBe('Foundation')
			expect(sections[1].find('h3').text()).toBe('Professionally')
			expect(sections[2].find('h3').text()).toBe('Personally')
		})

		it('renders rich-text copy via v-html', () => {
			const wrapper = mount(About)
			const firstSection = wrapper.findAll('[data-test="about-section"]')[0]

			expect(firstSection.find('strong').text()).toBe('Foundation')
		})
	})

	describe('Composition', () => {
		it('includes the ExperienceTimeline component', () => {
			const wrapper = mount(About)
			expect(wrapper.find('[data-test="experience-timeline"]').exists()).toBe(true)
		})
	})
})
