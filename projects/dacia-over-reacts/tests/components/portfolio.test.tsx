import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import content from '../../src/media/json/static.en-us.json'
import Portfolio from '../../src/pages/Portfolio'

const portfolio = content.portfolio

describe('Portfolio Page', () => {
	it('renders the page title', () => {
		const { container } = render(<Portfolio />)

		expect(container.querySelector('h1')).toHaveTextContent(portfolio.title)
	})

	it('renders the AdWork message', () => {
		const { container } = render(<Portfolio />)

		expect(container.querySelector('.ui.icon.ad.message')).toBeInTheDocument()
	})

	it('renders the stats and timeline section headings', () => {
		const { container } = render(<Portfolio />)
		const headings = Array.from(container.querySelectorAll('h2')).map(node => node.textContent)

		expect(headings).toContain(portfolio.subtitle2)
		expect(headings).toContain(portfolio.subtitle3)
	})

	it('renders the composed stats labels', () => {
		const { container } = render(<Portfolio />)

		expect(container.querySelector('.ui.labels a.ui.label')).toBeInTheDocument()
	})

	it('renders the composed timeline projects', () => {
		const { container } = render(<Portfolio />)

		expect(container.querySelectorAll('a.project')).toHaveLength(portfolio.projects.length)
	})
})
