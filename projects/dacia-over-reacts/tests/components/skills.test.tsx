import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Skills from '../../src/components/skills'
import content from '../../src/media/json/static.en-us.json'

const categories = content.resume.skills.categories

describe('Skills Component', () => {
	it('renders the definition table', () => {
		const { container } = render(<Skills />)

		expect(container.querySelector('table.ui.definition.table')).toBeInTheDocument()
	})

	it('renders one row per skill category', () => {
		const { container } = render(<Skills />)

		expect(container.querySelectorAll('tbody tr')).toHaveLength(categories.length)
	})

	it('renders each category title and copy', () => {
		const { container } = render(<Skills />)
		const rows = container.querySelectorAll('tbody tr')

		categories.forEach((skill, index) => {
			expect(rows[index]).toHaveTextContent(skill.title)
			expect(rows[index]).toHaveTextContent(skill.copy)
		})
	})
})
