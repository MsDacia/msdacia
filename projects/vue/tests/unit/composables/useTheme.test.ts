import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTheme, type ThemeMode } from '@/composables/useTheme'

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
      addListener: vi.fn(),
      removeListener: vi.fn(), 
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
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
    it('should detect light system preference', () => {
      // Mock light system preference
      matchMediaMock.mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)' ? false : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
      
      const { systemPrefersDark } = useTheme()
      expect(systemPrefersDark.value).toBe(false)
    })

    it('should detect dark system preference', () => {
      // Mock dark system preference
      matchMediaMock.mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)' ? true : false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
      
      const { systemPrefersDark } = useTheme()
      expect(systemPrefersDark.value).toBe(true)
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
      const { setSystemTheme, actualTheme } = useTheme()
      
      // Test with light system preference
      matchMediaMock.mockImplementation(query => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
      
      setSystemTheme()
      expect(actualTheme.value).toBe('light')
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
      expect(themeIcon.value).toBe('fas fa-sun')
      
      setDarkTheme()
      expect(themeIcon.value).toBe('fas fa-moon')
      
      setSystemTheme()
      expect(themeIcon.value).toBe('fas fa-desktop')
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
    it('should apply theme to document element', () => {
      const { setLightTheme, setDarkTheme } = useTheme()
      
      setLightTheme()
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(document.documentElement.className).toBe('light')
      
      setDarkTheme()
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(document.documentElement.className).toBe('dark')
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing window object gracefully', () => {
      // This test ensures SSR compatibility
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      
      expect(() => {
        const { currentMode } = useTheme()
        expect(currentMode.value).toBe('system')
      }).not.toThrow()
      
      global.window = originalWindow
    })

    it('should handle missing matchMedia gracefully', () => {
      const originalMatchMedia = window.matchMedia
      // @ts-ignore
      delete window.matchMedia
      
      expect(() => {
        const { systemPrefersDark } = useTheme()
        expect(typeof systemPrefersDark.value).toBe('boolean')
      }).not.toThrow()
      
      window.matchMedia = originalMatchMedia
    })
  })
})
