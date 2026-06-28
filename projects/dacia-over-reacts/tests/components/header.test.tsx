import { fireEvent, render } from '@testing-library/react'
import {
	afterEach,
	describe,
	expect,
	it,
} from 'vitest'

import content from '../../src/media/json/static.en-us.json'
import Header from '../../src/pages/Header'

const items = content.common.navigation

afterEach(() => {
	document.body.classList.remove('light')
})

describe('Header Component', () => {
	it('renders the header element', () => {
		const { container } = render(<Header items={items} />)

		expect(container.querySelector('header')).toBeInTheDocument()
	})

	it('renders the menu label from content', () => {
		const { container } = render(<Header items={items} />)

		expect(container).toHaveTextContent(content.common.global.menu)
	})

	it('renders one navigation link per item with the correct href and title', () => {
		const { container } = render(<Header items={items} />)
		const links = container.querySelectorAll('.menu a')

		expect(links).toHaveLength(items.length)
		items.forEach((item, index) => {
			expect(links[index]).toHaveAttribute('href', item.path)
			expect(links[index]).toHaveTextContent(item.title)
		})
	})

	it('renders no links when given an empty menu', () => {
		const { container } = render(<Header items={[]} />)

		expect(container.querySelectorAll('.menu a')).toHaveLength(0)
	})

	it('toggles the body "light" class when the invert icon is clicked', () => {
		const { container } = render(<Header items={items} />)
		const invert = container.querySelector('i.eyedropper.icon')!

		expect(document.body).not.toHaveClass('light')

		fireEvent.click(invert)
		expect(document.body).toHaveClass('light')

		fireEvent.click(invert)
		expect(document.body).not.toHaveClass('light')
	})

	it('hides the menu by default and reveals it when the toggle is clicked', () => {
		const { container } = render(<Header items={items} />)
		const toggle = container.querySelector('.item')!

		expect(container.querySelector('.menu')).toHaveClass('hide-content')

		fireEvent.click(toggle)

		expect(container.querySelector('.menu')).toHaveClass('show-content')
		expect(container.querySelector('em')).toHaveClass('active')
	})

	it('closes the menu when a navigation link is clicked', () => {
		const { container } = render(<Header items={items} />)

		fireEvent.click(container.querySelector('.item')!)
		fireEvent.click(container.querySelector('.menu a')!)

		expect(container.querySelector('.menu')).toHaveClass('hide-content')
	})
})
