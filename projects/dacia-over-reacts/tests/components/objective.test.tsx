import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Objective from '../../src/components/objective'
import content from '../../src/media/json/static.en-us.json'

const objective = content.resume.objective

describe('Objective Component', () => {
	it('renders the objective card', () => {
		const { container } = render(<Objective />)

		expect(container.querySelector('.objective.ui.card')).toBeInTheDocument()
	})

	it('renders the headline, subtitle and copy from content', () => {
		const { container } = render(<Objective />)

		expect(container.querySelector('.objective-headline')).toHaveTextContent(objective.headline)
		expect(container.querySelector('.objective-subtitle')).toHaveTextContent(objective.subtitle)
		expect(container.querySelector('.objective-copy')).toHaveTextContent(objective.copy)
	})
})
