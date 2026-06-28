import {
	describe,
	expect,
	it,
} from 'vitest'
import { mount } from '@vue/test-utils'
import WelcomeItem from '@/components/WelcomeItem.vue'

describe('WelcomeItem', () => {
	describe('Component Rendering', () => {
		it('renders the item container', () => {
			const wrapper = mount(WelcomeItem)
			expect(wrapper.find('[data-test="item"]').exists()).toBe(true)
		})

		it('renders the details container with a heading', () => {
			const wrapper = mount(WelcomeItem)
			expect(wrapper.find('[data-test="details"]').exists()).toBe(true)
			expect(wrapper.find('[data-test="details"] h3').exists()).toBe(true)
		})
	})

	describe('Slots', () => {
		it('renders the icon slot content', () => {
			const wrapper = mount(WelcomeItem, {
				slots: { icon: '<span class="my-icon">icon</span>' },
			})

			expect(wrapper.find('[data-test="icon-wrapper"] .my-icon').exists()).toBe(true)
		})

		it('renders the heading slot content', () => {
			const wrapper = mount(WelcomeItem, {
				slots: { heading: 'My Heading' },
			})

			expect(wrapper.find('h3').text()).toBe('My Heading')
		})

		it('renders the default slot content', () => {
			const wrapper = mount(WelcomeItem, {
				slots: { default: '<p class="body-text">Body content</p>' },
			})

			expect(wrapper.find('[data-test="details"] .body-text').text()).toBe('Body content')
		})
	})
})
