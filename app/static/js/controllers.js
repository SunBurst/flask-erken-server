'use strict';

angular.module('app.controllers', []).controller('LocationsListController', function($scope, $state, Location, Parameter) {
    $scope.locations = Location.query();
    $scope.parameters = Parameter.query();
}).controller('LocationViewController', function($scope, $stateParams, Location) {
    $scope.location = Location.get({ id: $stateParams.id });
});
