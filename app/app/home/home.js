(function (angular) {
    'use strict';

    angular
        .module('myApp.home', ['libraries', 'myApp.models.messages'])
        .config(stateConfig)
        .controller('HomeController', HomeController);


    HomeController.$inject = ['Messages', 'StarWarsMoviesService'];

    function HomeController(Messages, StarWarsMoviesService, MoviePosterService) {
        var vm = this;
        vm.title = 'Home Page';
        vm.body = 'This is the about home body';

        vm.message = Messages.getMessage();

        vm.updateMessage = function (m) {
            Messages.setMessage(m);
        };

        StarWarsMoviesService.getMovies();

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