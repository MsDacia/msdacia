import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Links from '../../src/components/links'
import content from '../../src/media/json/static.en-us.json'

const categories = content.resume.links.categories

describe('Links Component', () => {
	it('renders the horizontal list container', () => {
		const { container } = render(<Links />)

		expect(container.querySelector('.ui.horizontal.list')).toBeInTheDocument()
	})

	it('renders one item per link category', () => {
		const { container } = render(<Links />)

		expect(container.querySelectorAll('.item')).toHaveLength(categories.length)
	})

	it('renders each link with its title and url', () => {
		const { container } = render(<Links />)
		const anchors = container.querySelectorAll('.item a')

		categories.forEach((link, index) => {
			expect(anchors[index]).toHaveTextContent(link.title)
			expect(anchors[index]).toHaveAttribute('href', link.url)
			expect(anchors[index]).toHaveAttribute('target', '_blank')
		})
	})
})
