angular.module('msdacia', []).controller('MainController', ['$http', function($http) {

	this.content = [];
	var self = this;

	$http.get('static/json/static.en-us.json').then(function(response) {
		self.content = response.data;
		//self.filteredProjects = self.content;
	});
}]);
