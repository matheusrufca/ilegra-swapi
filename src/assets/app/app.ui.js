(function (angular) {
    angular.module('app.ui')
        .controller('MainController', MainController);

    function MainController($rootScope) {
        $scope.title = 'Star Wars WIKI';
        $scope.sections = [];
    };
})(window.angular);