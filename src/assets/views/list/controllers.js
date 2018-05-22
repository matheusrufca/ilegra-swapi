(function (angular) {
    'use strict';

    angular
        .module('app.ui.list', ['libraries', 'app.ui.list.directives'])
        .config(stateConfig)
        .constant('listSidebarItens', [{
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
        }])
        .controller('ListController', ListController);


    // ListController.$inject = ['Movies'];

    function ListController(SidebarItens, Items) {
        var self = {},
            vm = this;

        angular.extend(vm, {
            sidebar: SidebarItens || [],
            page: 1,
            totalPages: _getTotalPages(Items.count),
            items: Items.results,
            pagination: _getPagination
        });



        console.debug('ListController', vm);



        function _getPagination() {
            var pagination;;
            if (angular.isArray(self.pagination))
                pagination = self.pagination;
            else
                pagination = new Array(vm.totalPages);

            return pagination;
        }

        function _getTotalPages(itemsLength) {
            var totalPages;
            try {
                totalPages = itemsLength / 10;
                totalPages = (totalPages > parseInt(totalPages)) ? parseInt(totalPages + 1) : parseInt(totalPages);
            } catch (err) {
                console.warn('ListController.getTotalPages()', itemsLength, err);
            }


            return totalPages || 1;
        }
    }



    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('list', {
            url: '/list',
            templateUrl: 'views/list/index.html',
            controller: 'ListController as list',
            resolve: {
                SidebarItens: ['listSidebarItens', function (listSidebarItens) {
                    return listSidebarItens;
                }],
                // Movies: getResource('films'),
                // Starships: getResource('starships'),
                // Vehicles: getResource('vehicles'),
                // Species: getResource('species'),
                Items: getResource('planets')
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