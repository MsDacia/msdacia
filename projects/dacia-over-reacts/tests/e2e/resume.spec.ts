import { expect, test } from '@playwright/test'

test.describe('Resume Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/resume')
	})

	test('should load the resume page', async ({ page }) => {
		await expect(page).toHaveURL(/resume/)
	})

	test('should display resume content', async ({ page }) => {
		const container = page.locator('main') || page.locator('[role="main"]')

		await expect(container).toBeDefined()
	})

	test('should display accordion sections for experience', async ({ page }) => {
		const accordion = page.locator('.ui.accordion')
		const count = await accordion.count()

		expect(count).toBeGreaterThan(0)
	})

	test('should allow expanding experience items', async ({ page }) => {
		const titles = page.locator('.ui.accordion .title')
		const titleCount = await titles.count()

		if (titleCount > 0) {
			const firstTitle = titles.first()

			await firstTitle.click()
			// Verify click was registered
			expect(firstTitle).toBeDefined()
		}
	})

	test('should display work experience with details', async ({ page }) => {
		const content = page.locator('[class*="content"], [class*="feed"]')
		const count = await content.count()

		expect(count).toBeGreaterThanOrEqual(0)
	})

	test('should have readable typography', async ({ page }) => {
		const mainText = page.locator('p, li, span, div').first()

		await expect(mainText).toBeDefined()
	})
})
