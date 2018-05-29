angular.module('msdacia', []).controller('MainController', ['$http', function($http) {

	this.projects = [];
	var self = this;

	$http.get('static/json/projects.json').then(function(response) {
		self.projects = response.data;
		self.filteredProjects = self.projects;
	});
}]);
