import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		// Ordered most-specific-first, not alphabetically: Vite takes the first
		// matching prefix, so a leading '@' would swallow '@/tests'.
		/* eslint-disable perfectionist/sort-objects */
		alias: {
			'@/tests': fileURLToPath(new URL('./tests', import.meta.url)),
			'@ui': fileURLToPath(new URL('./node_modules/ui-components', import.meta.url)),
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		/* eslint-enable perfectionist/sort-objects */
	},
	test: {
		coverage: {
			exclude: [
				'node_modules/',
				'tests/',
				'dist/',
				'**/*.d.ts',
				'**/*.config.*',
				'**/coverage/**',
			],
			provider: 'istanbul',
			reporter: ['text', 'json', 'html'],
		},
		environment: 'jsdom',
		globals: true,
		include: [
			'tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
			'tests/integration/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
		],
		setupFiles: ['./tests/setup.ts'],
	},
})
