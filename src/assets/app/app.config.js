(function (angular) {
    'use strict';

    
    angular.module('app.configs').config(stateConfig)

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true
            });

        $urlRouterProvider.otherwise('/home');
    }

})(window.angular);