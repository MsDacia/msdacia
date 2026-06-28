import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Projects from '../../src/components/projects'
import content from '../../src/media/json/static.en-us.json'

const categories = content.resume.projects.categories

describe('Projects Component', () => {
	it('renders the horizontal list container', () => {
		const { container } = render(<Projects />)

		expect(container.querySelector('.ui.horizontal.list')).toBeInTheDocument()
	})

	it('renders one item per project category', () => {
		const { container } = render(<Projects />)

		expect(container.querySelectorAll('.item')).toHaveLength(categories.length)
	})

	it('renders each project with its title and url', () => {
		const { container } = render(<Projects />)
		const anchors = container.querySelectorAll('.item a')

		categories.forEach((project, index) => {
			expect(anchors[index]).toHaveTextContent(project.title)
			expect(anchors[index]).toHaveAttribute('href', project.url)
			expect(anchors[index]).toHaveAttribute('target', '_blank')
		})
	})
})
