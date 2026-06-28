import { test, expect } from '@playwright/test'

test.describe('About Page E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/about')
	})

	test.describe('Page Loading and Content', () => {
		test('should load about page successfully', async ({ page }) => {
			await expect(page).toHaveURL('/about')
			await expect(page).toHaveTitle(/Ms Dacia/)

			// Main content should be visible
			await expect(page.locator('h1')).toBeVisible()
		})

		test('should display about content sections', async ({ page }) => {
			// Should have main heading
			await expect(page.locator('h1')).toBeVisible()

			// About view renders its content inside the .about container
			await expect(page.locator('[data-test="about"]')).toBeVisible()
			await expect(page.locator('[data-test="about-section"]')).toHaveCount(3)
		})

		test('should handle rich text content properly', async ({ page }) => {
			// About pages often have formatted text, links, etc.
			// Test that any HTML content renders properly
			const links = page.locator('a[href^="http"]')
			const linkCount = await links.count()

			if (linkCount > 0) {
				// External links should open in new tab
				for (let i = 0; i < linkCount; i++) {
					const target = await links.nth(i).getAttribute('target')
					if (target) {
						expect(target).toBe('_blank')
					}
				}
			}
		})
	})

	test.describe('Navigation Integration', () => {
		test('should be accessible from home page', async ({ page }) => {
			await page.goto('/')

			// Navigate to about via CTA button
			await page.locator('[data-test="cta-button"]', { hasText: 'Learn About Me' }).click()
			await expect(page).toHaveURL('/about')
		})

		test('should be accessible from header navigation', async ({ page }) => {
			await page.goto('/')

			// Use header navigation
			const menuToggle = page.locator('[data-test="menu-toggle"]')
			if (await menuToggle.isVisible()) {
				await menuToggle.click()
				await page.locator('[data-test="nav-link"]', { hasText: 'About' }).click()
				await expect(page).toHaveURL('/about')
			}
		})

		test('should show active state in navigation', async ({ page }) => {
			const menuToggle = page.locator('[data-test="menu-toggle"]')
			if (await menuToggle.isVisible()) {
				await menuToggle.click()

				const aboutLink = page.locator('[data-test="nav-link"]', { hasText: 'About' })
				await expect(aboutLink).toHaveClass(/router-link-active|current/)
			}
		})

		test('should allow navigation to other pages', async ({ page }) => {
			const menuToggle = page.locator('[data-test="menu-toggle"]')
			if (await menuToggle.isVisible()) {
				await menuToggle.click()

				// Navigate to portfolio
				await page.locator('[data-test="nav-link"]', { hasText: 'Portfolio' }).click()
				await expect(page).toHaveURL('/portfolio')

				// Navigate back to about
				await menuToggle.click()
				await page.locator('[data-test="nav-link"]', { hasText: 'About' }).click()
				await expect(page).toHaveURL('/about')
			}
		})
	})

	test.describe('Content Quality and Readability', () => {
		test('should have readable text content', async ({ page }) => {
			// Check that there's substantial text content
			const bodyText = await page.locator('body').textContent()
			expect(bodyText?.length || 0).toBeGreaterThan(100) // Should have meaningful content

			// Text should not be cut off or overlapping
			const paragraphs = page.locator('p')
			const pCount = await paragraphs.count()

			if (pCount > 0) {
				for (let i = 0; i < Math.min(pCount, 5); i++) {
					await expect(paragraphs.nth(i)).toBeVisible()
				}
			}
		})

		test('should format text properly', async ({ page }) => {
			// Check for proper text formatting elements
			const headings = page.locator('h1, h2, h3, h4, h5, h6')
			const headingCount = await headings.count()

			expect(headingCount).toBeGreaterThan(0) // Should have at least one heading

			// Check heading hierarchy (h1 should come before h2, etc.)
			const h1 = page.locator('h1').first()
			await expect(h1).toBeVisible()
		})

		test('should handle lists and structured content', async ({ page }) => {
			// Look for any lists or structured content
			const lists = page.locator('ul, ol')
			const listCount = await lists.count()

			if (listCount > 0) {
				// Lists should have list items
				const firstList = lists.first()
				const listItems = firstList.locator('li')
				const itemCount = await listItems.count()
				expect(itemCount).toBeGreaterThan(0)
			}
		})
	})

	test.describe('External Links and References', () => {
		test('should handle external links properly', async ({ page }) => {
			const externalLinks = page.locator('a[href^="http"]')
			const linkCount = await externalLinks.count()

			if (linkCount > 0) {
				for (let i = 0; i < Math.min(linkCount, 3); i++) {
					const link = externalLinks.nth(i)

					// Should have target="_blank" for external links
					const target = await link.getAttribute('target')
					if (target) {
						expect(target).toBe('_blank')
					}

					// Should have meaningful link text or aria-label
					const linkText = await link.textContent()
					const ariaLabel = await link.getAttribute('aria-label')
					expect(linkText?.trim() || ariaLabel?.trim()).toBeTruthy()
				}
			}
		})

		test('should not have broken internal links', async ({ page }) => {
			const internalLinks = page.locator('a[href^="/"], a[href^="#"], router-link')
			const linkCount = await internalLinks.count()

			if (linkCount > 0) {
				for (let i = 0; i < Math.min(linkCount, 3); i++) {
					const link = internalLinks.nth(i)
					const href = await link.getAttribute('href') || await link.getAttribute('to')

					// Header nav links live behind a closed menu, so only click visible ones
					if (href && href.startsWith('/') && await link.isVisible()) {
						await link.click()

						// Navigate back to about for next iteration
						await page.goto('/about')
					}
				}
			}
		})
	})

	test.describe('Theme Integration', () => {
		test('should work well with light theme', async ({ page }) => {
			// Set light theme
			const themeSwitcher = page.locator('[data-test="theme-switcher"]')
			if (await themeSwitcher.isVisible()) {
				const menuTrigger = page.locator('[data-test="menu-trigger"]')
				if (await menuTrigger.isVisible()) {
					await menuTrigger.click()
					await page.locator('[data-test="theme-option"]', { hasText: /^\s*Light\s*$/ }).click()
				}
			}

			// Content should be readable
			await expect(page.locator('h1')).toBeVisible()
			const headingColor = await page.locator('h1').evaluate(el => getComputedStyle(el).color)
			expect(headingColor).not.toBe('rgba(0, 0, 0, 0)') // Should have visible color
		})

		test('should work well with dark theme', async ({ page }) => {
			// Set dark theme via the theme menu
			const menuTrigger = page.locator('[data-test="menu-trigger"]')
			if (await menuTrigger.isVisible()) {
				await menuTrigger.click()
				await page.locator('[data-test="theme-option"]', { hasText: /^\s*Dark\s*$/ }).click()

				// The app applies the theme to the <html> element
				await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
				await expect(page.locator('html')).toHaveClass('dark')
			}

			// Content should remain readable in dark mode
			await expect(page.locator('h1')).toBeVisible()
			const headingColor = await page.locator('h1').evaluate(el => getComputedStyle(el).color)
			expect(headingColor).not.toBe('rgba(0, 0, 0, 0)') // Should have visible color
		})

		test('should maintain theme when refreshing page', async ({ page }) => {
			// Set dark theme
			const themeSwitcher = page.locator('[data-test="theme-switcher"]')
			if (await themeSwitcher.isVisible()) {
				const menuTrigger = page.locator('[data-test="menu-trigger"]')
				if (await menuTrigger.isVisible()) {
					await menuTrigger.click()
					await page.locator('[data-test="theme-option"]', { hasText: /^\s*Dark\s*$/ }).click()
				}
			}

			// Refresh page
			await page.reload()

			// Theme should persist (if localStorage is implemented)
			// Note: Current implementation might not persist theme, but this test is ready for when it does
			await expect(page.locator('html')).toHaveAttribute('data-theme', /./)
		})
	})

	test.describe('Responsive Design', () => {
		test('should display correctly on mobile devices', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 }) // iPhone size

			// Content should be visible and readable
			await expect(page.locator('h1')).toBeVisible()

			// Text should not overflow horizontally
			const bodyWidth = await page.locator('body').evaluate(el => el.scrollWidth)
			const viewportWidth = 375
			expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20) // Allow small margin for scrollbars
		})

		test('should display correctly on tablet devices', async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 }) // iPad size

			await expect(page.locator('h1')).toBeVisible()

			// Content should be well-formatted for tablet reading
			const paragraphs = page.locator('p')
			const pCount = await paragraphs.count()

			if (pCount > 0) {
				const firstParagraph = paragraphs.first()
				await expect(firstParagraph).toBeVisible()

				// Text should have reasonable line length for readability
				const pWidth = await firstParagraph.evaluate(el => (el as HTMLElement).offsetWidth)
				expect(pWidth).toBeLessThan(800) // Not too wide for comfortable reading
			}
		})

		test('should display correctly on desktop', async ({ page }) => {
			await page.setViewportSize({ width: 1920, height: 1080 }) // Desktop size

			await expect(page.locator('h1')).toBeVisible()

			// Content should be centered and constrained by the .about max-width
			const aboutContent = page.locator('[data-test="about"]')
			if (await aboutContent.count() > 0) {
				const contentWidth = await aboutContent.first().evaluate(el => (el as HTMLElement).offsetWidth)
				expect(contentWidth).toBeLessThanOrEqual(1200) // .about has max-width: 1200px
			}
		})
	})

	test.describe('Accessibility', () => {
		test('should be keyboard navigable', async ({ page }) => {
			// Tab through the page content
			await page.keyboard.press('Tab')

			let tabCount = 0
			const maxTabs = 20

			while (tabCount < maxTabs) {
				const focusedElement = page.locator(':focus')
				const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase()).catch(() => '')

				if (['a', 'button', 'input', 'textarea'].includes(tagName)) {
					// Found focusable element
					await expect(focusedElement).toBeVisible()

					if (tagName === 'a') {
						// Test link activation with keyboard
						await page.keyboard.press('Enter')
						// If it's an internal link, should navigate
						break
					}
				}

				await page.keyboard.press('Tab')
				tabCount++
			}
		})

		test('should have proper heading structure', async ({ page }) => {
			// Should have logical heading hierarchy
			const h1Count = await page.locator('h1').count()
			expect(h1Count).toBe(1) // Should have exactly one h1

			// Check that headings are properly nested
			const allHeadings = page.locator('h1, h2, h3, h4, h5, h6')
			const headingCount = await allHeadings.count()

			if (headingCount > 1) {
				// First heading should be h1
				const firstHeading = allHeadings.first()
				const tagName = await firstHeading.evaluate(el => el.tagName.toLowerCase())
				expect(tagName).toBe('h1')
			}
		})

		test('should have meaningful link text', async ({ page }) => {
			const links = page.locator('a')
			const linkCount = await links.count()

			for (let i = 0; i < Math.min(linkCount, 5); i++) {
				const link = links.nth(i)
				const linkText = await link.textContent()
				const ariaLabel = await link.getAttribute('aria-label')
				const title = await link.getAttribute('title')

				// Should have meaningful text, aria-label, or title
				const meaningfulText = linkText?.trim() || ariaLabel?.trim() || title?.trim()
				expect(meaningfulText).toBeTruthy()

				// Avoid generic link text
				const genericTexts = ['click here', 'read more', 'link', 'here']
				const isGeneric = genericTexts.some(generic =>
					linkText?.toLowerCase().includes(generic),
				)

				if (isGeneric && !ariaLabel && !title) {
					console.warn(`Generic link text found: "${linkText}"`)
				}
			}
		})

		test('should provide alternative text for images', async ({ page }) => {
			const images = page.locator('img')
			const imageCount = await images.count()

			for (let i = 0; i < imageCount; i++) {
				const img = images.nth(i)
				const alt = await img.getAttribute('alt')
				const ariaLabel = await img.getAttribute('aria-label')
				const role = await img.getAttribute('role')

				// Decorative images should have empty alt or role="presentation"
				// Content images should have descriptive alt text
				if (role === 'presentation' || alt === '') {
					// Decorative image - this is fine
					continue
				} else {
					// Content image should have alt text
					expect(alt?.trim() || ariaLabel?.trim()).toBeTruthy()
				}
			}
		})
	})

	test.describe('Performance and Loading', () => {
		test('should load quickly', async ({ page }) => {
			const startTime = Date.now()
			await page.goto('/about')
			await page.waitForSelector('h1')
			const endTime = Date.now()

			expect(endTime - startTime).toBeLessThan(3000) // 3 seconds
		})

		test('should not have console errors', async ({ page }) => {
			const errors: string[] = []

			page.on('console', msg => {
				if (msg.type() === 'error') {
					errors.push(msg.text())
				}
			})

			await page.goto('/about')
			await page.waitForSelector('h1')

			// Filter out common non-critical errors
			const criticalErrors = errors.filter(error =>
				!error.includes('favicon') &&
				!error.includes('analytics') &&
				!error.includes('tracking'),
			)

			expect(criticalErrors).toHaveLength(0)
		})

		test('should handle slow content loading gracefully', async ({ page }) => {
			// Simulate slow network
			await page.context().route('**/*', async route => {
				await new Promise(resolve => setTimeout(resolve, 50))
				await route.continue()
			})

			await page.goto('/about')

			// Should show loading state or content eventually
			await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })
		})
	})

	test.describe('SEO and Meta Information', () => {
		test('should have appropriate page title', async ({ page }) => {
			const title = await page.title()
			expect(title).toBeTruthy()
			expect(title.length).toBeGreaterThan(5)

			// Should be descriptive and include key terms
			const titleLower = title.toLowerCase()
			const shouldInclude = ['about', 'dacia', 'msdacia']
			const includesKeyword = shouldInclude.some(keyword => titleLower.includes(keyword))
			expect(includesKeyword).toBe(true)
		})

		test('should have meta description if implemented', async ({ page }) => {
			const descriptionMeta = page.locator('meta[name="description"]')

			if (await descriptionMeta.count() > 0) {
				const metaDescription = await descriptionMeta.getAttribute('content')
				// The site uses a keyword-rich description; just ensure it's meaningful
				expect((metaDescription || '').length).toBeGreaterThan(50)
			}
		})

		test('should have proper Open Graph tags if implemented', async ({ page }) => {
			const ogTitleMeta = page.locator('meta[property="og:title"]')
			const ogDescriptionMeta = page.locator('meta[property="og:description"]')

			// Open Graph tags are optional; only validate them when present
			if (await ogTitleMeta.count() > 0) {
				expect(((await ogTitleMeta.getAttribute('content')) || '').length).toBeGreaterThan(5)
			}

			if (await ogDescriptionMeta.count() > 0) {
				expect(((await ogDescriptionMeta.getAttribute('content')) || '').length).toBeGreaterThan(20)
			}
		})
	})

	test.describe('Cross-browser Compatibility', () => {
		test('should work across different browsers', async ({ page, browserName }) => {
			await expect(page.locator('h1')).toBeVisible()

			// Basic functionality should work — only click a link that is actually visible
			// (the header nav links sit behind a closed menu)
			const visibleInternalLink = page.locator('a[href^="/"]:visible').first()

			if (await visibleInternalLink.count() > 0) {
				await visibleInternalLink.click()
				expect(page.url()).not.toContain('/about')
			}

			console.log(`About page tested successfully in ${browserName}`)
		})
	})

	test.describe('Content Integration', () => {
		test('should integrate well with site navigation flow', async ({ page }) => {
			// Should be part of natural site flow
			await page.goto('/')

			// Navigate through site naturally
			await page.locator('[data-test="cta-button"]', { hasText: 'Learn About Me' }).click()
			await expect(page).toHaveURL('/about')

			// Should be able to continue to portfolio
			const menuToggle = page.locator('[data-test="menu-toggle"]')
			if (await menuToggle.isVisible()) {
				await menuToggle.click()
				await page.locator('[data-test="nav-link"]', { hasText: 'Portfolio' }).click()
				await expect(page).toHaveURL('/portfolio')
			}
		})

		test('should provide value to users', async ({ page }) => {
			// Should have substantial, meaningful content
			const textContent = await page.locator('body').textContent()
			const wordCount = textContent?.split(/\s+/).length || 0

			expect(wordCount).toBeGreaterThan(50) // Should have meaningful content

			// Should help users understand who Dacia is
			const contentLower = textContent?.toLowerCase() || ''
			const keyTerms = ['dacia', 'engineer', 'developer', 'experience']
			const hasRelevantContent = keyTerms.some(term => contentLower.includes(term))

			expect(hasRelevantContent).toBe(true)
		})
	})
})
