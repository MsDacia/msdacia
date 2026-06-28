import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['tests/**/*.test.{ts,tsx}'],
		exclude: ['node_modules', 'tests/e2e/**'],
		setupFiles: ['./vitest.setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
})
