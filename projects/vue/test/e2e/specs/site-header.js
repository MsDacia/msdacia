// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Site Header': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL)
			.waitForElementVisible('#app', 5000)

		browser.expect.element('.wrapper .container header .main a:first-child')

		browser.end()
	}
}
