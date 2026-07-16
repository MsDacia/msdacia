import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
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
	plugins: [
		vue(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@ui': fileURLToPath(new URL('./node_modules/ui-components', import.meta.url)),
		},
	},
	server: {
		port: 5173,
		strictPort: true,
	},
})
