import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Objective from '../../src/components/objective'
import content from '../../src/media/json/static.en-us.json'

describe('Objective Component', () => {
	it('renders the objective card', () => {
		const { container } = render(<Objective />)

		expect(container.querySelector('.objective.ui.card')).toBeInTheDocument()
	})

	it('renders the objective copy from content', () => {
		const { container } = render(<Objective />)

		expect(container.querySelector('.description p')).toHaveTextContent(content.resume.objective.copy)
	})
})
