// Simple test to verify @ alias is working
import { describe, it, expect } from 'vitest'

// This import should work if @ alias is properly configured
import Portfolio from '@/views/Portfolio.vue'

describe('@-alias test', () => {
  it('should be able to import Portfolio component using @ alias', () => {
    expect(Portfolio).toBeDefined()
    expect(Portfolio.name).toBe(undefined) // Vue components may not have explicit names
  })
})
