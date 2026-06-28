import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import content from '../../src/media/json/static.en-us.json'
import Resume from '../../src/pages/Resume'

const resume = content.resume

describe('Resume Page', () => {
	it('renders the page title and address', () => {
		const { container } = render(<Resume />)

		expect(container.querySelector('h1')).toHaveTextContent(resume.title)
		expect(container.querySelector('address')).toHaveTextContent(resume.address)
	})

	it('renders every section heading', () => {
		const { container } = render(<Resume />)
		const headings = Array.from(container.querySelectorAll('h2')).map(node => node.textContent)

		expect(headings.join(' ')).toContain(resume.skills.title)
		expect(headings.join(' ')).toContain(resume.objective.title)
		expect(headings.join(' ')).toContain(resume.experiences.title)
		expect(headings.join(' ')).toContain(resume.education.title)
		expect(headings.join(' ')).toContain(resume.links.title)
	})

	it('composes the AdWork message', () => {
		const { container } = render(<Resume />)

		expect(container.querySelector('.ui.icon.ad.message')).toBeInTheDocument()
	})

	it('composes the skills table with one row per category', () => {
		const { container } = render(<Resume />)

		expect(container.querySelectorAll('table.ui.definition.table tbody tr')).toHaveLength(resume.skills.categories.length)
	})

	it('composes the objective copy', () => {
		const { container } = render(<Resume />)

		expect(container.querySelector('.objective.ui.card')).toHaveTextContent(resume.objective.copy)
	})

	it('composes the experience accordion with one title per job', () => {
		const { container } = render(<Resume />)

		expect(container.querySelectorAll('.ui.accordion .title')).toHaveLength(resume.experiences.job.length)
	})

	it('composes the education card with the school name', () => {
		const { container } = render(<Resume />)

		expect(container.querySelector('.ui.card:not(.objective)')).toHaveTextContent(resume.education.school)
	})

	it('composes the links list with one item per category', () => {
		const { container } = render(<Resume />)

		expect(container.querySelectorAll('.ui.horizontal.list .item')).toHaveLength(resume.links.categories.length)
	})
})
