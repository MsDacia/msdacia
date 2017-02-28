define([
	'jquery',
	'underscore',
	'backbone',
	'lazyload',
	'views/portfolio/masonryView',
	'text!templates/portfolioTemplate.html'
], function($, _, Backbone, lazyload, MasonryView, portfolioTemplate){

  var PortfolioView = Backbone.View.extend({
	el: $("#wrapper"),

	initialize: function(){
		this.childView = new MasonryView({model: this.model});
		this.render();
	},

	render: function(){
		this.$el.html(portfolioTemplate);
		this.childView.$el = this.$('#masonry');
		this.childView.render();
		this.childView.delegateEvents();
	}

  });

	return PortfolioView;

});
