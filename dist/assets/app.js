(function (angular) {
    'use strict';

    angular.module('libraries', [
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'mr.themoviedb',
        'mr.swapi',
    ]);
})(window.angular);
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
                        }, config.params);

                        return config;
                    }
                }
            });
        })
        .factory('MoviePosterService', MoviePosterService)


    MoviePosterService.$inject = ['$q', '$http', 'API_BASEURL', 'posterBaseUrl'];

    function MoviePosterService($q, $http, API_BASEURL, posterBaseUrl) {
        var self = {};

        self.getPoster = function (movieName) {
            var endpoint, config, df = $q.defer();

            endpoint = [API_BASEURL, '/3/search/movie'].join('/');
            config = {
                params: {
                    'query': movieName,
                }
            };

            $http
                .get(endpoint, config)
                .then(function (response) {
                    try {
                        var movieData, posterUrl
                        movieData = response.data.results[0];
                        posterUrl = [posterBaseUrl, movieData.poster_path].join('/');
                        df.resolve(posterUrl);
                    } catch (err) {
                        df.reject(err);
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
})(window.angular);
(function (angular, $) {
	'use strict';

	angular.module('mr.slick-carousel', [])
		.constant('slickDefaultSettings', {
			infinite: true,
			dots: true,
			slidesToShow: 3

		})
		.directive('carousel', slickDirective);


	slickDirective.$inject = ['$timeout', 'slickDefaultSettings'];

	function slickDirective($timeout, slickDefaultSettings) {
		var htmlTemplate = [
			'<div class="carousel-wrapper">',
			'<div class="carousel"><ng-transclude></ng-transclude></div>',
			'</div>'
		].join('');

		return {
			retrict: 'AE',
			template: htmlTemplate,
			link: linkFn,
			transclude: true,
			scope: {
				items: '=',
				settings: '='
			}
		};

		function linkFn(scope, element, attrs) {
			var $carousel, settings = angular.extend(slickDefaultSettings, scope.settings || {});

			$timeout(function () {
				$carousel = element.find('.items-container');
				$carousel.slick(settings);
			});

			console.debug('slickDirective', scope, element, attrs);
			console.debug('slickDirective.settings', settings);
		}
	}
})(window.angular, window.jQuery);
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
(function (angular) {
    'use strict';

    angular.module('app.constants', []);
    angular.module('app.helpers', []);
    angular.module('app.services', []);
    angular.module('app.configs', []);
    angular.module('app.ui.components', []);


    angular.module('app.ui', [
        'app.ui.components',
        'app.ui.home',
        'app.ui.list',
        'app.ui.movie'
    ]);

    angular.module('app', [
        'libraries',
        'app.constants',
        'app.configs',
        'app.helpers',
        'app.services',
        'app.ui'
    ]);


})(window.angular);
(function (angular) {
    'use strict';


    angular.module('app.configs').config(stateConfig)

    stateConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function stateConfig($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true
            });

        $urlRouterProvider.otherwise('/home');
        $locationProvider.hashPrefix('');
    }

})(window.angular);
(function (angular) {
    'use strict';
    var APP_SIDEBAR_ITEMS;


    APP_SIDEBAR_ITEMS = [{
        title: 'Home',
        resource: 'films',
        url: '/home'
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
    }, {
        title: 'People',
        resource: 'people',
        url: '/people'
    }];



    angular.module('app.constants').constant('APP_SIDEBAR_ITEMS', APP_SIDEBAR_ITEMS);

})(window.angular);
(function (angular) {
    'use strict';


    // angular.module('app.directives');   

})(window.angular);
(function (angular) {
    angular.module('app.ui')
        .controller('MainController', MainController);


    MainController.$inject = ['$rootScope', '$scope', 'APP_SIDEBAR_ITEMS'];

    function MainController($rootScope, $scope, APP_SIDEBAR_ITEMS) {
        var view = this;
        
        angular.extend(view, {
            title: 'Star Wars WIKI',
            sections: APP_SIDEBAR_ITEMS
        });
    };
})(window.angular);
(function (angular) {
	'use strict';

	angular
		.module('app.ui.components')
		.directive('genericDetail', GenericDetailDirective);

	GenericDetailDirective.$inject = ['$compile'];

	function GenericDetailDirective($compile) {
		var headingTemplate, descriptionTemplate, htmlTemplate;

		htmlTemplate = [
			'<#{templateType}-detail model="model" />'
		].join('');

		return {
			//template: getTemplate,
			link: linkFn,
			// controller: ['$scope', directiveController],
			retrict: 'E',
			scope: {
				type: '@',
				model: '='
			}
		};


		function buildTemplate(model) {
			return ['<', model, '-detail model="model" />'].join('');
		}

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('directiveController.getPropertyName()', err);
				}
				return output;
			}
		}

		function linkFn(scope, element, attrs) {
			var template = buildTemplate(scope.type);
			var specificDetail = $compile(template)(scope);
			element.append(specificDetail);
		}
	}
})(window.angular);

