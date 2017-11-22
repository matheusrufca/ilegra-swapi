(function (angular) {
    'use strict';

    angular
        .module('mr.swapi', ['xyz.angular.swapi'])
        .factory('StarWarsMoviesService', StarWarsMoviesService);

    StarWarsMoviesService.$inject = ['$q', 'swapiService'];

    function StarWarsMoviesService($q, swapiService) {
        var self = {};

        self.getMovie = function (id) {
            var df = $q.defer();

            swapiService.film(id)
                .then(function (response) {
                    df.resolve(response);
                    console.debug('/api/films/' + id, response);
                })
                .catch(function (err) {
                    df.reject(err);
                    console.warn(err);
                })

            return df.promise;
        };

        self.getMovies = function () {
            var df = $q.defer();

            swapiService.films()
                .then(function (response) {
                    df.resolve(response.results);
                    console.debug('/api/films', response);
                })
                .catch(function (err) {
                    df.reject(err);
                    console.warn(err);
                })

            return df.promise;
        };

        return {
            getMovie: self.getMovie,
            getMovies: self.getMovies
        };
    };
})(window.angular);