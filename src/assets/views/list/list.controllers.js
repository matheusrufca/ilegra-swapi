(function (angular) {
    'use strict';

    angular
        .module('app.ui.list.controllers')
        .controller('StarshipsController', StarshipsController)
        .controller('ListController', ListController);


    function StarshipsController($scope, viewName, Items) {
        var view = this;

        angular.extend(view, {
            resourceType: viewName,
            items: Items
        });

        console.debug('StarshipsController', $scope, view, viewName);
    }

    // ListController.$inject = ['Movies'];

    function ListController($scope) {
        var self = {},
            viewParent = $scope.view,
            view = this;

        angular.extend(view, {
            page: 1,
            totalPages: _getTotalPages(viewParent.items.count),
            items: viewParent.items.results,
            pagination: _getPagination
        });

        console.debug('ListController', view);


        function nextPage() {}

        function previousPage() {}


        function _getPagination() {
            var pagination;;
            if (angular.isArray(self.pagination))
                pagination = self.pagination;
            else
                pagination = new Array(view.totalPages);

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
})(window.angular);