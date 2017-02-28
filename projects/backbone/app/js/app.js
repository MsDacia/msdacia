// Filename: app.js
define([
	'jquery',
	'underscore',
	'backbone',
	'lazyload',
	'router' // Request router.js
	], function($, _, Backbone, lazyload, Router){
		var initialize = function(){

		// Pass in our Router module and call it's initialize function
		Router.initialize();
	}

	return {
		initialize: initialize
	};
});
