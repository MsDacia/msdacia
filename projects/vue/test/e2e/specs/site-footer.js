// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Site Footer': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL)
			.waitForElementVisible('#app', 5000)

		browser.expect.element('footer .grid .row a:first-child')
			.to.have.attribute('href').equals('mailto:msdessin@gmail.com?subject=MsDacia.com')
			.to.have.attribute('title').equals('Email')

		browser.expect.element('footer .grid .row a:nth-child(2)')
			.to.have.attribute('href').equals('http://www.facebook.com/#!/msdacia')
			.to.have.attribute('title').equals('Facebook')

		browser.expect.element('footer .grid .row a:nth-child(3)')
			.to.have.attribute('href').equals('http://www.linkedin.com/in/dessin')
			.to.have.attribute('title').equals('LinkedIn')

		browser.expect.element('footer .grid .row a:nth-child(4)')
			.to.have.attribute('href').equals('http://www.twitter.com/MsDaciaJ')
			.to.have.attribute('title').equals('Twitter')

		browser.expect.element('footer .grid .row a:nth-child(5)')
			.to.have.attribute('href').equals('https://www.instagram.com/msdacia1/')
			.to.have.attribute('title').equals('Instagram')

		browser.expect.element('footer .grid .row a:nth-child(6)')
			.to.have.attribute('href').equals('https://github.com/MsDacia')
			.to.have.attribute('title').equals('Github')

		browser.expect.element('footer .grid .row a:nth-child(7)')
			.to.have.attribute('href').equals('https://jsfiddle.net/user/MsDacia/fiddles/')
			.to.have.attribute('title').equals('JSFiddle')

		browser.expect.element('footer .grid .row a:nth-child(8)')
			.to.have.attribute('href').equals('http://allrecipes.com/cook/msdacia/')
			.to.have.attribute('title').equals('Allrecipes.com')

		browser.expect.element('footer .grid .row a:nth-child(8)')
			.to.have.attribute('href').equals('skype:msdacia1?userinfo')
			.to.have.attribute('title').equals('Skype')

		browser.expect.element('footer .grid .row a:last-child')
			.to.have.attribute('href').equals('http://msdacia.yelp.com/')
			.to.have.attribute('title').equals('Yelp')

		browser.expect.element('footer .copyright a')
			.to.have.attribute('href').equals('http://msdacia.com/')
			.text.to.equal('MsDacia')

		browser.end()
	}
}
