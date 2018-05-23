(function (angular) {
    'use strict';

    angular.module('app.constants', []);
    angular.module('app.helpers', []);
    angular.module('app.services', []);
    angular.module('app.configs', []);


    angular.module('app.ui', [
        'app.ui.home',
        'app.ui.list',
        'app.ui.detail'
    ]);

    angular.module('app', [
        'libraries',
        'app.constants',
        'app.configs',
        'app.helpers',
        'app.services',
        'app.ui'
    ]);


})(window.angular);