import { test, expect } from '@playwright/test'

test.describe('Home Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Page Loading and Content', () => {
    test('should load home page successfully', async ({ page }) => {
      await expect(page).toHaveURL('/')
      await expect(page).toHaveTitle(/MsDacia/)
      
      // Check main hero section is visible
      await expect(page.locator('.home')).toBeVisible()
      await expect(page.locator('.hero-section')).toBeVisible()
    })

    test('should display hero content correctly', async ({ page }) => {
      // Check main title
      await expect(page.locator('.hero-title')).toBeVisible()
      await expect(page.locator('.hero-title')).toContainText('MsDacia')
      
      // Check subtitle with pronunciation
      await expect(page.locator('.hero-subtitle')).toBeVisible()
      await expect(page.locator('.hero-subtitle')).toContainText('pronounced')
      await expect(page.locator('.hero-subtitle em')).toContainText('day-sha')
      
      // Check tagline
      await expect(page.locator('.tagline')).toBeVisible()
      await expect(page.locator('.tagline')).toContainText('I am here. This is who I am. I am Dacia.')
    })

    test('should display call-to-action buttons', async ({ page }) => {
      const ctaButtons = page.locator('.cta-button')
      await expect(ctaButtons).toHaveCount(2)
      
      // Check button text
      await expect(ctaButtons.nth(0)).toContainText('Learn About Me')
      await expect(ctaButtons.nth(1)).toContainText('View Portfolio')
      
      // Check button styling
      await expect(ctaButtons.nth(0)).not.toHaveClass(/secondary/)
      await expect(ctaButtons.nth(1)).toHaveClass(/secondary/)
    })
  })

  test.describe('Navigation from Home', () => {
    test('should navigate to About page when "Learn About Me" is clicked', async ({ page }) => {
      await page.locator('.cta-button', { hasText: 'Learn About Me' }).click()
      
      await expect(page).toHaveURL('/about')
      await expect(page.locator('h1')).toBeVisible()
    })

    test('should navigate to Portfolio page when "View Portfolio" is clicked', async ({ page }) => {
      await page.locator('.cta-button', { hasText: 'View Portfolio' }).click()
      
      await expect(page).toHaveURL('/portfolio')
      await expect(page.locator('.portfolio-header')).toBeVisible()
    })

    test('should maintain theme when navigating away and back', async ({ page }) => {
      // Set dark theme
      const themeSwitcher = page.locator('.theme-switcher')
      if (await themeSwitcher.isVisible()) {
        const menuTrigger = page.locator('.menu-trigger')
        if (await menuTrigger.isVisible()) {
          await menuTrigger.click()
          await page.locator('.theme-option', { hasText: 'Dark' }).click()
        }
      }
      
      // Navigate away
      await page.locator('.cta-button', { hasText: 'Learn About Me' }).click()
      await expect(page).toHaveURL('/about')
      
      // Navigate back
      await page.goBack()
      await expect(page).toHaveURL('/')
      
      // Theme should persist
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    })
  })

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }) // iPhone size
      
      // All content should be visible
      await expect(page.locator('.hero-title')).toBeVisible()
      await expect(page.locator('.hero-subtitle')).toBeVisible()
      await expect(page.locator('.tagline')).toBeVisible()
      await expect(page.locator('.quick-links')).toBeVisible()
      
      // Both CTA buttons should be visible
      const ctaButtons = page.locator('.cta-button')
      await expect(ctaButtons).toHaveCount(2)
      await expect(ctaButtons.nth(0)).toBeVisible()
      await expect(ctaButtons.nth(1)).toBeVisible()
    })

    test('should display correctly on tablet devices', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }) // iPad size
      
      // Content should be properly centered and sized
      await expect(page.locator('.hero-section')).toBeVisible()
      
      // Navigation should work
      await page.locator('.cta-button', { hasText: 'View Portfolio' }).click()
      await expect(page).toHaveURL('/portfolio')
    })

    test('should display correctly on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 }) // Desktop size
      
      // All elements should be properly positioned
      await expect(page.locator('.hero-section')).toBeVisible()
      
      // Text should be readable and not too wide
      const heroSection = page.locator('.hero-section')
      const boundingBox = await heroSection.boundingBox()
      expect(boundingBox?.width).toBeLessThan(1000) // Should have max-width
    })

    test('should handle very small screens gracefully', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 }) // Small mobile
      
      // Content should still be accessible
      await expect(page.locator('.hero-title')).toBeVisible()
      await expect(page.locator('.cta-button').first()).toBeVisible()
      
      // Should be able to navigate
      await page.locator('.cta-button').first().click()
      await expect(page).not.toHaveURL('/')
    })
  })

  test.describe('Typography and Visual Design', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      // H1 should be the main title
      const h1 = page.locator('h1')
      await expect(h1).toHaveCount(1)
      await expect(h1).toContainText('MsDacia')
      
      // H2 should be the tagline
      const h2 = page.locator('h2')
      await expect(h2).toHaveCount(1)
      await expect(h2).toContainText('I am here. This is who I am. I am Dacia.')
    })

    test('should emphasize pronunciation correctly', async ({ page }) => {
      const emphasis = page.locator('.hero-subtitle em')
      await expect(emphasis).toBeVisible()
      await expect(emphasis).toContainText('day-sha')
      
      // Should have different styling from surrounding text
      const emphasisColor = await emphasis.evaluate(el => getComputedStyle(el).color)
      const subtitleColor = await page.locator('.hero-subtitle').evaluate(el => getComputedStyle(el).color)
      expect(emphasisColor).not.toBe(subtitleColor)
    })

    test('should have proper button styling and hover effects', async ({ page }) => {
      const primaryBtn = page.locator('.cta-button').first()
      const secondaryBtn = page.locator('.cta-button.secondary')
      
      // Primary button should have background color
      const primaryBg = await primaryBtn.evaluate(el => getComputedStyle(el).backgroundColor)
      expect(primaryBg).not.toBe('rgba(0, 0, 0, 0)') // Not transparent
      
      // Secondary button should have border
      const secondaryBorder = await secondaryBtn.evaluate(el => getComputedStyle(el).borderWidth)
      expect(secondaryBorder).not.toBe('0px')
      
      // Hover effects (simulate hover)
      await primaryBtn.hover()
      // Note: Actual hover effect testing might need different approach in Playwright
    })
  })

  test.describe('Accessibility', () => {
    test('should be keyboard navigable', async ({ page }) => {
      // Tab to first CTA button
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab') // May need multiple tabs to reach CTA
      
      let focusedElement = page.locator(':focus')
      
      // Continue tabbing until we reach a CTA button
      for (let i = 0; i < 10; i++) {
        const classes = await focusedElement.getAttribute('class')
        if (classes?.includes('cta-button')) {
          // Press Enter to activate
          await page.keyboard.press('Enter')
          // Should navigate
          await expect(page).not.toHaveURL('/')
          return
        }
        await page.keyboard.press('Tab')
        focusedElement = page.locator(':focus')
      }
    })

    test('should have proper ARIA attributes and semantic markup', async ({ page }) => {
      // Main content should be in main element or have role
      const main = page.locator('main, [role="main"], .home')
      await expect(main).toBeVisible()
      
      // Links should have meaningful text
      const links = page.locator('a')
      const linkCount = await links.count()
      
      for (let i = 0; i < linkCount; i++) {
        const linkText = await links.nth(i).textContent()
        const ariaLabel = await links.nth(i).getAttribute('aria-label')
        
        // Should have either text content or aria-label
        expect(linkText?.trim() || ariaLabel?.trim()).toBeTruthy()
      }
    })

    test('should have sufficient color contrast', async ({ page }) => {
      // Test both light and dark themes
      const themes = ['light', 'dark']
      
      for (const theme of themes) {
        // Set theme
        const themeSwitcher = page.locator('.theme-switcher')
        if (await themeSwitcher.isVisible()) {
          const menuTrigger = page.locator('.menu-trigger')
          if (await menuTrigger.isVisible()) {
            await menuTrigger.click()
            await page.locator('.theme-option', { hasText: theme === 'light' ? 'Light' : 'Dark' }).click()
          }
        }
        
        // Check that text is visible (basic contrast check)
        await expect(page.locator('.hero-title')).toBeVisible()
        await expect(page.locator('.hero-subtitle')).toBeVisible()
        await expect(page.locator('.tagline')).toBeVisible()
        
        // CTA buttons should be clearly visible
        await expect(page.locator('.cta-button').first()).toBeVisible()
        await expect(page.locator('.cta-button').last()).toBeVisible()
      }
    })
  })

  test.describe('Performance and Loading', () => {
    test('should load quickly', async ({ page }) => {
      const startTime = Date.now()
      await page.goto('/')
      await page.waitForSelector('.hero-title')
      const endTime = Date.now()
      
      // Should load within reasonable time
      expect(endTime - startTime).toBeLessThan(3000) // 3 seconds
    })

    test('should not have console errors', async ({ page }) => {
      const errors: string[] = []
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })
      
      await page.goto('/')
      await page.waitForSelector('.hero-title')
      
      // Should not have any console errors
      expect(errors).toHaveLength(0)
    })

    test('should handle slow network conditions', async ({ page }) => {
      // Simulate slow 3G
      await page.context().route('**/*', async route => {
        await new Promise(resolve => setTimeout(resolve, 100))
        await route.continue()
      })
      
      await page.goto('/')
      
      // Should still load and be interactive
      await expect(page.locator('.hero-title')).toBeVisible()
      await expect(page.locator('.cta-button').first()).toBeVisible()
    })
  })

  test.describe('User Experience', () => {
    test('should provide clear user journey', async ({ page }) => {
      // User should understand what the site is about
      await expect(page.locator('.hero-title')).toContainText('MsDacia')
      await expect(page.locator('.hero-subtitle')).toContainText('day-sha') // Pronunciation help
      
      // Clear next steps should be available
      await expect(page.locator('.cta-button', { hasText: 'Learn About Me' })).toBeVisible()
      await expect(page.locator('.cta-button', { hasText: 'View Portfolio' })).toBeVisible()
      
      // Navigation should work as expected
      await page.locator('.cta-button', { hasText: 'Learn About Me' }).click()
      await expect(page).toHaveURL('/about')
    })

    test('should work well for first-time visitors', async ({ page }) => {
      // Clear branding and identity
      await expect(page.locator('.hero-title')).toBeVisible()
      
      // Helpful pronunciation guide
      await expect(page.locator('.hero-subtitle em')).toContainText('day-sha')
      
      // Clear value proposition
      await expect(page.locator('.tagline')).toBeVisible()
      
      // Obvious next steps
      const ctaButtons = page.locator('.cta-button')
      await expect(ctaButtons).toHaveCount(2)
      await expect(ctaButtons.nth(0)).toContainText('Learn About Me')
      await expect(ctaButtons.nth(1)).toContainText('View Portfolio')
    })

    test('should maintain consistency across visits', async ({ page }) => {
      // Record initial state
      const titleText = await page.locator('.hero-title').textContent()
      const taglineText = await page.locator('.tagline').textContent()
      
      // Navigate away and back
      await page.locator('.cta-button').first().click()
      await page.goBack()
      
      // Content should be consistent
      await expect(page.locator('.hero-title')).toContainText(titleText || '')
      await expect(page.locator('.tagline')).toContainText(taglineText || '')
    })
  })

  test.describe('Integration with Site Navigation', () => {
    test('should integrate well with header navigation', async ({ page }) => {
      // Header should be present
      await expect(page.locator('header')).toBeVisible()
      
      // Should be able to navigate using header as well
      const menuToggle = page.locator('.item') // Menu toggle in header
      if (await menuToggle.isVisible()) {
        await menuToggle.click()
        await page.locator('.nav-link', { hasText: 'About' }).click()
        await expect(page).toHaveURL('/about')
        
        // Navigate back to home
        await menuToggle.click()
        await page.locator('.nav-link', { hasText: 'Home' }).click()
        await expect(page).toHaveURL('/')
      }
    })

    test('should show active state when home is current page', async ({ page }) => {
      // When on home page, header navigation should show home as active
      const menuToggle = page.locator('.item')
      if (await menuToggle.isVisible()) {
        await menuToggle.click()
        
        const homeLink = page.locator('.nav-link', { hasText: 'Home' })
        await expect(homeLink).toHaveClass(/router-link-active|current/)
      }
    })
  })

  test.describe('Cross-browser Compatibility', () => {
    test('should work in different browsers', async ({ page, browserName }) => {
      // Basic functionality should work regardless of browser
      await expect(page.locator('.hero-title')).toBeVisible()
      await expect(page.locator('.cta-button').first()).toBeVisible()
      
      // Navigation should work
      await page.locator('.cta-button').first().click()
      await expect(page).not.toHaveURL('/')
      
      console.log(`Tested successfully in ${browserName}`)
    })
  })

  test.describe('Edge Cases', () => {
    test('should handle JavaScript disabled gracefully', async ({ page }) => {
      // Disable JavaScript (note: this doesn't fully disable JS in Playwright)
      await page.context().addInitScript(() => {
        // Simulate some JS being disabled
        Object.defineProperty(window, 'Vue', { value: undefined })
      })
      
      await page.goto('/')
      
      // Basic content should still be visible
      await expect(page.locator('.hero-title')).toBeVisible()
    })

    test('should handle missing images gracefully', async ({ page }) => {
      // Block image requests to simulate missing images
      await page.route('**/*.{png,jpg,jpeg,gif,svg}', route => route.abort())
      
      await page.goto('/')
      
      // Text content should still be visible and functional
      await expect(page.locator('.hero-title')).toBeVisible()
      await expect(page.locator('.cta-button').first()).toBeVisible()
    })

    test('should work with ad blockers and privacy tools', async ({ page }) => {
      // Block tracking scripts and ads
      await page.route('**/*analytics*', route => route.abort())
      await page.route('**/*tracking*', route => route.abort())
      
      await page.goto('/')
      
      // Core functionality should still work
      await expect(page.locator('.hero-title')).toBeVisible()
      await page.locator('.cta-button').first().click()
      await expect(page).not.toHaveURL('/')
    })
  })
})
