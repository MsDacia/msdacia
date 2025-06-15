import {
	computed,
	ref,
	watch,
} from 'vue'

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system'
export type ActualTheme = 'light' | 'dark'

// Reactive theme state (persists during session)
const currentMode = ref<ThemeMode>('dark')
const systemPrefersDark = ref(true)

// Check system preference
const updateSystemPreference = () => {
	if (typeof window !== 'undefined' && window.matchMedia) {
		systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
	}
}

// Listen for system theme changes
if (typeof window !== 'undefined' && window.matchMedia) {
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
	mediaQuery.addEventListener('change', updateSystemPreference)
	updateSystemPreference()
}

export function useTheme() {
	// Computed actual theme based on mode and system preference
	const actualTheme = computed<ActualTheme>(() => {
		if (currentMode.value === 'system') {
			return systemPrefersDark.value ? 'dark' : 'light'
		}
		return currentMode.value as ActualTheme
	})

	// Apply theme to document
	const applyTheme = (theme: ActualTheme) => {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', theme)
			document.documentElement.className = theme
		}
	}

	// Watch for theme changes and apply immediately
	watch(actualTheme, (newTheme) => {
		applyTheme(newTheme)
	}, { immediate: true })

	// Theme switching functions
	const setThemeMode = (mode: ThemeMode) => {
		currentMode.value = mode
	}

	const toggleTheme = () => {
		if (currentMode.value === 'light') {
			setThemeMode('dark')
		} else if (currentMode.value === 'dark') {
			setThemeMode('system')
		} else {
			setThemeMode('light')
		}
	}

	const setLightTheme = () => setThemeMode('light')
	const setDarkTheme = () => setThemeMode('dark')
	const setSystemTheme = () => setThemeMode('system')

	// Theme info getters
	const isLight = computed(() => actualTheme.value === 'light')
	const isDark = computed(() => actualTheme.value === 'dark')
	const isSystem = computed(() => currentMode.value === 'system')

	// Get theme icon for UI
	const themeIcon = computed(() => {
		switch (currentMode.value) {
			case 'light': return 'fas fa-sun'
			case 'dark': return 'fas fa-moon'
			case 'system': return 'fas fa-desktop'
			default: return 'fas fa-adjust'
		}
	})

	// Get theme label for UI
	const themeLabel = computed(() => {
		switch (currentMode.value) {
			case 'light': return 'Light'
			case 'dark': return 'Dark'
			case 'system': return 'System'
			default: return 'Auto'
		}
	})

	// Get next theme for toggle button
	const nextThemeLabel = computed(() => {
		switch (currentMode.value) {
			case 'light': return 'Dark'
			case 'dark': return 'System'
			case 'system': return 'Light'
			default: return 'Light'
		}
	})

	return {
		// State
		currentMode: readonly(currentMode),
		actualTheme,
		systemPrefersDark: readonly(systemPrefersDark),

		// Actions
		setThemeMode,
		toggleTheme,
		setLightTheme,
		setDarkTheme,
		setSystemTheme,

		// Computed
		isLight,
		isDark,
		isSystem,
		themeIcon,
		themeLabel,
		nextThemeLabel
	}
}

// Helper function to make reactive values readonly
function readonly<T>(ref: any) {
	return computed(() => ref.value)
}
