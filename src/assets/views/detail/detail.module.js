(function (angular) {
	'use strict';
	angular.module('app.ui.detail.services', []);
	angular.module('app.ui.detail.directives', []);
	angular.module('app.ui.detail.controllers', []);

	angular.module('app.ui.detail', [
		'libraries',
		'app.ui.detail.services',
		'app.ui.detail.directives',
		'app.ui.detail.controllers'
	]);

	angular.module('app.ui.detail').config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {
		$stateProvider.state('detail', {
			url: '/detail/:id',
			templateUrl: 'views/detail/index.html',
			controller: 'MovieDetailController as detail',
			resolve: {
				Movie: function (StarWarsMoviesService, $transition$) {
					var contentId = $transition$.params().id;
					return StarWarsMoviesService.getMovie(contentId);
				}
			}
		});
	};
})(window.angular);