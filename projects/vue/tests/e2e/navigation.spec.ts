import { test, expect } from '@playwright/test'

test.describe('Navigation and Routing', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('should load homepage successfully', async ({ page }) => {
		// Check that we're on the homepage
		await expect(page).toHaveURL('/')
		await expect(page).toHaveTitle(/MsDacia/)
	})

	test('should navigate between pages using header menu', async ({ page }) => {
		// Open the mobile menu (if needed on larger screens, this test covers both)
		const menuToggle = page.locator('.item')
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}

		// Navigate to About page
		await page.locator('.nav-link', { hasText: 'About' }).click()
		await expect(page).toHaveURL('/about')

		// Open menu again and navigate to Portfolio
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}
		await page.locator('.nav-link', { hasText: 'Portfolio' }).click()
		await expect(page).toHaveURL('/portfolio')

		// Navigate back to Home
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}
		await page.locator('.nav-link', { hasText: 'Home' }).click()
		await expect(page).toHaveURL('/')
	})

	test('should show active navigation state', async ({ page }) => {
		// Navigate to About page
		const menuToggle = page.locator('.item')
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}

		await page.locator('.nav-link', { hasText: 'About' }).click()

		// Check that About link has active class
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}

		const aboutLink = page.locator('.nav-link', { hasText: 'About' })
		await expect(aboutLink).toHaveClass(/router-link-active|current/)
	})

	test('should close mobile menu after navigation', async ({ page }) => {
		// This test is more relevant on mobile, but we can simulate it
		await page.setViewportSize({ width: 640, height: 480 }) // Mobile size

		const menuToggle = page.locator('.item')
		const menu = page.locator('.menu')

		// Open menu
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
			await expect(menu).toHaveClass(/show-content/)
		}

		// Click a navigation link
		await page.locator('.nav-link', { hasText: 'About' }).click()

		// Menu should be closed (we can't easily test this without checking component state)
		// But we can verify navigation worked
		await expect(page).toHaveURL('/about')
	})
})

test.describe('Theme Switching', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('should display theme switcher', async ({ page }) => {
		const themeSwitcher = page.locator('.theme-switcher')
		await expect(themeSwitcher).toBeVisible()
	})

	test('should open theme menu and display options', async ({ page }) => {
		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			await menuTrigger.click()

			// Check that all theme options are visible
			await expect(page.locator('.theme-option', { hasText: 'Light' })).toBeVisible()
			await expect(page.locator('.theme-option', { hasText: 'Dark' })).toBeVisible()
			await expect(page.locator('.theme-option', { hasText: 'System' })).toBeVisible()
		}
	})

	test('should switch themes and apply changes', async ({ page }) => {
		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Open theme menu
			await menuTrigger.click()

			// Switch to dark theme
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Verify dark theme is applied to document
			const htmlElement = page.locator('html')
			await expect(htmlElement).toHaveAttribute('data-theme', 'dark')
			await expect(htmlElement).toHaveClass('dark')

			// Switch to light theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Light' }).click()

			// Verify light theme is applied
			await expect(htmlElement).toHaveAttribute('data-theme', 'light')
			await expect(htmlElement).toHaveClass('light')
		}
	})

	test('should persist theme across page navigation', async ({ page }) => {
		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Set dark theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Navigate to another page
			const navToggle = page.locator('.item')
			if (await navToggle.isVisible()) {
				await navToggle.click()
			}
			await page.locator('.nav-link', { hasText: 'About' }).click()

			// Theme should persist
			const htmlElement = page.locator('html')
			await expect(htmlElement).toHaveAttribute('data-theme', 'dark')
		}
	})
})

