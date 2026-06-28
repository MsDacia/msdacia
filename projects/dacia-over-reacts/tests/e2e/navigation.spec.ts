import {
	expect, Page, test,
} from '@playwright/test'

import content from '../../src/media/json/static.en-us.json'

const navigation = content.common.navigation

// On a desktop viewport the menu links are always visible, so navigate by clicking
// the anchor directly. Each link is a plain <a href>, which triggers a full load.
const navigateTo = (page: Page, title: string) =>
	page.locator('header .menu a', { hasText: title }).click()

test.describe('Site Navigation', () => {
	test('exposes every navigation link with the correct href', async ({ page }) => {
		await page.goto('/')

		const links = page.locator('header .menu a')

		await expect(links).toHaveCount(navigation.length)
		for (const item of navigation) {
			await expect(page.locator('header .menu a', { hasText: item.title })).toHaveAttribute('href', item.path)
		}
	})

	test('navigates from home to about', async ({ page }) => {
		await page.goto('/')
		await navigateTo(page, 'About')

		await expect(page).toHaveURL(/\/about$/)
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(content.about.title)
	})

	test('navigates from home to portfolio', async ({ page }) => {
		await page.goto('/')
		await navigateTo(page, 'Portfolio')

		await expect(page).toHaveURL(/\/portfolio$/)
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(content.portfolio.title)
	})

	test('navigates back home from another page', async ({ page }) => {
		await page.goto('/about')
		await navigateTo(page, 'Home')

		await expect(page).toHaveURL(/:5176\/$/)
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${content.common.global.prefix}${content.common.global.name}`)
	})
})
