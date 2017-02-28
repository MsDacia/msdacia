define([
	'backbone',
	'models/navigationMenuModel'
], function (Backbone, NavigationMenuModel) {

	var NavigationMenuCollection = Backbone.Collection.extend({
		model: NavigationMenuModel,
		url: 'assets/json/navigation-menu.json',
		parse: function(data) {
			return data;
		}
	});

	return NavigationMenuCollection;

});
