(function (angular) {
	'use strict';
	var templateUrl;

	templateUrl = 'views/list/tpl-movie-view.html'

	angular
		.module('app.ui.list.directives')
		.directive('movieItemView', movieItemViewDirective);


	movieItemViewDirective.$inject = ['MoviePosterService'];


	function movieItemViewDirective(MoviePosterService) {
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
})(window.angular);