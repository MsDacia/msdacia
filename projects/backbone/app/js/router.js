// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/homeView',
	'views/homeLinkView',
	'views/backToBottomView',
	'views/backToTopView',
	'views/aboutView',
	'views/poetryView',
	'views/portfolio/portfolioView',
	'views/resumeView',
	'views/convictionsView',
	'views/navigationView',
	'views/footerView',
	'collections/projectCollection',
	'collections/navigationMenuCollection'
], function($, _, Backbone, HomeView, HomeLinkView, BackToBottomView, BackToTopView, AboutView, PoetryView, PortfolioView, ResumeView, ConvictionsView, NavigationView, FooterView, ProjectCollection, NavigationMenuCollection) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define some URL routes
			'about': 'showAbout',
			'poetry': 'showPoetry',
			'portfolio': 'showPortfolio',
			'resume': 'showResume',
			'convictions': 'showConvictions',

			'*actions': 'defaultRoute'
		}
	});

	var initialize = function(){
	var app_router = new AppRouter;

	app_router.on('route:showAbout', function(){
		var aboutView = new AboutView();
		aboutView.render();
	});

	app_router.on('route:showPoetry', function(){
		var poetryView = new PoetryView();
		poetryView.render();
	});

	app_router.on('route:showPortfolio', function(){
		var portfolioView = new PortfolioView();
		portfolioView.render();
	});

	app_router.on('route:showResume', function(){
		var resumeView = new ResumeView();
		resumeView.render();
	});

	app_router.on('route:showConvictions', function(){
		var convictionsView = new ConvictionsView();
		convictionsView.render();
	});

	app_router.on('route:defaultRoute', function(actions) {
		var homeView = new HomeView();
		homeView.render();
	});

	var homeLinkView = new HomeLinkView();
	homeLinkView.render();

	var backToBottomView = new BackToBottomView();
	backToBottomView.render();

	var backToTopView = new BackToTopView();
	backToTopView.render();

	var navigationView = new NavigationView();
	navigationView.render();

	var footerView = new FooterView();
	footerView.render();

	Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});
