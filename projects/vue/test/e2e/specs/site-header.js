// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Site Header': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL)
			.waitForElementVisible('#app', 5000)

		browser.expect.element('.container header .menu a:first-child').text.to.equal('Home')
		browser.expect.element('.container header .menu a:nth-child(2)').text.to.equal('About')
		browser.expect.element('.container header .menu a:nth-child(3)').text.to.equal('Resume')
		browser.expect.element('.container header .menu a:nth-child(4)').text.to.equal('Portfolio')

		browser.end()
	}
}
