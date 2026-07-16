import js from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

import eslintLocalRules from './eslint-local-rules/index.mjs'

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
			local: eslintLocalRules,
			perfectionist: perfectionist,
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
			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						'side-effect',
						[
							'type-builtin',
							'type-external',
							'value-builtin',
							'value-external',
						],
						[
							'type-internal',
							'value-internal',
						],
						[
							'type-index',
							'type-parent',
							'type-sibling',
							'value-index',
							'value-parent',
							'value-sibling',
						],
					],
					internalPattern: [
						'^@/.+',
						'^@ds/.+',
						'^@icons/.+',
						'^@vuejs/.+',
					],
					newlinesBetween: 1,
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'perfectionist/sort-jsx-props': [
				'error',
				{
					customGroups: [
						{ elementNamePattern: '^(key|ref)$', groupName: 'reserved' },
						{ elementNamePattern: '^on[A-Z]', groupName: 'callback' },
					],
					groups: [
						'reserved',
						'unknown',
						'callback',
					],
					ignoreCase: true,
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'perfectionist/sort-named-exports': [
				'error',
				{
					order: 'asc',
					type: 'alphabetical',
				}
			],
			'perfectionist/sort-named-imports': [
				'error',
				{
					order: 'asc',
					type: 'alphabetical',
				}
			],
			'perfectionist/sort-objects': [
				'error',
				{
					ignoreCase: false,
					order: 'asc',
					partitionByNewLine: true,
					type: 'alphabetical',
				}
			],
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
