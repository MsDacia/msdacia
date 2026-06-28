import { expect, test } from '@playwright/test'

import content from '../../src/media/json/static.en-us.json'

test.describe('Resume Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/resume')
	})

	test('keeps the app chrome on the resume route', async ({ page }) => {
		await expect(page).toHaveURL(/\/resume$/)
		await expect(page.locator('header')).toBeVisible()
		await expect(page.locator('footer')).toBeVisible()
	})

	test('renders the resume sections', async ({ page }) => {
		const resume = content.resume

		await expect(page.getByRole('heading', { level: 1 })).toHaveText(resume.title)
		await expect(page.getByRole('heading', { level: 2, name: resume.skills.title })).toBeVisible()
		await expect(page.getByRole('heading', { level: 2, name: resume.experiences.title })).toBeVisible()
		await expect(page.locator('.ui.accordion .title')).toHaveCount(resume.experiences.job.length)
	})
})
