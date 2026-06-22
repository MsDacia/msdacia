import { useTheme } from '@/composables/useTheme'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

describe('useTheme composable', () => {
	let matchMediaMock: any

	beforeEach(() => {
		// Reset DOM
		if (typeof document !== 'undefined') {
			document.documentElement.removeAttribute('data-theme')
			document.documentElement.className = ''
		}

		// Mock matchMedia with specific behavior
		matchMediaMock = vi.fn().mockImplementation(query => ({
			matches: query === '(prefers-color-scheme: dark)',
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			addListener: vi.fn(),
			dispatchEvent: vi.fn(),
			removeEventListener: vi.fn(),
			removeListener: vi.fn(),
		}))

		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: matchMediaMock,
		})
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('Theme Mode Management', () => {
		it('should start with system theme mode by default', () => {
			const { currentMode } = useTheme()
			expect(currentMode.value).toBe('system')
		})

		it('should allow setting different theme modes', () => {
			const { setThemeMode, currentMode } = useTheme()

			setThemeMode('light')
			expect(currentMode.value).toBe('light')

			setThemeMode('dark')
			expect(currentMode.value).toBe('dark')

			setThemeMode('system')
			expect(currentMode.value).toBe('system')
		})

		it('should provide individual theme setters', () => {
			const { setLightTheme, setDarkTheme, setSystemTheme, currentMode } = useTheme()

			setLightTheme()
			expect(currentMode.value).toBe('light')

			setDarkTheme()
			expect(currentMode.value).toBe('dark')

			setSystemTheme()
			expect(currentMode.value).toBe('system')
		})
	})

	describe('Theme Toggle Functionality', () => {
		it('should cycle through themes correctly', () => {
			const { toggleTheme, currentMode, setThemeMode } = useTheme()

			// Start with light
			setThemeMode('light')
			toggleTheme()
			expect(currentMode.value).toBe('dark')

			// Dark -> System
			toggleTheme()
			expect(currentMode.value).toBe('system')

			// System -> Light
			toggleTheme()
			expect(currentMode.value).toBe('light')
		})
	})

	describe('System Theme Detection', () => {
		it('should expose a boolean system preference', () => {
			const { systemPrefersDark } = useTheme()
			expect(typeof systemPrefersDark.value).toBe('boolean')
		})
	})

	describe('Actual Theme Computation', () => {
		it('should return correct actual theme for light mode', () => {
			const { setLightTheme, actualTheme } = useTheme()
			setLightTheme()
			expect(actualTheme.value).toBe('light')
		})

		it('should return correct actual theme for dark mode', () => {
			const { setDarkTheme, actualTheme } = useTheme()
			setDarkTheme()
			expect(actualTheme.value).toBe('dark')
		})

		it('should follow system preference in system mode', () => {
			const { setSystemTheme, actualTheme, systemPrefersDark } = useTheme()

			setSystemTheme()
			// actualTheme mirrors the detected system preference
			expect(actualTheme.value).toBe(systemPrefersDark.value ? 'dark' : 'light')
		})
	})

	describe('Theme State Helpers', () => {
		it('should provide correct boolean states', () => {
			const { setLightTheme, setDarkTheme, isLight, isDark, isSystem } = useTheme()

			setLightTheme()
			expect(isLight.value).toBe(true)
			expect(isDark.value).toBe(false)
			expect(isSystem.value).toBe(false)

			setDarkTheme()
			expect(isLight.value).toBe(false)
			expect(isDark.value).toBe(true)
			expect(isSystem.value).toBe(false)
		})
	})

	describe('UI Helper Functions', () => {
		it('should provide correct theme icons', () => {
			const { setLightTheme, setDarkTheme, setSystemTheme, themeIcon } = useTheme()

			setLightTheme()
			expect(themeIcon.value).toBe('SVGSun')

			setDarkTheme()
			expect(themeIcon.value).toBe('SVGMoon')

			setSystemTheme()
			expect(themeIcon.value).toBe('SVGComputerMonitor')
		})

		it('should provide correct theme labels', () => {
			const { setLightTheme, setDarkTheme, setSystemTheme, themeLabel } = useTheme()

			setLightTheme()
			expect(themeLabel.value).toBe('Light')

			setDarkTheme()
			expect(themeLabel.value).toBe('Dark')

			setSystemTheme()
			expect(themeLabel.value).toBe('System')
		})

		it('should provide correct next theme labels', () => {
			const { setLightTheme, setDarkTheme, setSystemTheme, nextThemeLabel } = useTheme()

			setLightTheme()
			expect(nextThemeLabel.value).toBe('Dark')

			setDarkTheme()
			expect(nextThemeLabel.value).toBe('System')

			setSystemTheme()
			expect(nextThemeLabel.value).toBe('Light')
		})
	})

	describe('DOM Integration', () => {
		it('should apply theme to document element', async () => {
			const { setLightTheme, setDarkTheme } = useTheme()

			setLightTheme()
			await nextTick()
			expect(document.documentElement.getAttribute('data-theme')).toBe('light')
			expect(document.documentElement.className).toBe('light')

			setDarkTheme()
			await nextTick()
			expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
			expect(document.documentElement.className).toBe('dark')
		})
	})

	describe('Edge Cases', () => {
		it('should not throw when matchMedia is unavailable', () => {
			const originalMatchMedia = window.matchMedia
			// @ts-expect-error - simulate an environment without matchMedia
			window.matchMedia = undefined

			expect(() => {
				const { systemPrefersDark } = useTheme()
				expect(typeof systemPrefersDark.value).toBe('boolean')
			}).not.toThrow()

			window.matchMedia = originalMatchMedia
		})
	})
})
