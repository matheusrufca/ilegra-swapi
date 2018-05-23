(function (angular) {
    'use strict';

    angular
        .module('app.ui.home.controllers')
        .controller('HomeController', HomeController);

    // HomeController.$inject = ['Movies'];

    function HomeController(APP_SIDEBAR_ITEMS, Movies) {
        var vm = this;

        angular.extend(vm, {
            movies: Movies.results
        });

        console.debug('HomeController', vm);
    };

})(window.angular);