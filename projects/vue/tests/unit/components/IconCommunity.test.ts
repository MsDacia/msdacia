import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconCommunity from '@/components/icons/IconCommunity.vue'

describe('IconCommunity', () => {
  it('renders properly', () => {
    const wrapper = mount(IconCommunity)
    
    // Check if the SVG element is rendered
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('has correct SVG attributes', () => {
    const wrapper = mount(IconCommunity)
    const svg = wrapper.find('svg')
    
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(svg.attributes('width')).toBe('20')
    expect(svg.attributes('height')).toBe('20')
    expect(svg.attributes('fill')).toBe('currentColor')
  })

  it('contains the expected path element', () => {
    const wrapper = mount(IconCommunity)
    const path = wrapper.find('path')
    
    expect(path.exists()).toBe(true)
    expect(path.attributes('d')).toBeTruthy()
  })

  it('renders without any props', () => {
    // Test that component can render without requiring any props
    expect(() => mount(IconCommunity)).not.toThrow()
  })

  it('has consistent structure', () => {
    const wrapper = mount(IconCommunity)
    
    // Should be a single SVG element
    expect(wrapper.element.tagName).toBe('svg')
    
    // Should have exactly one path child
    const paths = wrapper.findAll('path')
    expect(paths).toHaveLength(1)
  })
})
