(function (angular) {
	'use strict';
	angular.module('app.ui.movie.services', []);
	angular.module('app.ui.movie.directives', []);
	angular.module('app.ui.movie.controllers', []);

	angular.module('app.ui.movie', [
		'libraries',
		'app.ui.movie.services',
		'app.ui.movie.directives',
		'app.ui.movie.controllers'
	]);

	angular.module('app.ui.movie').config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {
		$stateProvider.state('movie', {
			url: '/movie/:id',
			templateUrl: 'views/movie/index.html',
			controller: 'MovieDetailController as view',
			resolve: {
				resourceType: function () {
					return 'film';
				},
				Movie: ['StarWarsApiService', '$transition$', function (StarWarsApiService, $transition) {
					var contentId = $transition.params().id;
					return StarWarsApiService.getSpecificResource('film', contentId);
				}]
			}
		});
	};
})(window.angular);