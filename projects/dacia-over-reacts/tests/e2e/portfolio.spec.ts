import { expect, test } from '@playwright/test'

import content from '../../src/media/json/static.en-us.json'

const portfolio = content.portfolio

test.describe('Portfolio Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/portfolio')
	})

	test('loads on the portfolio route', async ({ page }) => {
		await expect(page).toHaveURL(/\/portfolio$/)
		await expect(page.locator('main .main-content.portfolio')).toBeVisible()
	})

	test('renders the portfolio title and section headings', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(portfolio.title)
		await expect(page.getByRole('heading', { level: 2, name: portfolio.subtitle2 })).toBeVisible()
		await expect(page.getByRole('heading', { level: 2, name: portfolio.subtitle3 })).toBeVisible()
	})

	test('renders a project tile per project', async ({ page }) => {
		await expect(page.locator('a.project')).toHaveCount(portfolio.projects.length)
	})

	test('renders the stats tag labels', async ({ page }) => {
		await expect(page.locator('.ui.labels a.ui.label').first()).toBeVisible()
	})

	test('opens a project modal when a tile is clicked and closes it', async ({ page }) => {
		const project = portfolio.projects[0]

		await expect(page.locator('[data-ui="modal"]')).toHaveCount(0)

		await page.locator(`#project-${project.unique}-link`).click()

		// The outer [data-ui="modal"] wrapper is zero-size (its children are fixed-position),
		// so assert visibility on the inner box, which carries the real dimensions.
		const box = page.locator('[data-ui-role="box"]')

		await expect(box).toBeVisible()
		await expect(box).toContainText(project.name)

		await page.locator('[data-ui="close-button"]').click()

		await expect(page.locator('[data-ui="modal"]')).toHaveCount(0)
	})
})
