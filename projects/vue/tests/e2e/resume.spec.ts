import { test, expect } from '@playwright/test'

test.describe('Resume Page E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/resume')
	})

	test.describe('Page Loading and Content', () => {
		test('should load resume page successfully', async ({ page }) => {
			await expect(page).toHaveURL('/resume')
			await expect(page).toHaveTitle(/Ms Dacia/)
			await expect(page.locator('h1')).toBeVisible()
		})

		test('should display the resume content sections', async ({ page }) => {
			await expect(page.locator('[data-test="resume"]')).toBeVisible()
			await expect(page.locator('[data-test="resume-objective"]')).toBeVisible()
			await expect(page.locator('[data-test="resume-skills"]')).toBeVisible()
			await expect(page.locator('[data-test="resume-projects"]')).toBeVisible()
			await expect(page.locator('[data-test="resume-education"]')).toBeVisible()
		})

		test('should display contact links in the header', async ({ page }) => {
			await expect(page.locator('[data-test="resume-contact"] a[href^="mailto:"]')).toBeVisible()
			await expect(page.locator('[data-test="resume-contact"] a[href^="http"]')).toHaveCount(2)
		})

		test('should render the shared experience timeline', async ({ page }) => {
			await expect(page.locator('[data-test="experience-timeline"]')).toBeVisible()
		})

		test('should not offer a downloadable PDF resume', async ({ page }) => {
			await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0)

			const downloadLinks = page.locator('a[download]')
			await expect(downloadLinks).toHaveCount(0)
		})
	})

	test.describe('Navigation Integration', () => {
		test('should be accessible from header navigation', async ({ page }) => {
			await page.goto('/')

			const menuToggle = page.locator('[data-test="menu-toggle"]')
			if (await menuToggle.isVisible()) {
				await menuToggle.click()
				await page.locator('[data-test="nav-link"]', { hasText: 'Resume' }).click()
				await expect(page).toHaveURL('/resume')
			}
		})

		test('should show active state in navigation', async ({ page }) => {
			const menuToggle = page.locator('[data-test="menu-toggle"]')
			if (await menuToggle.isVisible()) {
				await menuToggle.click()

				const resumeLink = page.locator('[data-test="nav-link"]', { hasText: 'Resume' })
				await expect(resumeLink).toHaveClass(/router-link-active|current/)
			}
		})
	})

	test.describe('External Links', () => {
		test('should open project links in a new tab', async ({ page }) => {
			const externalLinks = page.locator('[data-test="resume-projects"] a[href^="http"]')
			const linkCount = await externalLinks.count()

			expect(linkCount).toBeGreaterThan(0)

			for (let i = 0; i < linkCount; i++) {
				await expect(externalLinks.nth(i)).toHaveAttribute('target', '_blank')
			}
		})
	})
})
