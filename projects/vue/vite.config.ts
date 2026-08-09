import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// ui-components ships an invalid `@media (min-width:)` in dist/styles.css (an
// unresolved breakpoint). Browsers already discard that block, but Vite 8's
// lightningcss minifier hard-fails on it. Rewrite it to an equivalent query that
// never matches so behaviour is unchanged. Remove once upstream is fixed.
const fixUiComponentsMediaQuery = () => ({
	enforce: 'pre' as const,
	name: 'fix-ui-components-media-query',
	transform(code: string, id: string) {
		if (!id.includes('ui-components/dist/styles.css')) return null

		return { code: code.replaceAll('@media (min-width:)', '@media not all'), map: null }
	},
})

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
		fixUiComponentsMediaQuery(),
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
