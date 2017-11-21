(function (angular) {
    angular
        .module('myApp', [
            'libraries',
            'myApp.models.messages',
            'myApp.about',
            'myApp.experiments',
            'myApp.home'
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
})(this.angular);