'use strict';

angular.module('app', [
  'ngRoute',
  'app.locations'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .otherwise({redirectTo: '/start'});
}]);
