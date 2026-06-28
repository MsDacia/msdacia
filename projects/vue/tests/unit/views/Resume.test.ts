import {
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import Resume from '@/views/Resume.vue'

// Mock the static content data (vi.hoisted so it is available to the hoisted factory)
const mockData = vi.hoisted(() => ({
	resume: {
		address: 'Chicago, Illinois 60653',
		contact: {
			email: 'msdessin@gmail.com',
			links: [
				{
					title: 'LinkedIn',
					url: 'http://www.linkedin.com/in/dessin',
				},
				{
					title: 'GitHub',
					url: 'https://github.com/MsDacia',
				},
			],
		},
		education: {
			degree: 'Bachelor of Science',
			location: 'Chicago, Illinois',
			major: 'Professional and Technical Communications',
			minor: 'Management',
			school: 'Illinois Institute of Technology',
			title: 'Education',
		},
		objective: {
			copy: 'Product-focused engineer with full-cycle ownership.',
			headline: 'Senior Frontend / Staff-Level Engineer',
			subtitle: 'TypeScript • Vue • Scalable UI Systems',
			title: 'Objective',
		},
		projects: {
			categories: [
				{
					title: "Dacia's Closet App",
					url: 'https://github.com/MsDacia/daciascloset',
				},
				{
					title: 'UI Component Library',
					url: 'https://github.com/davidanddacia/ui-components',
				},
			],
			title: 'Projects',
		},
		skills: {
			categories: [
				{
					copy: 'TypeScript, JavaScript, Sass',
					title: 'Languages',
				},
				{
					copy: 'Vue 3, React, Vite',
					title: 'Frontend',
				},
			],
			title: 'Skills',
		},
		title: 'Resume',
	},
}))

vi.mock('@/data/static.en-us.json', () => ({
	default: mockData,
}))

// Stub the timeline so the view test stays focused on Resume's own content
vi.mock('@/components/ExperienceTimeline.vue', () => ({
	default: {
		name: 'ExperienceTimeline',
		template: '<div class="experience-timeline-mock">Timeline</div>',
	},
}))

describe('Resume View', () => {
	describe('Component Rendering', () => {
		it('renders the resume container', () => {
			const wrapper = mount(Resume)
			expect(wrapper.find('.resume').exists()).toBe(true)
		})

		it('renders the title and address', () => {
			const wrapper = mount(Resume)
			expect(wrapper.find('h1').text()).toBe('Resume')
			expect(wrapper.find('.resume-address').text()).toBe('Chicago, Illinois 60653')
		})

		it('renders the objective headline, subtitle, and copy', () => {
			const wrapper = mount(Resume)
			const objective = wrapper.find('.resume-objective')

			expect(objective.find('h3').text()).toBe('Objective')
			expect(objective.find('.objective-headline').text()).toBe('Senior Frontend / Staff-Level Engineer')
			expect(objective.find('.objective-subtitle').text()).toContain('TypeScript')
			expect(objective.text()).toContain('Product-focused engineer')
		})

		it('renders every skill category', () => {
			const wrapper = mount(Resume)
			const skills = wrapper.findAll('.skill-category')

			expect(skills).toHaveLength(2)
			expect(skills[0].find('h4').text()).toBe('Languages')
			expect(skills[1].find('h4').text()).toBe('Frontend')
		})

		it('renders the education details without a graduation date', () => {
			const wrapper = mount(Resume)
			const education = wrapper.find('.resume-education')

			expect(education.find('h4').text()).toBe('Illinois Institute of Technology')
			expect(education.text()).toContain('Professional and Technical Communications')
			expect(education.text()).toContain('Bachelor of Science')
			expect(education.text()).toContain('Management')
		})
	})

	describe('Contact links', () => {
		it('renders the email as a mailto link', () => {
			const wrapper = mount(Resume)
			const mailto = wrapper.find('.resume-contact a[href^="mailto:"]')

			expect(mailto.exists()).toBe(true)
			expect(mailto.attributes('href')).toBe('mailto:msdessin@gmail.com')
		})

		it('opens external contact links in a new tab', () => {
			const wrapper = mount(Resume)
			const externalLinks = wrapper.findAll('.resume-contact a[href^="http"]')

			expect(externalLinks).toHaveLength(2)
			externalLinks.forEach(link => {
				expect(link.attributes('target')).toBe('_blank')
				expect(link.attributes('rel')).toBe('noopener noreferrer')
			})
		})
	})

	describe('Projects', () => {
		it('renders every project link without a downloadable PDF', () => {
			const wrapper = mount(Resume)
			const links = wrapper.findAll('.projects-list a')

			expect(links).toHaveLength(2)
			expect(links[0].text()).toBe("Dacia's Closet App")
			expect(wrapper.find('a[href$=".pdf"]').exists()).toBe(false)
		})

		it('opens project links in a new tab', () => {
			const wrapper = mount(Resume)
			const links = wrapper.findAll('.projects-list a')

			links.forEach(link => {
				expect(link.attributes('target')).toBe('_blank')
				expect(link.attributes('rel')).toBe('noopener noreferrer')
			})
		})
	})

	describe('Composition', () => {
		it('includes the ExperienceTimeline component', () => {
			const wrapper = mount(Resume)
			expect(wrapper.find('.experience-timeline-mock').exists()).toBe(true)
		})
	})
})
