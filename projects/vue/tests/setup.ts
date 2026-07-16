import '@testing-library/jest-dom'

import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock window.matchMedia for theme tests
Object.defineProperty(window, 'matchMedia', {
	value: vi.fn().mockImplementation(query => ({
		addEventListener: vi.fn(),
		addListener: vi.fn(), // deprecated
		dispatchEvent: vi.fn(),
		matches: false,
		media: query,
		onchange: null,
		removeEventListener: vi.fn(),
		removeListener: vi.fn(), // deprecated
	})),
	writable: true,
})

// Mock window.localStorage
const localStorageMock = {
	clear: vi.fn(),
	getItem: vi.fn(),
	removeItem: vi.fn(),
	setItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
})

// Mock console methods to avoid noise in tests
global.console = {
	...console,
	error: vi.fn(),
	// Uncomment the next line if you want to silence console logs during tests
	// log: vi.fn(),
	warn: vi.fn(),
}

// Register ui-components directives as no-ops so components that use them
// (e.g. UIIcon's v-tooltip) mount cleanly. Mirrors the dacias-closet pattern.
config.global.directives = {
	clickOutside: {
		beforeMount: () => {},
		mounted: () => {},
		updated: () => {},
	},
	tooltip: {
		beforeMount: () => {},
		mounted: () => {},
		updated: () => {},
	},
}

// Stub ui-components UIIcon with a synchronous marker. The real UIIcon resolves
// its SVG via an async component, so stubbing keeps icon assertions deterministic.
// The rendered element exposes `data-ui="icon"` and the icon name as a class,
// matching the real component's fall-through markup.
config.global.stubs = {
	UIIcon: {
		name: 'UIIcon',
		props: ['icon', 'color', 'tooltip'],
		template: '<svg data-ui="icon" :class="icon"></svg>',
	},
}

// Global test utilities
export const createMockRouter = () => ({
	back: vi.fn(),
	currentRoute: {
		value: {
			meta: {},
			name: 'Home',
			params: {},
			path: '/',
			query: {},
		},
	},
	forward: vi.fn(),
	go: vi.fn(),
	push: vi.fn(),
	replace: vi.fn(),
})
