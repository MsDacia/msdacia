// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Resume': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL + '#/resume')
			.waitForElementVisible('#app', 5000)

		browser.end()
	}
}
