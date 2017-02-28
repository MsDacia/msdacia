define([
	'jquery',
	'underscore',
	'backbone',
	'lazyload',
	'models/projectModel',
	'collections/projectCollection',
	'text!templates/portfolioTemplate.html'
], function($, _, Backbone, lazyload, ProjectModel, ProjectCollection, portfolioTemplate){

  var MasonryView = Backbone.View.extend({
		el: $("#masonry"),

		collection: new ProjectCollection(),

		initialize: function(){
			var scope = this;
			this.collection.fetch({
				success: function() {
					scope.render();
				}
			});
		},

		render: function(){
			var initMasonry = function() {
				// masonry
				var $container = $('#masonry');
				var $dl = $container.children('dl');
				var $overlay = $('<div class="overlay"></div>');

				$container.find('img').each(function() {
					$(this).lazyload({
						effect : "fadeIn"
					})
				});

				$container.find('dl').each(function() {
					$(this).hover(function() {
						$overlay.appendTo(this).siblings('dd').show();
					},function(){
						$overlay.siblings('dd').hide();
						$overlay.remove();
					});

					// Bind the tapHandler callback function to the tap event
					$(this).on('taphold', function(){
						$overlay.siblings('dd').hide();
						$overlay.remove();
						$overlay.appendTo(this).siblings('dd').show();
					});
				});
			};

			var scope = this;
			this.collection.forEach(function(model) {
				scope.output(model.toJSON());
			});

			initMasonry();

			return this;
		},

		output: function(model) {
			var project = "<dl>" +
				"<dt>" +
					"<span>" + model.year + " | " + model.name + "</span><br />" +
					"<img src=\"assets/images/projects/" + model.image + "\"" + "alt=\"" + model.name + "\" title=\"" + model.name + "\" width=\"" + model.width + "\" height=\"" + model.height + "\" />" +
				"</dt>" +
				"<dd>" +
					"<p>";

				if (model.link.length !== 0) {
					project += "<a href=\"" + model.link + "\" target=\"_blank\" class=\"" + model.external + "\">";
				 }
					project += "<em>" + model.name + "</em>" +
							"<span>" + model.year + "</span>";

				if (model.link.length !== 0) {
					project += "</a>";
				 }
					project += "</p>" +
					"<p>" +
						"<span>" + model.text + "</span><br />" +
						"<em>&mdash; " + model.client + "</em>";

				if (model.link2.length !== 0) {
					project +=	"<a href=\"" + model.link2 + "\" target=\"_blank\" class=\"" + model.link + "\" title=\"Live\">" + model.name + "</a>";
				 }
					project += "</p>" +
				"</dd>" +
			"</dl>";

			this.$el.append(project);
		}

	});

  return MasonryView;

});
