import {
	fireEvent,
	render,
} from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Wysiwyg from '../../src/components/wysiwyg'

describe('Wysiwyg Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Wysiwyg />)

		expect(container.querySelector('.ui.accordion')).toBeInTheDocument()
	})

	it('displays accordion structure', () => {
		const { container } = render(<Wysiwyg />)

		expect(container.querySelector('.ui.accordion')).toBeInTheDocument()
	})

	it('renders three accordion sections', () => {
		const { container } = render(<Wysiwyg />)
		const titles = container.querySelectorAll('.title')

		expect(titles.length).toBe(3)
	})

	it('expands and collapses sections on click', () => {
		const { container } = render(<Wysiwyg />)
		const titles = container.querySelectorAll('.title')

		if (titles.length > 0) {
			fireEvent.click(titles[0])
			expect(titles[0].classList.contains('active')).toBe(true)
			const content = titles[0].nextElementSibling

			expect(content?.classList.contains('active')).toBe(true)
			fireEvent.click(titles[0])
			expect(titles[0].classList.contains('active')).toBe(false)
		}
	})

	it('renders section headers with icons', () => {
		const { container } = render(<Wysiwyg />)
		const icons = container.querySelectorAll('.icon')

		expect(icons.length).toBeGreaterThan(0)
	})
})
