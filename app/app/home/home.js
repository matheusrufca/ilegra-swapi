(function (angular) {
    'use strict';

    angular
        .module('myApp.home', ['libraries', 'myApp.models.messages'])
        .config(stateConfig)
        .controller('HomeController', HomeController);


    // HomeController.$inject = ['Movies'];

    function HomeController(Movies, MoviePosterService) {
        var vm = this;
        vm.title = 'Home Page';
        vm.body = 'This is the about home body';

        // vm.message = Messages.getMessage();

        // vm.updateMessage = function (m) {
        //     Messages.setMessage(m);
        // };

        vm.movies = Movies;

        MoviePosterService.getPoster(Movies[0].title)


        // TODO: move to directive
        function loadMoviePosters(movies) {
            angular.forEach(movies, function (item, i) {
                MoviePosterService.getPoster(item.title).then(function (posterUrl) {
                    item.posterUrl = posterUrl;
                })
            })
        }

        loadMoviePosters(vm.movies)

        console.debug('Movies', Movies)
    };


    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/home/home.tmpl.html',
            controller: 'HomeController as home',
            resolve: {
                Movies: function (StarWarsMoviesService, MoviePosterService) {
                    return StarWarsMoviesService.getMovies();
                }
            }
        });
    };
})(this.angular)