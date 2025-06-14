# Testing Guide for Vue 3 MsDacia Project

This guide covers the comprehensive testing setup for your Vue 3 project, including unit tests, integration tests, and end-to-end tests.

## 📋 Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Getting Started](#getting-started)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Coverage Reports](#coverage-reports)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project uses a modern testing approach with multiple layers:

- **Unit Tests**: Individual component and composable testing
- **Integration Tests**: Component interaction and router testing  
- **E2E Tests**: Full user workflow testing
- **Performance Tests**: Lighthouse audits
- **Visual Regression**: (Future enhancement)

## 🛠 Testing Stack

| Tool | Purpose | Configuration |
|------|---------|---------------|
| **Vitest** | Unit & Integration Testing | `vitest.config.ts` |
| **Playwright** | E2E Testing | `playwright.config.ts` |
| **Vue Test Utils** | Vue Component Testing | Built-in |
| **Testing Library** | DOM Testing Utilities | `@testing-library/vue` |
| **Happy DOM** | Lightweight DOM Environment | Vitest config |
| **GitHub Actions** | CI/CD Pipeline | `.github/workflows/` |

## 🚀 Getting Started

### Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install
```

### Quick Start

```bash
# Run all tests
npm run test:all

# Or use the test runner script
./scripts/test-runner.sh all
```

## 🧪 Test Types

### Unit Tests (`tests/unit/`)

Test individual components, composables, and utilities in isolation.

**Structure:**
```
tests/unit/
├── components/
│   ├── IconCommunity.test.ts
│   ├── SwitchTheme.test.ts
│   ├── ProjectGrid.test.ts
│   └── ProjectModal.test.ts
├── composables/
│   └── useTheme.test.ts
└── views/
    ├── Home.test.ts
    └── Portfolio.test.ts
```

**Example:**
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.text()).toContain('Expected Text')
  })
})
```

### Integration Tests (`tests/integration/`)

Test component interactions, routing, and data flow.

**Features Tested:**
- Router navigation
- Component communication via events
- State management
- API integration (when added)

**Example:**
```typescript
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'

describe('SiteHeader Integration', () => {
  it('navigates between routes', async () => {
    const router = createRouter({...})
    const wrapper = mount(SiteHeader, {
      global: { plugins: [router] }
    })
    
    await wrapper.find('.nav-link[to="/about"]').trigger('click')
    expect(router.currentRoute.value.path).toBe('/about')
  })
})
```

### E2E Tests (`tests/e2e/`)

Test complete user workflows across the entire application.

**Test Files:**
- `navigation.spec.ts` - Site navigation and theme switching
- `home.spec.ts` - Home page functionality
- `about.spec.ts` - About page content and interactions
- `portfolio.spec.ts` - Portfolio filtering and project viewing
- `theme.spec.ts` - Theme system comprehensive testing

**Example:**
```typescript
import { test, expect } from '@playwright/test'

test('user can browse portfolio projects', async ({ page }) => {
  await page.goto('/portfolio')
  
  // Filter by technology
  await page.locator('.filter-tag', { hasText: 'Vue' }).click()
  
  // Open project modal
  await page.locator('[data-testid^="project-"]').first().click()
  await expect(page.locator('[data-testid="project-modal"]')).toBeVisible()
})
```

## 🏃‍♂️ Running Tests

### Using npm scripts:

```bash
# Unit tests (watch mode)
npm run test

# Unit tests (single run)
npm run test:run

# Unit tests with coverage
npm run test:coverage

# Unit tests with UI
npm run test:ui

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui

# E2E tests in headed mode (visible browser)
npm run test:e2e:headed

# All tests
npm run test:all
```

### Using the test runner script:

```bash
# Make script executable (one time)
chmod +x scripts/test-runner.sh

# Run different test types
./scripts/test-runner.sh unit        # Unit tests only
./scripts/test-runner.sh coverage    # Unit tests with coverage
./scripts/test-runner.sh e2e         # E2E tests only
./scripts/test-runner.sh e2e-ui      # E2E tests with Playwright UI
./scripts/test-runner.sh watch       # Watch mode
./scripts/test-runner.sh all         # Complete test suite
./scripts/test-runner.sh performance # Lighthouse performance testing
./scripts/test-runner.sh help        # Show available commands
```

## ✍️ Writing Tests

### Test Structure

Follow the **Arrange-Act-Assert** pattern:

```typescript
describe('Component Name', () => {
  describe('Feature Group', () => {
    it('should do something specific', () => {
      // Arrange: Set up test data and conditions
      const props = { title: 'Test Title' }
      
      // Act: Perform the action being tested
      const wrapper = mount(Component, { props })
      
      // Assert: Verify the expected outcome
      expect(wrapper.find('h1').text()).toBe('Test Title')
    })
  })
})
```

### Using Test Helpers

The project includes comprehensive test utilities in `tests/utils/test-helpers.ts`:

```typescript
import { 
  createMockProject, 
  createMockRouter,
  expectToBeVisible,
  triggerEvent 
} from '@/tests/utils/test-helpers'

// Create mock data
const project = createMockProject({ name: 'Test Project' })

// Test utilities
expectToBeVisible(wrapper.find('.component'))
await triggerEvent(wrapper, '.button', 'click')
```

### Component Testing Patterns

**Props Testing:**
```typescript
it('displays props correctly', () => {
  const wrapper = mount(Component, {
    props: { title: 'Test Title', count: 5 }
  })
  
  expect(wrapper.text()).toContain('Test Title')
  expect(wrapper.text()).toContain('5')
})
```

**Events Testing:**
```typescript
it('emits events correctly', async () => {
  const wrapper = mount(Component)
  
  await wrapper.find('button').trigger('click')
  
  expect(wrapper.emitted('click')).toHaveLength(1)
  expect(wrapper.emitted('click')![0]).toEqual(['expected-payload'])
})
```

**Async Operations:**
```typescript
it('handles async operations', async () => {
  const wrapper = mount(AsyncComponent)
  
  // Wait for async operation
  await wrapper.vm.$nextTick()
  
  expect(wrapper.find('.result').text()).toBe('Loaded')
})
```

### E2E Testing Patterns

**Page Navigation:**
```typescript
test('navigates through application', async ({ page }) => {
  await page.goto('/')
  await page.locator('.cta-button').first().click()
  await expect(page).toHaveURL('/about')
})
```

**Form Interactions:**
```typescript
test('submits form correctly', async ({ page }) => {
  await page.goto('/contact')
  await page.fill('#name', 'John Doe')
  await page.fill('#email', 'john@example.com')
  await page.click('#submit')
  await expect(page.locator('.success')).toBeVisible()
})
```

**Responsive Testing:**
```typescript
test('works on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  await expect(page.locator('.mobile-menu')).toBeVisible()
})
```

## 🔄 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that runs:

1. **Code Quality**: TypeScript checking and linting
2. **Unit Tests**: Cross-platform testing (Node 18, 20)
3. **E2E Tests**: Multi-browser testing (Chrome, Firefox, Safari)
4. **Build Testing**: Deployment preparation
5. **Security Audit**: Dependency vulnerability scanning
6. **Performance Testing**: Lighthouse audits
7. **Deployment**: Automated deployment on main branch

### Workflow Triggers

- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches
- **Manual** workflow dispatch

### Test Results

- Test results are uploaded as artifacts
- Coverage reports are sent to Codecov
- Performance reports are generated
- Notifications are sent on failure

## 📊 Coverage Reports

### Generating Coverage

```bash
# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
```

### Coverage Goals

| Metric | Target | Current |
|--------|--------|---------|
| Statements | 80%+ | - |
| Branches | 75%+ | - |
| Functions | 80%+ | - |
| Lines | 80%+ | - |

### Coverage Configuration