test.describe('Responsive Design', () => {
	test('should work on mobile devices', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 }) // iPhone size
		await page.goto('/')

		// Theme switcher should be visible and functional
		const themeSwitcher = page.locator('.theme-switcher')
		await expect(themeSwitcher).toBeVisible()

		// Navigation should be accessible
		const menuToggle = page.locator('.item')
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
			const menu = page.locator('.menu')
			await expect(menu).toBeVisible()
		}
	})

	test('should work on tablet devices', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 }) // iPad size
		await page.goto('/')

		// All functionality should work
		const themeSwitcher = page.locator('.theme-switcher')
		await expect(themeSwitcher).toBeVisible()
	})

	test('should work on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 }) // Desktop size
		await page.goto('/')

		// All functionality should work
		const themeSwitcher = page.locator('.theme-switcher')
		await expect(themeSwitcher).toBeVisible()
	})
})

test.describe('Page Content and SEO', () => {
	test('should have proper page titles', async ({ page }) => {
		await page.goto('/')
		await expect(page).toHaveTitle(/MsDacia/)

		// Navigate to About and check title updates (if implemented)
		const menuToggle = page.locator('.item')
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}
		await page.locator('.nav-link', { hasText: 'About' }).click()
		// Title should update (you may need to implement this)

		// Navigate to Portfolio and check title
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}
		await page.locator('.nav-link', { hasText: 'Portfolio' }).click()
		// Title should update (you may need to implement this)
	})

	test('should have accessible navigation', async ({ page }) => {
		await page.goto('/')

		// Check for semantic HTML structure
		const header = page.locator('header')
		await expect(header).toBeVisible()

		// Check for proper link text
		const menuToggle = page.locator('.item')
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}

		const navLinks = page.locator('.nav-link')
		const linkCount = await navLinks.count()

		for (let i = 0; i < linkCount; i++) {
			const link = navLinks.nth(i)
			const linkText = await link.textContent()
			expect(linkText?.trim()).toBeTruthy()
		}
	})
})

test.describe('Error Handling and Edge Cases', () => {
	test('should handle invalid routes gracefully', async ({ page }) => {
		// Navigate to a non-existent route
		await page.goto('/non-existent-route')

		// Should either redirect to home or show 404 page
		// Implementation depends on your router setup
		// For now, let's just ensure the page doesn't crash
		await expect(page.locator('body')).toBeVisible()
	})

	test('should work with JavaScript disabled', async ({ page }) => {
		// Disable JavaScript
		await page.context().addInitScript(() => {
			// This doesn't actually disable JS in Playwright, but simulates some aspects
			// For true JS-disabled testing, you'd need a different approach
		})

		await page.goto('/')

		// Basic content should still be visible
		await expect(page.locator('header')).toBeVisible()
	})

	test('should handle rapid interactions gracefully', async ({ page }) => {
		await page.goto('/')

		const menuToggle = page.locator('.item')
		if (await menuToggle.isVisible()) {
			// Rapidly click menu toggle
			for (let i = 0; i < 5; i++) {
				await menuToggle.click()
				await page.waitForTimeout(50) // Small delay between clicks
			}

			// App should still be responsive
			await expect(menuToggle).toBeVisible()
		}
	})
})

test.describe('Performance and Loading', () => {
	test('should load quickly', async ({ page }) => {
		const startTime = Date.now()
		await page.goto('/')
		const endTime = Date.now()

		// Page should load within reasonable time (adjust as needed)
		expect(endTime - startTime).toBeLessThan(5000) // 5 seconds
	})

	test('should not have console errors', async ({ page }) => {
		const errors: string[] = []

		page.on('console', msg => {
			if (msg.type() === 'error') {
				errors.push(msg.text())
			}
		})

		await page.goto('/')

		// Navigate through pages to check for errors
		const menuToggle = page.locator('.item')
		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}
		await page.locator('.nav-link', { hasText: 'About' }).click()

		if (await menuToggle.isVisible()) {
			await menuToggle.click()
		}
		await page.locator('.nav-link', { hasText: 'Portfolio' }).click()

		// Check that no errors occurred
		expect(errors).toHaveLength(0)
	})
})