// name string -- The name of this planet.
// diameter string -- The diameter of this planet in kilometers.
// rotation_period string -- The number of standard hours it takes for this planet to complete a single rotation on its axis.
// orbital_period string -- The number of standard days it takes for this planet to complete a single orbit of its local star.
// gravity string -- A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
// population string -- The average population of sentient beings inhabiting this planet.
// climate string -- The climate of this planet. Comma separated if diverse.
// terrain string -- The terrain of this planet. Comma separated if diverse.
// surface_water string -- The percentage of the planet surface that is naturally occurring water or bodies of water.
// residents array -- An array of People URL Resources that live on this planet.
// films array -- An array of Film URL Resources that this planet has appeared in.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.
(function (angular) {
	'use strict';

	// TODO: use component instead directive

	angular
		.module('app.ui.components')
		.directive('peopleDetail', PeopleDetailDirective);

	function PeopleDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;


		headingTemplate = [
			'<h3 ng-bind="model.name" class="title" />',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'birth_year\')" class="text-capitalize" />',
			'<dd ng-bind="model.birth_year" />',
			'<dt ng-bind="getPropertyName(\'eye_color\')" class="text-capitalize" />',
			'<dd ng-bind="model.eye_color" />',
			'<dt ng-bind="getPropertyName(\'hair_color\')" class="text-capitalize" />',
			'<dd ng-bind="model.hair_color" />',
			'<dt ng-bind="getPropertyName(\'height\')" class="text-capitalize" />',
			'<dd ng-bind="model.height" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'mass\')" class="text-capitalize" />',
			'<dd ng-bind="model.mass" />',
			'<dt ng-bind="getPropertyName(\'skin_color\')" class="text-capitalize" />',
			'<dd ng-bind="model.skin_color" />',
			'</dl>',
			'</div>',
			'</div>',
		].join('');

		htmlTemplate = [
			'<uib-accordion>',
			'<div uib-accordion-group class="panel-default list-item-detail starhip-detail">',
			'<uib-accordion><uib-accordion-group>',
			'<uib-accordion-heading>',
			headingTemplate,
			'</uib-accordion-heading>',
			descriptionTemplate,
			'</uib-accordion>',
			'</div>'
		].join('');

		return {
			template: htmlTemplate,
			//link: linkFn,
			controller: ['$scope', directiveController],
			retrict: 'E',
			scope: {
				model: '='
			}
		};

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('directiveController.getPropertyName()', err);
				}
				return output;
			}
		}

		function linkFn(scope, element, attrs) {
			console.debug('PeopleDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);

// name string -- The name of this person.
// birth_year string -- The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.
// eye_color string -- The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
// gender string -- The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
// hair_color string -- The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
// height string -- The height of the person in centimeters.
// mass string -- The mass of the person in kilograms.
// skin_color string -- The skin color of this person.
// homeworld string -- The URL of a planet resource, a planet that this person was born on or inhabits.
// films array -- An array of film resource URLs that this person has been in.
// species array -- An array of species resource URLs that this person belongs to.
// starships array -- An array of starship resource URLs that this person has piloted.
// vehicles array -- An array of vehicle resource URLs that this person has piloted.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.
(function (angular) {
	'use strict';
	
	// TODO: use component instead directive
	
	angular
		.module('app.ui.components')
		.directive('planetDetail', PlanetDetailDirective);

	function PlanetDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;
	

		headingTemplate = [
			'<h3 ng-bind="model.name" class="title" />',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'diameter\')" class="text-capitalize" />',
			'<dd ng-bind="model.diameter" />',
			'<dt ng-bind="getPropertyName(\'rotation_period\')" class="text-capitalize" />',
			'<dd ng-bind="model.rotation_period" />',
			'<dt ng-bind="getPropertyName(\'orbital_period\')" class="text-capitalize" />',
			'<dd ng-bind="model.orbital_period | currency" />',
			'<dt ng-bind="getPropertyName(\'gravity\')" class="text-capitalize" />',
			'<dd ng-bind="model.gravity" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'population\')" class="text-capitalize" />',
			'<dd ng-bind="model.population" />',
			'<dt ng-bind="getPropertyName(\'climate\')" class="text-capitalize" />',
			'<dd ng-bind="model.climate" />',
			'<dt ng-bind="getPropertyName(\'terrain\')" class="text-capitalize" />',
			'<dd ng-bind="model.terrain" />',
			'<dt ng-bind="getPropertyName(\'surface_water\')" class="text-capitalize" />',
			'<dd ng-bind="model.surface_water" />',
			'</dl>',
			'</div>',
			'</div>',
		].join('');

		htmlTemplate = [
			'<uib-accordion>',
			'<div uib-accordion-group class="panel-default list-item-detail starhip-detail">',
			'<uib-accordion><uib-accordion-group>',
			'<uib-accordion-heading>',
			headingTemplate,
			'</uib-accordion-heading>',
			descriptionTemplate,
			'</uib-accordion>',
			'</div>'
		].join('');

		return {
			template: htmlTemplate,
			//link: linkFn,
			controller: ['$scope', directiveController],
			retrict: 'E',
			scope: {
				model: '='
			}
		};

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('directiveController.getPropertyName()', err);
				}
				return output;
			}
		}

		function linkFn(scope, element, attrs) {
			console.debug('PlanetDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);

// name string -- The name of this planet.
// diameter string -- The diameter of this planet in kilometers.
// rotation_period string -- The number of standard hours it takes for this planet to complete a single rotation on its axis.
// orbital_period string -- The number of standard days it takes for this planet to complete a single orbit of its local star.
// gravity string -- A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
// population string -- The average population of sentient beings inhabiting this planet.
// climate string -- The climate of this planet. Comma separated if diverse.
// terrain string -- The terrain of this planet. Comma separated if diverse.
// surface_water string -- The percentage of the planet surface that is naturally occurring water or bodies of water.
// residents array -- An array of People URL Resources that live on this planet.
// films array -- An array of Film URL Resources that this planet has appeared in.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.
(function (angular) {
	'use strict';


	angular
		.module('app.ui.components')
		.directive('sidebarMenu', SidebarMenuDirective);

	function SidebarMenuDirective($timeout) {
		var htmlTemplate;

		htmlTemplate = [
			'<div class="sidebar-menu list-group">',
			'<a  ng-repeat="item in items" href="#{{item.url}}" ng-bind="item.title"',
			'class="list-group-item list-group-item-action text-capitalize"></a>',
			'</div>'
		].join('');

		return {
			template: htmlTemplate,
			link: linkFn,
			retrict: 'E',
			scope: {
				items: '='
			}
		};

		function linkFn(scope, element, attrs) {
			console.debug('sidebar-menu', scope, element, attrs);
		}
	}
})(window.angular);
(function (angular) {
	'use strict';
	
	// TODO: use component instead directive
	
	angular
		.module('app.ui.components')
		.directive('specieDetail', SpecieDetailDirective);

	function SpecieDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;
	

		headingTemplate = [
			'<h3 ng-bind="model.name" class="title" />',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'classification\')" class="text-capitalize" />',
			'<dd ng-bind="model.classification" />',
			'<dt ng-bind="getPropertyName(\'designation\')" class="text-capitalize" />',
			'<dd ng-bind="model.designation" />',
			'<dt ng-bind="getPropertyName(\'average_height\')" class="text-capitalize" />',
			'<dd ng-bind="model.average_height" />',
			'<dt ng-bind="getPropertyName(\'average_lifespan\')" class="text-capitalize" />',
			'<dd ng-bind="model.average_lifespan" />',
			'<dt ng-bind="getPropertyName(\'language\')" class="text-capitalize" />',
			'<dd ng-bind="model.language" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'eye_colors\')" class="text-capitalize" />',
			'<dd ng-bind="model.eye_colors" />',
			'<dt ng-bind="getPropertyName(\'hair_colors\')" class="text-capitalize" />',
			'<dd ng-bind="model.hair_colors" />',
			'<dt ng-bind="getPropertyName(\'skin_colors\')" class="text-capitalize" />',
			'<dd ng-bind="model.skin_colors" />',
			'</dl>',
			'</div>',
			'</div>',
		].join('');

		htmlTemplate = [
			'<uib-accordion>',
			'<div uib-accordion-group class="panel-default list-item-detail starhip-detail">',
			'<uib-accordion><uib-accordion-group>',
			'<uib-accordion-heading>',
			headingTemplate,
			'</uib-accordion-heading>',
			descriptionTemplate,
			'</uib-accordion>',
			'</div>'
		].join('');

		return {
			template: htmlTemplate,
			//link: linkFn,
			controller: ['$scope', directiveController],
			retrict: 'E',
			scope: {
				model: '='
			}
		};

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('directiveController.getPropertyName()', err);
				}
				return output;
			}
		}

		function linkFn(scope, element, attrs) {
			console.debug('SpecieDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);

// name string -- The name of this species.
// classification string -- The classification of this species, such as "mammal" or "reptile".
// designation string -- The designation of this species, such as "sentient".
// average_height string -- The average height of this species in centimeters.
// average_lifespan string -- The average lifespan of this species in years.
// eye_colors string -- A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.
// hair_colors string -- A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.
// skin_colors string -- A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.
// language string -- The language commonly spoken by this species.
// homeworld string -- The URL of a planet resource, a planet that this species originates from.
// people array -- An array of People URL Resources that are a part of this species.
// films array -- An array of Film URL Resources that this species has appeared in.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.
(function (angular) {
	'use strict';


	angular
		.module('app.ui.components')
		.directive('starshipDetail', StarshipDetailDirective);

	function StarshipDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;


	

		headingTemplate = [
			'<h3 class="title">',
			'<span ng-bind="model.name"></span> <small ng-bind="model.model"></small>',
			'</h3>',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'starship_class\')" class="text-capitalize" />',
			'<dd ng-bind="model.starship_class" />',
			'<dt ng-bind="getPropertyName(\'manufacturer\')" class="text-capitalize" />',
			'<dd ng-bind="model.manufacturer" />',
			'<dt ng-bind="getPropertyName(\'cost_in_credits\')" class="text-capitalize" />',
			'<dd ng-bind="model.cost_in_credits | currency" />',
			'<dt ng-bind="getPropertyName(\'length\')" class="text-capitalize" />',
			'<dd ng-bind="model.length" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'crew\')" class="text-capitalize" />',
			'<dd ng-bind="model.crew" />',
			'<dt ng-bind="getPropertyName(\'passengers\')" class="text-capitalize" />',
			'<dd ng-bind="model.passengers" />',
			'<dt ng-bind="getPropertyName(\'max_atmosphering_speed\')" class="text-capitalize" />',
			'<dd ng-bind="model.max_atmosphering_speed" />',
			'<dt ng-bind="getPropertyName(\'hyperdrive_rating\')" class="text-capitalize" />',
			'<dd ng-bind="model.hyperdrive_rating" />',
			'</dl>',
			'</div>',
			'</div>',
		].join('')



		htmlTemplate = [
			'<uib-accordion>',
			'<div uib-accordion-group class="panel-default list-item-detail starhip-detail">',
			'<uib-accordion><uib-accordion-group>',
			'<uib-accordion-heading>',
			headingTemplate,
			'</uib-accordion-heading>',
			descriptionTemplate,
			'</uib-accordion>',
			'</div>'
		].join('');

		return {
			template: htmlTemplate,
			//link: linkFn,
			controller: ['$scope', directiveController],
			retrict: 'E',
			scope: {
				model: '='
			}
		};

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('directiveController.getPropertyName()', err);
				}
				return output;
			}
		}

		function linkFn(scope, element, attrs) {
			console.debug('StarshipDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);


// name string -- The name of this model. The common name, such as "Death Star".
// model string -- The model or official name of this model. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
// starship_class string -- The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"
// manufacturer string -- The manufacturer of this model. Comma separated if more than one.
// cost_in_credits string -- The cost of this starship new, in galactic credits.
// length string -- The length of this starship in meters.
// crew string -- The number of personnel needed to run or pilot this model.
// passengers string -- The number of non-essential people this starship can transport.
// max_atmosphering_speed string -- The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.
// hyperdrive_rating string -- The class of this starships hyperdrive.
// MGLT string -- The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
// cargo_capacity string -- The maximum number of kilograms that this starship can transport.
// consumables *string
// The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
// films array -- An array of Film URL Resources that this starship has appeared in.
// pilots array -- An array of People URL Resources that this starship has been piloted by.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.
(function (angular) {
	'use strict';
	
	// TODO: use component instead directive
	
	angular
		.module('app.ui.components')
		.directive('vehicleDetail', VehicleDetailDirective);

	function VehicleDetailDirective($timeout) {
		var headingTemplate, descriptionTemplate, htmlTemplate;
	

		headingTemplate = [
			'<h3 class="title">',
			'<span ng-bind="model.name"/> <small ng-bind="model.model" />',
			'</h3>',
		].join('');

		descriptionTemplate = [
			'<div class="row"><div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'vehicle_class\')" class="text-capitalize" />',
			'<dd ng-bind="model.vehicle_class " />',
			'<dt ng-bind="getPropertyName(\'manufacturer\')" class="text-capitalize" />',
			'<dd ng-bind="model.manufacturer " />',
			'<dt ng-bind="getPropertyName(\'length\')" class="text-capitalize" />',
			'<dd ng-bind="model.length" />',
			'<dt ng-bind="getPropertyName(\'cost_in_credits\')" class="text-capitalize" />',
			'<dd ng-bind="model.cost_in_credits | currency" />',
			'<dt ng-bind="getPropertyName(\'consumables\')" class="text-capitalize" />',
			'<dd ng-bind="model.consumables" />',
			'</dl>',
			'</div>',
			'<div class="col-md-6">',
			'<dl class="dl-horizontal">',
			'<dt ng-bind="getPropertyName(\'crew\')" class="text-capitalize" />',
			'<dd ng-bind="model.crew" />',
			'<dt ng-bind="getPropertyName(\'passengers\')" class="text-capitalize" />',
			'<dd ng-bind="model.passengers" />',
			'<dt ng-bind="getPropertyName(\'max_atmosphering_speed\')" class="text-capitalize" />',
			'<dd ng-bind="model.max_atmosphering_speed" />',
			'<dt ng-bind="getPropertyName(\'cargo_capacity\')" class="text-capitalize" />',
			'<dd ng-bind="model.cargo_capacity" />',
			'</dl>',
			'</div>',
			'</div>',
		].join('');

		htmlTemplate = [
			'<uib-accordion>',
			'<div uib-accordion-group class="panel-default list-item-detail starhip-detail">',
			'<uib-accordion><uib-accordion-group>',
			'<uib-accordion-heading>',
			headingTemplate,
			'</uib-accordion-heading>',
			descriptionTemplate,
			'</uib-accordion>',
			'</div>'
		].join('');

		return {
			template: htmlTemplate,
			//link: linkFn,
			controller: ['$scope', directiveController],
			retrict: 'E',
			scope: {
				model: '='
			}
		};

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('directiveController.getPropertyName()', err);
				}
				return output;
			}
		}

		function linkFn(scope, element, attrs) {
			console.debug('VehicleDetailDirective', scope, element, attrs);
		}
	}
})(window.angular);

// name string -- The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".
// model string -- The model or official name of this vehicle. Such as "All-Terrain Attack Transport".
// vehicle_class string -- The class of this vehicle, such as "Wheeled" or "Repulsorcraft".
// manufacturer string -- The manufacturer of this vehicle. Comma separated if more than one.
// length string -- The length of this vehicle in meters.
// cost_in_credits string -- The cost of this vehicle new, in Galactic Credits.
// crew string -- The number of personnel needed to run or pilot this vehicle.
// passengers string -- The number of non-essential people this vehicle can transport.
// max_atmosphering_speed string -- The maximum speed of this vehicle in the atmosphere.
// cargo_capacity string -- The maximum number of kilograms that this vehicle can transport.
// consumables *string
// The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.
// films array -- An array of Film URL Resources that this vehicle has appeared in.
// pilots array -- An array of People URL Resources that this vehicle has been piloted by.
// url string -- the hypermedia URL of this resource.
// created string -- the ISO 8601 date format of the time that this resource was created.
// edited string -- the ISO 8601 date format of the time that this resource was edited.
(function (angular) {
	'use strict';


	// Initialize module of this module :)

	angular.module('app.ui.list.configs', []);
	angular.module('app.ui.list.directives', []);
	angular.module('app.ui.list.services', []);
	angular.module('app.ui.list.controllers', []);

	angular.module('app.ui.list', [
		'libraries',
		'app.ui.list.configs',
		'app.ui.list.services',
		'app.ui.list.directives',
		'app.ui.list.controllers'
	]);

})(window.angular);
(function (angular) {
    'use strict';

    // Initialize module of this module :)

    angular.module('app.ui.home.directives', []);
    angular.module('app.ui.home.services', []);
    angular.module('app.ui.home.controllers', []);

    angular.module('app.ui.home', [
            'libraries',
            'app.constants',
            'app.ui.home.services',
            'app.ui.home.directives',
            'app.ui.home.controllers'
        ])
        .config(stateConfig);


    // set module config like $route configs

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/home/index.html',
            controller: 'HomeController',
            controllerAs:'home',
            resolve: {
                Movies: getResource('films')
            }
        });


        function getResource(resource) {
            return ['StarWarsApiService', getResourceFactory];

            function getResourceFactory(StarWarsApiService) {
                return StarWarsApiService.getResource(resource);
            }
        }
    }

})(window.angular);
(function (angular) {
	'use strict';
	angular.module('app.ui.movie.services', []);
	angular.module('app.ui.movie.directives', []);
	angular.module('app.ui.movie.controllers', []);

	angular.module('app.ui.movie', [
		'libraries',
		'app.ui.movie.services',
		'app.ui.movie.directives',
		'app.ui.movie.controllers'
	]);

	angular.module('app.ui.movie').config(stateConfig);

	stateConfig.$inject = ['$stateProvider'];

	function stateConfig($stateProvider) {
		$stateProvider.state('movie', {
			url: '/movie/:id',
			templateUrl: 'views/movie/index.html',
			controller: 'MovieDetailController as view',
			resolve: {
				resourceType: function () {
					return 'film';
				},
				Movie: ['StarWarsApiService', '$transition$', function (StarWarsApiService, $transition) {
					var contentId = $transition.params().id;
					return StarWarsApiService.getSpecificResource('film', contentId);
				}]
			}
		});
	};
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('app.ui.list.controllers')
        .controller('ListPageController', ListPageController)
        .controller('ListController', ListController);


    function ListPageController($scope, resourceType, modelType, Items) {
        var view = this;

        angular.extend(view, {
            resourceType: resourceType,
            modelType: modelType,
            items: Items
        });

        console.debug('ListPageController', $scope, view);
    }

    // ListController.$inject = ['Movies'];

    function ListController($scope, $timeout, StarWarsApiService) {
        var self = {},
            viewParent = $scope.view,
            view = this;

        self.pages = {};

        angular.extend(view, {
            loading: false,
            page: 1
        });

        _setItems(viewParent.items);

        $scope.$watch('list.page', handlePageChange)

        function handlePageChange(newValue, oldValue) {
            if (newValue == oldValue) return;

            view.loading = true;

            // TODO: cache pages
            _getPage(newValue).then(function (result) {
                _setItems(result);
            }).catch(function (err) {
                console.warn('ListController.handlePageChange', err);
            }).finally(function () {
                view.loading = false;
            });

            console.debug('list.page:changed', newValue, oldValue);
        }

        function _getPage(page) {
            var promise;
            try {
                if (self.pages.hasOwnProperty(page)) {
                    promise = $timeout(function () {
                        return self.pages[page];
                    });
                } else {
                    promise = StarWarsApiService.getResource(viewParent.resourceType, page);
                }
            } catch (err) {
                promise = $timeout(function () {
                    throw err;
                });
                console.warn('ListController.getPage()', err)
            }

            return promise;
        }

        function _setItems(items) {
            angular.extend(view, {
                page: view.page,
                totalItems: items.count,
                items: items.results
            });

            self.pages[view.page] = items;
        }

        console.debug('ListController', view);
    }
})(window.angular);
(function (angular) {
	'use strict';

	angular
		.module('app.ui.list.directives');




})(window.angular);



