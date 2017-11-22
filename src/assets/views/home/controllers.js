(function (angular) {
    'use strict';

    angular
        .module('app.ui.home', ['libraries', 'app.ui.home.directives'])
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
            templateUrl: 'views/home/index.html',
            controller: 'HomeController as home',
            resolve: {
                Movies: function (StarWarsMoviesService) {
                    return StarWarsMoviesService.getMovies();
                }
            }
        });
    };
})(window.angular);