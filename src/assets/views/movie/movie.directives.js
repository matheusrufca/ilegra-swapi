(function (angular) {
	'use strict';
	var templateUrl;

	templateUrl = 'views/movie/movie-info.tpl.html';

	angular
		.module('app.ui.movie.directives')
		.directive('movieInfo', movieInfoDirective);

	movieInfoDirective.$inject = ['$window', '$timeout', '$compile', '$rootScope', 'MoviePosterService'];


	function movieInfoDirective($window, $timeout, $compile, $rootScope, MoviePosterService) {
		var linkFn;

		linkFn = function (scope, element, attrs) {
			scope.content.id = getContentId(scope.content.url);

			MoviePosterService.getPoster(scope.content.title).then(function (posterUrl) {
				scope.content.posterUrl = posterUrl;
			});
		};


		return {
			restrict: 'E',
			link: linkFn,
			controller: ['$scope', directiveController],
			templateUrl: templateUrl,
			scope: {
				content: '='
			}
		};

		function getContentId(contentUrl) {
			return (contentUrl || '').split('/').splice(-2).join('');
		};

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('movieInfoDirective.getPropertyName()', err);
				}
				return output;
			}
		}
	};
})(window.angular);