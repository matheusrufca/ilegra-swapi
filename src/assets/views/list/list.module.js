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
		$stateProvider
			.state('starships', {
				url: '/starships',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'starships';
					},
					modelType: function () {
						return 'starship';
					},
					Items: getResource('starships')
					// Items: getResource('planets')
					// Movies: getResource('films'),
					// Starships: getResource('starships'),
					// Vehicles: getResource('vehicles'),
					// Species: getResource('species'),
				}
			})
			.state('vehicles', {
				url: '/vehicles',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'vehicles';
					},
					modelType: function () {
						return 'vehicle';
					},
					Items: getResource('vehicles')
				}
			})
			.state('species', {
				url: '/species',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'species';
					},
					modelType: function () {
						return 'specie';
					},
					Items: getResource('species')
				}
			})
			.state('planets', {
				url: '/planets',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'planets';
					},
					modelType: function () {
						return 'planet';
					},
					Items: getResource('planets')
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