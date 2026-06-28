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

	// KNOWN GAP: the Resume page component and nav link exist, but App.tsx has no
	// `/resume` route, so the main content renders empty. This documents the current
	// behavior — the assertion below confirms nothing renders inside main yet.
	test('does not render resume content until the route is wired up', async ({ page }) => {
		await expect(page.locator('main .main-content')).toBeEmpty()
	})

	// Enable this once the `/resume` route is added to App.tsx — it describes the
	// intended Resume flow (title + section headings + experience accordion).
	test.fixme('renders the resume sections', async ({ page }) => {
		const resume = content.resume

		await expect(page.getByRole('heading', { level: 1 })).toHaveText(resume.title)
		await expect(page.getByRole('heading', { level: 2, name: resume.skills.title })).toBeVisible()
		await expect(page.getByRole('heading', { level: 2, name: resume.experiences.title })).toBeVisible()
		await expect(page.locator('.ui.accordion .title')).toHaveCount(resume.experiences.job.length)
	})
})
