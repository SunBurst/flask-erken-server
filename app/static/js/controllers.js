'use strict';

angular.module('app.controllers', []).controller('LocationsListController', function($scope, $state, Location) {
    $scope.locations = Location.query();
}).controller('LocationViewController', function($scope, $stateParams, Location) {
    $scope.location = Location.get({ id: $stateParams.id });
});
