define([
	'backbone'
], function (Backbone) {

	var Menu = Backbone.Model.extend({
		defaults: function() {
			return {
				link: "",
				name: "",
				title: ""
			}
		}
	});

	return Menu;

});
