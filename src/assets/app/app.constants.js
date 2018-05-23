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