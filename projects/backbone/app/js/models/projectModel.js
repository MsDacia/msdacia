define([
	'backbone'
], function (Backbone) {

	var Project = Backbone.Model.extend({
		defaults: function() {
			return {
				year: "",
				color: "",
				image: "",
				link: "",
				external: "",
				name: "",
				text: "",
				link2: "",
				height: "",
				width: ""
			}
		}
	});

	return Project;

});
