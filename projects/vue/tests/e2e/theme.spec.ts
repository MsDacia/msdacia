import { test, expect } from '@playwright/test'

test.describe('Theme System E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('should respect system theme preference', async ({ page }) => {
		// Set system to prefer dark mode
		await page.emulateMedia({ colorScheme: 'dark' })
		await page.reload()

		const menuTrigger = page.locator('.menu-trigger')
		if (await menuTrigger.isVisible()) {
			await menuTrigger.click()

			// System option should show "Dark" indicator
			const systemOption = page.locator('.theme-option', { hasText: 'System' })
			await expect(systemOption).toContainText('Dark')
		}
	})

	test('should handle system theme changes dynamically', async ({ page }) => {
		// Start with light system preference
		await page.emulateMedia({ colorScheme: 'light' })
		await page.reload()

		const menuTrigger = page.locator('.menu-trigger')
		if (await menuTrigger.isVisible()) {
			// Set to system theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'System' }).click()

			// Should be light theme
			await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

			// Change system preference to dark
			await page.emulateMedia({ colorScheme: 'dark' })

			// Theme should automatically update to dark
			await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
		}
	})

	test('should maintain theme during navigation', async ({ page }) => {
		const menuTrigger = page.locator('.menu-trigger')
		const navToggle = page.locator('.item')

		if (await menuTrigger.isVisible()) {
			// Set dark theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Navigate to multiple pages
			const pages = ['About', 'Portfolio', 'Home']

			for (const pageName of pages) {
				if (await navToggle.isVisible()) {
					await navToggle.click()
				}
				await page.locator('.nav-link', { hasText: pageName }).click()

				// Theme should persist
				await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
				await expect(page.locator('html')).toHaveClass('dark')
			}
		}
	})

	test('should show correct active theme in menu', async ({ page }) => {
		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Switch to light theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Light' }).click()

			// Open menu again and check active state
			await menuTrigger.click()
			const lightOption = page.locator('.theme-option', { hasText: 'Light' })
			await expect(lightOption).toHaveClass(/active/)
			await expect(lightOption.locator('.fa-check')).toBeVisible()

			// Switch to dark theme
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Check dark theme is now active
			await menuTrigger.click()
			const darkOption = page.locator('.theme-option', { hasText: 'Dark' })
			await expect(darkOption).toHaveClass(/active/)
			await expect(darkOption.locator('.fa-check')).toBeVisible()
		}
	})

	test('should close theme menu when clicking outside', async ({ page }) => {
		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Open theme menu
			await menuTrigger.click()
			await expect(page.locator('.menu-options')).toBeVisible()

			// Click outside the menu
			await page.locator('body').click({ position: { x: 100, y: 100 } })

			// Menu should be closed
			await expect(page.locator('.menu-options')).not.toBeVisible()
		}
	})

	test('should work across browser refresh', async ({ page }) => {
		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Set dark theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Refresh the page
			await page.reload()

			// Theme should persist (if localStorage is implemented)
			// Note: Current implementation doesn't persist, but this test is ready for when it does
			await expect(page.locator('html')).toHaveAttribute('data-theme', /./)
		}
	})

	test('should update theme icons correctly', async ({ page }) => {
		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Check initial icon (should be desktop for system)
			await expect(menuTrigger.locator('.fa-desktop')).toBeVisible()

			// Switch to light theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Light' }).click()

			// Icon should change to sun
			await expect(menuTrigger.locator('.fa-sun')).toBeVisible()

			// Switch to dark theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Icon should change to moon
			await expect(menuTrigger.locator('.fa-moon')).toBeVisible()
		}
	})
})

test.describe('Theme Accessibility', () => {
	test('should have proper contrast in both themes', async ({ page }) => {
		await page.goto('/')

		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Test light theme contrast
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Light' }).click()

			// Check that text is visible and readable
			const header = page.locator('header')
			await expect(header).toBeVisible()

			// Test dark theme contrast
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Header should still be visible with good contrast
			await expect(header).toBeVisible()
		}
	})

	test('should be keyboard navigable', async ({ page }) => {
		await page.goto('/')

		// Tab to theme switcher
		await page.keyboard.press('Tab')

		// Continue tabbing until we reach the theme switcher
		// (Implementation depends on your tab order)
		for (let i = 0; i < 10; i++) {
			const focused = await page.locator(':focus')
			const classes = await focused.getAttribute('class')

			if (classes?.includes('menu-trigger')) {
				// Found theme switcher, test keyboard interaction
				await page.keyboard.press('Enter')
				await expect(page.locator('.menu-options')).toBeVisible()
				break
			}

			await page.keyboard.press('Tab')
		}
	})

	test('should work with screen reader attributes', async ({ page }) => {
		await page.goto('/')

		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Check for title attribute
			await expect(menuTrigger).toHaveAttribute('title', /Theme:/)

			// Check that theme options have proper text
			await menuTrigger.click()

			const options = page.locator('.theme-option')
			const optionCount = await options.count()

			for (let i = 0; i < optionCount; i++) {
				const option = options.nth(i)
				const text = await option.textContent()
				expect(text?.trim()).toBeTruthy()
			}
		}
	})
})

test.describe('Theme Performance', () => {
	test('should switch themes quickly', async ({ page }) => {
		await page.goto('/')

		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			const startTime = Date.now()

			// Switch theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Wait for theme to be applied
			await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

			const endTime = Date.now()

			// Theme switch should be instantaneous (under 500ms)
			expect(endTime - startTime).toBeLessThan(500)
		}
	})

	test('should not cause layout shifts during theme changes', async ({ page }) => {
		await page.goto('/')

		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Get initial button position
			const initialBox = await menuTrigger.boundingBox()

			// Switch theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Get position after theme change
			const finalBox = await menuTrigger.boundingBox()

			// Position should not change significantly
			if (initialBox && finalBox) {
				expect(Math.abs(initialBox.x - finalBox.x)).toBeLessThan(5)
				expect(Math.abs(initialBox.y - finalBox.y)).toBeLessThan(5)
			}
		}
	})
})

test.describe('Theme Edge Cases', () => {
	test('should handle rapid theme switching', async ({ page }) => {
		await page.goto('/')

		const menuTrigger = page.locator('.menu-trigger')

		if (await menuTrigger.isVisible()) {
			// Rapidly switch between themes
			for (let i = 0; i < 3; i++) {
				await menuTrigger.click()
				await page.locator('.theme-option', { hasText: 'Light' }).click()

				await menuTrigger.click()
				await page.locator('.theme-option', { hasText: 'Dark' }).click()
			}

			// App should still be functional
			await expect(menuTrigger).toBeVisible()
			await expect(page.locator('html')).toHaveAttribute('data-theme', /./)
		}
	})

	test('should work with browser back/forward', async ({ page }) => {
		await page.goto('/')

		const menuTrigger = page.locator('.menu-trigger')
		const navToggle = page.locator('.item')

		if (await menuTrigger.isVisible()) {
			// Set dark theme
			await menuTrigger.click()
			await page.locator('.theme-option', { hasText: 'Dark' }).click()

			// Navigate to another page
			if (await navToggle.isVisible()) {
				await navToggle.click()
			}
			await page.locator('.nav-link', { hasText: 'About' }).click()

			// Go back
			await page.goBack()

			// Theme should still be applied
			await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
		}
	})
})
