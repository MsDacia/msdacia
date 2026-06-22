import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Footer from '../../src/pages/Footer'

describe('Footer Component', () => {
	it('renders without crashing', () => {
		const { container } = render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		)

		expect(container).toBeTruthy()
	})

	it('displays footer structure', () => {
		const { container } = render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		)
		const footer = container.querySelector('footer') || container.querySelector('[role="contentinfo"]') || container.querySelector('div')

		expect(footer).toBeInTheDocument()
	})
})
