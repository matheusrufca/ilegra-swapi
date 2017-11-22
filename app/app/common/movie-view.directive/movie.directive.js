/**
 * @namespace app.directives
 */

(function () {
	'use strict';
	var templateUrl;

	templateUrl = 'app/common/movie-view.directive/tpl-movie-view.html'

	angular
		.module('app.directives', [])
		.directive('movieItemView', movieItemView);

	movieItemView.$inject = ['$window', '$timeout', '$compile', '$rootScope', 'MoviePosterService'];



	function movieItemView($window, $timeout, $compile, $rootScope, MoviePosterService) {
		var self = {},
			linkFn;

		linkFn = function (scope, element, attrs) {

			scope.content.id = getContentId(scope.content.url);

			MoviePosterService.getPoster(scope.content.title).then(function (posterUrl) {
				scope.content.posterUrl = posterUrl;
			});
		};


		return {
			restrict: 'E',
			link: linkFn,
			templateUrl: templateUrl,
			scope: {
				content: '='
			}
		};

		function getContentId(contentUrl) {
			return (contentUrl || '').split('/').splice(-2).join('');
		};
	};



	//TODO: move function to global 
	window.toggleState = function toggleState(state, currentState) {
		if (state !== undefined) {
			state = !!state;
		} else {
			state = !(!!currentState);
		}
		return state;
	};
})();