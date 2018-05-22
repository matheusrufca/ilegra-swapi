(function (angular, $) {
	'use strict';

	angular.module('mr.slick-carousel', [])
		.constant('slickDefaultSettings', {
			infinite: true,
			dots: true,
			slidesToShow: 3

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
		};

		function linkFn(scope, element, attrs) {
			var $carousel, settings = angular.extend(slickDefaultSettings, scope.settings || {});

			$timeout(function () {
				$carousel = element.find('.items-container');
				$carousel.slick(settings);
			});

			console.debug('slickDirective', scope, element, attrs);
			console.debug('slickDirective.settings', settings);
		}
	}
})(window.angular, window.jQuery);