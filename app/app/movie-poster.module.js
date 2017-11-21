(function (angular) {
    'use strict';

    // TODO: hide API_KEY

    angular
        .module('mr.themoviedb', [])
        .constant('API_KEY', 'ff655de1c8dc9951da9fb7c3659fdc34')
        .constant('API_BASEURL', 'https://api.themoviedb.org')
        .value('posterBaseUrl', 'https://image.tmdb.org/t/p/w300')
        .config(function ($httpProvider, API_BASEURL, API_KEY) {
            $httpProvider.interceptors.push(function () {
                return {
                    'request': function (config) {
                        if (config.url.indexOf(API_BASEURL) < 0)
                            return config;

                        config.params = angular.extend({
                            api_key: API_KEY
                        });

                        return config;
                    }
                }
            });
        })
        .factory('MoviePosterService', MoviePosterService)


    MoviePosterService.$inject = ['$q', '$http', 'API_BASEURL', 'posterBaseUrl'];

    function MoviePosterService($q, $http, API_KEY, API_BASEURL, posterBaseUrl) {

        var self = {};


        self.getPoster = function (movieName) {
            var endpoint, config, df = $q.defer();

            endpoint = [self.baseUrl, '/3/search/movie'].join('/');
            config = {
                params: {
                    'query': movieName,
                }
            };

            $http
                .jsonp(endpoint, config)
                .then(function (response) {
                    if (angular.isArray(response) && response.length) {
                        var posterUrl = [posterBaseUrl, response[0].poster_path].join('/');
                        df.resolve(posterUrl);
                        console.debug('/movie?query=' + movieName, response);
                        // http://image.tmdb.org/t/p/w500//btTdmkgIvOi0FFip1sPuZI2oQG6.jpg
                    } else {
                        df.reject()
                    }
                })
                .catch(function (err) {
                    df.reject(err);
                    console.warn(err);
                });


            // https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film

            return df.promise;
        };

        return {
            getPoster: self.getPoster
        };
    };

})(this.angular);