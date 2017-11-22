(function (angular) {
    angular
        .module('app', [
            'libraries',
            'app.ui.home',
            'app.ui.detail'
        ])
        .config(stateConfig);



    function MainController($rootScope) {
        $scope.title = 'Star Wars WIKI';
        $scope.sections = [];
    };


    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true
            });

        $urlRouterProvider.otherwise('/home');
    };
})(window.angular);