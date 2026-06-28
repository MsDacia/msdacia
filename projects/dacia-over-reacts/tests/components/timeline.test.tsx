import { fireEvent, render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Timeline from '../../src/components/timeline'
import content from '../../src/media/json/static.en-us.json'

const projects = content.portfolio.projects
const firstProject = projects[0]

const modal = (container: HTMLElement) => container.querySelector('[data-ui="modal"]')

describe('Timeline Component', () => {
	it('renders the timeline container', () => {
		const { container } = render(<Timeline />)

		expect(container.querySelector('.timeline')).toBeInTheDocument()
	})

	it('renders one project link per project', () => {
		const { container } = render(<Timeline />)

		expect(container.querySelectorAll('a.project')).toHaveLength(projects.length)
	})

	it('renders each project image with its name as alt text', () => {
		const { container } = render(<Timeline />)
		const image = container.querySelector(`#project-${firstProject.unique}-link img`)

		expect(image).toHaveAttribute('alt', firstProject.name)
	})

	it('renders the project name and timeline labels', () => {
		const { container } = render(<Timeline />)
		const link = container.querySelector(`#project-${firstProject.unique}-link`)!

		expect(link).toHaveTextContent(firstProject.name)
		expect(link).toHaveTextContent(firstProject.timeline)
	})

	it('does not open any modal initially', () => {
		const { container } = render(<Timeline />)

		expect(modal(container)).not.toBeInTheDocument()
	})

	it('opens the matching project modal when a project is clicked', () => {
		const { container } = render(<Timeline />)

		fireEvent.click(container.querySelector(`#project-${firstProject.unique}-link`)!)

		expect(modal(container)).toBeInTheDocument()
		expect(modal(container)).toHaveTextContent(firstProject.name)
		expect(modal(container)).toHaveTextContent(firstProject.tags[0])
	})

	it('closes the modal when the close button is clicked', () => {
		const { container } = render(<Timeline />)

		fireEvent.click(container.querySelector(`#project-${firstProject.unique}-link`)!)
		fireEvent.click(container.querySelector('[data-ui="close-button"]')!)

		expect(modal(container)).not.toBeInTheDocument()
	})
})
