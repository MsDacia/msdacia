import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Education from '../../src/components/education'
import content from '../../src/media/json/static.en-us.json'

const education = content.resume.education

describe('Education Component', () => {
	it('renders the card container', () => {
		const { container } = render(<Education />)

		expect(container.querySelector('.ui.card')).toBeInTheDocument()
	})

	it('renders the school name as the header', () => {
		const { container } = render(<Education />)

		expect(container.querySelector('.header')).toHaveTextContent(education.school)
	})

	it('renders the degree in the meta category', () => {
		const { container } = render(<Education />)

		expect(container.querySelector('.meta .category')).toHaveTextContent(education.degree)
	})

	it('renders the major with its label', () => {
		const { container } = render(<Education />)

		expect(container).toHaveTextContent(education.major)
		expect(container).toHaveTextContent('Major')
	})

	it('renders the minor with its label', () => {
		const { container } = render(<Education />)

		expect(container).toHaveTextContent(education.minor)
		expect(container).toHaveTextContent('Minor')
	})

	it('renders the specialization with its label', () => {
		const { container } = render(<Education />)

		expect(container).toHaveTextContent(education.specialization)
		expect(container).toHaveTextContent('Specialization')
	})
})
