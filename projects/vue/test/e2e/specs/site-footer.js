// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Site Footer': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL)
			.waitForElementVisible('#app', 5000)

		browser.expect.element('.wrapper .container .grid .row a:first-child').href.to.equal('mailto:msdessin@gmail.com?subject=MsDacia.com')

		browser.expect.element('.wrapper .container .grid .row a:nth-child(2)').href.to.equal('http://www.facebook.com/#!/msdacia')

		browser.expect.element('.wrapper .container .grid .row a:nth-child(3)').href.to.equal('http://www.linkedin.com/in/dessin')

		browser.expect.element('.wrapper .container .grid .row a:nth-child(4)').href.to.equal('http://www.twitter.com/MsDaciaJ')

		browser.expect.element('.wrapper .container .grid .row a:nth-child(5)').href.to.equal('https://www.instagram.com/msdacia1/')

		browser.expect.element('.wrapper .container .grid .row a:nth-child(6)').href.to.equal('https://github.com/MsDacia')

		browser.expect.element('.wrapper .container .grid .row a:nth-child(7)').href.to.equal('https://jsfiddle.net/user/MsDacia/fiddles/')

		browser.expect.element('.wrapper .container .grid .row a:nth-child(8)').href.to.equal('http://allrecipes.com/cook/msdacia/')

		browser.expect.element('.wrapper .container .grid .row a:nth-child(8)').href.to.equal('skype:msdacia1?userinfo')

		browser.expect.element('.wrapper .container .grid .row a:last-child').href.to.equal('http://msdacia.yelp.com/')

		browser.end()
	}
}
