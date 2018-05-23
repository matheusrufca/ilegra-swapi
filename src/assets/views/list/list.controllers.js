(function (angular) {
    'use strict';

    angular
        .module('app.ui.list.controllers')
        .controller('ListController', ListController);


    // ListController.$inject = ['Movies'];

    function ListController(APP_SIDEBAR_ITEMS, Items) {
        var self = {},
            vm = this;

        angular.extend(vm, {
            sidebar: APP_SIDEBAR_ITEMS || [],
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

})(window.angular);