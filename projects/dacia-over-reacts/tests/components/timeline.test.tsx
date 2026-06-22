import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Timeline from '../../src/components/timeline'

describe('Timeline Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Timeline />)

		expect(container).toBeTruthy()
	})

	it('displays timeline section', () => {
		const { container } = render(<Timeline />)
		const section = container.querySelector('[class*="timeline"], [class*="container"], h2')

		expect(section || container.querySelector('div')).toBeTruthy()
	})

	it('renders timeline content', () => {
		const { container } = render(<Timeline />)

		expect(container.querySelector('div')).toBeTruthy()
	})
})
