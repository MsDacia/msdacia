import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import content from '../../src/media/json/static.en-us.json'
import Home from '../../src/pages/Home'

const global = content.common.global

describe('Home Page', () => {
	it('renders the copy container', () => {
		const { container } = render(<Home />)

		expect(container.querySelector('.copy')).toBeInTheDocument()
	})

	it('renders the prefixed name as the heading', () => {
		const { container } = render(<Home />)

		expect(container.querySelector('h1')).toHaveTextContent(`${global.prefix}${global.name}`)
	})

	it('renders the pronunciation copy and tagline', () => {
		const { container } = render(<Home />)

		expect(container).toHaveTextContent(global.copy)
		expect(container).toHaveTextContent(global.copy2)
		expect(container).toHaveTextContent(global.tagline)
	})
})
