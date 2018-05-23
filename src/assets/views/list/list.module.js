(function (angular) {
	'use strict';


	// Initialize module of this module :)

	angular.module('app.ui.list.directives', []);
	angular.module('app.ui.list.services', []);
	angular.module('app.ui.list.controllers', []);

	angular.module('app.ui.list', [
		'libraries',
		'app.ui.list.services',
		'app.ui.list.directives',
		'app.ui.list.controllers'
	]);


	// set module config like $route configs

	angular.module('app.ui.list').config(stateConfig);

	stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];


	function stateConfig($stateProvider, $urlRouterProvider) {
		$stateProvider.state('list', {
			url: '/list',
			templateUrl: 'views/list/index.html',
			controller: 'ListController',
			controllerAs: 'list',
			resolve: {
				Items: getResource('planets')
				// Movies: getResource('films'),
				// Starships: getResource('starships'),
				// Vehicles: getResource('vehicles'),
				// Species: getResource('species'),
			}
		});


		function getResource(resource) {
			return ['StarWarsApiService', getResourceFactory];

			function getResourceFactory(StarWarsApiService) {
				return StarWarsApiService.getResource(resource);
			}
		}
	}

})(window.angular);