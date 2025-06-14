# MsDacia Vue 3 Project

MsDacia's Personal Portfolio Website built with Vue 3, TypeScript, and modern development practices.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test:all
```

## 🧪 Testing

This project includes comprehensive testing:

- **Unit Tests**: Component and composable testing with Vitest
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user workflow testing with Playwright
- **Performance Tests**: Lighthouse audits

### Quick Test Commands

```bash
npm run test              # Unit tests (watch mode)
npm run test:run          # Unit tests (single run)
npm run test:coverage     # Unit tests with coverage
npm run test:e2e          # E2E tests
npm run test:all          # All tests
```

**📋 See [TEST-QUICKSTART.md](./TEST-QUICKSTART.md) for a 30-second testing guide**

**📚 See [TESTING.md](./TESTING.md) for comprehensive testing documentation**

## 🛠 Development

```bash
npm run dev               # Start development server
npm run build             # Build for production
npm run preview           # Preview production build
npm run type-check        # Check TypeScript types
```

## 🎯 Features

- ✅ Vue 3 with Composition API
- ✅ TypeScript for type safety
- ✅ Vite for fast development
- ✅ Vue Router for navigation
- ✅ SASS for styling
- ✅ Responsive design
- ✅ Dark/Light/System theme switching
- ✅ Comprehensive testing suite
- ✅ CI/CD with GitHub Actions
- ✅ Performance monitoring

## 📁 Project Structure

```
src/
├── components/           # Reusable Vue components
│   ├── icons/           # Icon components
│   ├── ProjectGrid.vue  # Project display grid
│   ├── ProjectModal.vue # Project detail modal
│   ├── SiteHeader.vue   # Navigation header
│   └── SwitchTheme.vue  # Theme switcher
├── composables/         # Vue composables
│   └── useTheme.ts      # Theme management
├── data/               # Static data
├── router/             # Vue Router configuration
├── views/              # Page components
│   ├── About.vue
│   ├── Home.vue
│   └── Portfolio.vue
└── assets/             # Static assets

tests/
├── unit/               # Unit tests
├── integration/        # Integration tests
├── e2e/               # End-to-end tests
└── utils/             # Test utilities
```

## 🎨 Components

### Core Components
- **SiteHeader**: Navigation with responsive menu
- **SwitchTheme**: Advanced theme switching (Light/Dark/System)
- **ProjectGrid**: Flexible project display with grid/list views
- **ProjectModal**: Detailed project information modal
- **ExperienceTimeline**: Professional experience timeline

### Theme System
Advanced theme management with:
- Light/Dark/System preferences
- Automatic system preference detection
- Smooth transitions
- Persistent user choice (future enhancement)

## 🧪 Testing Strategy

### Test Coverage
- **Unit Tests**: 15+ test files covering all major components
- **Integration Tests**: Router and component interaction testing
- **E2E Tests**: Complete user workflows across 4 test files
- **Performance Tests**: Lighthouse audits for Core Web Vitals

### Test Files
```
tests/
├── unit/
│   ├── components/      # Component unit tests
│   ├── composables/     # Composable tests  
│   └── views/          # View component tests
├── integration/         # Component integration tests
└── e2e/                # End-to-end workflow tests
```

### VS Code Integration
- Debug configurations for tests
- Task runner integration
- Recommended extensions
- Test coverage visualization

## 🚦 CI/CD Pipeline

Automated GitHub Actions workflow:

1. **Code Quality**: TypeScript checking, linting
2. **Unit Testing**: Cross-platform (Node 18, 20)
3. **E2E Testing**: Multi-browser (Chrome, Firefox, Safari)
4. **Build Testing**: Production build validation
5. **Security Audit**: Dependency vulnerability scanning
6. **Performance Testing**: Lighthouse audits
7. **Deployment**: Automated deployment (configurable)

## 📊 Performance

- Lighthouse audits in CI/CD
- Performance budgets enforced
- Core Web Vitals monitoring
- Bundle size optimization

## 🔧 Development Tools

- **Vite**: Fast development and building
- **TypeScript**: Type safety and better DX
- **Vitest**: Fast unit testing
- **Playwright**: Reliable E2E testing
- **SASS**: Advanced CSS features
- **ESLint + Prettier**: Code quality (when configured)

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari/WebKit (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Tested across all major browsers in CI/CD pipeline.

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Write tests** for new features
4. **Ensure** all tests pass
5. **Submit** a pull request

### Development Workflow

```bash
# 1. Install dependencies
npm install
npm install -g @playwright/test  # For E2E tests

# 2. Start development
npm run dev

# 3. Write tests first (TDD)
npm run test  # Watch mode

# 4. Run full test suite before committing
npm run test:all

# 5. Check build
npm run build
```

## 📋 Scripts Reference

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build for production |
| `preview` | Preview production build |
| `test` | Run tests in watch mode |
| `test:run` | Run tests once |
| `test:coverage` | Run tests with coverage |
| `test:e2e` | Run E2E tests |
| `test:e2e:ui` | Run E2E tests with UI |
| `test:all` | Run complete test suite |
| `type-check` | Check TypeScript types |

## 🔍 Debugging

### VS Code
- Set breakpoints in test files
- Use "Debug Current Test File" configuration
- View test coverage in editor

### Command Line
```bash
# Debug specific test
npm run test -- MyComponent.test.ts

# Debug E2E test
npx playwright test --debug

# View test UI
npm run test:ui
```

## 📚 Documentation

- **[TEST-QUICKSTART.md](./TEST-QUICKSTART.md)** - 30-second testing guide
- **[TESTING.md](./TESTING.md)** - Comprehensive testing documentation
- **[Component Documentation](./src/components/)** - Individual component docs

## 📄 License

This project is private and proprietary.

## 👩‍💻 Author

**Dacia Rodrigue** - *Frontend Engineer*
- Website: [msdacia.com](http://msdacia.com)
- Email: msdessin@gmail.com

---

*Built with ❤️ using Vue 3, TypeScript, and modern web development practices.*
