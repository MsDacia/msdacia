require.config({
	paths: {
		jquery: '../libs/jquery/jquery.min',
		underscore: '../libs/underscore/underscore.min',
		backbone: '../libs/backbone/backbone.min'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
	}
});

require(['app'], function(App) {
	App.init();
});