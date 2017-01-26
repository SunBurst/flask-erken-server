angular.module('app', ['ui.router', 'ngResource', 'app.controllers', 'app.services']);

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
    }).state('location', {
       url:'/location/:location_id/',
       templateUrl:'static/partials/location_info.html'
       //controller:'LocationViewController'
    });
}).run(function($state){
   $state.go('locations');
});
