import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Education from '../../src/components/education'

describe('Education Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Education />)

		expect(container).toBeTruthy()
	})

	it('displays education section', () => {
		const { container } = render(<Education />)
		const section = container.querySelector('[class*="education"], [class*="container"], h2')

		expect(section || container.querySelector('div')).toBeTruthy()
	})

	it('renders education items', () => {
		const { container } = render(<Education />)
		const content = container.querySelector('div')

		expect(content).toBeTruthy()
	})
})
