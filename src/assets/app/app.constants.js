(function (angular) {
    'use strict';
    var APP_SIDEBAR_ITEMS;


    APP_SIDEBAR_ITEMS = [{
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
    }];



    angular.module('app.constants').constant('APP_SIDEBAR_ITEMS', APP_SIDEBAR_ITEMS);

})(window.angular);