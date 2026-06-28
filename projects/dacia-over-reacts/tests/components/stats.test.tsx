import { fireEvent, render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Stats from '../../src/components/stats'
import content from '../../src/media/json/static.en-us.json'

const uniqueTags = new Set(content.portfolio.projects.flatMap(project => project.tags))

const labels = (container: HTMLElement) => container.querySelectorAll('.ui.labels a.ui.label')

describe('Stats Component', () => {
	it('renders the labels container', () => {
		const { container } = render(<Stats />)

		expect(container.querySelector('.ui.labels')).toBeInTheDocument()
	})

	it('renders one label per unique tag', () => {
		const { container } = render(<Stats />)

		expect(labels(container)).toHaveLength(uniqueTags.size)
	})

	it('orders labels by descending project count', () => {
		const { container } = render(<Stats />)
		const counts = Array.from(labels(container)).map(label =>
			Number(label.querySelector('span')!.textContent)
		)
		const sorted = [...counts].sort((a, b) => b - a)

		expect(counts).toEqual(sorted)
	})

	it('marks a label selected when clicked', () => {
		const { container } = render(<Stats />)
		const label = labels(container)[0]

		fireEvent.click(label)

		expect(label).toHaveClass('selected')
	})

	it('activates the labels container when a label is selected', () => {
		const { container } = render(<Stats />)

		fireEvent.click(labels(container)[0])

		expect(container.querySelector('.ui.labels')).toHaveClass('activated')
	})

	it('shows a remove icon only on the selected label', () => {
		const { container } = render(<Stats />)

		expect(container.querySelector('i.remove.icon')).not.toBeInTheDocument()

		fireEvent.click(labels(container)[0])

		expect(labels(container)[0].querySelector('i.remove.icon')).toBeInTheDocument()
	})

	it('deselects the tag and deactivates the container when the remove icon is clicked', () => {
		const { container } = render(<Stats />)

		fireEvent.click(labels(container)[0])
		fireEvent.click(container.querySelector('i.remove.icon')!)

		expect(container.querySelector('.selected')).not.toBeInTheDocument()
		expect(container.querySelector('.ui.labels')).not.toHaveClass('activated')
	})
})
