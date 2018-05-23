(function (angular) {
	'use strict';


	// Initialize module of this module :)

	angular.module('app.ui.list.configs', []);
	angular.module('app.ui.list.directives', []);
	angular.module('app.ui.list.services', []);
	angular.module('app.ui.list.controllers', []);

	angular.module('app.ui.list', [
		'libraries',
		'app.ui.list.configs',
		'app.ui.list.services',
		'app.ui.list.directives',
		'app.ui.list.controllers'
	]);

})(window.angular);