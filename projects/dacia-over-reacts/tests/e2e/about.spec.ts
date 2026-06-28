import { expect, test } from '@playwright/test'

import content from '../../src/media/json/static.en-us.json'

test.describe('About Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/about')
	})

	test('loads on the about route', async ({ page }) => {
		await expect(page).toHaveURL(/\/about$/)
		await expect(page.locator('main .main-content.about')).toBeVisible()
	})

	test('renders the about title', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(content.about.title)
	})

	test('renders three collapsed accordion sections', async ({ page }) => {
		const titles = page.locator('.ui.accordion .title')

		await expect(titles).toHaveCount(3)
		await expect(page.locator('.ui.accordion .title.active')).toHaveCount(0)
	})

	test('expands an accordion section when clicked', async ({ page }) => {
		const firstTitle = page.locator('.ui.accordion .title').first()

		await firstTitle.click()

		await expect(firstTitle).toHaveClass(/active/)
		await expect(page.locator('.ui.accordion .content.active')).toHaveCount(1)
	})
})