(function (angular) {
	'use strict';


	// set module config like $route configs

	angular.module('app.ui.list.configs').config(stateConfig);

	stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];


	function stateConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('starships', {
				url: '/starships',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'starships';
					},
					modelType: function () {
						return 'starship';
					},
					Items: getResource('starships')
					// Items: getResource('planets')
					// Movies: getResource('films'),
					// Starships: getResource('starships'),
					// Vehicles: getResource('vehicles'),
					// Species: getResource('species'),
				}
			})
			.state('vehicles', {
				url: '/vehicles',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'vehicles';
					},
					modelType: function () {
						return 'vehicle';
					},
					Items: getResource('vehicles')
				}
			})
			.state('species', {
				url: '/species',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'species';
					},
					modelType: function () {
						return 'specie';
					},
					Items: getResource('species')
				}
			})
			.state('planets', {
				url: '/planets',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'planets';
					},
					modelType: function () {
						return 'planet';
					},
					Items: getResource('planets')
				}
			})			
			.state('people', {
				url: '/people',
				templateUrl: 'views/list/index.html',
				controller: 'ListPageController',
				controllerAs: 'view',
				resolve: {
					resourceType: function () {
						return 'people';
					},
					modelType: function () {
						return 'people';
					},
					Items: getResource('people')
				}
			});


		function getResource(resource) {
			return ['StarWarsApiService', getResourceFactory];

			function getResourceFactory(StarWarsApiService) {
				return StarWarsApiService.getResource(resource);
			}
		}
	}

})(window.angular);
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
(function (angular) {
	'use strict';
	var templateUrl;

	templateUrl = 'views/home/tpl-movie-view.html'

	angular
		.module('app.ui.home.directives')
		.directive('movieItemView', movieItemViewDirective);


	movieItemViewDirective.$inject = ['MoviePosterService'];


	function movieItemViewDirective(MoviePosterService) {
		var self = {},
			linkFn;

		linkFn = function (scope, element, attrs) {

			scope.content.id = getContentId(scope.content.url);

			MoviePosterService.getPoster(scope.content.title).then(function (posterUrl) {
				scope.content.posterUrl = posterUrl;
			});
		};

		return {
			restrict: 'E',
			link: linkFn,
			templateUrl: templateUrl,
			scope: {
				content: '='
			}
		};

		function getContentId(contentUrl) {
			return (contentUrl || '').split('/').splice(-2).join('');
		};
	};
})(window.angular);
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
(function (angular) {
	'use strict';
	var templateUrl;

	templateUrl = 'views/movie/movie-info.tpl.html';

	angular
		.module('app.ui.movie.directives')
		.directive('movieInfo', movieInfoDirective);

	movieInfoDirective.$inject = ['$window', '$timeout', '$compile', '$rootScope', 'MoviePosterService'];


	function movieInfoDirective($window, $timeout, $compile, $rootScope, MoviePosterService) {
		var linkFn;

		linkFn = function (scope, element, attrs) {
			scope.content.id = getContentId(scope.content.url);

			MoviePosterService.getPoster(scope.content.title).then(function (posterUrl) {
				scope.content.posterUrl = posterUrl;
			});
		};


		return {
			restrict: 'E',
			link: linkFn,
			controller: ['$scope', directiveController],
			templateUrl: templateUrl,
			scope: {
				content: '='
			}
		};

		function getContentId(contentUrl) {
			return (contentUrl || '').split('/').splice(-2).join('');
		};

		function directiveController($scope) {
			$scope.getPropertyName = getPropertyName;


			function getPropertyName(property) {
				var output;
				try {
					output = (property || '').split('_').join(' ');
				} catch (err) {
					console.warn('movieInfoDirective.getPropertyName()', err);
				}
				return output;
			}
		}
	};
})(window.angular);