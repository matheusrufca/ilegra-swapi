(function (angular) {
    'use strict';

    // Initialize module of this module :)

    angular.module('app.ui.home.directives', []);
    angular.module('app.ui.home.services', []);
    angular.module('app.ui.home.controllers', []);

    angular.module('app.ui.home', [
            'libraries',
            'app.constants',
            'app.ui.home.services',
            'app.ui.home.directives',
            'app.ui.home.controllers'
        ])
        .config(stateConfig);


    // set module config like $route configs

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/home/index.html',
            controller: 'HomeController',
            controllerAs:'home',
            resolve: {
                Movies: getResource('films')
            }
        });


        function getResource(resource) {
            return ['StarWarsApiService', getResourceFactory];

            function getResourceFactory(StarWarsApiService) {
                return StarWarsApiService.getResource(resource);
            }
        }
    }

})(window.angular);