Coverage is configured in `vitest.config.ts`:

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  exclude: [
    'node_modules/',
    'tests/',
    'dist/',
    '**/*.d.ts',
    '**/*.config.*'
  ]
}
```

## 📋 Best Practices

### General Testing Guidelines

1. **Test Behavior, Not Implementation**
   ```typescript
   // ❌ Bad: Testing internal state
   expect(wrapper.vm.internalCounter).toBe(5)
   
   // ✅ Good: Testing user-visible behavior
   expect(wrapper.text()).toContain('5 items')
   ```

2. **Use Descriptive Test Names**
   ```typescript
   // ❌ Bad
   it('works')
   
   // ✅ Good
   it('displays error message when form validation fails')
   ```

3. **Keep Tests Independent**
   ```typescript
   // Each test should be able to run in isolation
   beforeEach(() => {
     // Reset state before each test
   })
   ```

4. **Test Edge Cases**
   ```typescript
   describe('edge cases', () => {
     it('handles empty data gracefully', () => {
       const wrapper = mount(Component, { props: { items: [] } })
       expect(wrapper.find('.empty-state')).toBeVisible()
     })
   })
   ```

### Component Testing Best Practices

1. **Test from User's Perspective**
2. **Mock External Dependencies**
3. **Test Accessibility Features**
4. **Verify Error States**
5. **Test Responsive Behavior**

### E2E Testing Best Practices

1. **Test Critical User Journeys**
2. **Use Page Object Pattern for Complex Flows**
3. **Test Across Different Browsers**
4. **Include Performance Assertions**
5. **Test Offline Scenarios**

### Performance Testing

1. **Lighthouse Audits**
2. **Bundle Size Monitoring**
3. **Core Web Vitals**
4. **Accessibility Scoring**

## 🐛 Troubleshooting

### Common Issues

**Vitest Issues:**

```bash
# Clear Vitest cache
npx vitest --run --reporter=verbose --clear-cache

# Update snapshots
npm run test:run -- --update-snapshots
```

**Playwright Issues:**

```bash
# Reinstall browsers
npx playwright install

# Run with debug mode
npx playwright test --debug

# Generate test code
npx playwright codegen localhost:5173
```

**TypeScript Issues:**

```bash
# Check TypeScript configuration
npm run type-check

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### Debug Mode

**Unit Tests:**
```bash
# Run specific test file
npm run test -- SwitchTheme.test.ts

# Run with verbose output
npm run test -- --reporter=verbose

# Debug in VS Code
# Add breakpoint and run "Debug Current Test File"
```

**E2E Tests:**
```bash
# Run with headed browser
npm run test:e2e:headed

# Run specific test
npx playwright test home.spec.ts

# Debug specific test
npx playwright test home.spec.ts --debug
```

### Test Environment Issues

**DOM Environment:**
```typescript
// If you need a full browser environment
import { beforeAll } from 'vitest'

beforeAll(() => {
  // Setup DOM environment
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  })
})
```

**Router Issues:**
```typescript
// Use test helpers for router setup
import { createTestRouter } from '@/tests/utils/test-helpers'

const wrapper = mount(Component, {
  global: {
    plugins: [createTestRouter()]
  }
})
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Vue Test Utils Documentation](https://test-utils.vuejs.org/)
- [Testing Library Documentation](https://testing-library.com/)
- [Vue 3 Testing Best Practices](https://vuejs.org/guide/scaling-up/testing.html)

## 🤝 Contributing

When adding new features:

1. Write tests before implementation (TDD)
2. Ensure all tests pass
3. Update test documentation
4. Add E2E tests for user-facing features
5. Maintain test coverage above 80%

## 📝 Test Checklist

Before submitting a PR:

- [ ] All unit tests pass
- [ ] All integration tests pass  
- [ ] All E2E tests pass
- [ ] Code coverage is above 80%
- [ ] No TypeScript errors
- [ ] Performance tests pass
- [ ] Tests are documented
- [ ] Edge cases are covered
