module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	rules: {
		'complexity': ['error', 20],
		'jsx-quotes': ['error', 'prefer-double'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-redeclare': 'off',
		'no-useless-computed-key': 'error',
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		'space-before-function-paren': ['error', {
			anonymous: 'always',
			asyncArrow: 'always',
			named: 'never',
		}],
		'vue/return-in-computed-property': 'off',
	},
}
