(function (angular) {
	'use strict';


	angular
		.module('app.ui.components')
		.directive('sidebarMenu', SidebarMenuDirective);

	function SidebarMenuDirective($timeout) {
		var htmlTemplate;

		htmlTemplate = [
			'<div class="sidebar-menu list-group">',
			'<a  ng-repeat="item in items" ui-href="{{item.resource}}" ng-bind="item.title"',
			'href="" class="list-group-item list-group-item-action text-capitalize"></a>',
			'</div>'
		].join('');

		return {
			template: htmlTemplate,
			link: linkFn,
			retrict: 'E',
			scope: {
				items: '='
			}
		};

		function linkFn(scope, element, attrs) {
			console.debug('sidebar-menu', scope, element, attrs);
		}
	}
})(window.angular);