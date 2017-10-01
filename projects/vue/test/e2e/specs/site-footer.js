// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'Site Footer': function (browser) {
		const { devServerURL } = browser.globals

		browser
			.url(devServerURL)
			.waitForElementVisible('#app', 5000)

		browser.expect.element('footer div div a:nth-child(1)').href.to.equal('mailto:msdessin@gmail.com?subject=MsDacia.com').title.to.equal('Email')

		browser.expect.element('footer div div a:nth-child(2)').href.to.equal('http://www.facebook.com/#!/msdacia').title.to.equal('Facebook')

		browser.expect.element('footer div div a:nth-child(3)').href.to.equal('http://www.linkedin.com/in/dessin').title.to.equal('LinkedIn')

		browser.expect.element('footer div div a:nth-child(4)').href.to.equal('http://www.twitter.com/MsDaciaJ').title.to.equal('Twitter')

		browser.expect.element('footer div div a:nth-child(5)').href.to.equal('https://www.instagram.com/msdacia1/').title.to.equal('Instagram')

		browser.expect.element('footer div div a:nth-child(6)').href.to.equal('https://github.com/MsDacia').title.to.equal('Github')

		browser.expect.element('footer div div a:nth-child(7)').href.to.equal('https://jsfiddle.net/user/MsDacia/fiddles/').title.to.equal('JSFiddle')

		browser.expect.element('footer div div a:nth-child(8)').href.to.equal('http://allrecipes.com/cook/msdacia/').title.to.equal('Allrecipes.com')

		browser.expect.element('footer div div a:nth-child(8)').href.to.equal('skype:msdacia1?userinfo').title.to.equal('Skype')

		browser.expect.element('footer div div a:nth-child(10)').href.to.equal('http://msdacia.yelp.com/').title.to.equal('Yelp')

		browser.end()
	}
}
