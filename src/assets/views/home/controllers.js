(function (angular) {
    'use strict';

    angular
        .module('app.ui.home', ['libraries', 'app.ui.home.directives'])
        .config(stateConfig)
        .controller('HomeController', HomeController);


    // HomeController.$inject = ['Movies'];

    function HomeController(Movies, Starships, Vehicles, Species, Planets) {
        var vm = this;

        angular.extend(vm, {
            sliderSettings: {
                infinite: false,
                slidesToShow: 5,
                centerMode: false
            },
            movies: Movies.results,
            starships: Starships.results,
            vehicles: Vehicles.results,
            species: Species.results,
            planets: Planets.results
        });
        
        console.debug('HomeController', vm);
    };


    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/home/index.html',
            controller: 'HomeController as home',
            resolve: {
                Movies: function (StarWarsApiService) {
                    return StarWarsApiService.getResource('films');
                },
                Starships: function (StarWarsApiService) {
                    return StarWarsApiService.getResource('starships');
                },
                Vehicles: function (StarWarsApiService) {
                    return StarWarsApiService.getResource('vehicles');
                },
                Species: function (StarWarsApiService) {
                    return StarWarsApiService.getResource('species');
                },
                Planets: function (StarWarsApiService) {
                    return StarWarsApiService.getResource('planets');
                }

            }
        });
    };
})(window.angular);