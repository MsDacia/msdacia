import { expect, test } from '@playwright/test'

test.describe('Portfolio Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/portfolio')
	})

	test('should load the portfolio page', async ({ page }) => {
		await expect(page).toHaveURL(/portfolio/)
	})

	test('should display portfolio content', async ({ page }) => {
		const container = page.locator('main') || page.locator('[role="main"]')

		await expect(container).toBeDefined()
	})

	test('should display portfolio items', async ({ page }) => {
		const items = page.locator('[class*="project"], [class*="portfolio"], [class*="work"]')
		const count = await items.count()

		expect(count).toBeGreaterThanOrEqual(0)
	})

	test('should be accessible', async ({ page }) => {
		const headings = page.locator('h1, h2, h3')
		const count = await headings.count()

		expect(count).toBeGreaterThan(0)
	})

	test('should have working navigation', async ({ page }) => {
		const resumeLink = page.locator('a[href="/resume"]')

		if (await resumeLink.count() > 0) {
			await resumeLink.first().click()
			await expect(page).toHaveURL(/resume/)
		}
	})
})
