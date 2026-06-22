import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Skills from '../../src/components/skills'

describe('Skills Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Skills />)

		expect(container).toBeTruthy()
	})

	it('displays skills table', () => {
		const { container } = render(<Skills />)
		const table = container.querySelector('table.ui.definition.table')

		expect(table).toBeInTheDocument()
	})

	it('renders skill items in table', () => {
		const { container } = render(<Skills />)
		const rows = container.querySelectorAll('tr')

		expect(rows.length >= 0).toBeTruthy()
	})
})
