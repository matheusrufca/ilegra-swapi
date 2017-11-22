(function (angular) {
    'use strict';

    angular
        .module('myApp.home', ['libraries', 'app.directives'])
        .config(stateConfig)
        .controller('HomeController', HomeController);


    // HomeController.$inject = ['Movies'];

    function HomeController(Movies) {
        var vm = this;

        vm.movies = Movies;
    };


    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/home/home.tmpl.html',
            controller: 'HomeController as home',
            resolve: {
                Movies: function (StarWarsMoviesService) {
                    return StarWarsMoviesService.getMovies();
                }
            }
        });
    };
})(this.angular)