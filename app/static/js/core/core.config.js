(function() {
    
    'use strict';
    
    angular
        .module('app.core')
        .config(config);
    
    function config($qProvider, $interpolateProvider, $urlRouterProvider, $locationProvider) {

        $qProvider.errorOnUnhandledRejections(false)
        
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
        
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
        
        $urlRouterProvider.otherwise('/start');

    }
    
})();
