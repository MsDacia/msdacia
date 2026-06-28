import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
	],
	server: {
		port: 5173,
		strictPort: true,
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@ui': fileURLToPath(new URL('./node_modules/ui-components', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use \'@ui/assets/stylesheets/utils/variables\' as *;\n@use \'@ui/assets/stylesheets/utils/mixins\' as *;\n',
				loadPaths: [
					fileURLToPath(new URL('./src/assets', import.meta.url)),
					fileURLToPath(new URL('./node_modules/ui-components/assets/stylesheets', import.meta.url)),
				],
			},
		},
	},
})
