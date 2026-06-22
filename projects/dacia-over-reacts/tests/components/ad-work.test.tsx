import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import AdWork from '../../src/components/ad-work'

describe('AdWork Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<AdWork />)

		expect(container).toBeTruthy()
	})

	it('displays ad work section with content', () => {
		const { container } = render(<AdWork />)

		expect(container.querySelector('[class*="ad"], [class*="work"], h2')).toBeInTheDocument()
	})

	it('renders properly structured content', () => {
		const { container } = render(<AdWork />)
		const content = container.querySelector('div')

		expect(content).toBeTruthy()
	})
})
