import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Portfolio from '@/views/Portfolio.vue'

// Mock the SwitchTheme component
vi.mock('@/components/SwitchTheme.vue', () => ({
  default: {
    name: 'SwitchTheme',
    template: '<div class="switch-theme-mock">Theme Switcher</div>'
  }
}))

// Mock the static data
vi.mock('@/data/static.en-us.json', () => ({
  default: {
    common: {
      global: {
        menu: 'Menu'
      },
      navigation: [
        {
          item: 'home',
          path: '/',
          title: 'Home'
        },
        {
          item: 'about',
          path: '/about',
          title: 'About'
        },
        {
          item: 'portfolio',
          path: '/portfolio',
          title: 'Portfolio'
        }
      ]
    }
  }
}))

// Simple mock components for views
const MockHome = { name: 'Home', template: '<div>Home View</div>' }
const MockAbout = { name: 'About', template: '<div>About View</div>' }
const MockPortfolio = { name: 'Portfolio', template: '<div>Portfolio View</div>' }

describe('SiteHeader Integration', () => {
  let router: any

  beforeEach(() => {
    // Create a fresh router for each test
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: MockHome },
        { path: '/about', name: 'about', component: MockAbout },
        { path: '/portfolio', name: 'portfolio', component: MockPortfolio }
      ],
      linkActiveClass: 'current'
    })

    // Start at home route
    router.push('/')
  })

  describe('Navigation Menu', () => {
    it('renders all navigation links from data', async () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Open the menu
      await wrapper.find('.item').trigger('click')
      await nextTick()

      const navLinks = wrapper.findAll('.nav-link')
      expect(navLinks).toHaveLength(3)

      // Check link titles
      expect(navLinks[0].text()).toContain('Home')
      expect(navLinks[1].text()).toContain('About')
      expect(navLinks[2].text()).toContain('Portfolio')
    })

    it('has correct router-link destinations', async () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Open the menu
      await wrapper.find('.item').trigger('click')
      await nextTick()

      const navLinks = wrapper.findAll('.nav-link')
      
      expect(navLinks[0].attributes('to')).toBe('/')
      expect(navLinks[1].attributes('to')).toBe('/about')
      expect(navLinks[2].attributes('to')).toBe('/portfolio')
    })

    it('displays menu toggle button', () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      const toggleButton = wrapper.find('.item')
      expect(toggleButton.exists()).toBe(true)
      expect(toggleButton.text()).toContain('Menu')
    })
  })

  describe('Menu Interaction', () => {
    it('toggles menu visibility when clicked', async () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      const toggleButton = wrapper.find('.item')
      const menu = wrapper.find('.menu')

      // Initially menu should be hidden
      expect(wrapper.vm.showMenu).toBe(false)
      expect(menu.classes()).toContain('hide-content')

      // Click to show menu
      await toggleButton.trigger('click')
      expect(wrapper.vm.showMenu).toBe(true)
      expect(menu.classes()).toContain('show-content')

      // Click again to hide menu
      await toggleButton.trigger('click')
      expect(wrapper.vm.showMenu).toBe(false)
      expect(menu.classes()).toContain('hide-content')
    })

    it('updates toggle icons based on menu state', async () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      const toggleButton = wrapper.find('.item')
      
      // Check initial icon states
      let offIcon = wrapper.find('.toggle.off')
      let onIcon = wrapper.find('.toggle.on')
      
      expect(offIcon.classes()).toContain('show-content')
      expect(onIcon.classes()).toContain('hide-content')

      // Open menu and check icon states
      await toggleButton.trigger('click')
      
      offIcon = wrapper.find('.toggle.off')
      onIcon = wrapper.find('.toggle.on')
      
      expect(offIcon.classes()).toContain('hide-content')
      expect(onIcon.classes()).toContain('show-content')
    })

    it('closes menu when navigation link is clicked', async () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Open menu
      await wrapper.find('.item').trigger('click')
      expect(wrapper.vm.showMenu).toBe(true)

      // Click on a navigation link
      const aboutLink = wrapper.findAll('.nav-link').find(link => 
        link.text().includes('About')
      )
      await aboutLink!.trigger('click')

      // Menu should be closed
      expect(wrapper.vm.showMenu).toBe(false)
    })
  })

  describe('Router Integration', () => {
    it('navigates to correct routes when links are clicked', async () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Open menu
      await wrapper.find('.item').trigger('click')
      await nextTick()

      // Click About link
      const aboutLink = wrapper.findAll('.nav-link').find(link => 
        link.text().includes('About')
      )
      await aboutLink!.trigger('click')
      await nextTick()
      await router.isReady()

      expect(router.currentRoute.value.path).toBe('/about')
      expect(router.currentRoute.value.name).toBe('about')
    })

    it('applies active class to current route link', async () => {
      // Navigate to about page first
      await router.push('/about')
      await router.isReady()

      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Open menu
      await wrapper.find('.item').trigger('click')
      await nextTick()

      // Find the about link and check if it has active class
      const aboutLink = wrapper.findAll('.nav-link').find(link => 
        link.text().includes('About')
      )
      
      // Should have router-link-active class (Vue Router adds this automatically)
      expect(aboutLink!.classes()).toContain('router-link-active')
    })
  })

  describe('Component Composition', () => {
    it('includes SwitchTheme component', () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      expect(wrapper.find('.switch-theme-mock').exists()).toBe(true)
    })

    it('renders header element as root', () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      expect(wrapper.element.tagName).toBe('HEADER')
    })
  })

  describe('Event Handling', () => {
    it('calls handleNavClick with correct title when nav link is clicked', async () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Spy on console.log since that's what handleNavClick does
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      // Open menu
      await wrapper.find('.item').trigger('click')
      await nextTick()

      // Click About link
      const aboutLink = wrapper.findAll('.nav-link').find(link => 
        link.text().includes('About')
      )
      await aboutLink!.trigger('click')

      expect(consoleSpy).toHaveBeenCalledWith('Navigation clicked:', 'About')
      
      consoleSpy.mockRestore()
    })
  })

  describe('Data Integration', () => {
    it('uses navigation data from JSON file', () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Check that the component has access to the mocked data
      expect(wrapper.vm.content.common.global.menu).toBe('Menu')
      expect(wrapper.vm.content.common.navigation).toHaveLength(3)
      expect(wrapper.vm.content.common.navigation[0].title).toBe('Home')
    })
  })

  describe('Accessibility', () => {
    it('uses semantic navigation structure', () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Check for semantic HTML structure
      expect(wrapper.element.tagName).toBe('HEADER')
      
      // All navigation links should be actual router-links
      const navLinks = wrapper.findAll('.nav-link')
      navLinks.forEach(link => {
        // Vue Router converts router-link to 'a' tags
        expect(['A', 'ROUTER-LINK']).toContain(link.element.tagName)
      })
    })

    it('provides proper text content for screen readers', async () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // Open menu
      await wrapper.find('.item').trigger('click')
      await nextTick()

      const navLinks = wrapper.findAll('.nav-link')
      
      // Each link should have meaningful text content
      navLinks.forEach(link => {
        expect(link.text().trim()).toBeTruthy()
        expect(link.text().length).toBeGreaterThan(0)
      })
    })
  })

  describe('Responsive Behavior', () => {
    it('has responsive classes for mobile', () => {
      const wrapper = mount(SiteHeader, {
        global: {
          plugins: [router]
        }
      })

      // While we can't test actual media queries in jsdom,
      // we can verify the classes are present for CSS to target
      const menu = wrapper.find('.menu')
      expect(menu.exists()).toBe(true)
      
      const toggleItem = wrapper.find('.item')
      expect(toggleItem.exists()).toBe(true)
    })
  })
})
