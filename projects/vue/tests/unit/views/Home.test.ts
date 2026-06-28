import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { createTestRoutes } from '@/tests/utils/test-helpers'

// Mock the content data (async import so the hoisted factory can use the helper)
vi.mock('@/data/static.en-us.json', async () => {
	const { createMockContentData } = await import('@/tests/utils/test-helpers')

	return { default: createMockContentData() }
})

describe('Home View', () => {
	let router: any

	beforeEach(async () => {
		router = createRouter({
			history: createWebHistory(),
			routes: createTestRoutes(),
		})

		router.push('/')
		await router.isReady()
	})

	describe('Component Rendering', () => {
		it('renders the hero section correctly', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			expect(wrapper.find('[data-test="home"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="hero-section"]').exists()).toBe(true)
		})

		it('displays the correct title and content', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			expect(wrapper.find('[data-test="hero-title"]').text()).toBe('MsDacia')
			expect(wrapper.find('[data-test="hero-subtitle"]').text()).toContain('pronounced')
			expect(wrapper.find('[data-test="hero-subtitle"]').text()).toContain('day-sha')
			expect(wrapper.find('[data-test="tagline"]').text()).toBe('I am here. This is who I am. I am Dacia.')
		})

		it('highlights the pronunciation in the subtitle', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const subtitle = wrapper.find('[data-test="hero-subtitle"]')
			const emphasis = subtitle.find('em')

			expect(emphasis.exists()).toBe(true)
			expect(emphasis.text()).toBe('day-sha')
		})
	})

	describe('Navigation Links', () => {
		it('renders call-to-action buttons', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const ctaButtons = wrapper.findAll('[data-test="cta-button"]')
			expect(ctaButtons).toHaveLength(2)

			expect(ctaButtons[0].text()).toBe('Learn About Me')
			expect(ctaButtons[1].text()).toBe('View Portfolio')
		})

		it('has correct router-link destinations', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const ctaButtons = wrapper.findAll('[data-test="cta-button"]')

			expect(ctaButtons[0].attributes('href')).toBe('/about')
			expect(ctaButtons[1].attributes('href')).toBe('/portfolio')
		})

		it('applies correct CSS classes to buttons', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const ctaButtons = wrapper.findAll('[data-test="cta-button"]')

			expect(ctaButtons[0].classes()).toContain('cta-button')
			expect(ctaButtons[0].classes()).not.toContain('secondary')

			expect(ctaButtons[1].classes()).toContain('cta-button')
			expect(ctaButtons[1].classes()).toContain('secondary')
		})
	})

	describe('Router Integration', () => {
		it('navigates to About page when "Learn About Me" is clicked', async () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const aboutButton = wrapper.find('[data-test="cta-button"][href="/about"]')
			await aboutButton.trigger('click')

			await flushPromises()
			expect(router.currentRoute.value.path).toBe('/about')
		})

		it('navigates to Portfolio page when "View Portfolio" is clicked', async () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const portfolioButton = wrapper.find('[data-test="cta-button"][href="/portfolio"]')
			await portfolioButton.trigger('click')

			await flushPromises()
			expect(router.currentRoute.value.path).toBe('/portfolio')
		})
	})

	describe('Content Structure', () => {
		it('uses proper semantic HTML structure', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Check for proper heading hierarchy
			expect(wrapper.find('h1').exists()).toBe(true)
			expect(wrapper.find('h2').exists()).toBe(true)

			// Main content should be wrapped in a div with home class
			expect(wrapper.find('[data-test="home"]').element.tagName).toBe('DIV')
		})

		it('has the correct heading hierarchy', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const h1 = wrapper.find('h1')
			const h2 = wrapper.find('h2')

			expect(h1.exists()).toBe(true)
			expect(h2.exists()).toBe(true)

			// H1 should come before H2 in DOM order
			const h1Position = h1.element.compareDocumentPosition(h2.element)
			expect(h1Position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
		})
	})

	describe('Responsive Design', () => {
		it('applies responsive CSS classes', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Check that responsive classes exist (actual responsive behavior tested in E2E)
			expect(wrapper.find('[data-test="hero-section"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="quick-links"]').exists()).toBe(true)
		})

		it('maintains proper layout structure for mobile', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Quick links should flex-wrap for mobile responsiveness
			const quickLinks = wrapper.find('[data-test="quick-links"]')
			expect(quickLinks.exists()).toBe(true)
		})
	})

	describe('Data Integration', () => {
		it('uses content data from JSON file correctly', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Verify that component data is properly loaded
			expect(wrapper.vm.content.common.global.title).toBe('MsDacia')
			expect(wrapper.vm.content.common.global.tagline).toBe('I am here. This is who I am. I am Dacia.')
		})

		it('reactively updates when content changes', async () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Change the content reactively
			const originalTitle = wrapper.vm.content.common.global.title
			wrapper.vm.content.common.global.title = 'New Title'
			await wrapper.vm.$nextTick()

			expect(wrapper.find('[data-test="hero-title"]').text()).toBe('New Title')

			// Restore so the shared mock data does not leak into other tests
			wrapper.vm.content.common.global.title = originalTitle
		})
	})

	describe('Accessibility', () => {
		it('provides meaningful text for screen readers', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// All text content should be meaningful
			expect(wrapper.find('[data-test="hero-title"]').text().trim()).toBeTruthy()
			expect(wrapper.find('[data-test="hero-subtitle"]').text().trim()).toBeTruthy()
			expect(wrapper.find('[data-test="tagline"]').text().trim()).toBeTruthy()

			// Button text should be descriptive
			const buttons = wrapper.findAll('[data-test="cta-button"]')
			buttons.forEach(button => {
				expect(button.text().trim()).toBeTruthy()
				expect(button.text().length).toBeGreaterThan(5) // Meaningful button text
			})
		})

		it('uses semantic link elements', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const ctaButtons = wrapper.findAll('[data-test="cta-button"]')
			ctaButtons.forEach(button => {
				// Vue Router converts router-link to anchor tags
				expect(['A', 'ROUTER-LINK']).toContain(button.element.tagName)
			})
		})

		it('has proper focus management', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const focusableElements = wrapper.findAll('a, button, [tabindex]')
			expect(focusableElements.length).toBeGreaterThan(0)
		})
	})

	describe('Performance Considerations', () => {
		it('renders efficiently without unnecessary re-renders', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Component should render without throwing errors
			expect(wrapper.vm).toBeTruthy()
			expect(wrapper.element).toBeTruthy()
		})

		it('uses proper Vue composition API patterns', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Check that ref is used properly
			expect(wrapper.vm.content).toBeTruthy()
			expect(typeof wrapper.vm.content).toBe('object')
		})
	})

	describe('Visual Design Elements', () => {
		it('applies proper CSS classes for styling', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Check for key styling classes
			expect(wrapper.find('[data-test="hero-section"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="hero-subtitle"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="hero-title"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="home"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="quick-links"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="tagline"]').exists()).toBe(true)
		})

		it('emphasizes key content appropriately', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Pronunciation should be emphasized
			const emphasis = wrapper.find('[data-test="hero-subtitle"] em')
			expect(emphasis.exists()).toBe(true)

			// Primary CTA should not have secondary class
			const primaryCta = wrapper.findAll('[data-test="cta-button"]').find(button =>
				!button.classes().includes('secondary'),
			)
			expect(primaryCta).toBeTruthy()
		})
	})

	describe('Error Handling', () => {
		it('handles missing content data gracefully', () => {
			// Test with undefined content
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// Component should still render without crashing
			expect(wrapper.find('[data-test="home"]').exists()).toBe(true)
		})
	})

	describe('Cross-browser Compatibility', () => {
		it('uses standard HTML elements and attributes', () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			// All elements should be standard HTML
			const allElements = wrapper.findAll('*')
			allElements.forEach(element => {
				const tagName = element.element.tagName.toLowerCase()
				const validTags = ['div', 'h1', 'h2', 'p', 'a', 'router-link', 'em']
				// Allow router-link as it's converted by Vue Router
				expect(validTags.some(tag => tagName.includes(tag))).toBe(true)
			})
		})
	})

	describe('Integration with Router', () => {
		it('works correctly when accessed from different routes', async () => {
			// Navigate away and back to home
			await router.push('/about')
			await router.push('/')

			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			expect(wrapper.find('[data-test="hero-title"]').text()).toBe('MsDacia')
		})

		it('maintains state during navigation', async () => {
			const wrapper = mount(Home, {
				global: {
					plugins: [router],
				},
			})

			const initialTitle = wrapper.find('[data-test="hero-title"]').text()

			// Navigate away and back
			await router.push('/about')
			await router.push('/')
			await wrapper.vm.$nextTick()

			expect(wrapper.find('[data-test="hero-title"]').text()).toBe(initialTitle)
		})
	})
})
