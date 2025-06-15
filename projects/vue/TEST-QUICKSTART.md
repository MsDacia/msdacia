# Vue 3 Testing Setup - Quick Reference

## 🚀 Getting Started (30 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Run all tests
npm run test:all
```

## 🧪 Quick Test Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Unit tests (watch mode) |
| `npm run test:run` | Unit tests (single run) |
| `npm run test:coverage` | Unit tests + coverage |
| `npm run test:e2e` | E2E tests |
| `npm run test:all` | All tests |

## 📁 Test Structure

```
tests/
├── unit/              # Individual component tests
│   ├── components/    # Component unit tests
│   ├── composables/   # Composable tests
│   └── views/         # View component tests
├── integration/       # Component interaction tests
└── e2e/              # End-to-end workflow tests
```

## 🔧 Test Utilities

Located in `tests/utils/test-helpers.ts`:

- `createMockProject()` - Mock project data
- `createMockRouter()` - Router mock for tests
- `expectToBeVisible()` - Visibility assertions
- `triggerEvent()` - Event simulation

## 🎯 What's Tested

### ✅ Components Covered

- [x] SwitchTheme - Theme switching logic
- [x] SiteHeader - Navigation and menu
- [x] ProjectGrid - Project display and filtering
- [x] ProjectModal - Project detail modal
- [x] ExperienceTimeline - Experience display
- [x] IconCommunity - Icon rendering

### ✅ Views Covered

- [x] Home - Landing page functionality
- [x] Portfolio - Project filtering and search
- [x] About - Content display (basic structure)

### ✅ Composables Covered

- [x] useTheme - Complete theme system

### ✅ E2E Workflows Covered

- [x] Navigation between pages
- [x] Theme switching across pages
- [x] Portfolio search and filtering
- [x] Project modal interactions
- [x] Responsive design behavior

## 🛠 VS Code Integration

The setup includes VS Code configuration for:

- **Debug configurations** - Debug unit and E2E tests
- **Tasks** - Run tests from Command Palette
- **Extensions** - Recommended testing extensions
- **Settings** - Optimized for testing workflow

### Keyboard Shortcuts

- `Cmd+Shift+P` → "Tasks: Run Task" → Select test type
- `F5` → Debug current test file
- `Cmd+Shift+T` → Reopen closed terminal

## 📊 Coverage Goals

| Type | Target | Current |
|------|--------|---------|
| Statements | 80%+ | TBD |
| Branches | 75%+ | TBD |
| Functions | 80%+ | TBD |
| Lines | 80%+ | TBD |

## 🚦 CI/CD Pipeline

GitHub Actions automatically runs:

1. **Lint & Type Check** - Code quality
2. **Unit Tests** - Component testing
3. **E2E Tests** - User workflow testing
4. **Build Test** - Production build
5. **Security Audit** - Dependency scanning
6. **Performance Test** - Lighthouse audit

## 📝 Writing Your First Test

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
 it('renders hello message', () => {
  const wrapper = mount(MyComponent, {
   props: { name: 'World' }
  })
  expect(wrapper.text()).toContain('Hello World')
 })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test('user can navigate to about page', async ({ page }) => {
 await page.goto('/')
 await page.click('text=Learn About Me')
 await expect(page).toHaveURL('/about')
})
```

## 🔍 Debug Tips

### Unit Test Debugging

```bash
# Run specific test file
npm run test -- MyComponent.test.ts

# Debug with verbose output
npm run test -- --reporter=verbose

# Debug in VS Code: Set breakpoint + F5
```

### E2E Test Debugging

```bash
# Run with browser visible
npm run test:e2e:headed

# Run with Playwright UI
npm run test:e2e:ui

# Debug specific test
npx playwright test home.spec.ts --debug
```

## 🏃‍♂️ Test Runner Script

Use `./scripts/test-runner.sh` for guided testing:

```bash
./scripts/test-runner.sh help     # Show all options
./scripts/test-runner.sh unit     # Unit tests only
./scripts/test-runner.sh e2e      # E2E tests only
./scripts/test-runner.sh all      # Everything
```

## 📋 Pre-Commit Checklist

Before pushing code:

- [ ] `npm run test:run` - Unit tests pass
- [ ] `npm run type-check` - No TypeScript errors
- [ ] `npm run build` - Production build works
- [ ] `npm run test:e2e` - E2E tests pass
- [ ] Coverage maintained above 80%

## 🆘 Common Issues

**Tests not running?**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Playwright issues?**

```bash
# Reinstall browsers
npx playwright install
```

**TypeScript errors?**

```bash
# Check configuration
npm run type-check
```

## 📚 Next Steps

1. **Add More Components** - Test remaining components
2. **API Testing** - Add API integration tests when backend is ready
3. **Visual Regression** - Add screenshot comparison tests
4. **Performance** - Add Core Web Vitals monitoring
5. **A11y Testing** - Expand accessibility test coverage

## 🤝 Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all existing tests pass
3. Add E2E tests for user-facing features
4. Update documentation
5. Maintain coverage goals

---

**Need help?** Check `TESTING.md` for detailed documentation or the VS Code tasks for quick actions.
