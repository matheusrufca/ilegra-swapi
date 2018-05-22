(function (angular, $) {
	'use strict';

	angular.module('mr.slick-carousel', [])
		.constant('slickDefaultSettings', {
			infinite: true,
			centerMode: true,
			dots: true,
			slidesPerRow: 4
		})
		.directive('carousel', slickDirective);


	slickDirective.$inject = ['slickDefaultSettings'];

	function slickDirective(slickDefaultSettings) {
		var htmlTemplate = [
			'<div class="carousel-wrapper">',
			'<div class="carousel"></div>',
			'</div>'
		].join('');

		return {
			retrict: 'E',
			template: htmlTemplate,
			link: linkFn,
			scope: {
				items: '=',
				settings: '='
			}
		}

		function linkFn(scope, element, attrs) {
			var settings = angular.extend(scope.settings || {}, slickDefaultSettings),
				$carousel = element.find('.carousel');

			$carousel.slick(settings);


			console.debug('slickDirective', scope, element, attrs);
		}
	}
})(window.angular, window.jQuery);