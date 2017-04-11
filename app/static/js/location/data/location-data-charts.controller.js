(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataChartsCtrl', LocationDataChartsCtrl);
        
    LocationDataChartsCtrl.$inject = ['$scope', 'locationDataStorage'];
    
    
    function LocationDataChartsCtrl($scope, locationDataStorage) {
        var vm = this;
        vm.parameterSelection = locationDataStorage.getParametersAllMeasurementTypesSelection()
        
        $scope.$on('parameterSelectionChange', function() {
            vm.parameterSelection = locationDataStorage.getParametersAllMeasurementTypesSelection();
        });
        
    }
    
})();
