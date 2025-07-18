import { expect, vi } from 'vitest'

/**
 * Mock Data Factories
 * These functions create consistent mock data for testing
 */

export interface MockProject {
	client: string
	id: number
	image: string
	link?: string
	name: string
	tags: string[]
	timeline: string
	unique?: string
	year: string
}

export const createMockProject = (overrides: Partial<MockProject> = {}): MockProject => ({
	client: 'Test Client',
	id: 1,
	image: 'test-project.png',
	name: 'Test Project',
	tags: ['Vue', 'TypeScript', 'SASS'],
	timeline: '3 months',
	unique: 'test-project',
	year: '2023',
	...overrides
})

export const createMockProjects = (count: number = 3): MockProject[] => {
	return Array.from({ length: count }, (_, index) =>
		createMockProject({
			client: `Client ${String.fromCharCode(65 + index)}`, // Client A, B, C, etc.
			id: index + 1,
			name: `Test Project ${index + 1}`,
			tags: [
				['Vue', 'TypeScript', 'SASS'],
				['React', 'JavaScript', 'CSS'],
				['Angular', 'RxJS', 'Material UI']
			][index] || ['HTML', 'CSS', 'JavaScript'],
			timeline: `${(index + 1) * 2} months`,
			year: String(2023 - index),
			unique: `test-project-${index + 1}`
		})
	)
}

export const createMockProjectWithManyTags = (tagCount: number = 10): MockProject => {
	const tags = Array.from({ length: tagCount }, (_, i) => `Tag${i + 1}`)
	return createMockProject({
		name: 'Project with Many Tags',
		tags
	})
}

/**
 * Portfolio Data Factory
 */
export const createMockPortfolioData = (projects: MockProject[] = createMockProjects()) => ({
	portfolio: {
		copy: 'Browse my gallery of projects.',
		list: [
			{
				icon: 'github icon',
				title: 'GitHub Repositories',
				url: 'https://github.com/TestUser'
			}
		],
		projects,
		subtitle: 'My Links',
		subtitle2: 'Stats',
		subtitle3: 'Timeline',
		title: 'Portfolio',
	}
})

/**
 * Content Data Factory
 */
export const createMockContentData = () => ({
	common: {
		global: {
			copy: 'pronounced',
			copy2: 'day-sha',
			fullName: 'Dacia Rodrigue',
			menu: 'Menu',
			name: 'Dacia',
			prefix: 'Ms',
			tagline: 'I am here. This is who I am. I am Dacia.',
			title: 'MsDacia',
			url: 'http://msdacia.com',
			urlTitle: 'msdacia.com'
		},
		navigation: [
			{
				item: 'home',
				path: '/',
				title: 'Home'
			},
			{
				item: 'about',
				path: '/about',
				title: 'About'
			},
			{
				item: 'portfolio',
				path: '/portfolio',
				title: 'Portfolio'
			}
		],
		social: [
			{
				icon: 'github icon',
				title: 'Github',
				url: 'https://github.com/TestUser'
			}
		],
		copyright: {
			content: '2025 designed, developed by',
			icon: 'fal fa-copyright'
		},
		email: {
			domain: 'gmail.com',
			icon: 'mail icon',
			local: 'test',
			subject: 'Test Subject',
			title: 'Email'
		}
	},
	about: {
		copy: 'Test about content...',
		copy2: 'Test professional content...',
		copy3: 'Test personal content...',
		subtitle: 'Foundation',
		subtitle2: 'Professionally',
		subtitle3: 'Personally',
		title: 'WYSIWYG',
	},
	...createMockPortfolioData()
})

/**
 * Theme Data Factory
 */
export const createMockThemeData = () => ({
	actualTheme: 'light' as const,
	currentMode: 'system' as const,
	isDark: false,
	isLight: true,
	isSystem: false,
	nextThemeLabel: 'Light',
	setDarkTheme: vi.fn(),
	setLightTheme: vi.fn(),
	setSystemTheme: vi.fn(),
	setThemeMode: vi.fn(),
	systemPrefersDark: false,
	themeIcon: 'fas fa-desktop',
	themeLabel: 'System',
	toggleTheme: vi.fn(),
})

/**
 * Router Mock Factory
 */
