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
