(function (angular) {
    'use strict';

    angular
        .module('mr.swapi', ['xyz.angular.swapi'])
        .factory('StarWarsApiService', StarWarsApiService);

    // DEPRECATED BUT NOT SURE IF SHOULD REMOVE NOW

    StarWarsMoviesService.$inject = ['$q', 'swapiService'];

    function StarWarsMoviesService($q, swapiService) {
        var self = {};

        function getMovie(id) {
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
        }

        function getMovies() {
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
        }

        return {
            getMovie: getMovie,
            getMovies: getMovies
        };
    }


    StarWarsApiService.$inject = ['$q', 'swapiService'];

    function StarWarsApiService($q, swapiService) {
        var self = {};

        return {
            getResource: getResource,
            getSpecificResource: getSpecificResource
        };

        function getResource(resource, page) {
            var df = $q.defer();

            try {
                if (!angular.isFunction(swapiService[resource]))
                    throw 'Invalid resource';

                swapiService[resource](page)
                    .then(handleSuccess)
                    .catch(handleError);

            } catch (err) {
                df.reject(err);
            }
            return df.promise;

            function handleSuccess(response) {
                df.resolve(response);
                console.info('StarWarsApiService.getResource()', resource, page, response);
            }

            function handleError(reason) {
                df.reject(reason);
                console.warn('StarWarsApiService.getResource()', resource, page, reaon);
            }
        }

        function getSpecificResource(resource, id) {
            var df = $q.defer();

            try {
                if (!angular.isFunction(swapiService[resource]))
                    throw 'Invalid resource';

                swapiService[resource](id)
                    .then(handleSuccess)
                    .catch(handleError);

            } catch (err) {
                df.reject(err);
            }
            return df.promise;

            function handleSuccess(response) {
                df.resolve(response);
                console.info('StarWarsApiService.getResource()', resource, id, response);
            }

            function handleError(reason) {
                df.reject(reason);
                console.warn('StarWarsApiService.getResource()', resource, id, reaon);
            }
        }
    }
})(window.angular);