import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectGrid from '@/components/ProjectGrid.vue'

// Mock data for testing
const mockProjects = [
  {
    id: 1,
    name: 'Test Project 1',
    client: 'Test Client 1',
    year: '2023',
    timeline: '3 months',
    tags: ['Vue', 'TypeScript', 'SASS', 'Jest', 'Vitest'],
    link: 'https://example.com',
    image: 'test1.png'
  },
  {
    id: 2,
    name: 'Test Project 2',
    client: 'Test Client 2',
    year: '2022',
    timeline: '6 weeks',
    tags: ['React', 'JavaScript'],
    image: 'test2.png'
  },
  {
    id: 3,
    name: 'Test Project 3 with Very Long Name',
    client: 'Test Client 3',
    year: '2024',
    timeline: 'ongoing',
    tags: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Cypress', 'Jest', 'Material UI', 'SCSS'],
    image: 'test3.png'
  }
]

describe('ProjectGrid Component', () => {
  describe('Grid View Mode', () => {
    it('renders projects in grid layout', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: mockProjects,
          viewMode: 'grid'
        }
      })

      expect(wrapper.find('.project-grid').classes()).toContain('view-grid')
      expect(wrapper.findAll('.project-card')).toHaveLength(3)
    })

    it('displays project information correctly', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[0]],
          viewMode: 'grid'
        }
      })

      const card = wrapper.find('.project-card')
      
      // Check project title and client
      expect(card.find('.project-title').text()).toBe('Test Project 1')
      expect(card.find('.project-client').text()).toBe('Test Client 1')
      
      // Check year and timeline in badges
      expect(card.find('.project-year').text()).toBe('2023')
      expect(card.find('.project-timeline').text()).toBe('3 months')
      
      // Check meta information
      const metaItems = card.findAll('.meta-item')
      expect(metaItems[0].text()).toContain('2023') // Year
      expect(metaItems[1].text()).toContain('3 months') // Timeline
      expect(metaItems[2].text()).toContain('Live Site') // Link indicator
    })

    it('limits tags display in grid view', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[2]], // Project with 8 tags
          viewMode: 'grid'
        }
      })

      const tags = wrapper.findAll('.tag:not(.more-tags)')
      const moreTags = wrapper.find('.more-tags')
      
      expect(tags).toHaveLength(4) // Should show only 4 tags in grid view
      expect(moreTags.exists()).toBe(true)
      expect(moreTags.text()).toBe('+4 more') // 8 total - 4 shown = 4 more
    })

    it('does not show more tags indicator when tags <= 4', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[1]], // Project with 2 tags
          viewMode: 'grid'
        }
      })

      const moreTags = wrapper.find('.more-tags')
      expect(moreTags.exists()).toBe(false)
    })

    it('shows live site indicator only for projects with links', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: mockProjects,
          viewMode: 'grid'
        }
      })

      const cards = wrapper.findAll('.project-card')
      
      // First project has a link
      const firstCardMeta = cards[0].findAll('.meta-item')
      expect(firstCardMeta[2].text()).toContain('Live Site')
      
      // Second project doesn't have a link
      const secondCardMeta = cards[1].findAll('.meta-item')
      expect(secondCardMeta).toHaveLength(2) // Only year and timeline
    })
  })

  describe('List View Mode', () => {
    it('renders projects in list layout', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: mockProjects,
          viewMode: 'list'
        }
      })

      expect(wrapper.find('.project-grid').classes()).toContain('view-list')
      expect(wrapper.findAll('.project-card')).toHaveLength(3)
    })

    it('shows more tags in list view', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[2]], // Project with 8 tags
          viewMode: 'list'
        }
      })

      const tags = wrapper.findAll('.tag:not(.more-tags)')
      const moreTags = wrapper.find('.more-tags')
      
      expect(tags).toHaveLength(8) // Should show all 8 tags in list view
      expect(moreTags.exists()).toBe(false) // No "more" indicator needed
    })

    it('shows more tags indicator when tags > 8 in list view', () => {
      const projectWithManyTags = {
        ...mockProjects[2],
        tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8', 'Tag9', 'Tag10']
      }

      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [projectWithManyTags],
          viewMode: 'list'
        }
      })

      const tags = wrapper.findAll('.tag:not(.more-tags)')
      const moreTags = wrapper.find('.more-tags')
      
      expect(tags).toHaveLength(8) // Should show 8 tags in list view
      expect(moreTags.exists()).toBe(true)
      expect(moreTags.text()).toBe('+2 more') // 10 total - 8 shown = 2 more
    })
  })

  describe('Empty State', () => {
    it('shows empty state when no projects', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [],
          viewMode: 'grid'
        }
      })

      const emptyState = wrapper.find('.empty-state')
      expect(emptyState.exists()).toBe(true)
      expect(emptyState.find('h3').text()).toBe('No projects found')
      expect(emptyState.find('p').text()).toBe('Try adjusting your search criteria or filters.')
    })

    it('does not show empty state when projects exist', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: mockProjects,
          viewMode: 'grid'
        }
      })

      expect(wrapper.find('.empty-state').exists()).toBe(false)
    })
  })

  describe('User Interactions', () => {
    it('emits project-click event when card is clicked', async () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[0]],
          viewMode: 'grid'
        }
      })

      const card = wrapper.find('.project-card')
      await card.trigger('click')

      expect(wrapper.emitted('project-click')).toHaveLength(1)
      expect(wrapper.emitted('project-click')![0]).toEqual([mockProjects[0]])
    })

    it('emits project-click event when view details button is clicked', async () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[0]],
          viewMode: 'grid'
        }
      })

      // Note: Since the button is inside the card, clicking it will also trigger the card click
      // This is expected behavior for the component
      const viewDetailsButton = wrapper.find('.view-details')
      await viewDetailsButton.trigger('click')

      expect(wrapper.emitted('project-click')).toHaveLength(1)
      expect(wrapper.emitted('project-click')![0]).toEqual([mockProjects[0]])
    })

    it('handles hover effects correctly', async () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[0]],
          viewMode: 'grid'
        }
      })

      const card = wrapper.find('.project-card')
      
      // Test hover (simulated by adding CSS class)
      await card.trigger('mouseenter')
      // Note: CSS hover effects can't be easily tested in unit tests
      // but we can verify the hover target exists
      expect(card.exists()).toBe(true)
    })
  })

  describe('Responsive Design Elements', () => {
    it('renders with proper CSS classes for responsive behavior', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: mockProjects,
          viewMode: 'grid'
        }
      })

      // Check that responsive classes are present
      expect(wrapper.find('.project-grid').exists()).toBe(true)
      expect(wrapper.find('.project-card').exists()).toBe(true)
    })
  })

  describe('Data Validation and Edge Cases', () => {
    it('handles projects with missing optional fields gracefully', () => {
      const projectWithMissingFields = {
        id: 999,
        name: 'Minimal Project',
        client: 'Test Client',
        year: '2023',
        timeline: '1 week',
        tags: ['Vue'],
        image: 'minimal.png'
        // No link field
      }

      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [projectWithMissingFields],
          viewMode: 'grid'
        }
      })

      expect(wrapper.find('.project-card').exists()).toBe(true)
      expect(wrapper.find('.project-title').text()).toBe('Minimal Project')
      
      // Should not show live site meta item
      const metaItems = wrapper.findAll('.meta-item')
      expect(metaItems).toHaveLength(2) // Only year and timeline
    })

    it('handles empty tags array', () => {
      const projectWithNoTags = {
        ...mockProjects[0],
        tags: []
      }

      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [projectWithNoTags],
          viewMode: 'grid'
        }
      })

      expect(wrapper.find('.project-card').exists()).toBe(true)
      expect(wrapper.findAll('.tag')).toHaveLength(0)
    })

    it('handles very long project names and client names', () => {
      const projectWithLongNames = {
        ...mockProjects[0],
        name: 'This is a very long project name that might cause layout issues if not handled properly',
        client: 'This is a very long client name that should also be handled gracefully'
      }

      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [projectWithLongNames],
          viewMode: 'grid'
        }
      })

      expect(wrapper.find('.project-title').text()).toBe(projectWithLongNames.name)
      expect(wrapper.find('.project-client').text()).toBe(projectWithLongNames.client)
    })

    it('maintains proper structure with single project', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[0]],
          viewMode: 'grid'
        }
      })

      expect(wrapper.findAll('.project-card')).toHaveLength(1)
      expect(wrapper.find('.empty-state').exists()).toBe(false)
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: mockProjects,
          viewMode: 'grid'
        }
      })

      // Check for proper heading structure
      const titles = wrapper.findAll('.project-title')
      titles.forEach(title => {
        expect(title.element.tagName).toBe('H3')
      })

      // Check for button elements
      const buttons = wrapper.findAll('.view-details')
      buttons.forEach(button => {
        expect(button.element.tagName).toBe('BUTTON')
      })
    })

    it('provides meaningful text content', () => {
      const wrapper = mount(ProjectGrid, {
        props: {
          projects: [mockProjects[0]],
          viewMode: 'grid'
        }
      })

      // All text content should be meaningful
      expect(wrapper.find('.project-title').text().trim()).toBeTruthy()
      expect(wrapper.find('.project-client').text().trim()).toBeTruthy()
      expect(wrapper.find('.view-details').text().trim()).toBeTruthy()
    })
  })

  describe('Performance Considerations', () => {
    it('handles large number of projects efficiently', () => {
      // Create a large array of projects
      const manyProjects = Array.from({ length: 100 }, (_, i) => ({
        ...mockProjects[0],
        id: i + 1,
        name: `Project ${i + 1}`
      }))

      const wrapper = mount(ProjectGrid, {
        props: {
          projects: manyProjects,
          viewMode: 'grid'
        }
      })

      expect(wrapper.findAll('.project-card')).toHaveLength(100)
      expect(wrapper.find('.empty-state').exists()).toBe(false)
    })
  })
})
