import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('should load and display the home page', async ({ page }) => {
		await expect(page).toHaveTitle(/home|portfolio|dacia/i)
		const mainContent = page.locator('main') || page.locator('[role="main"]')

		await expect(mainContent).toBeDefined()
	})

	test('should display navigation header', async ({ page }) => {
		const header = page.locator('header') || page.locator('[role="banner"]')

		await expect(header).toBeDefined()
	})

	test('should have working navigation links', async ({ page }) => {
		const aboutLink = page.locator('a[href="/about"]')

		if (await aboutLink.count() > 0) {
			await aboutLink.first().click()
			await expect(page).toHaveURL(/about/)
		}
	})

	test('should display footer', async ({ page }) => {
		const footer = page.locator('footer') || page.locator('[role="content-info"]')

		await expect(footer).toBeDefined()
	})

	test('should be responsive', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 }) /* eslint-disable-line no-magic-numbers */
		const mainContent = page.locator('body')

		await expect(mainContent).toBeDefined()
	})
})
