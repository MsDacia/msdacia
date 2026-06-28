import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
	cleanup()
})

// jsdom does not implement matchMedia; required by react-ui-components' theme store.
if (!window.matchMedia) {
	window.matchMedia = (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: () => {},
		removeEventListener: () => {},
		addListener: () => {},
		removeListener: () => {},
		dispatchEvent: () => false,
	}) as MediaQueryList
}

// jsdom has no scrollIntoView; Stats.scrollToTop() calls it on the timeline element.
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
	value: vi.fn(),
	writable: true,
})

Object.defineProperty(window, 'scrollTo', {
	value: vi.fn(),
	writable: true,
})

// Components and the library open external links via window.open; stub it so tests
// can assert navigation without a real browser context.
Object.defineProperty(window, 'open', {
	value: vi.fn(),
	writable: true,
})
