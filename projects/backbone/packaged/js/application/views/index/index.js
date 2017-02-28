define([
	'jquery',
	'underscore',
	'backbone',
	'text!views/index/helpers/index.html',
	], function($, _, Backbone, indexTemplate) {
		var indexView = Backbone.View.extend({
			el: 'body',

			render: function() {
				$(this.el).append(_.template(indexTemplate));
			}
		});
		
		return new indexView;
	});