export const createMockRouter = () => ({
	currentRoute: {
		value: {
			fullPath: '/',
			hash: '',
			matched: [],
			meta: {},
			name: 'home',
			params: {},
			path: '/',
			query: {},
			redirectedFrom: undefined,
		}
	},
	addRoute: vi.fn(),
	afterEach: vi.fn(),
	back: vi.fn(),
	beforeEach: vi.fn(),
	forward: vi.fn(),
	getRoutes: vi.fn(),
	go: vi.fn(),
	hasRoute: vi.fn(),
	isReady: vi.fn().mockResolvedValue(true),
	push: vi.fn(),
	removeRoute: vi.fn(),
	replace: vi.fn(),
	resolve: vi.fn(),
})

/**
 * Vue Router Test Utilities
 */
export const createTestRoutes = () => [
	{
		component: { name: 'Home', template: '<div>Home</div>' },
		name: 'home',
		path: '/',
	},
	{
		component: { name: 'About', template: '<div>About</div>' },
		name: 'about',
		path: '/about',
	},
	{
		component: { name: 'Portfolio', template: '<div>Portfolio</div>' },
		name: 'portfolio',
		path: '/portfolio',
	}
]

/**
 * Component Mock Factories
 */
export const createMockComponent = (name: string, props: string[] = [], emits: string[] = []) => ({
	name,
	props,
	emits,
	template: `<div class="${name.toLowerCase()}-mock">${name} Mock</div>`
})

export const createMockProjectGrid = () => ({
	emits: ['project-click'],
	name: 'ProjectGrid',
	props: ['projects', 'viewMode'],
	template: `
		<div class="project-grid-mock">
			<div
				v-for="project in projects"
				:key="project.id"
				class="mock-project-card"
				@click="$emit('project-click', project)"
				:data-testid="'project-' + project.id"
			>
				{{ project.name }}
			</div>
			<div v-if="projects.length === 0" class="empty-state-mock">No projects</div>
		</div>
	`
})

export const createMockProjectModal = () => ({
	emits: ['close'],
	name: 'ProjectModal',
	props: ['project'],
	template: `
		<div class="project-modal-mock" data-testid="project-modal">
			<h3>{{ project?.name || 'Modal' }}</h3>
			<button @click="$emit('close')" class="close-modal" data-testid="close-modal">
				Close
			</button>
		</div>
	`
})

export const createMockSwitchTheme = () => ({
	name: 'SwitchTheme',
	template: '<div class="switch-theme-mock" data-testid="theme-switcher">Theme Switcher</div>'
})

/**
 * Event Utilities
 */
export const triggerEvent = async (wrapper: any, selector: string, event: string) => {
	const element = wrapper.find(selector)
	if (!element.exists()) {
		throw new Error(`Element with selector "${selector}" not found`)
	}
	await element.trigger(event)
	return element
}

export const setValue = async (wrapper: any, selector: string, value: string) => {
	const input = wrapper.find(selector)
	if (!input.exists()) {
		throw new Error(`Input with selector "${selector}" not found`)
	}
	await input.setValue(value)
	return input
}

/**
 * Media Query Mock Utilities
 */
export const createMockMediaQuery = (matches: boolean = false) => {
	return vi.fn().mockImplementation((query: string) => ({
		matches,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		addListener: vi.fn(),
		dispatchEvent: vi.fn(),
		removeEventListener: vi.fn(),
		removeListener: vi.fn(),
	}))
}

export const mockMatchMedia = (matches: boolean = false) => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: createMockMediaQuery(matches)
	})
}

/**
 * Local Storage Mock Utilities
 */
export const createMockLocalStorage = () => {
	const store = new Map<string, string>()

	return {
		clear: vi.fn(() => store.clear()),
		getItem: vi.fn((key: string) => store.get(key) || null),
		key: vi.fn((index: number) => Array.from(store.keys())[index] || null),
		length: store.size,
		removeItem: vi.fn((key: string) => store.delete(key)),
		setItem: vi.fn((key: string, value: string) => store.set(key, value)),
	}
}

export const mockLocalStorage = () => {
	Object.defineProperty(window, 'localStorage', {
		writable: true,
		value: createMockLocalStorage()
	})
}

/**
 * Console Mock Utilities
 */
