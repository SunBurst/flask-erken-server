angular.module('app', ['ui.router', 'ngResource', 'uiGmapgoogle-maps', 'app.controllers', 'app.services']);

angular.module('app').config(function($qProvider, $interpolateProvider, $locationProvider, $stateProvider, $httpProvider) {
    
    $qProvider.errorOnUnhandledRejections(false)
    
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
    
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    
    $stateProvider.state('locations', {
        url:'/locations',
        templateUrl:'static/partials/locations.html'
        //controller:'LocationsListController'
    }).state('viewLocation', {
       url:'/location/:id',
       templateUrl:'static/partials/location.html',
       controller:'LocationViewController'
    });
}).run(function($state){
   $state.go('locations');
});
