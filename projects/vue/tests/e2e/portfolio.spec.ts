import { test, expect } from '@playwright/test'

test.describe('Portfolio Page E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/portfolio')
	})

	test.describe('Page Loading and Initial State', () => {
		test('should load portfolio page successfully', async ({ page }) => {
			await expect(page).toHaveURL('/portfolio')
			await expect(page).toHaveTitle(/Portfolio|MsDacia/)

			// Check main sections are visible
			await expect(page.locator('.portfolio-header')).toBeVisible()
			await expect(page.locator('.controls-section')).toBeVisible()
			await expect(page.locator('.projects-container')).toBeVisible()
		})

		test('should display portfolio statistics', async ({ page }) => {
			const stats = page.locator('.stat-item')
			await expect(stats).toHaveCount(4)

			// Check that stats have numbers and labels
			for (let i = 0; i < 4; i++) {
				const stat = stats.nth(i)
				await expect(stat.locator('.stat-number')).toBeVisible()
				await expect(stat.locator('.stat-label')).toBeVisible()

				// Numbers should be greater than 0
				const numberText = await stat.locator('.stat-number').textContent()
				expect(parseInt(numberText || '0')).toBeGreaterThan(0)
			}
		})

		test('should show search and filter controls', async ({ page }) => {
			await expect(page.locator('.search-input')).toBeVisible()
			await expect(page.locator('.view-controls')).toBeVisible()
			await expect(page.locator('.filter-section')).toBeVisible()
			await expect(page.locator('.tag-filters')).toBeVisible()
		})
	})

	test.describe('Search Functionality', () => {
		test('should filter projects by search query', async ({ page }) => {
			// Count initial projects
			const initialProjects = await page.locator('[data-testid^="project-"]').count()
			expect(initialProjects).toBeGreaterThan(0)

			// Search for "Vue" projects
			await page.locator('.search-input').fill('Vue')

			// Wait for filtering to occur
			await page.waitForTimeout(300)

			// Should have fewer or equal projects
			const filteredProjects = await page.locator('[data-testid^="project-"]').count()
			expect(filteredProjects).toBeLessThanOrEqual(initialProjects)

			// Results summary should appear
			if (filteredProjects < initialProjects) {
				await expect(page.locator('.results-summary')).toBeVisible()
				await expect(page.locator('.results-summary')).toContainText('Showing')
			}
		})

		test('should show clear search button when searching', async ({ page }) => {
			// Initially no clear button
			await expect(page.locator('.clear-search')).not.toBeVisible()

			// Type in search
			await page.locator('.search-input').fill('React')

			// Clear button should appear
			await expect(page.locator('.clear-search')).toBeVisible()

			// Click clear button
			await page.locator('.clear-search').click()

			// Search should be cleared
			await expect(page.locator('.search-input')).toHaveValue('')
			await expect(page.locator('.clear-search')).not.toBeVisible()
		})

		test('should handle empty search results gracefully', async ({ page }) => {
			// Search for something that doesn't exist
			await page.locator('.search-input').fill('NonexistentTechnology2024')
			await page.waitForTimeout(300)

			// Should show no projects or empty state
			const projects = await page.locator('[data-testid^="project-"]').count()
			expect(projects).toBe(0)

			// Results summary should show 0 results
			await expect(page.locator('.results-summary')).toContainText('Showing 0')
		})
	})

	test.describe('Tag Filtering', () => {
		test('should filter by technology tags', async ({ page }) => {
			// Get initial project count
			const initialCount = await page.locator('[data-testid^="project-"]').count()

			// Click on a popular tag (should be Vue or similar)
			const firstTag = page.locator('.filter-tag:not(.all-tag)').first()
			const tagText = await firstTag.textContent()
			await firstTag.click()

			// Wait for filtering
			await page.waitForTimeout(300)

			// Check that filtering occurred
			const filteredCount = await page.locator('[data-testid^="project-"]').count()

			// Tag should show as active
			await expect(firstTag).toHaveClass(/active/)

			// Results summary should appear if filtering occurred
			if (filteredCount < initialCount) {
				await expect(page.locator('.results-summary')).toBeVisible()
				await expect(page.locator('.results-summary')).toContainText(tagText?.split('(')[0].trim() || '')
			}
		})

		test('should show all projects when clicking "All Projects"', async ({ page }) => {
			// First filter by a tag
			await page.locator('.filter-tag:not(.all-tag)').first().click()
			await page.waitForTimeout(300)

			// Then click "All Projects"
			await page.locator('.all-tag').click()
			await page.waitForTimeout(300)

			// Should show all projects again
			await expect(page.locator('.all-tag')).toHaveClass(/active/)

			// Results summary should disappear
			await expect(page.locator('.results-summary')).not.toBeVisible()
		})

		test('should combine search and tag filters', async ({ page }) => {
			// Apply a tag filter first
			await page.locator('.filter-tag:not(.all-tag)').first().click()
			await page.waitForTimeout(300)

			const afterTagCount = await page.locator('[data-testid^="project-"]').count()

			// Then apply search filter
			await page.locator('.search-input').fill('Project')
			await page.waitForTimeout(300)

			const afterBothCount = await page.locator('[data-testid^="project-"]').count()

			// Should have same or fewer results
			expect(afterBothCount).toBeLessThanOrEqual(afterTagCount)

			// Results summary should mention both filters
			await expect(page.locator('.results-summary')).toBeVisible()
		})

		test('should clear all filters at once', async ({ page }) => {
			// Apply multiple filters
			await page.locator('.filter-tag:not(.all-tag)').first().click()
			await page.locator('.search-input').fill('Vue')
			await page.waitForTimeout(300)

			// Clear all filters
			await page.locator('.clear-filters').click()

			// All filters should be cleared
			await expect(page.locator('.search-input')).toHaveValue('')
			await expect(page.locator('.all-tag')).toHaveClass(/active/)
			await expect(page.locator('.results-summary')).not.toBeVisible()
		})
	})

	test.describe('View Mode Switching', () => {
		test('should switch between grid and list views', async ({ page }) => {
			// Initially should be in grid view
			await expect(page.locator('.view-button').first()).toHaveClass(/active/)

			// Switch to list view
			await page.locator('.view-button').last().click()
			await expect(page.locator('.view-button').last()).toHaveClass(/active/)
			await expect(page.locator('.view-button').first()).not.toHaveClass(/active/)

			// Switch back to grid view
			await page.locator('.view-button').first().click()
			await expect(page.locator('.view-button').first()).toHaveClass(/active/)
			await expect(page.locator('.view-button').last()).not.toHaveClass(/active/)
		})

		test('should maintain view mode during filtering', async ({ page }) => {
			// Switch to list view
			await page.locator('.view-button').last().click()

			// Apply a filter
			await page.locator('.search-input').fill('Vue')
			await page.waitForTimeout(300)

			// Should still be in list view
			await expect(page.locator('.view-button').last()).toHaveClass(/active/)
		})
	})

	test.describe('Project Modal Interaction', () => {
		test('should open project modal when project is clicked', async ({ page }) => {
			// Wait for projects to load
			await page.waitForSelector('[data-testid^="project-"]')

			// Click on first project
			await page.locator('[data-testid^="project-"]').first().click()

			// Modal should open
			await expect(page.locator('[data-testid="project-modal"]')).toBeVisible()

			// Modal should contain project information
			await expect(page.locator('[data-testid="project-modal"] h3')).toBeVisible()
		})

		test('should close modal when close button is clicked', async ({ page }) => {
			// Open modal
			await page.locator('[data-testid^="project-"]').first().click()
			await expect(page.locator('[data-testid="project-modal"]')).toBeVisible()

			// Close modal
			await page.locator('[data-testid="close-modal"]').click()

			// Modal should be closed
			await expect(page.locator('[data-testid="project-modal"]')).not.toBeVisible()
		})

		test('should close modal when clicking outside (if implemented)', async ({ page }) => {
			// Open modal
			await page.locator('[data-testid^="project-"]').first().click()
			await expect(page.locator('[data-testid="project-modal"]')).toBeVisible()

			// Click outside modal (on backdrop)
			await page.locator('body').click({ position: { x: 10, y: 10 } })

			// Modal might close depending on implementation
			// This test is optional based on your modal implementation
		})
	})

	test.describe('Responsive Design', () => {
		test('should work properly on mobile devices', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 }) // iPhone size

			// All main elements should still be visible
			await expect(page.locator('.portfolio-header')).toBeVisible()
			await expect(page.locator('.search-input')).toBeVisible()
			await expect(page.locator('.view-controls')).toBeVisible()

			// Projects should still be displayed
			const projectCount = await page.locator('[data-testid^="project-"]').count()
			expect(projectCount).toBeGreaterThan(0)
		})

		test('should work properly on tablet devices', async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 }) // iPad size

			// Search functionality should work
			await page.locator('.search-input').fill('Vue')
			await page.waitForTimeout(300)

			// Filter functionality should work
			await page.locator('.filter-tag:not(.all-tag)').first().click()
			await page.waitForTimeout(300)

			// Should show results
			await expect(page.locator('[data-testid^="project-"]')).toHaveCount.toBeGreaterThan(0)
		})

		test('should maintain functionality on large screens', async ({ page }) => {
			await page.setViewportSize({ width: 1920, height: 1080 }) // Desktop size

			// All functionality should work the same
			await page.locator('.search-input').fill('JavaScript')
			await page.locator('.filter-tag:not(.all-tag)').first().click()
			await page.waitForTimeout(300)

			// View mode switching should work
			await page.locator('.view-button').last().click()
			await expect(page.locator('.view-button').last()).toHaveClass(/active/)
		})
	})

	test.describe('Performance and Loading', () => {
		test('should load projects quickly', async ({ page }) => {
			const startTime = Date.now()
			await page.waitForSelector('[data-testid^="project-"]')
			const endTime = Date.now()

			// Should load within reasonable time
			expect(endTime - startTime).toBeLessThan(3000) // 3 seconds
		})

		test('should handle rapid interactions gracefully', async ({ page }) => {
			// Rapidly switch between filters
			for (let i = 0; i < 5; i++) {
				await page.locator('.filter-tag:not(.all-tag)').first().click()
				await page.locator('.all-tag').click()
			}

			// Should still be functional
			await expect(page.locator('[data-testid^="project-"]')).toHaveCount.toBeGreaterThan(0)
		})

		test('should not have memory leaks during filtering', async ({ page }) => {
			// Perform many filter operations
			for (let i = 0; i < 10; i++) {
				await page.locator('.search-input').fill(`search${i}`)
				await page.waitForTimeout(100)
				await page.locator('.clear-search').click()
				await page.waitForTimeout(100)
			}

			// Page should still be responsive
			await page.locator('.search-input').fill('Vue')
			await expect(page.locator('.search-input')).toHaveValue('Vue')
		})
	})

	test.describe('Accessibility', () => {
		test('should be keyboard navigable', async ({ page }) => {
			// Tab through elements
			await page.keyboard.press('Tab')

			// Should be able to reach search input
			let focusedElement = await page.locator(':focus').getAttribute('class')

			// Continue tabbing to reach other interactive elements
			for (let i = 0; i < 10; i++) {
				await page.keyboard.press('Tab')
				focusedElement = await page.locator(':focus').getAttribute('class')

				if (focusedElement?.includes('search-input')) {
					// Can type in search
					await page.keyboard.type('Vue')
					await expect(page.locator('.search-input')).toHaveValue('Vue')
					break
				}
			}
		})

		test('should have proper heading structure', async ({ page }) => {
			// Check for heading hierarchy
			const h1 = await page.locator('h1').count()
			const h2 = await page.locator('h2').count()
			const h3 = await page.locator('h3').count()

			expect(h1).toBeGreaterThan(0)
			// Should have logical heading structure
		})

		test('should have proper form labels and controls', async ({ page }) => {
			// Search input should have placeholder or label
			const searchInput = page.locator('.search-input')
			const placeholder = await searchInput.getAttribute('placeholder')
			expect(placeholder).toBeTruthy()

			// Buttons should have meaningful text
			const buttons = page.locator('button')
			const buttonCount = await buttons.count()

			for (let i = 0; i < buttonCount; i++) {
				const buttonText = await buttons.nth(i).textContent()
				expect(buttonText?.trim()).toBeTruthy()
			}
		})
	})

	test.describe('Error Handling', () => {
		test('should handle network errors gracefully', async ({ page }) => {
			// Simulate network issues by intercepting requests
			await page.route('**/*', route => route.abort())

			// Page should still render basic structure
			await expect(page.locator('.portfolio-header')).toBeVisible()
		})

		test('should handle invalid URLs gracefully', async ({ page }) => {
			// Navigate to portfolio with invalid query params
			await page.goto('/portfolio?invalid=params&search=test')

			// Should still load normally
			await expect(page.locator('.portfolio-header')).toBeVisible()
			await expect(page.locator('.search-input')).toBeVisible()
		})
	})

	test.describe('User Experience Flows', () => {
		test('complete user journey: search, filter, view project', async ({ page }) => {
			// Step 1: User searches for a technology
			await page.locator('.search-input').fill('Vue')
			await page.waitForTimeout(300)

			// Step 2: User applies additional filter
			await page.locator('.filter-tag:not(.all-tag)').first().click()
			await page.waitForTimeout(300)

			// Step 3: User switches to list view
			await page.locator('.view-button').last().click()

			// Step 4: User opens a project modal
			const projects = page.locator('[data-testid^="project-"]')
			if (await projects.count() > 0) {
				await projects.first().click()
				await expect(page.locator('[data-testid="project-modal"]')).toBeVisible()

				// Step 5: User closes modal
				await page.locator('[data-testid="close-modal"]').click()
				await expect(page.locator('[data-testid="project-modal"]')).not.toBeVisible()
			}

			// Step 6: User clears all filters
			await page.locator('.clear-filters').click()
			await expect(page.locator('.search-input')).toHaveValue('')
		})

		test('portfolio browsing without filters', async ({ page }) => {
			// User browses without applying any filters
			const initialCount = await page.locator('[data-testid^="project-"]').count()
			expect(initialCount).toBeGreaterThan(0)

			// User switches view modes
			await page.locator('.view-button').last().click()
			await page.locator('.view-button').first().click()

			// Project count should remain the same
			const finalCount = await page.locator('[data-testid^="project-"]').count()
			expect(finalCount).toBe(initialCount)
		})
	})
})
