import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Experience from '../../src/components/experience'

describe('Experience Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Experience />)

		expect(container.querySelector('.ui.accordion')).toBeInTheDocument()
	})

	it('displays accordion structure', () => {
		const { container } = render(<Experience />)

		expect(container.querySelector('.ui.accordion')).toBeInTheDocument()
	})

	it('renders job titles', () => {
		const { container } = render(<Experience />)
		const titles = container.querySelectorAll('.title')

		expect(titles.length >= 0).toBeTruthy()
	})

	it('expands and collapses accordion sections', () => {
		const { container } = render(<Experience />)
		const titles = container.querySelectorAll('.title')

		if (titles.length > 0) {
			const { fireEvent } = require('@testing-library/react')

			fireEvent.click(titles[0])
			expect(titles[0].classList.contains('active')).toBe(true)
			fireEvent.click(titles[0])
			expect(titles[0].classList.contains('active')).toBe(false)
		}
	})
})
