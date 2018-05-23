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