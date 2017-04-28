(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataTablesCtrl', StationDataTablesCtrl);
        
    StationDataTablesCtrl.$inject = ['$scope', 'stationDataStorage'];
    
    function StationDataTablesCtrl($scope, stationDataStorage) {
        var vm = this;
        vm.parameterSelection = stationDataStorage.getParametersAllMeasurementTypesSelection()
        
        $scope.$on('parameterSelectionChange', function() {
            vm.parameterSelection = stationDataStorage.getParametersAllMeasurementTypesSelection();
        });
        
    }
    
})();
