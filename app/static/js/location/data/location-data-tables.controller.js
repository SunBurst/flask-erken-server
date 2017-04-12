(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataTablesCtrl', LocationDataTablesCtrl);
        
    LocationDataTablesCtrl.$inject = ['$scope', 'locationDataStorage'];
    
    function LocationDataTablesCtrl($scope, locationDataStorage) {
        var vm = this;
        vm.parameterSelection = locationDataStorage.getParametersAllMeasurementTypesSelection()
        
        $scope.$on('parameterSelectionChange', function() {
            vm.parameterSelection = locationDataStorage.getParametersAllMeasurementTypesSelection();
        });
        
    }
    
})();
