import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import SwitchTheme from '@/components/SwitchTheme.vue'

import { useTheme } from '@/composables/useTheme'

// Mock the composable
vi.mock('@/composables/useTheme', () => ({
	useTheme: vi.fn(),
}))

describe('SwitchTheme', () => {
	let mockUseTheme: any

	beforeEach(() => {
		// Reset the mock with fresh reactive refs before each test
		mockUseTheme = {
			currentMode: ref('system'),
			nextThemeLabel: ref('Light'),
			setDarkTheme: vi.fn(),
			setLightTheme: vi.fn(),
			setSystemTheme: vi.fn(),
			systemPrefersDark: ref(false),
			themeIcon: ref('SVGComputerMonitor'),
			themeLabel: ref('System'),
			toggleTheme: vi.fn(),
		}

		vi.mocked(useTheme).mockReturnValue(mockUseTheme)
	})

	describe('Component Rendering', () => {
		it('renders the theme switcher container', () => {
			const wrapper = mount(SwitchTheme)
			expect(wrapper.find('.theme-switcher').exists()).toBe(true)
		})

		it('renders the menu trigger button', () => {
			const wrapper = mount(SwitchTheme)
			const menuTrigger = wrapper.find('.menu-trigger')

			expect(menuTrigger.exists()).toBe(true)
			expect(menuTrigger.attributes('title')).toBe('Theme: System')
		})

		it('displays the correct theme icon', () => {
			const wrapper = mount(SwitchTheme)
			const icon = wrapper.find('.menu-trigger [data-ui="icon"]')

			expect(icon.exists()).toBe(true)
			expect(icon.classes()).toContain('SVGComputerMonitor')
		})

		it('shows the menu arrow', () => {
			const wrapper = mount(SwitchTheme)
			const arrow = wrapper.find('.menu-arrow')

			expect(arrow.exists()).toBe(true)
			expect(arrow.classes()).toContain('SVGChevronDown')
		})
	})

	describe('Menu Interaction', () => {
		it('opens menu when trigger is clicked', async () => {
			const wrapper = mount(SwitchTheme)
			const menuTrigger = wrapper.find('.menu-trigger')

			// Initially menu should be closed (v-show hides it via display:none)
			expect(wrapper.vm.showMenu).toBe(false)
			expect(wrapper.find('.menu-options').attributes('style') || '').toContain('display: none')

			// Click to open menu
			await menuTrigger.trigger('click')

			expect(wrapper.vm.showMenu).toBe(true)
			expect(wrapper.find('.menu-options').attributes('style') || '').not.toContain('display: none')
		})

		it('rotates arrow when menu is open', async () => {
			const wrapper = mount(SwitchTheme)
			const menuTrigger = wrapper.find('.menu-trigger')

			// Open menu
			await menuTrigger.trigger('click')
			await nextTick()

			expect(wrapper.find('.menu-arrow').classes()).toContain('rotated')
		})

		it('displays all theme options when menu is open', async () => {
			const wrapper = mount(SwitchTheme)
			const menuTrigger = wrapper.find('.menu-trigger')

			await menuTrigger.trigger('click')
			await nextTick()

			const options = wrapper.findAll('.theme-option')
			expect(options).toHaveLength(3)

			// Check option contents
			const optionTexts = options.map(option => option.text())
			expect(optionTexts.some(text => text.includes('Light'))).toBe(true)
			expect(optionTexts.some(text => text.includes('Dark'))).toBe(true)
			expect(optionTexts.some(text => text.includes('System'))).toBe(true)
		})
	})

	describe('Theme Selection', () => {
		it('calls setLightTheme when light option is clicked', async () => {
			const wrapper = mount(SwitchTheme)

			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			const lightOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('Light'),
			)
			await lightOption!.trigger('click')

			expect(mockUseTheme.setLightTheme).toHaveBeenCalled()
		})

		it('calls setDarkTheme when dark option is clicked', async () => {
			const wrapper = mount(SwitchTheme)

			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			const darkOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('Dark'),
			)
			await darkOption!.trigger('click')

			expect(mockUseTheme.setDarkTheme).toHaveBeenCalled()
		})

		it('calls setSystemTheme when system option is clicked', async () => {
			const wrapper = mount(SwitchTheme)

			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			const systemOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('System'),
			)
			await systemOption!.trigger('click')

			expect(mockUseTheme.setSystemTheme).toHaveBeenCalled()
		})

		it('closes menu after selecting an option', async () => {
			const wrapper = mount(SwitchTheme)

			await wrapper.find('.menu-trigger').trigger('click')
			expect(wrapper.vm.showMenu).toBe(true)

			const lightOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('Light'),
			)
			await lightOption!.trigger('click')

			expect(wrapper.vm.showMenu).toBe(false)
		})
	})

	describe('Active State Display', () => {
		it('shows active state for current theme', async () => {
			// Set currentMode to light
			mockUseTheme.currentMode.value = 'light'

			const wrapper = mount(SwitchTheme)

			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			const lightOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('Light'),
			)

			expect(lightOption!.classes()).toContain('active')
			expect(lightOption!.find('.SVGCheck').exists()).toBe(true)
		})

		it('shows system preference indicator', async () => {
			// Set to system mode with dark preference
			mockUseTheme.currentMode.value = 'system'
			mockUseTheme.systemPrefersDark.value = true

			const wrapper = mount(SwitchTheme)

			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			const systemOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('System'),
			)

			expect(systemOption!.text()).toContain('(Dark)')
		})
	})

	describe('Accessibility', () => {
		it('has proper title attributes', () => {
			const wrapper = mount(SwitchTheme)
			const menuTrigger = wrapper.find('.menu-trigger')

			expect(menuTrigger.attributes('title')).toBe('Theme: System')
		})

		it('uses semantic button elements', () => {
			const wrapper = mount(SwitchTheme)

			expect(wrapper.find('.menu-trigger').element.tagName).toBe('BUTTON')
		})

		it('provides proper button semantics for theme options', async () => {
			const wrapper = mount(SwitchTheme)

			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			const options = wrapper.findAll('.theme-option')
			options.forEach(option => {
				expect(option.element.tagName).toBe('BUTTON')
			})
		})
	})

	describe('Theme Icon Updates', () => {
		it('updates icon when theme changes', async () => {
			const wrapper = mount(SwitchTheme)
			let icon = wrapper.find('.menu-trigger [data-ui="icon"]')
			expect(icon.classes()).toContain('SVGComputerMonitor')

			// Change to light theme
			mockUseTheme.currentMode.value = 'light'
			mockUseTheme.themeIcon.value = 'SVGSun'
			mockUseTheme.themeLabel.value = 'Light'

			await nextTick()

			icon = wrapper.find('.menu-trigger [data-ui="icon"]')
			expect(icon.classes()).toContain('SVGSun')
		})
	})

	describe('Edge Cases', () => {
		it('handles rapid menu toggling', async () => {
			const wrapper = mount(SwitchTheme)
			const trigger = wrapper.find('.menu-trigger')

			// Rapid clicks
			await trigger.trigger('click')
			await trigger.trigger('click')
			await trigger.trigger('click')

			// Should end up open (odd number of clicks)
			expect(wrapper.vm.showMenu).toBe(true)
		})

		it('closes the menu when clicking outside the switcher', async () => {
			const wrapper = mount(SwitchTheme, { attachTo: document.body })

			await wrapper.find('.menu-trigger').trigger('click')
			expect(wrapper.vm.showMenu).toBe(true)

			// A click outside the .theme-switcher closes the menu
			document.body.click()
			await nextTick()
			expect(wrapper.vm.showMenu).toBe(false)

			wrapper.unmount()
		})
	})
})
