// @ts-nocheck
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@/tests': fileURLToPath(new URL('./tests', import.meta.url)),
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@ui': fileURLToPath(new URL('./node_modules/ui-components', import.meta.url)),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts'],
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'tests/',
				'dist/',
				'**/*.d.ts',
				'**/*.config.*',
				'**/coverage/**'
			]
		},
		include: [
			'tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
			'tests/integration/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
		]
	}
})
