(function (angular) {
    'use strict';


    angular.module('app.configs').config(stateConfig)

    stateConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function stateConfig($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true
            });

        $urlRouterProvider.otherwise('/home');
        $locationProvider.hashPrefix('');
    }

})(window.angular);