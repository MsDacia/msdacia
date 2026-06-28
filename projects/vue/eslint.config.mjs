import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

export default [
	{
		ignores: [
			'dist/',
			'coverage/',
			'node_modules/',
			'playwright-report/',
			'test-results/',
			'**/*.d.ts',
		],
	},
	js.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{
		files: ['**/*.{js,ts,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: vueParser,
			parserOptions: {
				parser: tsparser,
				extraFileExtensions: ['.vue'],
			},
		},
		plugins: {
			'@stylistic': stylistic,
			'@typescript-eslint': tseslint,
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			'@stylistic/indent': ['error', 'tab', { SwitchCase: 1 }],
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/comma-dangle': ['error', 'always-multiline'],
			'@stylistic/no-trailing-spaces': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'no-console': 'off',
			'simple-import-sort/exports': 'error',
			// Single-word view names (Home, About, Portfolio) are intentional here
			'vue/multi-word-component-names': 'off',
		},
	},
	{
		files: ['tests/**/*.{js,ts}'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
]
