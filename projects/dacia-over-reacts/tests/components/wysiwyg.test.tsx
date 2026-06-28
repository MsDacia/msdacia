import { fireEvent, render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Wysiwyg from '../../src/components/wysiwyg'
import content from '../../src/media/json/static.en-us.json'

const headers = [
	content.about.subtitle,
	content.about.subtitle2,
	content.about.subtitle3,
]

describe('Wysiwyg Component', () => {
	it('renders the accordion container', () => {
		const { container } = render(<Wysiwyg />)

		expect(container.querySelector('.ui.accordion')).toBeInTheDocument()
	})

	it('renders three accordion sections', () => {
		const { container } = render(<Wysiwyg />)

		expect(container.querySelectorAll('.title')).toHaveLength(3)
	})

	it('renders each section header from content', () => {
		const { container } = render(<Wysiwyg />)
		const titles = container.querySelectorAll('.title .header')

		headers.forEach((header, index) => {
			expect(titles[index]).toHaveTextContent(header)
		})
	})

	it('renders the icon for each section', () => {
		const { container } = render(<Wysiwyg />)

		expect(container.querySelector('i.heartbeat.icon')).toBeInTheDocument()
		expect(container.querySelector('i.desktop.icon')).toBeInTheDocument()
		expect(container.querySelector('i.diamond.icon')).toBeInTheDocument()
	})

	it('renders all sections collapsed initially', () => {
		const { container } = render(<Wysiwyg />)

		expect(container.querySelectorAll('.title.active')).toHaveLength(0)
	})

	it('expands a section on click and collapses it on a second click', () => {
		const { container } = render(<Wysiwyg />)
		const title = container.querySelectorAll('.title')[0]

		fireEvent.click(title)
		expect(title).toHaveClass('active')
		expect(title.nextElementSibling).toHaveClass('active')

		fireEvent.click(title)
		expect(title).not.toHaveClass('active')
	})

	it('only keeps one section open at a time', () => {
		const { container } = render(<Wysiwyg />)
		const titles = container.querySelectorAll('.title')

		fireEvent.click(titles[0])
		fireEvent.click(titles[2])

		expect(titles[0]).not.toHaveClass('active')
		expect(titles[2]).toHaveClass('active')
	})
})
