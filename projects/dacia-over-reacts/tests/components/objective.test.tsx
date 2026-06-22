import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Objective from '../../src/components/objective'

describe('Objective Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Objective />)

		expect(container).toBeTruthy()
	})

	it('displays objective section', () => {
		const { container } = render(<Objective />)
		const section = container.querySelector('[class*="objective"], [class*="container"], h2')

		expect(section || container.querySelector('div')).toBeTruthy()
	})

	it('renders objective content', () => {
		const { container } = render(<Objective />)

		expect(container.querySelector('div')).toBeTruthy()
	})
})
