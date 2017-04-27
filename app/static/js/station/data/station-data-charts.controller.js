(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataChartsCtrl', StationDataChartsCtrl);
        
    StationDataChartsCtrl.$inject = ['$scope', 'stationDataStorage'];
    
    
    function StationDataChartsCtrl($scope, stationDataStorage) {
        var vm = this;
        vm.parameterSelection = stationDataStorage.getParametersAllMeasurementTypesSelection()
        
        $scope.$on('parameterSelectionChange', function() {
            vm.parameterSelection = stationDataStorage.getParametersAllMeasurementTypesSelection();
        });
        
    }
    
})();
