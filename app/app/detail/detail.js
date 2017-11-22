(function (angular) {
    'use strict';

    angular
        .module('myApp.detail', ['libraries', 'app.directives'])
        .config(stateConfig)
        .controller('MovieDetailController', MovieDetailController);


    // MovieDetailController.$inject = ['Movies'];

    function MovieDetailController(Movie) {
        var vm = this;

        vm.movie = Movie;

        console.debug('Movie', Movie);
    };


    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('detail', {
            url: '/detail/:id',
            templateUrl: 'app/detail/detail.tmpl.html',
            controller: 'MovieDetailController as detail',
            resolve: {
                Movie: function (StarWarsMoviesService, $transition$) {
                    var contentId = $transition$.params().id;
                    return StarWarsMoviesService.getMovie(contentId);
                }
            }
        });
    };
})(this.angular)