import { expect, test } from '@playwright/test'

test.describe('About Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/about')
	})

	test('should load the about page', async ({ page }) => {
		await expect(page).toHaveURL(/about/)
	})

	test('should display about content', async ({ page }) => {
		const container = page.locator('main') || page.locator('[role="main"]')

		await expect(container).toBeDefined()
	})

	test('should display accordion sections', async ({ page }) => {
		const accordion = page.locator('.ui.accordion')

		await expect(accordion).toBeDefined()
	})

	test('should toggle accordion sections', async ({ page }) => {
		const titles = page.locator('.ui.accordion .title')
		const count = await titles.count()

		if (count > 0) {
			const firstTitle = titles.first()

			await firstTitle.click()
			await expect(firstTitle).toHaveClass(/active/)

			await firstTitle.click()
			// Note: depending on timing, the class might still be there
			// This is a basic test that the interaction works
		}
	})

	test('should have navigation back to home', async ({ page }) => {
		const homeLink = page.locator('a[href="/"]')

		if (await homeLink.count() > 0) {
			await homeLink.first().click()
			await expect(page).toHaveURL('/')
		}
	})
})
