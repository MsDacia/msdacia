import { render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import content from '../../src/media/json/static.en-us.json'
import Footer from '../../src/pages/Footer'

const social = content.common.social

describe('Footer Component', () => {
	it('renders the footer element', () => {
		const { container } = render(<Footer />)

		expect(container.querySelector('footer')).toBeInTheDocument()
	})

	it('renders one social link per entry with its url and title', () => {
		const { container } = render(<Footer />)
		const links = container.querySelectorAll('#social-media a')

		expect(links).toHaveLength(social.length)
		social.forEach((entry, index) => {
			expect(links[index]).toHaveAttribute('href', entry.url)
			expect(links[index]).toHaveAttribute('title', entry.title)
		})
	})

	it('opens social links in a new tab safely', () => {
		const { container } = render(<Footer />)
		const link = container.querySelector('#social-media a')!

		expect(link).toHaveAttribute('target', '_blank')
		expect(link).toHaveAttribute('rel', 'noopener noreferrer')
	})

	it('renders the copyright text and site link', () => {
		const { container } = render(<Footer />)

		expect(container.querySelector('#copyright')).toHaveTextContent(content.common.copyright.content)

		const siteLink = container.querySelector('#copyright a')!

		expect(siteLink).toHaveAttribute('href', content.common.global.url)
		expect(siteLink).toHaveTextContent(content.common.global.title)
	})
})
