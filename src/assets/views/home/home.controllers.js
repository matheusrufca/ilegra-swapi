(function (angular) {
    'use strict';

    angular
        .module('app.ui.home.controllers')
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

})(window.angular);