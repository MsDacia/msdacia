/* eslint-disable no-magic-numbers */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import cspell from '@cspell/eslint-plugin'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unicorn from 'eslint-plugin-unicorn'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const compat = new FlatCompat({
	allConfig: js.configs.all,
	baseDirectory: dirname,
	recommendedConfig: js.configs.recommended,
})

export default [
	{
		ignores: [
			'dist/',
			'**/dist/',
			'dist-demo/',
			'stylesheets/',
			'**/build',
			'**/config',
			'**/node_modules',
			'**/public',
			'**/vendor',
			'**/test-results',
			'**/*.json',
			'**/*.yml',
			'**/*.yaml',
		],
	},

	...compat.extends('plugin:@cspell/eslint-plugin/recommended', 'plugin:@typescript-eslint/recommended'),
	{
		plugins: {
			'@cspell': cspell,
			'@stylistic': stylistic,
			perfectionist: perfectionist,
			'react-hooks': reactHooks,
			'simple-import-sort': simpleImportSort,
			unicorn: unicorn,
		},

		languageOptions: {
			ecmaVersion: 5,
			parserOptions: { parser: '@typescript-eslint/parser' },
			sourceType: 'module',
		},

		rules: {
			'@cspell/spellchecker': [
				'warn',
				{
					autoFix: true,
					cspell: {
						language: 'en-US, es',
						words: [
							'2xl',
							'3xl',
							'4xl',
							'5xl',
							'6xl',
							'7xl',
							'8xl',
							'9xl',
							'antialiased',
							'Arial',
							'autofocus',
							'autogrow',
							'axios',
							'bgcolor',
							'Bootcut',
							'bowtie',
							'calc',
							'callout',
							'cellspacing',
							'checkbox',
							'checkboxes',
							'checkmark',
							'clearfix',
							'csrf',
							'datepicker',
							'datetimes',
							'debounce',
							'debounced',
							'describedby',
							'devtools',
							'dragonfruit',
							'dressform',
							'dropdown',
							'flexboxes',
							'getters',
							'Helvetica',
							'href',
							'keydown',
							'keypress',
							'keyup',
							'lastpass',
							'mailto',
							'maxlength',
							'mdash',
							'menuitem',
							'mixedmark',
							'nbsp',
							'noindex',
							'nofollow',
							'Nominatim',
							'noopener',
							'noreferrer',
							'nowrap',
							'onesie',
							'paginator',
							'paginations',
							'pathname',
							'rowspan',
							'Seahawks',
							'Segoe',
							'semibold',
							'slideover',
							'slideovers',
							'spacebar',
							'submenu',
							'svg',
							'SVGQR',
							'SVGVR',
							'tbody',
							'textareas',
							'textfield',
							'tfoot',
							'thead',
							'textarea',
							'tooltip',
							'tsx',
							'unfilter',
							'url',
							'vue',
							'whitespace',
							'workoutweights',
							'xlarge',
							'xxlarge',
							'xmd',
							'zindex',
						],
					},
					generateSuggestions: true,
				},
			],
			'@stylistic/array-bracket-newline': [
				'error',
				{ minItems: 2, multiline: true },
			],
			'@stylistic/array-bracket-spacing': [
				'error',
				'never',
			],
			'@stylistic/array-element-newline': [
				'error',
				{
					ArrayExpression: { minItems: 2, multiline: true },
					ArrayPattern: { minItems: 2, multiline: true },
				},
			],
			'@stylistic/arrow-parens': [
				'error',
				'as-needed',
			],
			'@stylistic/arrow-spacing': 'error',
			'@stylistic/block-spacing': 'error',
			'@stylistic/comma-dangle': [
				'error',
				{
					arrays: 'always-multiline',
					exports: 'always-multiline',
					functions: 'never',
					imports: 'always-multiline',
					objects: 'always-multiline',
				},
			],
			'@stylistic/comma-spacing': [
				'error',
				{ after: true, before: false },
			],
			'@stylistic/computed-property-spacing': [
				'error',
				'never',
				{ enforceForClassMembers: true },
			],
			'@stylistic/function-call-argument-newline': [
				'error',
				'consistent',
			],
			'@stylistic/function-call-spacing': [
				'error',
				'never',
			],
			'@stylistic/indent': [
				'error',
				'tab',
				{
					ArrayExpression: 1,
					FunctionDeclaration: { body: 1, parameters: 1 },
					FunctionExpression: { body: 1, parameters: 1 },
					ImportDeclaration: 1,
					MemberExpression: 1,
					ObjectExpression: 1,
					SwitchCase: 1,
					VariableDeclarator: 1,
					flatTernaryExpressions: true,
					ignoreComments: true,
				},
			],
			'@stylistic/jsx-quotes': [
				'error',
				'prefer-double',
			],
			'@stylistic/jsx-self-closing-comp': [
				'error',
				{ component: true, html: true },
			],
			'@stylistic/jsx-closing-bracket-location': [
				'error',
				'line-aligned',
			],
			'@stylistic/jsx-first-prop-new-line': [
				'error',
				'multiprop',
			],
			'@stylistic/jsx-max-props-per-line': [
				'error',
				{ maximum: 2, when: 'always' },
			],
			'@stylistic/no-mixed-spaces-and-tabs': [
				'error',
				'smart-tabs',
			],
			'@stylistic/no-multiple-empty-lines': [
				'error',
				{ max: 1, maxBOF: 0 },
			],
			'@stylistic/object-curly-newline': [
				'error',
				{
					ExportDeclaration: { minProperties: 3, multiline: true },
					ImportDeclaration: { minProperties: 3, multiline: true },
					ObjectExpression: { minProperties: 3, multiline: true },
					ObjectPattern: { minProperties: 3, multiline: true },
				},
			],
			'@stylistic/object-curly-spacing': [
				'error',
				'always',
			],
			'@stylistic/object-property-newline': [
				'error',
				{ allowAllPropertiesOnSameLine: true },
			],
			'@stylistic/padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					next: 'return',
					prev: '*',
				},
				{
					blankLine: 'always',
					next: [
						'block-like',
						'multiline-block-like',
					],
					prev: [
						'block-like',
						'multiline-block-like',
					],
				},
				{
					blankLine: 'always',
					next: '*',
					prev: [
						'const',
						'let',
						'var',
					],
				},
				{
					blankLine: 'any',
					next: [
						'const',
						'let',
						'var',
					],
					prev: [
						'const',
						'let',
						'var',
					],
				},
				{
					blankLine: 'never',
					next: 'empty',
					prev: 'empty',
				},
			],
			'@stylistic/quote-props': [
				'error',
				'as-needed',
			],
			'@stylistic/semi': [
				'error',
				'never',
			],
			'@stylistic/space-before-blocks': 'error',
			'@stylistic/space-before-function-paren': [
				'error',
				{
					anonymous: 'always',
					asyncArrow: 'always',
					named: 'never',
				},
			],
			'@stylistic/switch-colon-spacing': 'off',
			'@stylistic/type-annotation-spacing': 'error',
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/consistent-type-definitions': 'error',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					format: null,
					modifiers: ['requiresQuotes'],
					selector: [
						'classProperty',
						'objectLiteralProperty',
						'typeProperty',
						'classMethod',
						'objectLiteralMethod',
						'typeMethod',
						'accessor',
						'enumMember',
					],
				},
				{
					filter: { match: true, regex: '^_$' },
					format: null,
					selector: 'parameter',
				},
				{
					format: ['camelCase'],
					leadingUnderscore: 'allow',
					selector: 'parameter',
				},
				{
					format: ['camelCase'],
					selector: 'variable',
				},
				{
					format: [
						'camelCase',
						'PascalCase',
						'UPPER_CASE',
					],
					modifiers: ['const'],
					selector: 'variable',
				},
				{
					format: [
						'camelCase',
						'PascalCase',
					],
					leadingUnderscore: 'allow',
					selector: 'function',
				},
				{
					format: ['camelCase'],
					leadingUnderscore: 'allow',
					selector: 'variable',
				},
				{
					format: ['camelCase'],
					selector: 'variableLike',
				},
			],
			'@typescript-eslint/no-duplicate-enum-values': 'error',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-empty-interface': 'error',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-this-alias': 'error',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-vars': [
				"error",
				{ argsIgnorePattern: "^_" },
			],
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/sort-type-constituents': 'error',

			eqeqeq: 'error',
			'key-spacing': 'error',
			'keyword-spacing': 'error',
			'max-len': [
				'error',
				{
					code: 140,
					ignoreComments: true,
					ignoreStrings: true,
					ignoreTrailingComments: true,
					ignoreUrls: true,
				},
			],
			'no-console': [
				'error',
				{
					allow: [
						'error',
						'info',
						'time',
						'timeEnd',
						'warn',
					],
				},
			],
			'no-const-assign': 'error',
			'no-duplicate-case': 'error',
			'no-extra-parens': 'error',
			'no-extra-semi': 'error',
			'no-fallthrough': 'error',
			'no-irregular-whitespace': 'error',
			'no-magic-numbers': [
				'error',
				{
					detectObjects: true,
					enforceConst: true,
					ignore: [
						0,
						1,
						-1,
						'1n',
						2,
						3,
					],
					ignoreArrayIndexes: true,
				},
			],
			'no-multi-spaces': [
				'error',
				{ ignoreEOLComments: false },
			],
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						"^\\.\\./.*",
						"^(?!\\./)(?!@/).*",
					],
				},
			],
			'no-trailing-spaces': 'error',
			'no-var': 'error',
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
			'prefer-const': 'error',
			'prefer-object-spread': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react-hooks/rules-of-hooks': 'error',
			'simple-import-sort/exports': 'error',
			'simple-import-sort/imports': 'error',
			'sort-vars': 'error',
			'unicorn/empty-brace-spaces': 'error',
		},
	},
	{
		files: ['src/types/jsx.d.ts'],
		rules: { '@typescript-eslint/no-empty-interface': 'off' },
	},
	{
		files: ['vite.config.ts'],
		rules: { 'no-magic-numbers': 'off' },
	},
	{
		files: [
			'**/*.test.{ts,tsx}',
			'src/App.tsx',
		],
		rules: { 'no-magic-numbers': 'off' },
	},
	{
		files: ['**/*.tsx'],
		rules: {
			'perfectionist/sort-interfaces': [
				'error',
				{
					ignoreCase: true,
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'perfectionist/sort-object-types': [
				'error',
				{
					ignoreCase: true,
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'perfectionist/sort-modules': [
				'error',
				{
					groups: [
						[
							'export-default-class',
							'export-class',
							'class',
						],
						[
							'export-default-function',
							'export-function',
							'function',
							'declare-function',
						],
						[
							'export-enum',
							'enum',
							'declare-enum',
						],
						'unknown',
						[
							'export-interface',
							'interface',
							'declare-interface',
						],
						[
							'export-type',
							'type',
							'declare-type',
						],
					],
				},
			],
		},
	},
]
/* eslint-enable no-magic-numbers */
