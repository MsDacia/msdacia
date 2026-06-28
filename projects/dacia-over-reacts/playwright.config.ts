import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: false,
	forbidOnly: false,
	retries: 0,
	workers: 1,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:5176',
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	// Vite is pinned to port 5176 (strictPort) in vite.config.ts; start it for the run
	// and reuse a server already running locally so `npm run e2e` works unattended.
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:5176',
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
})
