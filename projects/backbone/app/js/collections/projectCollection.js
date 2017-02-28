define([
	'backbone',
	'models/projectModel'
], function (Backbone, ProjectModel) {

	var ProjectCollection = Backbone.Collection.extend({
		model: ProjectModel,
		url: 'assets/json/projects.json',
		parse: function(data) {
			return data;
		}
	});

	return ProjectCollection;

});
