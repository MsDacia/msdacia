import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia for theme tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})

// Mock window.localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
})

// Mock console methods to avoid noise in tests
global.console = {
	...console,
	// Uncomment the next line if you want to silence console logs during tests
	// log: vi.fn(),
	warn: vi.fn(),
	error: vi.fn(),
}

// Mock Firebase for tests (if needed)
vi.mock('firebase/app', () => ({
	initializeApp: vi.fn(),
	getApps: vi.fn(() => []),
	getApp: vi.fn(),
}))

vi.mock('firebase/analytics', () => ({
	getAnalytics: vi.fn(),
	logEvent: vi.fn(),
}))

// Mock vue-gtag
vi.mock('vue-gtag', () => ({
	gtag: vi.fn(),
	install: vi.fn(),
}))

// Global test utilities
export const createMockRouter = () => ({
	push: vi.fn(),
	replace: vi.fn(),
	go: vi.fn(),
	back: vi.fn(),
	forward: vi.fn(),
	currentRoute: {
		value: {
			path: '/',
			name: 'Home',
			params: {},
			query: {},
			meta: {}
		}
	}
})
