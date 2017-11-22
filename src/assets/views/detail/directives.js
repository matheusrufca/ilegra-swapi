(function (angular) {
	'use strict';
	var templateUrl;

	templateUrl = 'views/detail/movie-info.tpl.html';

	angular
		.module('app.ui.detail.directives', [])
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
			templateUrl: templateUrl,
			scope: {
				content: '='
			}
		};

		function getContentId(contentUrl) {
			return (contentUrl || '').split('/').splice(-2).join('');
		};
	};
})(window.angular);