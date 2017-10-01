// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Site Header': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL)
			.waitForElementVisible('#app', 5000)

		browser.expect.element('.navbar li:nth-child(1) a').text.to.equal('Home')
		browser.expect.element('.navbar li:nth-child(2) a').text.to.equal('About')
		browser.expect.element('.navbar li:nth-child(3) a').text.to.equal('Resume')
		browser.expect.element('.navbar li:nth-child(4) a').text.to.equal('Portfolio')

		browser.end()
	}
}
