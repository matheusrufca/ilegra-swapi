(function (angular) {
    'use strict';

    angular
        .module('app.ui.home', ['libraries', 'app.ui.home.directives'])
        .config(stateConfig)
        .constant('homeSidebarItens', [{
            title: 'Movies',
            resource: 'films',
            url: '/movies'
        }, {
            title: 'Starships',
            resource: 'starships',
            url: '/starships'
        }, {
            title: 'Vehicles',
            resource: 'vehicles',
            url: '/vehicles'
        }, {
            title: 'Species',
            resource: 'species',
            url: '/species'
        }, {
            title: 'Planets',
            resource: 'planets',
            url: '/planets'
        }])
        .controller('HomeController', HomeController);


    // HomeController.$inject = ['Movies'];

    function HomeController(SidebarItens, Movies, Starships, Vehicles, Species, Planets) {
        var vm = this;

        angular.extend(vm, {
            sliderSettings: {
                infinite: false,
                slidesToShow: 5,
                centerMode: false
            },
            sidebar: SidebarItens || [],
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
                SidebarItens: ['homeSidebarItens', function (homeSidebarItens) {
                    return homeSidebarItens;
                }],
                Movies: getResource('films'),
                Starships: getResource('starships'),
                Vehicles: getResource('vehicles'),
                Species: getResource('species'),
                Planets: getResource('planets')
            }
        });


        function getResource(resource) {
            return ['StarWarsApiService', getResourceFactory];

            function getResourceFactory(StarWarsApiService) {
                return StarWarsApiService.getResource(resource);
            }
        }
    };
})(window.angular);