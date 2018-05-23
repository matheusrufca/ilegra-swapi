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
            items: viewParent.items.results
        });

        console.debug('ListController', view);


        function nextPage() {}

        function previousPage() {}


        function handlePageChange() {}
    }
})(window.angular);