(function (angular) {
    'use strict';

    angular
        .module('app.ui.detail', ['libraries', 'app.ui.detail.directives'])
        .config(stateConfig)
        .controller('MovieDetailController', MovieDetailController);


    // MovieDetailController.$inject = ['Movies'];

    function MovieDetailController(Movie) {
        var vm = this;

        vm.movie = Movie;
    };

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('detail', {
            url: '/detail/:id',
            templateUrl: 'views/detail/index.html',
            controller: 'MovieDetailController as detail',
            resolve: {
                Movie: function (StarWarsMoviesService, $transition$) {
                    var contentId = $transition$.params().id;
                    return StarWarsMoviesService.getMovie(contentId);
                }
            }
        });
    };
})(window.angular);