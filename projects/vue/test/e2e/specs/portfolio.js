// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Portfolio': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL + '#/portfolio')
			.waitForElementVisible('#app', 5000)

		browser.end()
	}
}
