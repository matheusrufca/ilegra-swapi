(function (angular) {
    'use strict';

    angular
        .module('app.ui.movie.controllers')
        .controller('MovieDetailController', MovieDetailController);


    // MovieDetailController.$inject = ['Movies'];

    function MovieDetailController(Movie) {
        var vm = this;

        vm.movie = Movie;
    }
})(window.angular);