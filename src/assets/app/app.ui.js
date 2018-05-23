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