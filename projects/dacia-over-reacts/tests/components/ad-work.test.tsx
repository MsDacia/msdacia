import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import AdWork from '../../src/components/ad-work'
import content from '../../src/media/json/static.en-us.json'

const message = (container: HTMLElement) => container.querySelector('.ui.icon.ad.message')!

describe('AdWork Component', () => {
	it('renders the ad message container', () => {
		const { container } = render(<AdWork />)

		expect(message(container)).toBeInTheDocument()
	})

	it('renders the laptop icon', () => {
		const { container } = render(<AdWork />)

		expect(container.querySelector('i.laptop.icon')).toBeInTheDocument()
	})

	it('renders the ad title from content', () => {
		const { container } = render(<AdWork />)

		expect(container.querySelector('.header')).toHaveTextContent(content.common.ad.work.title)
	})

	it('renders the ad copy from content', () => {
		const { container } = render(<AdWork />)

		expect(container).toHaveTextContent(content.common.ad.work.copy)
	})
})