export const mockConsole = () => {
	const originalConsole = global.console

	global.console = {
		...originalConsole,
		debug: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
		log: vi.fn(),
		warn: vi.fn(),
	}

	return () => {
		global.console = originalConsole
	}
}

/**
 * Async Utilities
 */
export const waitFor = (condition: () => boolean, timeout: number = 1000): Promise<void> => {
	return new Promise((resolve, reject) => {
		const startTime = Date.now()

		const check = () => {
			if (condition()) {
				resolve()
			} else if (Date.now() - startTime > timeout) {
				reject(new Error(`Timeout waiting for condition after ${timeout}ms`))
			} else {
				setTimeout(check, 10)
			}
		}

		check()
	})
}

export const nextTick = () => new Promise(resolve => setTimeout(resolve, 0))

/**
 * Test ID Utilities
 */
export const getByTestId = (wrapper: any, testId: string) => {
	return wrapper.find(`[data-testid="${testId}"]`)
}

export const getAllByTestId = (wrapper: any, testId: string) => {
	return wrapper.findAll(`[data-testid="${testId}"]`)
}

/**
 * Assertion Helpers
 */
export const expectToBeVisible = (element: any) => {
	expect(element.exists()).toBe(true)
	expect(element.isVisible()).toBe(true)
}

export const expectToHaveText = (element: any, text: string) => {
	expect(element.exists()).toBe(true)
	expect(element.text()).toBe(text)
}

export const expectToContainText = (element: any, text: string) => {
	expect(element.exists()).toBe(true)
	expect(element.text()).toContain(text)
}

export const expectToHaveClass = (element: any, className: string) => {
	expect(element.exists()).toBe(true)
	expect(element.classes()).toContain(className)
}

export const expectToHaveAttribute = (element: any, attr: string, value?: string) => {
	expect(element.exists()).toBe(true)
	if (value !== undefined) {
		expect(element.attributes(attr)).toBe(value)
	} else {
		expect(element.attributes(attr)).toBeDefined()
	}
}

/**
 * Theme Test Utilities
 */
export const expectThemeToBeApplied = (theme: 'light' | 'dark') => {
	expect(document.documentElement.getAttribute('data-theme')).toBe(theme)
	expect(document.documentElement.className).toBe(theme)
}

export const expectSystemThemeDetection = (prefersDark: boolean) => {
	const mockMatchMedia = window.matchMedia as any
	expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
}

/**
 * Router Test Utilities
 */
export const expectRouteToBeActive = (wrapper: any, routeName: string) => {
	const router = wrapper.vm.$router
	expect(router.currentRoute.value.name).toBe(routeName)
}

export const expectNavigationToRoute = (router: any, path: string) => {
	expect(router.push).toHaveBeenCalledWith(path)
}

/**
 * Form Test Utilities
 */
export const fillForm = async (wrapper: any, formData: Record<string, string>) => {
	for (const [selector, value] of Object.entries(formData)) {
		await setValue(wrapper, selector, value)
	}
}

export const expectFormToBeValid = (wrapper: any, formSelector: string = 'form') => {
	const form = wrapper.find(formSelector)
	expect(form.exists()).toBe(true)
	// Add more validation logic as needed
}

/**
 * Animation Test Utilities
 */
export const expectElementToHaveTransition = (element: any) => {
	const styles = getComputedStyle(element.element)
	expect(styles.transition).toBeTruthy()
}

/**
 * Accessibility Test Utilities
 */
export const expectToBeAccessible = (wrapper: any) => {
	// Check for basic accessibility requirements
	const headings = wrapper.findAll('h1, h2, h3, h4, h5, h6')
	if (headings.length > 0) {
		expect(headings[0].exists()).toBe(true)
	}

	const buttons = wrapper.findAll('button')
	buttons.forEach((button: any) => {
		expect(button.text().trim()).toBeTruthy()
	})

	const links = wrapper.findAll('a')
	links.forEach((link: any) => {
		expect(link.text().trim() || link.attributes('aria-label')).toBeTruthy()
	})
}

export const expectToHaveAriaLabel = (element: any, label: string) => {
	expectToHaveAttribute(element, 'aria-label', label)
}

export const expectToHaveRole = (element: any, role: string) => {
	expectToHaveAttribute(element, 'role', role)
}
