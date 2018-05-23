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
        'app.helpers',
        'app.services',
        'app.ui'
    ]);

    angular.module('app.constants').constant('appSidebarItens', [{
        title: 'Movies',
        resource: 'films',
        url: '/movies'
    }, {
        title: 'Starships',
        resource: 'starships',
        url: '/starships'
    }, {
        title: 'Vehicles',
        resource: 'vehicles',
        url: '/vehicles'
    }, {
        title: 'Species',
        resource: 'species',
        url: '/species'
    }, {
        title: 'Planets',
        resource: 'planets',
        url: '/planets'
    }]);


    angular.module('app.configs').config(stateConfig)


    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true
            });

        $urlRouterProvider.otherwise('/home');
    };


})(window.angular);