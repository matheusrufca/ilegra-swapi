(function (angular) {
    'use strict';

    angular
        .module('myApp.detail', ['libraries', 'app.directives'])
        .config(stateConfig)
        .controller('HomeController', MovieDetailController);


    // HomeController.$inject = ['Movies'];

    function MovieDetailController(Movies, MoviePosterService) {
        var vm = this;

        vm.movies = Movies;

        MoviePosterService.getPoster(Movies[0].title)
        console.debug('Movies', Movies)
    };


    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('detail', {
            url: '/detail/:id',
            templateUrl: 'app/detail/detail.tmpl.html',
            controller: 'MovieDetailController as detail',
            resolve: {
                Movies: function (StarWarsMoviesService, MoviePosterService) {
                    return StarWarsMoviesService.getMovies();
                }
            }
        });
    };
})(this.angular)