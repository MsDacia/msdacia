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
	'rules': {
		'eol-last': ['error', 'always'],
		'func-call-spacing': ['error', 'never'],
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-return-assign': ['error', 'always'],
		'no-self-assign': 'error',
		'no-trailing-spaces': 'error',
		'no-useless-call': 'error',
		'no-var': 'error',
		'semi': ['error', 'never']
	}
}
