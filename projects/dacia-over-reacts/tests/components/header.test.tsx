import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Header from '../../src/pages/Header'

describe('Header Component', () => {
	it('renders without crashing', () => {
		const { container } = render(
			<BrowserRouter>
				<Header items={[]} />
			</BrowserRouter>
		)

		expect(container).toBeTruthy()
	})

	it('displays header structure', () => {
		const { container } = render(
			<BrowserRouter>
				<Header items={[]} />
			</BrowserRouter>
		)
		const header = container.querySelector('header') || container.querySelector('[role="banner"]') || container.querySelector('div')

		expect(header).toBeInTheDocument()
	})

	it('renders with empty menu items', () => {
		const { container } = render(
			<BrowserRouter>
				<Header items={[]} />
			</BrowserRouter>
		)

		expect(container.querySelector('header')).toBeInTheDocument()
	})
})
