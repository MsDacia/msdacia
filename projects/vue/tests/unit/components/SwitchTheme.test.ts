import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SwitchTheme from '@/components/SwitchTheme.vue'

import { useTheme } from '@/composables/useTheme'

// Mock the composable
vi.mock('@/composables/useTheme', () => ({
	useTheme: vi.fn(() => ({
		currentMode: { value: 'system' },
		nextThemeLabel: { value: 'Light' },
		setDarkTheme: vi.fn(),
		setLightTheme: vi.fn(),
		setSystemTheme: vi.fn(),
		systemPrefersDark: { value: false },
		themeIcon: { value: 'fas fa-desktop' },
		themeLabel: { value: 'System' },
		toggleTheme: vi.fn(),
	}))
}))

describe('SwitchTheme', () => {
	let mockUseTheme: any

	beforeEach(() => {
		// Reset the mock before each test
		mockUseTheme = {
			currentMode: { value: 'system' },
			nextThemeLabel: { value: 'Light' },
			setDarkTheme: vi.fn(),
			setLightTheme: vi.fn(),
			setSystemTheme: vi.fn(),
			systemPrefersDark: { value: false },
			themeIcon: { value: 'fas fa-desktop' },
			themeLabel: { value: 'System' },
			toggleTheme: vi.fn(),
		}

		vi.mocked(useTheme).mockReturnValue(mockUseTheme)

		// Mock document event listener
		const mockAddEventListener = vi.fn()
		const mockDocument = {
			addEventListener: mockAddEventListener
		}

		Object.defineProperty(global, 'document', {
			value: mockDocument,
			writable: true
		})
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
			const icon = wrapper.find('.menu-trigger i:first-child')

			expect(icon.classes()).toContain('fas')
			expect(icon.classes()).toContain('fa-desktop')
		})

		it('shows the menu arrow', () => {
			const wrapper = mount(SwitchTheme)
			const arrow = wrapper.find('.menu-arrow')

			expect(arrow.exists()).toBe(true)
			expect(arrow.classes()).toContain('fa-chevron-down')
		})
	})

	describe('Menu Interaction', () => {
		it('opens menu when trigger is clicked', async () => {
			const wrapper = mount(SwitchTheme)
			const menuTrigger = wrapper.find('.menu-trigger')

			// Initially menu should be closed
			expect(wrapper.vm.showMenu).toBe(false)
			expect(wrapper.find('.menu-options').isVisible()).toBe(false)

			// Click to open menu
			await menuTrigger.trigger('click')

			expect(wrapper.vm.showMenu).toBe(true)
		})

		it('rotates arrow when menu is open', async () => {
			const wrapper = mount(SwitchTheme)
			const menuTrigger = wrapper.find('.menu-trigger')
			const arrow = wrapper.find('.menu-arrow')

			// Open menu
			await menuTrigger.trigger('click')
			await nextTick()

			expect(arrow.classes()).toContain('rotated')
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
			expect(optionTexts).toContain('Light')
			expect(optionTexts).toContain('Dark')
			expect(optionTexts).toContain('System')
		})
	})

	describe('Theme Selection', () => {
		it('calls setLightTheme when light option is clicked', async () => {
			const wrapper = mount(SwitchTheme)

			// Open menu
			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			// Click light option
			const lightOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('Light')
			)
			await lightOption!.trigger('click')

			expect(mockUseTheme.setLightTheme).toHaveBeenCalled()
		})

		it('calls setDarkTheme when dark option is clicked', async () => {
			const wrapper = mount(SwitchTheme)

			// Open menu
			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			// Click dark option
			const darkOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('Dark')
			)
			await darkOption!.trigger('click')

			expect(mockUseTheme.setDarkTheme).toHaveBeenCalled()
		})

		it('calls setSystemTheme when system option is clicked', async () => {
			const wrapper = mount(SwitchTheme)

			// Open menu
			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			// Click system option
			const systemOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('System')
			)
			await systemOption!.trigger('click')

			expect(mockUseTheme.setSystemTheme).toHaveBeenCalled()
		})

		it('closes menu after selecting an option', async () => {
			const wrapper = mount(SwitchTheme)

			// Open menu
			await wrapper.find('.menu-trigger').trigger('click')
			expect(wrapper.vm.showMenu).toBe(true)

			// Click an option
			const lightOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('Light')
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

			// Open menu
			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			const lightOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('Light')
			)

			expect(lightOption!.classes()).toContain('active')
			expect(lightOption!.find('.fa-check').exists()).toBe(true)
		})

		it('shows system preference indicator', async () => {
			// Set to system mode with dark preference
			mockUseTheme.currentMode.value = 'system'
			mockUseTheme.systemPrefersDark.value = true

			const wrapper = mount(SwitchTheme)

			// Open menu
			await wrapper.find('.menu-trigger').trigger('click')
			await nextTick()

			const systemOption = wrapper.findAll('.theme-option').find(option =>
				option.text().includes('System')
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

			// Open menu
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
			// Start with system theme
			const wrapper = mount(SwitchTheme)
			let icon = wrapper.find('.menu-trigger i:first-child')
			expect(icon.classes()).toContain('fa-desktop')

			// Change to light theme
			mockUseTheme.currentMode.value = 'light'
			mockUseTheme.themeIcon.value = 'fas fa-sun'
			mockUseTheme.themeLabel.value = 'Light'

			await wrapper.vm.$forceUpdate()
			await nextTick()

			icon = wrapper.find('.menu-trigger i:first-child')
			expect(icon.classes()).toContain('fa-sun')
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

			// Should end up closed (odd number of clicks)
			expect(wrapper.vm.showMenu).toBe(false)
		})

		it('handles missing document gracefully', () => {
			// Test SSR compatibility
			const originalDocument = global.document
			// @ts-ignore
			delete global.document

			expect(() => mount(SwitchTheme)).not.toThrow()

			global.document = originalDocument
		})
	})
})
