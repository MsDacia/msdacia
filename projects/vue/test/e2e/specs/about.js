// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'About': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL + '#/about')
			.waitForElementVisible('#app', 5000)

		browser.end()
	}
}
