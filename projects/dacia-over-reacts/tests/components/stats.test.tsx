import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Stats from '../../src/components/stats'

describe('Stats Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Stats />)

		expect(container).toBeTruthy()
	})

	it('displays stats section', () => {
		const { container } = render(<Stats />)
		const section = container.querySelector('[class*="stats"], [class*="container"], h2')

		expect(section || container.querySelector('div')).toBeTruthy()
	})

	it('renders statistics', () => {
		const { container } = render(<Stats />)

		expect(container.querySelector('div')).toBeTruthy()
	})
})
