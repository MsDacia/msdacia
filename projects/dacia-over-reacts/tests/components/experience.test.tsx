import { fireEvent, render } from '@testing-library/react'
import {
	describe,
	expect,
	it,
} from 'vitest'

import Experience from '../../src/components/experience'
import content from '../../src/media/json/static.en-us.json'

const jobs = content.resume.experiences.job

describe('Experience Component', () => {
	it('renders the accordion container', () => {
		const { container } = render(<Experience />)

		expect(container.querySelector('.ui.accordion')).toBeInTheDocument()
	})

	it('renders one title per job', () => {
		const { container } = render(<Experience />)

		expect(container.querySelectorAll('.title')).toHaveLength(jobs.length)
	})

	it('renders each job title from content', () => {
		const { container } = render(<Experience />)
		const titles = container.querySelectorAll('.title .header')

		jobs.forEach((job, index) => {
			expect(titles[index]).toHaveTextContent(job.title)
		})
	})

	it('renders all sections collapsed initially', () => {
		const { container } = render(<Experience />)

		expect(container.querySelectorAll('.title.active')).toHaveLength(0)
		expect(container.querySelectorAll('.content.active')).toHaveLength(0)
	})

	it('expands a section when its title is clicked', () => {
		const { container } = render(<Experience />)
		const title = container.querySelectorAll('.title')[0]

		fireEvent.click(title)

		expect(title).toHaveClass('active')
		expect(title.nextElementSibling).toHaveClass('active')
	})

	it('collapses an expanded section when clicked again', () => {
		const { container } = render(<Experience />)
		const title = container.querySelectorAll('.title')[0]

		fireEvent.click(title)
		fireEvent.click(title)

		expect(title).not.toHaveClass('active')
	})

	it('only keeps one section open at a time', () => {
		const { container } = render(<Experience />)
		const titles = container.querySelectorAll('.title')

		fireEvent.click(titles[0])
		fireEvent.click(titles[1])

		expect(titles[0]).not.toHaveClass('active')
		expect(titles[1]).toHaveClass('active')
	})

	it('renders the expanded job company, location and date', () => {
		const { container } = render(<Experience />)
		const title = container.querySelectorAll('.title')[0]

		fireEvent.click(title)
		const body = title.nextElementSibling!

		expect(body).toHaveTextContent(jobs[0].company)
		expect(body).toHaveTextContent(jobs[0].location)
		expect(body).toHaveTextContent(jobs[0].date)
	})

	it('renders one list item per point for the expanded job', () => {
		const { container } = render(<Experience />)
		const title = container.querySelectorAll('.title')[0]

		fireEvent.click(title)

		expect(title.nextElementSibling!.querySelectorAll('.item')).toHaveLength(jobs[0].points.length)
	})
})
