(function (angular, $) {
	'use strict';

	angular.module('mr.slick-carousel', [])
		.constant('slickDefaultSettings', {
			infinite: true,
			// centerMode: true,
			dots: true,
			// slidesPerRow: 4
		})
		.directive('carousel', slickDirective);


	slickDirective.$inject = ['$timeout', 'slickDefaultSettings'];

	function slickDirective($timeout, slickDefaultSettings) {
		var htmlTemplate = [
			'<div class="carousel-wrapper">',
			'<div class="carousel"><ng-transclude></ng-transclude></div>',
			'</div>'
		].join('');

		return {
			retrict: 'AE',
			template: htmlTemplate,
			link: linkFn,
			transclude: true,
			scope: {
				items: '=',
				settings: '='
			}
		}

		function linkFn(scope, element, attrs) {
			var settings = angular.extend(scope.settings || {}, slickDefaultSettings),
				$carousel = element.find('.carousel').children();

			$timeout(function () {
				$carousel.slick(settings);
			});

			console.debug('slickDirective', scope, element, attrs);
		}
	}
})(window.angular, window.jQuery);