(function (angular) {
    'use strict';

    angular
        .module('app.ui.home.controllers')
        .controller('HomeController', HomeController);

    // HomeController.$inject = ['Movies'];

    function HomeController(APP_SIDEBAR_ITEMS, Movies, Starships, Vehicles, Species, Planets) {
        var vm = this;

        angular.extend(vm, {
            movies: Movies.results,
            starships: Starships.results,
            vehicles: Vehicles.results,
            species: Species.results,
            planets: Planets.results
        });

        console.debug('HomeController', vm);
    };

})(window.angular);