(function() {
    
    'use strict';
    
    angular
        .module('app')
        .config(config);
    
    function config($qProvider, $interpolateProvider, $urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
        
        $qProvider.errorOnUnhandledRejections(false)
        
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
        
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
        
        $stateProvider
            .state('start', {
                url:'/start',
                templateUrl:'static/partials/start/start.html',
                controller: 'Start',
                controllerAs: 'vm'
            })
            .state('location', {
                url:'/location/:location_id/',
                templateUrl:'static/partials/location/location.html',
           //controller: 'Location',
           //controllerAs: 'vm'
        });
        
        $urlRouterProvider.otherwise('/start');
    }
    
})();
