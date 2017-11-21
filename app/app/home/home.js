(function (angular) {
    'use strict';
    angular
        .module('myApp.home', ['libraries', 'myApp.models.messages'])
        .config(stateConfig)
        .factory('swapiApiService', swapiApiService)
        .controller('HomeController', HomeController);

    swapiApiService.$inject = ['$q', 'swapiService'];


    function swapiApiService($q, swapiService) {
        var self = {};


        self.getMovies = function () {
            var promise = swapiService.films();

            promise
                .then(function (response) {
                    console.debug('movies', response);
                })
                .catch(function (err) {
                    console.warn(err);
                })

            return promise;
        };


        return {
            getMovies: self.getMovies
        };
    };


    HomeController.$inject = ['Messages', 'swapiApiService'];

    function HomeController(Messages, swapiApiService) {
        var vm = this;
        vm.title = 'Home Page';
        vm.body = 'This is the about home body';

        vm.message = Messages.getMessage();

        vm.updateMessage = function (m) {
            Messages.setMessage(m);
        };

        swapiApiService.getMovies();

    };


    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/home/home.tmpl.html',
            controller: 'HomeController as home'
        });
    };
})(this.angular)