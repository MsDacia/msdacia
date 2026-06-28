import { expect, test } from '@playwright/test'

import content from '../../src/media/json/static.en-us.json'

const global = content.common.global

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('loads with the site title', async ({ page }) => {
		await expect(page).toHaveTitle(global.title)
	})

	test('renders the header, main content and footer', async ({ page }) => {
		await expect(page.locator('header')).toBeVisible()
		await expect(page.locator('main .main-content.home')).toBeVisible()
		await expect(page.locator('footer')).toBeVisible()
	})

	test('renders the prefixed name and tagline', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${global.prefix}${global.name}`)
		await expect(page.locator('.copy')).toContainText(global.tagline)
	})

	test('shows every navigation link on a desktop viewport', async ({ page }) => {
		const links = page.locator('header .menu a')

		await expect(links).toHaveCount(content.common.navigation.length)
		await expect(links.first()).toBeVisible()
	})

	test('toggles the inverted color theme', async ({ page }) => {
		// The eyedropper renders as a zero-size <i> because the Semantic UI icon font is
		// not loaded, so dispatch the click event directly to exercise the toggle handler.
		const eyedropper = page.locator('header i.eyedropper.icon')

		await expect(page.locator('body')).not.toHaveClass(/light/)
		await eyedropper.dispatchEvent('click')
		await expect(page.locator('body')).toHaveClass(/light/)
		await eyedropper.dispatchEvent('click')
		await expect(page.locator('body')).not.toHaveClass(/light/)
	})

	test('toggles the collapsible menu on a mobile viewport', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 700 }) /* eslint-disable-line no-magic-numbers */
		await page.goto('/')

		const menu = page.locator('header .menu')

		await expect(menu).toBeHidden()
		await page.locator('header .item').click()
		await expect(menu).toBeVisible()
		await expect(menu.locator('a')).toHaveCount(content.common.navigation.length)
	})
})
