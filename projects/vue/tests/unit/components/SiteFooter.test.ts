import SiteFooter from '@/components/SiteFooter.vue'
import { mount } from '@vue/test-utils'
import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'

// Mock the static content data (vi.hoisted so it is available to the hoisted factory)
const mockData = vi.hoisted(() => ({
	common: {
		global: {
			title: 'MsDacia',
			url: 'http://msdacia.com',
		},
		copyright: {
			content: '2020 designed, 2026 developed by',
		},
		social: [
			{
				icon: 'facebook icon',
				title: 'Facebook',
				url: 'https://facebook.com/test',
			},
			{
				icon: 'github icon',
				title: 'GitHub',
				url: 'https://github.com/test',
			},
			{
				icon: 'bitbucket icon',
				title: 'Bitbucket',
				url: 'https://bitbucket.org/test',
			},
			{
				icon: 'unknown thing',
				title: 'Other',
				url: 'https://example.com',
			},
		],
	},
}))

vi.mock('@/data/static.en-us.json', () => ({
	default: mockData,
}))

describe('SiteFooter', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('Component Rendering', () => {
		it('renders the footer element', () => {
			const wrapper = mount(SiteFooter)
			expect(wrapper.find('footer').exists()).toBe(true)
		})

		it('renders a social link for each social entry', () => {
			const wrapper = mount(SiteFooter)
			const links = wrapper.findAll('[data-test="social-link"]')
			expect(links).toHaveLength(4)
		})

		it('sets the correct href, title and target on social links', () => {
			const wrapper = mount(SiteFooter)
			const firstLink = wrapper.findAll('[data-test="social-link"]')[0]

			expect(firstLink.attributes('href')).toBe('https://facebook.com/test')
			expect(firstLink.attributes('title')).toBe('Facebook')
			expect(firstLink.attributes('target')).toBe('_blank')
		})
	})

	describe('Icon Mapping', () => {
		it('maps known semantic icon classes to ui-components SVG icons', () => {
			const wrapper = mount(SiteFooter)
			const icons = wrapper.findAll('[data-test="social-link"] [data-ui="icon"]')

			expect(icons[0].classes()).toContain('SVGFacebook')
			expect(icons[1].classes()).toContain('SVGGithub')
			expect(icons[2].classes()).toContain('SVGCode')
		})

		it('falls back to SVGLink for unknown icon classes', () => {
			const wrapper = mount(SiteFooter)
			const icons = wrapper.findAll('[data-test="social-link"] [data-ui="icon"]')

			expect(icons[3].classes()).toContain('SVGLink')
		})
	})

	describe('Copyright', () => {
		it('renders the copyright symbol and content', () => {
			const wrapper = mount(SiteFooter)
			const copyright = wrapper.find('[data-test="copyright"]')

			expect(copyright.find('[data-test="copyright-symbol"]').text()).toBe('©')
			expect(copyright.text()).toContain('2020 designed, 2026 developed by')
		})

		it('renders the home link with the global title and url', () => {
			const wrapper = mount(SiteFooter)
			const homeLink = wrapper.find('[data-test="home-link"]')

			expect(homeLink.text()).toBe('MsDacia')
			expect(homeLink.attributes('href')).toBe('http://msdacia.com')
		})
	})

	describe('Interaction', () => {
		it('logs when a social link is clicked', async () => {
			const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })
			const wrapper = mount(SiteFooter)

			await wrapper.findAll('[data-test="social-link"]')[0].trigger('click')

			expect(consoleSpy).toHaveBeenCalledWith('Social media clicked:', 'Facebook')
			consoleSpy.mockRestore()
		})

		it('logs when the home link is clicked', async () => {
			const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })
			const wrapper = mount(SiteFooter)

			await wrapper.find('[data-test="home-link"]').trigger('click')

			expect(consoleSpy).toHaveBeenCalledWith('Home link clicked:', 'MsDacia')
			consoleSpy.mockRestore()
		})
	})
})
