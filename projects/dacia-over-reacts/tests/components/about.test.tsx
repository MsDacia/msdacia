import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import content from '../../src/media/json/static.en-us.json'
import About from '../../src/pages/About'

describe('About Page', () => {
	it('renders the page title', () => {
		const { container } = render(<About />)

		expect(container.querySelector('h1')).toHaveTextContent(content.about.title)
	})

	it('renders the Wysiwyg accordion', () => {
		const { container } = render(<About />)

		expect(container.querySelector('.ui.accordion')).toBeInTheDocument()
		expect(container.querySelectorAll('.ui.accordion .title')).toHaveLength(3)
	})

	it('renders the Wysiwyg section headers', () => {
		const { container } = render(<About />)

		expect(container).toHaveTextContent(content.about.subtitle)
		expect(container).toHaveTextContent(content.about.subtitle2)
		expect(container).toHaveTextContent(content.about.subtitle3)
	})
})
