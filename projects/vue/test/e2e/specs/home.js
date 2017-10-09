// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Home': function (browser) {
		const { devServerURL } = browser.globals //Destructuring assignment, so I do not have to repeat the variable name

		browser
			.url(devServerURL)
			.waitForElementVisible('#app', 5000)
			.assert.containsText('a.nav-link.current', 'Home')
			.end()
	}
}
